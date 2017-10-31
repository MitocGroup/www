'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');

class AwsHelper {

  /**
   * ATM hosted zone ID
   * @returns {string}
   * @private
   */
  static hostedZoneId() {
    return 'Z17L96DE7IF0IN';
  }

  /**
   * Wait timeout
   * @returns {number}
   */
  static waitTimeout() {
    return 480000; // 8 min
  }

  /**
   * Constructor
   */
  constructor(bucketName) {
    AWS.config.credentials = process.env.CI
      ? new AWS.EnvironmentCredentials('AWS')
      : new AWS.SharedIniFileCredentials({ profile: 'mitoc' });

    this.bucket = bucketName;
    this.s3 = new AWS.S3();
    this.route53 = new AWS.Route53();
    this.cloudfront = new AWS.CloudFront();
  }

  /**
   * Get list of S3 objects
   * @param prefix
   * @returns {Promise}
   */
  listS3Objects(prefix = '') {
    return this.s3.listObjectsV2({ Bucket: this.bucket, Prefix: prefix }).promise();
  }

  /**
   * @param objectKey
   * @returns {Promise}
   */
  getS3Object(objectKey) {
    return this.s3.getObject({ Bucket: this.bucket, Key: objectKey }).promise();
  }

  /**
   * @param objectKey
   * @param body
   * @returns {Promise}
   */
  putS3Object(objectKey, body = '') {
    return this.s3.putObject({ Bucket: this.bucket, Key: objectKey, Body: body }).promise();
  }

  /**
   * Upload zip to s3
   * @param objectKey
   * @param stream
   * @returns {Promise}
   */
  uploadZipToS3(objectKey, stream) {
    return this.s3.upload({ Bucket: this.bucket, Key: objectKey, Body: stream }).promise();
  }

  /**
   * Get S3 object and save it to local path
   * @param objectKey
   * @param pathToSave
   * @returns {Promise}
   */
  getAndSaveS3Object(objectKey, pathToSave) {
    return new Promise((resolve, reject) => {
      const writable = fs.createWriteStream(pathToSave);

      this.s3.getObject({ Bucket: this.bucket, Key: objectKey })
        .createReadStream()
        .pipe(writable)
        .on('finish', res => resolve())
        .on('error', err => reject(err));
    });
  }

  /**
   * @param objectKey
   * @returns {Promise}
   */
  deleteS3Object(objectKey) {
    return this.s3.deleteObject({ Bucket: this.bucket, Key: objectKey }).promise();
  }

  /**
   * Get distribution info by its ID
   * @param id
   * @returns {Promise}
   */
  getDistributionById(id) {
    return this.cloudfront.getDistribution({ Id: id }).promise();
  }

  /**
   * Update distribution config
   * @param distId
   * @param distConfig
   * @param etag
   * @returns {Promise}
   */
  updateDistributionConfig(distId, distConfig, etag = null) {
    let params = {
      Id: distId,
      DistributionConfig: distConfig
    };

    if (etag) {
      params['IfMatch'] = etag;
    }

    return this.cloudfront.updateDistribution(params).promise();
  }

  /**
   * Update distribution config and wait deployed status
   * @param distId
   * @param distConfig
   * @param etag
   * @returns {Promise}
   */
  updateDistributionAndWait(distId, distConfig, etag = null) {
    return this.updateDistributionConfig.apply(this, arguments).then(() => {
      return this.waitForDistributionIsDeployed(distId);
    });
  }

  /**
   * Get list of active distributions (not marked as REMOVE)
   * @returns {Promise}
   */
  getListOfActiveDistributions() {
    return this.getAllDistributions().then(data => {
      let result = [];

      data.Items.forEach(item => {
        if (!item.Comment.startsWith('REMOVE')) {
          result.push(item);
        }
      });

      return Promise.resolve(result);
    });
  }

  /**
   * Wait for distribution is deployed
   * @param distId
   * @returns {Promise}
   */
  waitForDistributionIsDeployed(distId) {
    let waitFor = this.cloudfront.waitFor('distributionDeployed', {Id: distId}).promise();
    let forceResolver = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Stop waiting deployed status for: ${distId}`);
        resolve();
      }, AwsHelper.waitTimeout());
    });

    return Promise.race([forceResolver, waitFor]);
  }

  /**
   * Find distribution by associated alias
   * @param alias
   * @returns {Promise}
   */
  findDistributionByAlias(alias) {
    return this.getAllDistributions().then(data => {
      let result = data.Items.filter(item => {
        return item.Aliases.Items.includes(alias);
      });

      return Promise.resolve(result.length > 0 ? result[0] : false);
    });
  }

  /**
   * Get all distributions
   * @returns {Promise}
   */
  getAllDistributions() {
    return this.cloudfront.listDistributions({}).promise();
  }

  /**
   * Get resource record by domain name
   * @param resourceName
   * @returns {Promise}
   */
  getResourceRecordByName(resourceName) {
    return new Promise((resolve, reject) => {
      this.route53.listResourceRecordSets({
        HostedZoneId: AwsHelper.hostedZoneId(),
        StartRecordName: resourceName
      }, (err, res) => {
        if (err) {
          return reject(err.stack);
        }

        if (!res.ResourceRecordSets[0]) {
          return reject('Resource record not found');
        }

        resolve(res.ResourceRecordSets[0]);
      });
    });
  }

  /**
   * Update resource record and wait till records changed
   * @param recordSet
   * @returns {Promise}
   */
  updateResourceRecord(recordSet) {
    return new Promise((resolve, reject) => {
      this.route53.changeResourceRecordSets({
        ChangeBatch: {
          Changes: [{
            Action: 'UPSERT',
            ResourceRecordSet: recordSet
          }],
        },
        HostedZoneId: AwsHelper.hostedZoneId()
      }, (err, res) => {
        if (err) {
          return reject(err.stack);
        }

        this.route53.waitFor('resourceRecordSetsChanged', {Id: res.ChangeInfo.Id}, (err, res) => {
          if (err) {
            return reject(err.stack);
          }

          resolve(res);
        })
      });
    });
  }

}

module.exports = AwsHelper;

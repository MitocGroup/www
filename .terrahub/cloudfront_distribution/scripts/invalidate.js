const fs = require('fs');
const AWS = require('aws-sdk');

let id = process.env.ID ;

const cloudfront = new AWS.CloudFront();
var params = {
    DistributionId: id,
    InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
            Quantity: 1,
            Items: ['/*']
        }
    }
};
cloudfront.createInvalidation(params, function(err, data) {
    if (err) { console.log(JSON.stringify(err.message)); }
    else { console.log({}); }
});

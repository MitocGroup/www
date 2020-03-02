# title
7 Steps to Create Serverless Environments on AWS

# description
Amazon Web Services is couple of days away from its fourth edition of AWS re:Invent. We are getting ready to fly to Las Vegas and present the breakout session A[RC201 — Microservices Architecture for Digital Platforms with AWS Lambda, Amazon CloudFront and Amazon DynamoDB.

# image
https://www.mitocgroup.com/images/blog/2015-10-05/without-servers.png

# publicationDate
Mon, 5 October 2015 12:20:55 -0400

---

<div class="padd25px">
    <img src="/images/blog/2015-10-05/without-servers.png" alt="Serverless Microservice Architecture" />
    <div class="center img-description">Microservices without the Servers:
      <a href="https://aws.amazon.com/blogs/compute/microservices-without-the-servers/">https://aws.amazon.com/blogs/compute/microservices-without-the-servers/</a>
    </div>
</div>

[Amazon Web Services](https://aws.amazon.com/) is couple of days away from its fourth edition of [AWS re:Invent](https://reinvent.awsevents.com/). We are getting ready to fly to Las Vegas and present the breakout session A[RC201 — Microservices Architecture for Digital Platforms with AWS Lambda, Amazon CloudFront and Amazon DynamoDB](https://www.portal.reinvent.awsevents.com/connect/sessionDetail.ww?SESSION_ID=1646&tclass=popup). Minutes away from departure, we are working out the final improvements that have been turned into short videos. Next, we'd like to share with technical teams how to create serverless environments on AWS, in 7 simple steps that would take up to 10 minutes.

First step is to create an AWS IAM role that will enable your account to make calls from AWS Lambda to Amazon DynamoDB:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/KKp4G7ELE80" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Second step is to create an Amazon S3 bucket that will store the front end code and serve it securely to Amazon CloudFront:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/W_X6xb2ZZHA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Third step is to create Amazon CloudFront distribution that will distribute globally the front end code and other static assets:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/1IKAHayNGPI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Fourth step is to create AWS Lambda function that will provide back end code, depending on the use case:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/dIaCmFu1BfI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Fifth step is to create Amazon API Gateway endpoint that will expose AWS Lambda functions externally as a RESTful API:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/aX2-nzlelP4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Sixth step is to enable CORS (Cross-Origin Resource Sharing) in Amazon API Gateway:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/NwNsTIF9W_Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Seventh step, and final one, is to create Amazon DynamoDB table that will store consistently the data:

<div class="iframe-container">
  <iframe width="680" height="510" src="https://www.youtube.com/embed/7ciIrFC_hP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I hope these 7 simple steps will make it easier to get started with serverless environments on AWS. If you'd like to learn more, take a look at this awesome blog post published recently by AWS Lambda team: [https://aws.amazon.com/blogs/compute/microservices-without-the-servers/](https://aws.amazon.com/blogs/compute/microservices-without-the-servers/)

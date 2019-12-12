# Featured
0

# Author
Eugene Istrati

# AboutAuthor
Proud Father. Lucky Husband. Open Source Contributor. DevOps | Automation | Serverless @MitocGroup. Former @AWScloud and @HearstCorp.

# Avatar
eistrati.png

# TwitterUsername
eistrati

# PublicationDate
Wed, 16 December 2015 12:20:55 -0400

# Thumbnail
/images/blog/2015-12-16/interview.png

# Title
Interview: Creators of The DEEP Framework

# Intro
Learn About The DEEP Framework Right From Its Creators

---

Original article was posted on [https://serverlesscode.com/post/deep-framework-developer-interview/](https://serverlesscode.com/post/deep-framework-developer-interview/)

<div class="padd25px">
    <img src="/images/blog/2015-12-16/interview.png" alt="partner aws" />
</div>

If you want to write web applications in AWS Lambda, there are actually quite a few options out there. There’s the [DEEP Framework](https://github.com/MitocGroup/deep-framework), [Serverless](http://serverless.com/) (formerly JAWS), [PAWS](https://github.com/braahyan/PAWS), and [Sparta](https://github.com/mweagle/Sparta). There are likely more that I’m omitting — holler on Twitter [@ryan_sb](https://twitter.com/ryan_sb) if you know of one.

Today, we’ll hear from the creators of the DEEP Framework about its origins, what it’s great at, and how to start using it. The big driver for the Mitoc Group behind going serverless was to reduce ongoing maintenance. What better way to maintain fewer servers by not having them?

Not only is there the DEEP Framework itself, but there’s also a “microapp” store at [www.deep.mg](www.deep.mg) where developers can buy and sell small pieces of functionality, like a shopping cart or recommendation engine. It’s still early days for their marketplace, but in the future it could enable developers to build full applications with relatively little code.

### The Interview

#### Q: Tell me a little about the DEEP framework, what problem is it solving?

[DEEP](https://github.com/MitocGroup/deep-framework) is a serverless web framework that abstracts web applications and web services from specific cloud providers. This framework enables developers build cloud-native applications or platforms using microservices architecture in a completely serverless approach. We aim to help enterprise software and enterprise organizations to build web applications or web services that can be used across cloud providers, enabling the customers to choose between Amazon Web Services, or Google Cloud Platform, or Microsoft Azure, or others, without having developers to rewrite the code.

#### Q: I see that there’s an app store for DEEP modules, can you give me any information about how many vendors are making things available through the app store? How many people are getting modules via the app store?

The DEEP Marketplace is a public app store built on top of the DEEP Framework, that empowers customers to choose functionality from listed microservices/microapplications and deploy them together as an web app into their own cloud provider accounts with just few clicks; as well as empowering developers to create and publish their microservices/microapplications and monetize them in similar approach to Apple’s App Store. [www.deep.mg](www.deep.mg) is currently in private beta, so it’s still very early to talk about it. But, it’s not a secret and to address your curiosity, we have 16 developers publishing microservices/microapplications and 3 customers using them in production.

#### Q: Can you talk about the design of the DEEP framework at a high level? What are the different components?

DEEP Framework is a collection of JavaScript libraries that can be used either in front-end or back-end, depends on the use case. Every library abstracts certain component of an web application or a cloud provider service. They are published through npmjs.com and documented on [docs.deep.mg](docs.deep.mg). The full list of libraries and some details can be found in the [README](https://github.com/MitocGroup/deep-framework#what-is-deep-framework-).

#### Q: Other than Lambda, what other technologies is the DEEP using? This includes frontend, mobile, databases, whatever you can share.

DEEP Framework was built originally on AWS, but we want and hope to extend support using other cloud providers like Google Cloud Platform or Microsoft Azure. In AWS context, we are using the following services:

1. Security — IAM and Cognito
2. Frontend — S3 and CloudFront
3. Backend — Lambda, API Gateway and SNS
4. Database — DynamoDB

Our [roadmap](https://github.com/MitocGroup/deep-framework#roadmap) includes adding support for services like CloudSearch and Elasticsearch, SQS and Kinesis, VPC and Elasticache.

#### Q: How large is the DEEP team? Did any/all of them have experience with Lambda and Node.js already, or were they coming from other areas of expertise?

The team that works on DEEP project is pretty small (less than 10 developers). Except [@eistrati](https://github.com/eistrati), nobody had prior experience with AWS. It’s a long story, and to make it short, core members of the team worked together on other projects that turned out to be 80%+ of our time support and maintenance. So we forced ourselves into a serverless approach and learned on the fly everything else required to get the job done.

#### Q: What do you recommend for monitoring with DEEP applications? Is CloudWatch your go-to, or are there other tools you use in addition?

At the beginning, CloudWatch was our go-to monitoring tool, but it’s very limited in showing the full picture, especially in realtime. We are using an [ELK](https://www.elastic.co/webinars/introduction-elk-stack)(Elasticsearch + Logstash + Kibana) stack hacked together to solve our measuring and monitoring needs. Now we’re working to transform that solution into a component that any web application or web platform could use, if it’s built with DEEP Framework.

#### Q: How does the DEEP framework expect a production pipeline to look? Do you expect users to be developing on their “production” account and managing changes with versioning/aliases?

DEEP Framework, DEEP Marketplace, and DEEP CLI (aka deepify) are components of a bigger Platform-as-a-Service that we call [Digital Enterprise End-to-end Platform](https://github.com/MitocGroup/deep-framework#appendix-b-deep-ecosystem) (aka DEEP).

Production pipeline in context of DEEP Framework + DEEP CLI is focused on developers and makes it easier for them to build, test and deploy serverless applications. For example:

1. _deepify server_ — simulates the entire stack on localhost and helps developers build and test their microservice(s)/microapplication(s) without any need of cloud provider accounts (e.g. AWS accounts)
2. _deepify deploy_ — deploys the microservice(s)/microapplication(s) on cloud provider account, into specific environment (e.g. prod, stage, test, dev, etc)
3. Enjoy the web application!

Production pipeline in context of DEEP Framework + DEEP Marketplace is focused on customers, allowing them to search for functionality in UI (no need for technical expertise) and deploy everything in their own cloud provider accounts as an web application. For example:

1. Search/select wanted functionality (or compatible functionalities) and add it (or them) to shopping cart
2. Go to checkout page, provide credit card (pay for licensing the code) and provide cloud provider account credentials (point where the code will be loaded)
3. Enjoy the web application!

In both cases, DEEP ecosystem manages (and encourages, but doesn’t enforce) environments/versioning/aliases for the users (developers or customers). Where appropriate, we ask for confirmations from users and apply changes to existing stacks. At some point in near future, we’d like to build a process that is very close to blue-green deployments.

#### Q: Was there anything that surprised you along the way? Were certain tasks easier or harder than you’d expected?

Well, this is a tricky question. Since almost everything for us was new, we had lots of questions and misperceptions on certain things, but with help and support from the community and AWS, every task that was hard at the beginning turned up easy at the end. The biggest surprise was to be spotted by AWS Lambda team and invited to speak at AWS re:Invent 2015, the breakout session called “Microservices Architecture for Digital Platforms with AWS Lambda, Amazon CloudFront and Amazon DynamoDB”.

#### Q: Are there any tools or libraries you’ve used to build DEEP, or that you use alongside DEEP that you want people to know about?

DEEP Framework is open source project, built on top of **tons** of other open source projects from Github. I’ll try to briefly mention some of them (and apologies in advance if I miss anything):

- [aws/aws-sdk-js](https://github.com/aws/aws-sdk-js)
- [getsentry/raven-node](https://github.com/getsentry/raven-node)
- [hapijs/joi](https://github.com/hapijs/joi)
- [ryanfitz/vogels](https://github.com/ryanfitz/vogels)
- [RiptideElements/s3fs](https://github.com/RiptideElements/s3fs)
- [luin/ioredis](https://github.com/luin/ioredis)
- [marcuswestin/store.js](https://github.com/marcuswestin/store.js)
- [young-steveo/bottlejs](https://github.com/young-steveo/bottlejs)
- [nylen/wait-until](https://github.com/nylen/wait-until)
- [visionmedia/superagent](https://github.com/visionmedia/superagent)
- [IonicaBizau/node-parse-url](https://github.com/IonicaBizau/node-parse-url)
- [sindresorhus/query-string](https://github.com/sindresorhus/query-string)

#### Q: How would someone start with the DEEP framework, do you have a quickstart guide for people to try?

Yes, we have published couple of examples on how to start building and deploying applications with DEEP Framework + DEEP CLI. There’s a [hello world app](https://github.com/MitocGroup/deep-microservices-helloworld) and a [todo app](https://github.com/MitocGroup/deep-microservices-todo-app) inspired by [todomvc.com](http://todomvc.com/).

### Wrapping Up

Thanks so much to the DEEP team for agreeing to be interviewed. In addition to all that, the team has [presented at the AWS Loft](http://www.slideshare.net/mitocgroup/microservices-architecture-for-digital-platforms-using-serverless-aws) and posted an article (which you’ve already seen if you subscribe to my [mailing list](https://serverlesscode.com/mail/)), [7 Steps to Create Serverless Environments on AWS](https://medium.com/@MitocGroup/how-to-create-serverless-environments-on-aws-8485ae039765).

As always, if you have an idea, question, or comment, hit me on Twitter [@ryan_sb](https://twitter.com/ryan_sb) or email me at [lambda@ryansb.com](mailto:lambda@ryansb.com).

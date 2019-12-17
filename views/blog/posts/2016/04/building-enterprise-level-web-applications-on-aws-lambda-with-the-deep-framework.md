# title
Building Enterprise Level Web Applications on AWS Lambda with the DEEP Framework

# description
Since the beginning, Mitoc Group has been building web applications for enterprise customers. We are a small group of developers who are helping customers with their entire web development process, from conception through execution and down to maintenance.

# image
https://www.mitocgroup.com/images/blog/2016-04-14/code.png

# publicationDate
Thu, 14 April 2016 12:20:55 -0400

---

<div class="padd25px">
    <img src="/images/blog/2016-04-14/code.png" alt="Speakers" />
</div>

### Overview

Since the beginning, [Mitoc Group](https://www.mitocgroup.com/) has been building web applications for enterprise customers. We are a small group of developers who are helping customers with their entire web development process, from conception through execution and down to maintenance. Being in the business of doing everything is very hard, and it would be impossible without using AWS foundational services, but we incrementally needed more. That is why we became earlier adopters of serverless approach and developed an ecosystem called [Digital Enterprise End-to-end Platform](https://www.mitocgroup.com/partners/aws-lambda/index.html) (shortly DEEP) with AWS Lambda at core.

In this post, we will dive deeper into how DEEP is leveraging AWS Lambda to empower developers build cloud-native applications or platforms using microservices architecture. We will walk through the thinking process of identifying the front-end, the back-end and the data tiers required to build web applications with AWS Lambda at core. We will focus on the structure of AWS Lambda functions we use, as well as security, performance and benchmarking steps that we take to build enterprise-level web applications.

### Enterprise-level Web Applications

Our approach to web development is full-stack and user-driven, focused on UI (aka User Interaction) and UX (aka User eXperience). But before going into the details, we'd like to emphasize the strategical (biased and opinionated) decisions we have made early:

- We don't say "no" to customers; Every problem is seriously evaluated and sometimes we offer options that involve our direct competitors
- We are developers and we focus only on the application level; Everything else (platform level and infrastructure level) must be managed by AWS
- We focus our 20% of effort to solve 80% of work load; Everything must be automated and pushed on the services side rather than ours (clients)

To be honest and fair, it doesn't work all the time as expected, but it does help us to learn fast and move quickly, sustainably and incrementally solving business problems through technical solutions that really matters. But the definition of "really matters" is different from customer to customer, quite unique in some cases. Nevertheless, what we learn from our customers is that enterprise-level web applications must provide the following 7 common expectations:

1. Be secure — security through obscurity (e.g. [Amazon IAM](https://aws.amazon.com/iam/), [Amazon Cognito](https://aws.amazon.com/cognito/));
2. Be compliant — governance-focused, audit-friendly service features with [applicable compliance or audit standards](https://aws.amazon.com/compliance/);
3. Be reliable — Service Level Agreements (e.g. [Amazon S3](https://aws.amazon.com/s3/sla/), [Amazon CloudFront](https://aws.amazon.com/cloudfront/sla/));
4. Be performant — studies show that [page loads longer than 2s start impacting the users behavior](https://medium.com/@puppybits/letting-people-in-the-door-how-and-why-to-get-page-loads-under-2-seconds-340c487bd81d);
5. Be pluggable — [successful enterprise ecosystem](https://www.gartner.com/doc/371379/best-practices-key-successful-application) is mainly driven by fully integrated web applications inside organizations;
6. Be cost-efficient — benefit of [AWS Free Tier](https://aws.amazon.com/free/), as well as [pay only for services that you use and when you use them](https://aws.amazon.com/pricing/);
7. Be scalable — serverless approach relies on abstracted services that are pre-scaled to AWS size, [whatever that would be](http://www.techrepublic.com/article/aws-now-10x-the-size-of-its-competitors-is-the-cloud-arms-race-over/).

### Architecture

This article will describe how we have transformed a self-managed task management application (aka todo app) in minutes. The original version can be seen on [www.todomvc.com](http://www.todomvc.com%2C/) and the original code can be downloaded from [https://github.com/tastejs/todomvc/tree/master/examples/angularjs](https://github.com/tastejs/todomvc/tree/master/examples/angularjs).
The architecture of every web application we build or transform, including the one described above, is similar to the reference architecture of the realtime voting application published recently by AWS on Github:

<div class="external-article">
  <a href="https://github.com/awslabs/lambda-refarch-webapp">
  <h5>awslabs/lambda-refarch-webapp</h5>
  <span>lambda-refarch-webapp — AWS Lambda Reference Architecture for creating a Web Application</span>
    <span>github.com</span>
  </a>
</div>

The todo app is written in AngularJS and deployed on Amazon S3, behind Amazon CloudFront (the front-end tier). The tasks management is processed by AWS Lambda, optionally behind Amazon API Gateway (the back-end tier). The tasks metadata is stored in Amazon DynamoDB (the data tier). The transformed todo app, along with instructions on how to install and deploy this web application, is described in [this blog post](https://www.mitocgroup.com/blog/building-scalable-web-apps-with-aws-lambda-and-home-grown-serverless-web-framework/) and the code is available on Github:

<div class="external-article">
  <a href="https://github.com/MitocGroup/deep-microservices-todo-app">
  <h5>MitocGroup/deep-microservices-todomvc</h5>
  <span>DEEP Todo App ( https://github.com/MitocGroup/deep-microservices-todomvc) is a web app inspired from AngularJS TodoMVC...</span>
    <span>github.com</span>
  </a>
</div>

In this article, we will focus on AWS Lambda functions and the value proposition it offers to us and our customers.

### AWS Lambda Functions

Let's get into the details of the thinking process and the AWS Lambda functions that we have written for this web app. The goal of the todo app is to manage tasks in a self-service mode. End users can view tasks, create new tasks, mark or unmark a task as done, and clear completed tasks. From UI and UX point of view, that leads us to 4 user interactions that will require 4 different back-end calls:

1. web service that retrieves task(s)
2. web service that creates task(s)
3. web service that deletes task(s)
4. web service that updates task(s)

Simple reorder of the above identified back-end calls leads us to basic CRUD (Create, Retrieve, Update, Delete) operations on the Task data object. And these are the simple logical steps that we take to identify the front-end, the back-end and the data tiers of (drums beating, trumpets playing) our approach to microservices, which we prefer to call microapplications.

Therefore, coming back to AWS Lambda, we have written 4 small node.js functions that are context-bounded and self-sustained (each below microservice corresponds to the above identified back-end web service):

```js
'use strict';

import DeepFramework from 'deep-framework';

export default class Handler extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let taskId = request.getParam('Id');

    if (taskId) {
      this.retrieveTask(taskId, (task) => {
        return this.createResponse(task).send();
      });
    } else {
      this.retrieveAllTasks((result) => {
        return this.createResponse(result).send();
      });
    }
  }

  /**
   * @param {Function} callback
   */
  retrieveAllTasks(callback) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.findAll((err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(task.Items);
    });
  }

  /**
   * @param {String} taskId
   * @param {Function} callback
   */
  retrieveTask(taskId, callback) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.findOneById(taskId, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return callback(task ? task.get() : null);
    });
  }
}
```

<div class="padd25px">
  <div class="center img-description">1. Microservice that Retrieves Task(s) — 
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/retrieve/Handler.es6">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/retrieve/Handler.es6</a>
  </div>
</div>

```js

'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.createItem(request.data, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(task.get()).send();
    });
  }
}
```

<div class="padd25px">
  <div class="center img-description">2. Microservice that Creates a Task — 
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/Handler.es6">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/Handler.es6</a>
  </div>
</div>

```js
'use strict';

import DeepFramework from 'deep-framework';

export default class Handler extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let taskId = request.getParam('Id');

    if (typeof taskId !== 'string') {
      throw new InvalidArgumentException(taskId, 'string');
    }

    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.updateItem(taskId, request.data, (err, task) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse(task.get()).send();
    });
  }
}
```

<div class="padd25px">
  <div class="center img-description">3. Microservice that Updates a Task — 
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/update/Handler.es6">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/update/Handler.es6</a>
  </div>
</div>

```js

'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param request
   */
  handle(request) {
    let taskId = request.getParam('Id');

    if (typeof taskId !== 'string') {
      throw new DeepFramework.Core.Exception.InvalidArgumentException(taskId, 'string');
    }

    let TaskModel = this.kernel.get('db').get('Task');

    TaskModel.deleteById(taskId, (err) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }

      return this.createResponse({}).send();
    });
  }
}
```


<div class="padd25px">
  <div class="center img-description">4. Microservice that Deletes a Task — 
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/delete/Handler.es6">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/delete/Handler.es6</a>
  </div>
</div>

Each above file with related dependencies is compressed into .zip file and uploaded to AWS Lambda. If you're new to this process, we'd strongly recommend to follow [How to Create, Upload and Invoke an AWS Lambda function](https://docs.aws.amazon.com/AWSToolkitEclipse/latest/ug/lambda-tutorial.html) tutorial.

Back to our 4 small node.js functions, you can see that we have adopted ES6 (aka [ES2015](https://babeljs.io/docs/learn-es2015)) as our coding standard. And we are importing deep-framework in every function. What is this framework anyway and why we're using it everywhere?

### Full-stack Web Framework

Let us step back. Building and uploading AWS Lambda functions to the service is very simple and straight-forward, but now imagine you need to manage 100–150 web services to access a web page, multiplied by hundreds or thousands of web pages.

We believe that the only way to achieve this kind of flexibility and scale is automation and code reuse. These principles led us to build and open source [DEEP Framework](https://github.com/MitocGroup/deep-framework) — a full-stack web framework that abstracts web services and web applications from specific cloud services — and DEEP CLI (aka _deepify_) — development tool-chain that abstracts package management and associated development operations.

Therefore, to make sure that the process of managing AWS Lambda functions is streamlined and automated, we have adopted a consistent approach to include 2 more files in each uploaded .zip:

```js
'use strict';

import DeepFramework from 'deep-framework';
import Handler from './Handler';

export default DeepFramework.LambdaHandler(Handler);
```

<div class="padd25px">
  <div class="center img-description">1. DEEP Microservice Bootstrap — 
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/bootstrap.es6">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/bootstrap.es6</a>
  </div>
</div>

```js
{
  "name": "deep-todo-task-create",
  "version": "0.0.1",
  "description": "Create a new todo task",
  "scripts": {
    "postinstall": "npm run compile",
    "compile": "deepify compile-es6 `pwd`"
  },
  "dependencies": {
    "deep-framework": "^1.8.x"
  },
  "preferGlobal": false,
  "private": true,
  "analyze": true
}
```


<div class="padd25px">
  <div class="center img-description">2. DEEP Microservice Package Metadata (for npm) —
    <a href="https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/package.json">https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/src/deep-todomvc/backend/src/task/create/package.json</a>
  </div>
</div>

Having these 3 files (Handler.es6, bootstrap.es6 and package.json) in each AWS Lambda function doesn't mean your final .zip file will be that small. Actually, a lot of additional operations happen before the .zip file is created. To name few:

- AWS Lambda performs better when the uploaded codebase is smaller. Since we provide both local development capabilities and one-step push to production, our process optimizes resources before deploying to AWS.
- ES6 is not supported by node.js v0.10.x that currently runs in AWS Lambda. We compile .es6 files into ES5 compliant .js files using babel.
- Dependencies that are defined in package.json are automatically pulled and fine tuned for node.js v0.10.x to provide best performance possible.

### Putting Everything Together

First, you will need the following pre-requisites:

1. AWS Account (learn how to [Create an Amazon Web Services Account](https://www.youtube.com/watch?v=WviHsoz8yHk))
2. AWS CLI (learn how to [Configure AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html))
3. Git v2+ (learn how to [Get Started — Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
4. Java / JRE v6+ (learn how to [JDK 8 and JRE 8 Installation Start Here](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html))
5. Node.js v4+ (learn how to [Install nvm](https://github.com/creationix/nvm#install-script) and [Use latest node v4](https://github.com/creationix/nvm#usage))
6. DEEP CLI (execute in command line: _npm install deepify -g_)

Note: Don't use "sudo" in step 5. Otherwise you'll have to [fix npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Next, you will deploy the todo app using _deepify_:

1. _deepify install github://MitocGroup/deep-microservices-todomvc ~/deep-microservices-todomvc_
2. _deepify server ~/deep-microservices-todomvc_
3. _deepify deploy ~/deep-microservices-todomvc_

_Note: When step 2 (deepify server) is finished, you can open in your browser [http://localhost:8000](http://localhost:8000/) and enjoy the todo app running locally._

<div class="iframe-container">
  <iframe width="680" height="383" src="https://www.youtube.com/embed/ghZNn5Gjv90?list=PLPGfD-tGOl7uNDXo_eMN1odMZflYVu2n9" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Cleaning Up

There are at least half a dozen services and several dozen of resources created during _deepify deploy_. If only there was a simple command that would clean up everything when we're done. We thought of that and created _deepify undeploy_ to address this need. When you are done using todo app and want to remove web app related resources, simply execute step 4:

4. _deepify undeploy ~/deep-microservices-todomvc_

As you can see, we empower developers to build hassle-free cloud-native applications or platforms using microservices architecture and serverless computing. And what about security?

### Security

Well, one of the biggest value propositions on AWS is out-of-the-box [security](https://aws.amazon.com/security/) and [compliance](https://aws.amazon.com/compliance/). The beauty of cloud-native approach is that security comes by design (in other words, it won't work otherwise). We take full advantage of shared responsibility model and enforce security in every layer.

Developers and applications' end users benefit of [AWS IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) through streamlined implementations of [least privilege access](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege), [delegated roles instead of credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles) and [integration with logging and monitoring services](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#keep-a-log) (e.g. AWS CloudTrail, Amazon CloudWatch, Amazon Elasticsearch + Kibana). For example, developers and end users of todo app didn't need to explicitly define any security roles (it was done by _deepify deploy_), but they can rest assured that only their instance of todo app will be using their infrastructure & platform & application resources.

Here below are 2 security roles (1 for back-end and 1 for front-end) that have been seamlessly generated and enforced in each layer:

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": ["lambda:InvokeFunction"],
            "Resource": ["arn:aws:lambda:us-east-1:123456789000:function:DeepProdTodoCreate1234abcd*"]
        }
    ]
}
```

<div class="padd25px">
  <div class="center img-description">AWS IAM role that allows back-end invocation of AWS Lambda function (e.g. DeepProdTodoCreate1234abcd) in web application's AWS account (e.g. 123456789000)</div>
</div>

```js
{
  "Version": "2015-10-07",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["deep.todo:task:create"],
      "Resource": ["deep.todo:task"]
    }
  ]
}
```

<div class="padd25px">
  <div class="center img-description">DEEP role that allows front-end resource (e.g deep.todo:task) to execute action (e.g. deep.todo:task:create)</div>
</div>

### Benchmarking

We have been continuously benchmarking AWS Lambda for various use cases in our microapplications. After a couple of repetitive times doing similar analysis, we decided to build the benchmarking as another microapplication and reuse the ecosystem to automatically include where we needed it. The codebase is open sourced on Github:

<div class="external-article">
  <a href="https://github.com/MitocGroup/deep-microservices-benchmarking">
  <h5>MitocGroup/deep-microservices-benchmarking</h5>
  <span>DEEP Benchmarking ( https://github.com/MitocGroup/deep-microservices-benchmarking) is a microservice that is built on...</span>
  <span>github.com</span>
  </a>
</div>

Particularly, for todo app, we have performed various benchmarking analysis on AWS Lambda by tweaking different components in a specific function (e.g. function size, memory size, billable cost, etc.). Next, we would like to share results with you:

<div class="horizontalScrollTable extended-table" data-markdown="1">
Req No | Function Size (MB) | Memory Size (MB) | Max Memory Used (MB) | Start time | Stop time | Front-end Call (ms) | Back-end Call (ms) | Billed Time (ms) | Billed Time ($)
-------|--------------------|------------------|----------------------|------------|-----------|---------------------|-------------------|------------------|----------------
1 | 1.1 | 128 | 34 | 20:15.8 | 20:16.2 | 359 | 200.47 | 300 | 0.000000624
2 | 1.1 | 128 | 34 | 20:17.8 | 20:18.2 | 381 | 202.45 | 300 | 0.000000624
3 | 1.1 | 128 | 34 | 20:19.9 | 20:20.3 | 406 | 192.52 | 200 | 0.000000416
4 | 1.1 | 128 | 34 | 20:21.9 | 20:22.2 | 306 | 152.19 | 200 | 0.000000416
5 | 1.1 | 128 | 34 | 20:23.9 | 20:24.2 | 333 | 175.01 | 200 | 0.000000416
6 | 1.1 | 128 | 34 | 20:25.9 | 20:26.3 | 431 | 278.03 | 300 | 0.000000624
7 | 1.1 | 128 | 34 | 20:27.9 | 20:28.2 | 323 | 170.97 | 200 | 0.000000416
8 | 1.1 | 128 | 34 | 20:29.9 | 20:30.2 | 327 | 160.24 | 200 | 0.000000416
9 | 1.1 | 128 | 34 | 20:31.9 | 20:32.4 | 556 | 225.25 | 300 | 0.000000624
10 | 1.1 | 128 | 35 | 20:33.9 | 20:34.2 | 333 | 179.59 | 200 | 0.000000416
 | | | | | **Average** | *375.50* | *193.67* | **Total** | *0.000004992*
 </div>

<div class="padd25px">
  <div class="center img-description">Benchmarking for todo app — https://todo.deep.mg/#/deep-benchmarking</div>
</div>

### Performance
Speaking of performance, we find AWS Lambda mature enough to power large-scale web applications. The key is to build the functions as small as possible, focusing on a simple rule of one function to achieve only one task. Over time, these functions might grow in size, therefore we always keep an eye on them and refactor / split into the lowest possible logical denominator (smallest task).

Using the benchmarking tool, we ran multiple scenarios on the same function from todo app:

<div class="horizontalScrollTable" data-markdown="1">
Function Size (MB) | Memory Size (MB) | Max Memory Used (MB) | Avg Front-end (ms) | Avg Back-end (ms) | Total Calls (#) | Total Billed (ms) | Total Billed ($/1B)*
-------------------|------------------|----------------------|--------------------|-------------------|-----------------|---------------------|---------------------
1.1  | 128 | 34-35 | 375.50 | 193.67 | 10  | 2,400  | 4,992
1.1  | 256 | 34-37 | 399.40 | 153.25 | 10  | 2,000  | 8,340
1.1  | 512 | 33-35 | 341.60 | 134.32 | 10  | 1,800  | 15,012
1.1  | 128 | 34-49 | 405.57 | 223.82 | 100 | 27,300 | 56,784
1.1  | 256 | 28-48 | 354.75 | 177.91 | 100 | 23,800 | 99,246
1.1  | 512 | 32-47 | 345.92 | 163.17 | 100 | 23,100 | 192,654
55.8 | 128 | 49-50 | 543.00 | 284.03 | 10  | 3,400  | 7,072
55.8 | 256 | 49-50 | 339.80 | 153.13 | 10  | 2,100  | 8,757
55.8 | 512 | 49-50 | 342.60 | 141.02 | 10  | 2,000  | 16,680
55.8 | 128 | 83-87 | 416.10 | 220.91 | 100 | 26,900 | 55,952
55.8 | 256 | 50-71 | 377.69 | 194.22 | 100 | 25,600 | 106,752
55.8 | 512 | 57-81 | 353.46 | 174.65 | 100 | 23,300 | 194,322
</div>

<div class="padd25px">
  <div class="center img-description">Key performance indicators that helps decide how to fine tune the web application (* 1B = 1 Billion)</div>
</div>

Based on performance data, we have learned pretty cool stuff:

- The smaller the function is, the better it performs; On the other hand, if more memory is allocated, the size of the function matters less and less
- Memory size is not directly proportional to billable costs; Developers can decide the memory size based on performance requirements combined with associated costs
- The key to better performance is continuous load, thanks to [container reuse in AWS Lambda](https://aws.amazon.com/blogs/compute/container-reuse-in-lambda)

### Conclusion

In this article, we have presented a small web application that is built with AWS Lambda at core. Together we walked through the thinking process of identifying the front-end, the back-end and the data tiers required to build the todo app. We focused on the structure of AWS Lambda functions used in this app, as well as security, performance and benchmarking steps that we use to build enterprise-level web applications. You can fork the [example code repository](https://github.com/MitocGroup/deep-microservices-todomvc) as a starting point for your own web applications.

If you have questions or suggestions, please contact us.
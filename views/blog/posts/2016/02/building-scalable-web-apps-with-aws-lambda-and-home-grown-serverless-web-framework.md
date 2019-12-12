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
Fri, 12 February 2016 12:20:55 -0400

# Thumbnail
/images/blog/2016-02-12/coder.png

# Title
Building Scalable Web Apps with AWS Lambda and Home-Grown Serverless Web Framework

# Intro

---

<div class="img-post-left">
    <img src="/images/blog/2016-02-12/coder.png" alt="partner aws" />
    <div class="center img-description">Development of Enterprise Software @ Mitoc Group</div>
</div>

There is a growing demand for enterprise software solutions that are easy to build and quick to deploy. Cloud Computing has emerged as one of the most viable routes for enterprise software delivery and, in our experience, Amazon Web Services is leading the charge. In this article, we will describe how we combined [1] Serverless Infrastructure from AWS with [2] Microservices Architecture to build and deploy a worry-free enterprise software marketplace we’re calling the [DEEP Marketplace](https://www.deep.mg/).

_Note: We will assume that you have general knowledge about below 2 concepts (or read suggested articles in parenthesis to learn more)_

1. _Serverless Computing (learn more — Microservices without the Servers)_
2. _Microservices Architecture (learn more — Microservices by Martin Fowler)_

### The Problem

Enterprise software is [not attractive](http://www.mycustomer.com/selling/crm/enterprise-software-sucks-says-ceo-of-enterprise-software-firm-infor) because traditionally it’s slow, architecturally monolithic and cumbersome to operate. Enterprise IT organizations are commonly overwhelmed by the technology they maintain and there aren’t enough hours in a day to address the backlog of work. That’s why the process of buying typical enterprise solution that solves a given business problem must include an evaluation of how easily it can be customized for specific use case along with a thorough understanding of the ongoing costs of day-to-day operations. That’s why savvy enterprise technology teams are constantly seeking software that empowers business users to be self-sufficient through self-service.

### The Solution

At [Mitoc Group](https://www.mitocgroup.com/), we believe that the most sustainable solution to enterprise software challenges is a marketplace of small pieces of functionality. Customers, especially non-technical users, can go to the marketplace, search for the functionality that they need, drag selected components into their shopping cart and push a button that will create a custom web application in their AWS account. This is similar to Lego Store, where customers buy lego pieces to build customized solutions at their will or pick from existing pre-packaged offers.

### Building a Sample Application

In this post, we leverage open source software, while maintaining compliance with enterprise requirements. The sample application is a simple task management application, aka todo app, inspired by [www.todomvc.com](http://www.todomvc.com/) and accessible at [todo.deep.mg](http://todo.deep.mg/). We will walk through the codebase and show how to build and deploy it as a scalable, yet serverless, custom web application.

<div class="img-post-left">
    <img src="/images/blog/2016-02-12/serverless.png" alt="serverless microservices" />
    <div class="center img-description">Serverless microservices at core of www.deep.mg</div>
</div>

### Architecture

The architecture that we have been using for over six months now can be summarized as follows:

- Security: [AWS IAM](https://aws.amazon.com/iam/) & [Amazon Cognito](https://aws.amazon.com/cognito/)
- Frontend: [Amazon S3](https://aws.amazon.com/s3/) & [Amazon CloudFront](https://aws.amazon.com/cloudfront/)
- Backend: [AWS Lambda](https://aws.amazon.com/lambda/) & [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
- Database: [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), [Amazon SQS](https://aws.amazon.com/sqs/) & [Amazon ElastiCache](https://aws.amazon.com/elasticache/)

The backbone of our approach is known as serverless microservices. We use AWS Lambda as our core computing service. Security by design is enforced by AWS IAM and we cache as much as possible, in every layer, to improve the performance and reduce the costs of running the web application.

Amazon S3 is only capable of serving static assets so we must rely on browser-based JavaScript to provide dynamic functionality. Our team selected [AngularJS](https://angularjs.org/) as frontend framework, but you can use any other JavaScript framework that you’re most comfortable with.

We developed [DEEP Framework](https://github.com/MitocGroup/deep-framework) — a home-grown and open-source serverless web framework — and supporting [DEEP CLI](https://www.npmjs.com/package/deepify) — the development tool-chain — that has evolved through real-world use to increase our agility by:

- Streamlined local development
- Abstracted use of cloud services
- Automated allocation of infrastructure resources
- Zero devops and out-of-the-box scalability

#### So, let’s get started…

You will need the following pre-requisites:

1. AWS Account (learn how to [Create an Amazon Web Services Account](https://www.youtube.com/watch?v=WviHsoz8yHk))
2. AWS CLI (learn how to [Configure AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html))
3. Node.js (learn how to [Install Node.js](http://howtonode.org/how-to-install-nodejs))
4. DEEP CLI (execute in command line: _npm install deepify_)

Next, deploy the todo app using the DEEP CLI:

1. _deepify install https://github.com/MitocGroup/deep-microservices-todo-app.git ~/deep-todo-app_
2. _deepify server ~/deep-todo-app_
3. _deepify deploy ~/deep-todo-app_

_Note: When step 2 (deepify server) is finished, you can open in your browser [http://localhost:8000](http://localhost:8000) and enjoy the todo app running locally._

We use a [Services Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture). Every frontend interaction is powered by a backend service that talks to a data tier. The web application is a collection of web components (we call them microapplications). Every web component consists of a frontend, backend, database, security, tests and docs. And every microapplication manages the entire technology stack, starting with infrastructure services, going up to platform services and concluding with application services, everything packaged as a well-structured codebase.

_Note: Docs and tests are very important components of every microapplication, but we decided to leave them out of scope for this article._

Let’s dive into the details of every tier next…

#### Building Frontend

The structure of our frontend is concentrated into: [bootstrap.js](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Frontend/bootstrap.js), [package.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Frontend/package.json) and [js/](https://github.com/MitocGroup/deep-microservices-todo-app/tree/master/src/DeepNgToDo/Frontend/js/).

```js
/* global System */
'use strict';
'format es6';

export default function todo() {
  var deepAsset = DeepFramework.Kernel.container.get('asset');
  return System.import(deepAsset.locate('@deep.todo:js/app/angular/index.js'));
}
```
<div class="padd25px">
  <div class="center img-description">bootstrap.js — the bootstrap file used by frontend as execution’s entry point</div>
</div>

```json
{
  "private": true,
  "dependencies": {
    "todomvc-app-css": "^2.0.0",
    "todomvc-common": "^1.0.1",
    "underscore": "^1.7.0"
  }
}
```
<div class="padd25px">
  <div class="center img-description">package.json — the metadata file used by deepify to resolve dependencies and automate the deployment</div>
</div>

```js

js/
  app/
    angular/
      controllers/
        DeepTodoController.js
        index.js
      directives/
        index.js
        taskEscape.js
        taskFocus.js
      module/
        index.js
        ng-config.js
        ng-module.js
        ng-routes.js
      services/
        DeepTodoService.js
        index.js
      views/
        layout.html
        todo.html
      index.js
      name.js
```
<div class="padd25px">
  <div class="center img-description">js/ — the folder that contains application code / AngularJS in our case</div>
</div>

As was mentioned earlier in this post, this todo app was inspired by [www.todomvc.com](http://www.todomvc.com/). In practice, it means that we took [the sample code from GitHub](https://github.com/tastejs/todomvc/tree/master/examples/angularjs) and [ported using Hello World as reference](https://github.com/MitocGroup/deep-microservices-helloworld). Reusing code allows us to be both consistent and fast.

Microservices architecture can be challenging sometimes. We found very useful the process of building a feature or a service first, and then break it down into microservices. Using this approach on todo app helped us take the code as it was, replace [AngularJS](https://angularjs.org/) and [AngularUI Router](https://github.com/angular-ui/ui-router) modules with [DEEP Microservices Root AngularJS](https://github.com/MitocGroup/deep-microservices-root-angularjs), and transform the storage service using resource library from DEEP Framework.

#### Building Backend

The structure of our backend is reduced to: [resources.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Backend/resources.json) and [src/](https://github.com/MitocGroup/deep-microservices-todo-app/tree/master/src/DeepNgToDo/Backend/src/).

```json

{
  "task": {
    "create": {
      "description": "Lambda that creates todo task",
      "type": "lambda",
      "methods": ["POST"],
      "source": "src/Task/Create"
    },
    "retrieve": {
      "description": "Lambda that retrieves todo task",
      "type": "lambda",
      "methods": ["GET"],
      "source": "src/Task/Retrieve"
    },
    "delete": {
      "description": "Lambda that deletes todo task",
      "type": "lambda",
      "methods": ["DELETE"],
      "source": "src/Task/Delete"
    },
    "update": {
      "description": "Lambda that updates todo task",
      "type": "lambda",
      "methods": ["PUT"],
      "source": "src/Task/Update"
    }
  }
}
```
<div class="padd25px">
  <div class="center img-description">resources.json — the resources file used by deepify to map and deploy each microservice’s codebase</div>
</div>

```js

src/
  Task/
    Create/
      Handler.es6
      bootstrap.es6
      package.json
    Delete/
      Handler.es6
      bootstrap.es6
      package.json
    Retrieve/
      Handler.es6
      bootstrap.es6
      package.json
    Update/
      Handler.es6
      bootstrap.es6
      package.json
```
<div class="padd25px">
  <div class="center img-description">src/ — the folder that contains microservices code / Node.js in our case</div>
</div>

When the UI and UX were defined, building the web services to support this frontend were intuitively easy. We are using RESTful APIs that provide CRUD (aka Create-Retrieve-Update-Delete) operations for each logically independent entity. In our case the entity is the todo task, and our todo app is supposed to offer functionality to create tasks, retrieve them, update or delete.

Each web service we use is very small, completely independent, highly decoupled, focused on context bounded one task, communicating through language-agnostic API. This is the very definition of a microservice, which we adopted by choice and by necessity. And this is where AWS Lambda excels!

Next, we will describe the structure of the “Create Todo” microservice that we deploy on AWS Lambda (the other microservices in this todo app are structured pretty much the same): [bootstrap.es6](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Backend/src/Todo/Create/bootstrap.es6), [package.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Backend/src/Todo/Create/package.json) and [Handler.es6](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Backend/src/Todo/Create/Handler.es6).

```

'use strict';

import DeepFramework from 'deep-framework';
import Handler from './Handler';

export default DeepFramework.LambdaHandler(Handler);
```
<div class="padd25px">
  <div class="center img-description">bootstrap.es6 — the bootstrap file used by backend as execution’s entry point</div>
</div>

```json
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
  <div class="center img-description">package.json — the metadata file used by deepify to resolve dependencies and automate the deployment</div>
</div>

```

'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  constructor(...args) {
    super(...args);
  }

  handle(request) {
    let TodoModel = this.kernel.get('db').get('Todo');
    TodoModel.createItem(request.data, (err, todo) => {
      if (err) {
        throw new DeepFramework.Core.Exception.DatabaseOperationException(err);
      }
      return this.createResponse(todo.get()).send();
    });
  }
}
```
<div class="padd25px">
  <div class="center img-description">Handler.es6 — the actual microservice that creates the record in the Todo table</div>
</div>

#### Building Database

The structure of our database model is trivial, just one file: [Todo.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/Data/Models/Todo.json).

```json
{
  "Title": "string",
  "Completed": "boolean"
}
```
<div class="padd25px">
  <div class="center img-description">Todo.json — the schema file that defines the table name and the primary key / everything else is optional</div>
</div>

Since we’re using a NoSQL database like Amazon DynamoDB, the only piece of information that the database library from DEEP Framework cares about is the table name and the primary key. Everything else is handled by the library itself, as long as it’s in json format.

#### Enforcing Security

The beauty of cloud-native approach is that security comes by design. When we deploy todo app, _deepify_ automatically identifies the web services involved in the process and creates corresponding security roles. On backend and database tiers these roles are transposed into AWS IAM roles, while on frontend tier we automatically compile them and expose in the UI as Access Control Lists (also known as ACLs). Let’s see some examples:

```json
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
  <div class="center img-description">DEEP role to allow Task Create execution / deep.todo — microapplication ID</div>
</div>

```json
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
  <div class="center img-description">IAM role to allow Lambda invocation / 123456789000 — AWS account number / abcd1234 — deepify deploy ID</div>
</div>

#### Putting Everything Together

Now that we’re done with frontend, backend, database and security, it’s time to glue everything together and put all web components into action:

```js
DeepTodo/
  Backend/
  Data/
  Docs/
  Frontend/
  Tests/
  deepkg.json
  hook.init.js
  parameters.json
```
<div class="padd25px">
  <div class="center img-description">DeepNgTodo — the structure of our todo app</div>
</div>

There are two more components in the root path of the microapplication that are critical: [deepkg.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/deepkg.json) and [parameters.json](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/src/DeepNgToDo/parameters.json). Similar to Node Package Manager (also know as _npm_), our command line tool DEEP CLI (also known as _deepify_) is looking for metadata (in this case — deepkg.json) and configuration (in this case — parameters.json) files. Additionally, _deepify_ can be enriched with hooks (in this case — hook.init.js) that allow flexibility and customization of the deployment process:

```json
{
  "identifier": "deep.todo",
  "name": "DeepTodo",
  "description": "DeepTodo Microapplication",
  "version": "0.0.1",
  "propertyRoot": false,
  "author": {
    "name": "Mitoc Group",
    "email": "hello@mitocgroup.com",
    "website": "http://www.mitocgroup.com"
  },
  "contributors": [
    {
      "name": "DEEP Team",
      "email": "hello@deep.mg",
      "website": "https://www.deep.mg"
    }
  ],
  "frontendEngine": ["angular"],
  "dependencies": {
  }
}
```
<div class="padd25px">
  <div class="center img-description">deepkg.json — the metadata file used by deepify to resolve dependencies and automate the deployment</div>
</div>

```json
{
  "frontend": {},
  "backend": {}
}
```
<div class="padd25px">
  <div class="center img-description">parameters.json — the parameters file that allows configuration and customization of microapplications</div>
</div>

```js
'use strict';

var exports = module.exports = function(callback) {
  var exec = require("child_process").exec;
  var path = require('path');
  var source = path.join(__dirname, 'Frontend/learn.json');
  var dist = path.join(__dirname, '../DeepNgRoot/Frontend');

  exec('cp ' + source + ' ' + dist, function(error, stdout, stderr) {
    if (error) {
      console.error('Error while copying learn.json', error);
      callback();
      return;
    }
    console.log('learn.json was successfully copied into DeepNgRoot');
    callback();
  })
};
```
<div class="padd25px">
  <div class="center img-description">hook.init.js — the hook file that executes at deploy init / copies learn.json file into root microapplication</div>
</div>

Hopefully the deployment execution that was described in _Getting Started_ section is done by now. If everything went well, you will see 2 URLs in the last rows of the terminal’s output window: S3 Website Endpoint and CloudFront Distribution. Open in the browser any of the URLs and you’ll see the todo app running in your own AWS account.

_Note: The distribution takes up to 20 minutes to provision, therefore don’t worry if it returns an HTTP error in the first couple of minutes._

Below video playlist summarizes the steps that we’ve walked you through:

<div class="iframe-container">
  <iframe src="https://www.youtube.com/embed/ghZNn5Gjv90?list=PLPGfD-tGOl7uNDXo_eMN1odMZflYVu2n9" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Scalability Benchmarking

Even though SPAs (aka Single-Page Applications) are [challenging to monitor and benchmark](http://www.soasta.com/blog/angularjs-real-user-monitoring-single-page-applications), we have load tested the todo app in order to associate some numbers to how big it can scale using out-of-the-box configurations. We found that standard setup gives us acceptable response time (within 2 seconds) for up to 10,000 concurrent users per second, at “my Starbucks coffee costs more” price tag:

Concurrency (in users/sec) | Capacity Peak (in reads/sec) | Average Response (in ms) | Total Requests (in 1min) | Average Cost (in $/min)
---------------------------|------------------------------|--------------------------|--------------------------|------------------------
100 | 14 | 529 | 5,984 | $0.000013
1,000 | 18 | 1,003 | 59,446 | $0.000141
5,000 | 12 | 1,724 | 219,027 | $0.000825
10,000 | 17 | 2,152 | 274,518 | $0.001898

_Note: These numbers can be improved with additional complexity and features that are beyond the scope of this article_

### Key Takeaways

1. The sample web application described in this article is a simple example of how we are building and deploying enterprise software using serverless microservices on AWS
2. [DEEP Todo App](https://github.com/MitocGroup/deep-microservices-todo-app) is powered by DEEP Framework. It consists of 1 microapplication that interacts with 6 microservices and is resolving another microapplication as dependency
3. [DEEP Marketplace](https://www.deep.mg/) is powered by DEEP Framework. It consists of 12 microapplications that interacts with 64 microservices and is resolving several layers of dependencies across multiple microapplications
4. [DEEP Framework](https://github.com/MitocGroup/deep-framework) is a serverless web framework that abstracts web apps and web services from specific cloud services, enabling developers build cloud-native applications or platforms using microservices architecture
5. Backend’s resources are implemented in Node.js. AWS Lambda supports also Java and Python, but our process is not able yet to use them streamlined because _deepify_ uses only _npm_, and doesn’t support _mvn_ or _pip_ yet
6. Frontend’s structure is designed to allow developers write code using any JavaScript framework they are comfortable with. More than that, it is possible to have multiple implementations of the same UI and UX using different Javascript frameworks and storing in the same codebase. For example:

- _js/app/angular — implementation of todo app using AngularJS_
- _js/app/react — implementation of todo app using React_
- _js/app/backbone — implementation of todo app using Backbone.js_

### Closing Thoughts

In this post, we’ve shown you how to build and deploy scalable web apps worry-free. We walked through the process of building and deploying frontend, backend, database and security of scalable web applications. You can fork the [sample code repository](https://github.com/MitocGroup/deep-microservices-todo-app) as a starting point for your own custom web application powered by serverless microservices.

And if you have questions or suggestions, please don't hesitate to contact us.

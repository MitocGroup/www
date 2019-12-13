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
Tue, 11 August 2015 12:20:55 -0400

# Thumbnail
/images/blog/2015-08-11/whyCI.png

# Title
DEEP Management's Continuous Integration with Travis CI and Coveralls

# Intro

---

<div class="padd25px">
    <img src="/images/blog/2015-08-11/whyCI.png" alt="Why CI?" />
</div>

[DEEP Management](https://www.deep.mg/) offers functionality to help automate and streamline the management of digital assets. This process in software development vertical is known as [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration). According to wiki:

>_**Continuous Integration** (CI) is the practice, in software engineering, of merging all developer working copies with a shared mainline several times a day._

From the very first days of DEEP Management, we've been thinking and working to add continuous integration process into the core of our platform. We believe that digital assets can be managed similar to software code and some of the best practices from software development could be easily applied to digital asset management. We're happy to share the experience and step-by-step guide of what we've implemented so far.

### Continuous Integration Requirements

We've approached continuous integration the same way we've approached development of digital asset management platform. Our requirements are (additionally to the [best practices](https://en.wikipedia.org/wiki/Continuous_integration#Best_practices) of continuous integration process):

1. High-flexibility and high-scalability — we're building this process for our internal use, and we're planning to make it an integrated solution into our platform on top of managed services;
2. Low-cost and low-maintenance — our budget is pretty tiny, so it's crucial for us not to break the bank and we want to figure out the best solution while working hands on, so our customers can reuse it;
3. Low barrier of entry — if there is a market leader in open source community, we'd definitely want to adopt something that is already widely used.

In above context, the choice was pretty simple: [Travis CI](https://travis-ci.com/). According to wiki:

>_**Travis CI** is an open-source hosted, distributed continuous integration service used to build and test projects hosted at [GitHub](https://github.com/)._

### Continuous Integration Implementation

Our technology stack is fully on Javascript, so obviously we've started with official documentation page for [Javascript (with Node.js)](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/). Unfortunately, it doesn't cover all our needs, so we've expended our research and ended up following Valeri Karpov's blog post: [Building Better npm Modules with Travis and Coveralls](https://strongloop.com/strongblog/npm-modules-travis-coveralls/).

To get started with Travis CI for Node.js, just simply create .travis.yaml in the root of your GitHub project that looks like this:

```
language: node_js
sudo: false
node_js:
  - '0.12'
  - '0.11'
  - '0.10'
```

Travis CI for Node.js uses by default [npm](https://www.npmjs.com/package/npm) (Node Package Manager) and [nvm](https://www.npmjs.com/package/nvm) (Node Version Manager). To use it with default settings, just add into your _package.json_ related lines to manage the triggering of _npm install_ (line 10 below) and _npm test_ (line 11 below):

```json
{
  "name": "deep management",
  "description": "deep - digital enterprise end-to-end platform",
  "version": "0.0.1",
  "author": {
    "name": "Mitoc Group",
    "email": "hello@mitocgroup.com"
  },
  "license": "MIT",
  "private": true,
  "scripts": {
    ...
    "install": "node ./bin/www &",
    "test": "./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha -- -R spec ./test/*",
    "test-mocha": "./node_modules/mocha/bin/mocha ./test/*",
    "coveralls": "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
  },
  "dependencies": {
    ...
    "coveralls": "~2.11.3",
    "istanbul": "~0.3.17",
    "mocha": "~2.2.5"
  }
}
```

There are couple of more optimizations that we've added, including repository branches restrictions, caching directories and code testing coverage library [Coveralls](https://www.npmjs.com/package/coveralls) (line 13 above and line 15 below):

```
branches:
  only:
    - master
    - stage
    - test
    - dev

cache:
  directories:
    - node_modules
    - bower_components
    - docs/bower_components

after_success:
  - npm run coveralls
```

### The Benefits of Using Travis CI and GitHub

At the time of writing this article, Travis CI is fully integrated and functional only with GitHub repositories. Even the first step in the [Getting Started Guide](http://docs.travis-ci.com/user/getting-started/) is enforcing it:

1. [Sign in to Travis CI](https://travis-ci.org/auth) with your GitHub account, accepting the GitHub [access permissions confirmation](http://docs.travis-ci.com/user/github-oauth-scopes).

<div class="padd25px">
    <img src="/images/blog/2015-08-11/wantTravis.png" alt="Want to try Travis?" />
</div>

This native integration with GitHub allows low barrier of entry, low-cost and low-maintenance, as well as high-flexibility and high-scalability, perfectly fitting into our additional requirements. If the code is stored on GitHub's public repositories, you can benefit of Travis CI for free. Otherwise you'll need to purchase one of their [monthly plans](https://travis-ci.com/plans) (picture above).

But the biggest benefit out of the box is transparency and professionalism. And as the owners of the code, our goal is to inspire trust and example to other developers who will be building their solutions on top of existing ones. That being said, we're proud to have badges in our _README.md_ file in any GitHub repository:

<div class="padd25px">
    <img src="/images/blog/2015-08-11/icons.png" alt="icons" />
</div>

And here below is the source code of the above badges:

```
[![Build Status](https://travis-ci.org/MitocGroup/mitocgroup.github.io.svg?branch=master)](https://travis-ci.org/MitocGroup/mitocgroup.github.io)
[![Dependencies Status](https://david-dm.org/MitocGroup/mitocgroup.github.io.svg?branch=master)](https://david-dm.org/MitocGroup/mitocgroup.github.io)
[![Coverage Status](https://coveralls.io/repos/MitocGroup/mitocgroup.github.io/badge.svg)](https://coveralls.io/r/MitocGroup/mitocgroup.github.io)
```

### Conclusion

To summarize, in just a couple of simple steps we've setup fully managed, low-cost and low-maintenance continuous integration process that requires zero servers management. These efforts are driven by open source friendly companies and can scale to any project size. Last, but not the least, by making it easier to everybody on both business side and engineering side, anyone can build high quality code that solves problems through technology and makes the world a better place. We'd be happy to talk to you, so please [let us know your thoughts](http://www.mitocgroup.com/#contact) or just [stop by to say hello](mailto:hello@mitocgroup.com).

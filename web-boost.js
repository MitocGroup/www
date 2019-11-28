'use strict'

const path = require('path')
const fs = require('fs')
const postsContent = fs.readFileSync('static/json/posts.json')
const postsListObject = JSON.parse(postsContent)

const defaultVariables = {
  title: 'Mitoc Group',
  description:
    'Mitoc Group is a technology company focusing on automation using cloud native services. Our track record includes helping private equity portfolio companies migrate to public clouds, as well as establish devops and dataops processes using cloud native services and industry best practices. We deliver automations and business results in weeks instead of months.',
  author: 'https://twitter.com/@eistrati',
  publisher: 'MitocGroup.com',
  company: 'Mitoc Group Inc.',
  address: '2 University Plaza Suite 100',
  city: 'Hackensack',
  state: 'NJ',
  zip: '07601',
  year: '2014',
  phone: '(+1) 801 810 8186',
  email: 'hello@mitocgroup.com',
  url: 'https://www.mitocgroup.com',
  image: 'https://www.mitocgroup.com/images/head.png',
  logo: 'https://www.mitocgroup.com/images/v2/logos/mitoc.svg',
  fb_type: 'website',
  fb_brand: 'MitocGroup',
  // fb_app_id: '',
  tw_type: 'summary',
  tw_handle: '@MitocGroup',
  image_tw: 'https://www.mitocgroup.com/images/cover-tw.png',
  image_fb: 'https://www.mitocgroup.com/images/cover-fb.png'
}

const commonScripts = [
  'js/libs/jquery.min.js',
  'js/libs/jquery-mailchimp.min.js',
  'js/libs/jquery-popup.min.js',
  'js/libs/lazysizes.min.js',
  'js/modal-effects.js',
  'js/main.js'
]

const commonStyles = [
  'styles/libs/materialdesignicons.min.css',
  'styles/variables.scss',
  'styles/fonts.scss',
  'styles/base.scss',
  'styles/main.scss',
  'styles/mixins.scss',
  'styles/responsive.scss'
]

const indexAssets = {
  'js/index.min.js': [...commonScripts, 'js/libs/slick.min.js', 'js/carousel.js'],
  'css/index.min.css': [...commonStyles, 'styles/libs/slick.min.css', 'styles/libs/slick-theme.min.css']
}

const commonAssets = {
  'js/common.min.js': [...commonScripts, 'js/scroll.js'],
  'css/common.min.css': commonStyles
}

const servicesAssets = {
  'js/services.min.js': commonScripts,
  'css/services.min.css': [...commonStyles, 'styles/services.scss']
}

const partnersAssets = {
  'js/partners.min.js': commonScripts,
  'css/partners.min.css': [...commonStyles, 'styles/partners.scss']
}

const adtechmediaAssets = {
  'js/adtechmedia.min.js': ['js/libs/bodymovin.min.js', 'js/animation.js'],
  'js/common.min.js': commonScripts,
  'css/common.min.css': commonStyles
}

const aboutAssets = {
  'js/about.min.js': commonScripts,
  'css/about.min.css': [...commonStyles, 'styles/about.scss']
}

const blogAssets = {
  'js/blog.min.js': [...commonScripts, 'js/libs/highlight.pack.min.js', 'js/blog.js'],
  'css/blog.min.css': [...commonStyles, 'styles/libs/github.min.css', 'styles/blog.scss', 'styles/post.scss']
}

const contactAssets = {
  'js/contact.min.js': commonScripts,
  'css/contact.min.css': [...commonStyles, 'styles/contact.scss']
}

let routes = {
  '/': {
    view: 'index.twig',
    vars: {
      ...defaultVariables,
      title: defaultVariables.title + ' | Cloud Native Automation in Private Equity',
      href: defaultVariables.url
    },
    assets: indexAssets
  },
  '/services/': {
    view: 'services/index.twig',
    vars: {
      ...defaultVariables,
      title: 'Professional Services | ' + defaultVariables.title,
      href: defaultVariables.url + '/services/'
    },
    assets: servicesAssets
  },
  '/services/automation-infrastructure/': {
    view: 'services/automation-infrastructure.twig',
    vars: {
      ...defaultVariables,
      title: 'Automation of Infrastructure | Professional Services | ' + defaultVariables.title,
      href: defaultVariables.url + '/services/automation-infrastructure/'
    },
    assets: servicesAssets
  },
  '/services/automation-data/': {
    view: 'services/automation-data.twig',
    vars: {
      ...defaultVariables,
      title: 'Automation of Data | Professional Services | ' + defaultVariables.title,
      href: defaultVariables.url + '/services/automation-data/'
    },
    assets: servicesAssets
  },
  '/services/automation-serverless/': {
    view: 'services/automation-serverless.twig',
    vars: {
      ...defaultVariables,
      title: 'Automation of Serverless | Professional Services | ' + defaultVariables.title,
      href: defaultVariables.url + '/services/automation-serverless/'
    },
    assets: servicesAssets
  },
  '/partners/': {
    view: 'partners/index.twig',
    vars: {
      ...defaultVariables,
      title: 'Partners Program | ' + defaultVariables.title,
      href: defaultVariables.url + '/partners/'
    },
    assets: partnersAssets
  },
  '/partners/aws/': {
    view: 'partners/aws.twig',
    vars: {
      ...defaultVariables,
      title: 'Amazon Web Services | Partners Program | ' + defaultVariables.title,
      href: defaultVariables.url + '/partners/aws/'
    },
    assets: partnersAssets
  },
  '/partners/google/': {
    view: 'partners/google.twig',
    vars: {
      ...defaultVariables,
      title: 'Google Cloud Platform | Partners Program | ' + defaultVariables.title,
      href: defaultVariables.url + '/partners/google/'
    },
    assets: partnersAssets
  },
  '/partners/2ndwatch/': {
    view: 'partners/2ndwatch.twig',
    vars: {
      ...defaultVariables,
      title: '2nd Watch | Partners Program | ' + defaultVariables.title,
      href: defaultVariables.url + '/partners/2ndwatch/'
    },
    assets: partnersAssets
  },
  '/partners/404moldova/': {
    view: 'partners/404moldova.twig',
    vars: {
      ...defaultVariables,
      title: '404 Moldova | Partners Program | ' + defaultVariables.title,
      href: defaultVariables.url + '/partners/404moldova/'
    },
    assets: partnersAssets
  },
  '/case-studies/': {
    view: 'case-studies/index.twig',
    vars: {
      ...defaultVariables,
      title: 'Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/'
    },
    assets: commonAssets
  },
  '/case-studies/broadcasting-conglomerate/': {
    view: 'case-studies/broadcasting-conglomerate.twig',
    vars: {
      ...defaultVariables,
      title: 'Major Broadcasting Conglomerate | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/broadcasting-conglomerate/'
    },
    assets: commonAssets
  },
  '/case-studies/insurance-company/': {
    view: 'case-studies/insurance-company.twig',
    vars: {
      ...defaultVariables,
      title: 'Major Insurance Company | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/insurance-company/'
    },
    assets: commonAssets
  },
  '/case-studies/analytics-company/': {
    view: 'case-studies/analytics-company.twig',
    vars: {
      ...defaultVariables,
      title: 'Major Content Analytics Company | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/analytics-company/'
    },
    assets: commonAssets
  },
  '/case-studies/publishing-conglomerate/': {
    view: 'case-studies/publishing-conglomerate.twig',
    vars: {
      ...defaultVariables,
      title: 'Major Publishing Conglomerate | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/publishing-conglomerate/'
    },
    assets: commonAssets
  },
  '/case-studies/entertainment-company/': {
    view: 'case-studies/entertainment-company.twig',
    vars: {
      ...defaultVariables,
      title: 'Major Media and Entertainment Company | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/entertainment-company/'
    },
    assets: commonAssets
  },
  '/case-studies/terrahub/': {
    view: 'case-studies/terrahub.twig',
    vars: {
      ...defaultVariables,
      title: 'TerraHub - Terraform Automation | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/terrahub/'
    },
    assets: commonAssets
  },
  '/case-studies/adtechmedia/': {
    view: 'case-studies/adtechmedia.twig',
    vars: {
      ...defaultVariables,
      title: 'AdTechMedia | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/adtechmedia/'
    },
    assets: adtechmediaAssets
  },
  '/case-studies/manning/': {
    view: 'case-studies/manning.twig',
    vars: {
      ...defaultVariables,
      title: 'Manning Publications | Case Studies | ' + defaultVariables.title,
      href: defaultVariables.url + '/case-studies/manning/'
    },
    assets: commonAssets
  },
  '/about/': {
    view: 'about/index.twig',
    vars: {
      ...defaultVariables,
      title: 'About Us | ' + defaultVariables.title,
      href: defaultVariables.url + '/about/'
    },
    assets: aboutAssets
  },
  '/about/team/': {
    view: 'about/team.twig',
    vars: {
      ...defaultVariables,
      title: 'Our Team | About Us | ' + defaultVariables.title,
      href: defaultVariables.url + '/about/team/'
    },
    assets: aboutAssets
  },
  '/blog/': {
    view: 'blog/index.twig',
    vars: {
      ...defaultVariables,
      postsListObject,
      title: 'Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/blog/',
      author: 'https://twitter.com/@eistrati',
      href: '/blog/',
      image: '/images/blog/2018-08-12/dashboard.png',
      description:
        'TerraHub ecosystem includes terraform automation and orchestration tool called TerraHub CLI, data and logs management layer called TerraHub API and enterprise friendly GUI to show realtime terraform executions called TerraHub Console.',
      publisher: 'https://www.facebook.com/TerraHubCorp',
      timestamp: '2018-04-01T12:34:56.789Z',
      fb_brand: 'TerraHub',
      fb_type: 'website',
      tw_handle: '@TerraHubCorp',
      tw_type: 'summary_large_image',
      // blogs: [
      //   {
      //     featured: 1,
      //     date: 'June 17th, 2019',
      //     image: '/images/blog/2019-06-17/aws-landing-zone.png',
      //     href: '/blog/introducing-programmatic-aws-landing-zone-as-terraform-module/',
      //     title: 'Introducing Programmatic AWS Landing Zone as Terraform Module',
      //     description:
      //       'AWS Landing Zone is a solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices.'
      //   },
      //   {
      //     featured: 4,
      //     date: 'October 19th, 2018',
      //     image: '/images/blog/2018-10-19/build-code-containers-python.png',
      //     href: '/blog/terraform-for-serverless-series-enhanced-management-of-aws-fargate-tasks/',
      //     title: 'Terraform for Serverless Series: Enhanced Management of AWS Fargate Tasks',
      //     description:
      //       'According to official website AWS Fargate is a compute engine for Amazon ECS that allows you to run containers without having to manage servers or clusters. In this article I will provide some magic around how to build terraform configurations that provision and deploy serverless containers.'
      //   },
      //   {
      //     featured: 0,
      //     date: 'September 28th, 2018',
      //     image: '/images/blog/2018-09-28/build-code-terraform-bash.png',
      //     href: '/blog/terraform-for-serverless-series-enhanced-management-of-amazon-s3-websites/',
      //     title: 'Terraform for Serverless Series: Enhanced Management of Amazon S3 Websites',
      //     description:
      //       'Last week I started working on a new series of stories focused on terraform for serverless. Today I would like to double down on this approach and describe in details how our team provisions and deploys Amazon S3 with website hosting feature for static web pages or single page applications.'
      //   },
      //   {
      //     featured: 0,
      //     date: 'September 19th, 2018',
      //     image: '/images/blog/2018-09-19/build-code-nodejs-javascript.png',
      //     href: '/blog/terraform-for-serverless-series-enhanced-management-of-aws-lambda-functions/',
      //     title: 'Terraform for Serverless Series: Enhanced Management of AWS Lambda Functions',
      //     description:
      //       "I quickly became fascinated by terraform's simplicity and ease of use. As an engineer, you can tell when a tool just works"
      //   },
      //   {
      //     featured: 0,
      //     date: 'September 10th, 2018',
      //     image: '/images/blog/2018-09-10/serverless_computing.png',
      //     href: '/blog/terrahub-io-serverless-computing-london/',
      //     title: 'TerraHub.io - Serverless Computing London: Time To Make Terraform Serverless Friendly',
      //     description:
      //       'I would like to invite you to argue with me (or against me) that it is time to make terraform serverless friendly'
      //   },
      //   {
      //     featured: 0,
      //     date: 'September 4th, 2018',
      //     image: '/images/blog/2018-09-04/terrahub-cli.png',
      //     href: '/blog/terrahub-cli-is-open-source-and-free-forever/',
      //     title: 'TerraHub CLI is Open Source and Free Forever',
      //     description:
      //       'TerraHub is a terraform centric devops tool that simplifies provisioning and management at scale of cloud resources and cloud services across multiple cloud accounts'
      //   },
      //   {
      //     featured: 3,
      //     date: 'August 27th, 2018',
      //     image: '/images/blog/2018-08-27/terrahub-io-serverless-architecture-in-action.png',
      //     href: '/blog/terrahub-io-serverless-architecture-in-action/',
      //     title: 'TerraHub.io Serverless Architecture in Action',
      //     description:
      //       'When we started working on TerraHub CLI, our initial goal was to automate terraform execution and allow customer to trigger runs in self-service mode, as part of their existing GitHub and Jenkins pipelines'
      //   },
      //   {
      //     featured: 2,
      //     date: 'August 12th, 2018',
      //     image: '/images/blog/2018-08-12/dashboard.png',
      //     href: '/blog/introducing-terrahub-io-devops-hub-for-terraform/',
      //     title: 'Introducing TerraHub.io — DevOps Hub for Terraform',
      //     description:
      //       'Over the last couple of months we have been working with several customers to reduce the development burden of terraform configuration and simplify the operational complexity of terraform automated workflows'
      //   }
      // ]
    },
    assets: blogAssets
  },
  '/contact/': {
    view: 'contact.twig',
    vars: {
      ...defaultVariables,
      title: 'Contact Us | ' + defaultVariables.title,
      href: defaultVariables.url + '/contact/'
    },
    assets: contactAssets
  },
  '/terms/': {
    view: 'terms.twig',
    vars: {
      ...defaultVariables,
      title: 'Terms and Conditions | ' + defaultVariables.title,
      href: defaultVariables.url + '/terms/'
    },
    assets: commonAssets
  },
  '/privacy/': {
    view: 'privacy.twig',
    vars: {
      ...defaultVariables,
      title: 'Privacy Policy | ' + defaultVariables.title,
      href: defaultVariables.url + '/privacy/'
    },
    assets: commonAssets
  },
  '/404/': {
    view: '404.twig',
    vars: {
      ...defaultVariables,
      title: '404 Page Not Found | ' + defaultVariables.title
    },
    assets: commonAssets
  }
}

Object.keys(postsListObject).forEach(key => {
  let postPath = `/blog/${key}/`
  const { Featured, Author, AboutAuthor, PublicationDate, Title, Intro, htmlCode } = postsListObject[key]
  const event = new Date(PublicationDate);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };

  routes[postPath] = {
    view: 'blog/post.twig',
    vars: {
      ...defaultVariables,
      Featured,
      Author,
      AboutAuthor,
      PublicationDate: event.toLocaleDateString('en-EN', options),
      Title,
      Intro,
      htmlCode
    }
  }
});

module.exports = {
  server: {
    port: 8000,
    ignorePatterns: ['.idea', '.git', 'bin', 'backend', 'build']
  },
  routes: routes
}

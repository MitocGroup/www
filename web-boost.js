'use strict';

const fs = require('fs');
const firstN = (obj, n) => Object.keys(obj).slice(0, n).reduce((memo, current) => { memo[current] = obj[current]; return memo; }, {});

const nrVisiblePosts = 6;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const posts = JSON.parse(fs.readFileSync('./static/json/posts.json'));
const postsKeys = Object.keys(posts);

const authors = {
  eistrati: {
    author: 'Eugene Istrati',
    bio: 'Proud Father. Lucky Husband. Open Source Contributor.' +
      ' DevOps | Automation | Serverless @MitocGroup. Former @AWScloud and @HearstCorp.',
    avatar: 'https://www.mitocgroup.com/images/blog/author/eistrati.png',
    profile: 'https://www.mitocgroup.com/author/eistrati/',
    twitter: 'https://twitter.com/intent/user?screen_name=eistrati'
  },
  irca20: {
    author: 'Irina Popov',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
      ' incididunt ut labore et dolore magna aliqua. Platea dictumst vestibulum rhoncus est pellentesque elit.',
    avatar: 'https://www.mitocgroup.com/images/blog/author/irca20.png',
    profile: 'https://www.mitocgroup.com/author/irca20/',
    twitter: 'https://twitter.com/intent/user?screen_name=irca20'
  },
  mitocgroup: {
    author: 'Mitoc Group',
    bio: 'technology company focusing on automation using cloud native services' +
      ' with proven track record helping clients migrate to the cloud, as well as' +
      ' establish devops and dataops processes',
    avatar: 'https://www.mitocgroup.com/images/blog/author/mitoc.png',
    profile: 'https://www.mitocgroup.com/author/mitocgroup/',
    twitter: 'https://twitter.com/intent/user?screen_name=mitocgroup'
  }
};

const defaultVariables = {
  title: 'Mitoc Group',
  description:
    'Mitoc Group is a technology company focusing on automation using cloud native services.' +
    ' Our track record includes helping private equity portfolio companies migrate to public clouds,' +
    ' as well as establish devops and dataops processes using cloud native services and industry' +
    ' best practices. We deliver automations and business results in weeks instead of months.',
  authors,
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
  // fb_app_id: '',
  fb_type: 'website',
  fb_brand: 'MitocGroup',
  tw_type: 'summary',
  tw_handle: '@MitocGroup',
  image_tw: 'https://www.mitocgroup.com/images/cover-tw.png',
  image_fb: 'https://www.mitocgroup.com/images/cover-fb.png'
};

const commonScripts = [
  'js/libs/jquery.min.js',
  'js/libs/jquery-mailchimp.min.js',
  'js/libs/jquery-popup.min.js',
  'js/libs/lazysizes.min.js',
  'js/modal-effects.js',
  'js/main.js',
  'js/mailchimp.js'
];

const commonStyles = [
  'styles/libs/font-awesome.min.css',
  'styles/libs/materialdesignicons.min.css',
  'styles/variables.scss',
  'styles/fonts.scss',
  'styles/base.scss',
  'styles/main.scss',
  'styles/mixins.scss',
  'styles/responsive.scss'
];

const indexAssets = {
  'js/index.min.js': [...commonScripts, 'js/libs/slick.min.js', 'js/carousel.js'],
  'css/index.min.css': [...commonStyles, 'styles/libs/slick.min.css', 'styles/libs/slick-theme.min.css']
};

const commonAssets = {
  'js/common.min.js': [...commonScripts, 'js/scroll.js'],
  'css/common.min.css': commonStyles
};

const servicesAssets = {
  'js/services.min.js': commonScripts,
  'css/services.min.css': [...commonStyles, 'styles/services.scss']
};

const partnersAssets = {
  'js/partners.min.js': commonScripts,
  'css/partners.min.css': [...commonStyles, 'styles/partners.scss']
};

const adtechmediaAssets = {
  'js/adtechmedia.min.js': ['js/libs/bodymovin.min.js', 'js/animation.js'],
  'js/common.min.js': commonScripts,
  'css/common.min.css': commonStyles
};

const aboutAssets = {
  'js/about.min.js': commonScripts,
  'css/about.min.css': [...commonStyles, 'styles/about.scss']
};

const contactAssets = {
  'js/contact.min.js': commonScripts,
  'css/contact.min.css': [...commonStyles, 'styles/contact.scss']
};

const blogAssets = {
  'js/blog.min.js': [...commonScripts, 'js/libs/highlight.pack.min.js', 'js/blog.js'],
  'css/blog.min.css': [...commonStyles, 'styles/libs/github.min.css', 'styles/blog.scss', 'styles/post.scss']
};

let monthsOfTheYear = {};
const years = [];
const allPostsNameArr = [];
const latestBlogPosts = firstN(posts, 3);

postsKeys.forEach(key => {
  const year = new Date(posts[key].publicationDate).getFullYear();
  const month = new Date(posts[key].publicationDate).toLocaleString('en-EN', { month: 'long' }).toLowerCase();

  years.push(year);
  if (!monthsOfTheYear.hasOwnProperty(year)) {
    monthsOfTheYear[year] = [];
  }
  if (!monthsOfTheYear[year].includes(month)) {
    monthsOfTheYear[year].push(month);
  }
  allPostsNameArr.push(key);
});

const distinctYears = [...new Set(years)];

let routes = {
  '/': {
    view: 'index.twig',
    vars: {
      ...defaultVariables,
      title: defaultVariables.title + ' | Cloud Native Automation in Private Equity',
      href: defaultVariables.url,
      latestBlogPosts
    },
    assets: indexAssets
  },
  '/404/': {
    view: '404.twig',
    vars: {
      ...defaultVariables,
      title: '404 Page Not Found | ' + defaultVariables.title
    },
    assets: commonAssets
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
  '/contact/': {
    view: 'contact.twig',
    vars: {
      ...defaultVariables,
      title: 'Contact Us | ' + defaultVariables.title,
      href: defaultVariables.url + '/contact/'
    },
    assets: contactAssets
  },
  '/blog/': {
    view: 'blog/index.twig',
    vars: {
      ...defaultVariables,
      title: 'Blog Articles | ' + defaultVariables.title,
      description:
        'Mitoc Group is a technology company focusing on automation using cloud native services.' +
        ' Our engineers are proudly sharing here our thoughts and our experience, therefore' +
        ' please enjoy them responsibly.',
      href: defaultVariables.url + '/blog/',
      image: '/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: posts,
      nrVisiblePosts
    },
    assets: blogAssets
  },
  '/author/': {
    view: 'blog/author.twig',
    vars: {
      ...defaultVariables,
      title: 'Eugene Istrati | Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/author/eistrati/',
      image: 'https://www.mitocgroup.com/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: posts,
      author: 'eistrati'
    },
    assets: blogAssets
  },
  '/author/eistrati/': {
    view: 'blog/author.twig',
    vars: {
      ...defaultVariables,
      title: 'Eugene Istrati | Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/author/eistrati/',
      image: 'https://www.mitocgroup.com/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: posts,
      author: 'eistrati'
    },
    assets: blogAssets
  },
  '/author/mitocgroup/': {
    view: 'blog/author.twig',
    vars: {
      ...defaultVariables,
      title: 'Mitoc Group | Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/author/mitocgroup/',
      image: 'https://www.mitocgroup.com/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: {},
      author: 'mitocgroup'
    },
    assets: blogAssets
  },
  '/author/irca20/': {
    view: 'blog/author.twig',
    vars: {
      ...defaultVariables,
      title: 'Irca Popov | Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/author/irca20/',
      image: 'https://www.mitocgroup.com/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: {},
      author: 'irca20'
    },
    assets: blogAssets
  },
  '/archive/': {
    view: 'blog/archive.twig',
    vars: {
      ...defaultVariables,
      title: 'Archive Blog Articles | ' + defaultVariables.title,
      href: defaultVariables.url + '/archive/',
      image: '/images/blog/2018-08-12/dashboard.png',
      publisher: 'https://www.facebook.com/MitocGroup',
      timestamp: '2018-04-01T12:34:56.789Z',
      postsListObject: posts,
      author: 'eistrati',
      years: distinctYears
    },
    assets: blogAssets
  }
};

postsKeys.forEach(key => {
  const postPath = `/blog/${key}/`;
  const index = allPostsNameArr.indexOf(key);
  let recomendedPosts;

  if (index === 0) {
    recomendedPosts = firstN(posts, 4);
    delete recomendedPosts[allPostsNameArr[index]];
  } else if (index === allPostsNameArr.length - 1) {
    recomendedPosts = [posts[allPostsNameArr[index - 2]], posts[allPostsNameArr[index - 1]], posts[allPostsNameArr[0]]];
  } else {
    recomendedPosts = [posts[allPostsNameArr[index - 2]], posts[allPostsNameArr[index - 1]], posts[allPostsNameArr[index + 1]]];
  }

  posts[key]['image_fb'] = posts[key]['image'];
  posts[key]['image_tw'] = posts[key]['image'];

  routes[postPath] = {
    view: 'blog/post.twig',
    vars: {
      ...defaultVariables,
      ...posts[key],
      recomendedPosts,
      posts
    }
  };
});

distinctYears.forEach(year => {
  const yearPath = `/archive/${year}/`;

  monthsOfTheYear[year].forEach(month => {
    const monthPath = `/archive/${year}/${month}/`;

    routes[monthPath] = {
      view: 'blog/archive-year.twig',
      vars: {
        ...defaultVariables,
        postsListObject: posts,
        monthsOfTheYear,
        monthIndex: monthsOfTheYear[year].indexOf(month),
        months,
        year,
        month
      }
    };
  });

  routes[yearPath] = {
    view: 'blog/archive-year.twig',
    vars: {
      ...defaultVariables,
      postsListObject: posts,
      distinctYears,
      monthsOfTheYear,
      months,
      year
    }
  };
});

module.exports = {
  server: {
    port: 8000,
    ignorePatterns: ['.idea', '.git', 'bin', 'backend', 'build', 'node_modules']
  },
  routes
};

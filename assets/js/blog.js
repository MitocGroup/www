jQuery(function ($) {
  'use strict';

  hljs.initHighlightingOnLoad();
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });

});

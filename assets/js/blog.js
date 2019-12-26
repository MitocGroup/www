/* eslint-disable no-undef */
jQuery(function($) {
  'use strict';

  const showMore = $('#show-more');
  const hiddenBlock = '.post-block-hid.hidden';
  const toBeVisiblePosts = 6;

  hljs.initHighlightingOnLoad();
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $(document).ready(function() {
    if ($(hiddenBlock).length === 0) {
      showMore.attr('disabled', true);
    }
  });

  showMore.on('click', function() {
    $(hiddenBlock).each(function(index) {
      if (index === toBeVisiblePosts) return false;

      $(this).removeClass('hidden');
    });
    if ($(hiddenBlock).length === 0) showMore.attr('disabled', true);
  });
});

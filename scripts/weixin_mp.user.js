// ==UserScript==
// @name         mp.weixin 可复制
// @namespace    https://github.com/ywzhaiqi
// @version      0.1
// @description  付费文章可复制
// @author       ywzhaiqi
// @match        https://mp.weixin.qq.com/s?__biz=*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // $('[style*="user-select: none"]').css('user-select', null)
  $('.rich_media_content').css('user-select', null)
})();
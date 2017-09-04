// ==UserScript==
// @name         My Doc Helper
// @namespace    https://github.com/ywzhaiqi
// @version      0.2
// @description  开发文档网站添加中文链接
// @author       ywzhaiqi
// @match        http*://www.typescriptlang.org/docs/*
// @match        http*://laravel.com/docs/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function () {
  'use strict';

  const locationHref = location.href;

  const rules = [
    {
      host: 'typescriptlang.org',
      note: '添加中文文档链接',
      run: function () {
        let url = 'https://www.tslang.cn/docs/home.html';
        if (locationHref.includes('/docs/handbook/')) {
          url = locationHref.replace('www.typescriptlang.org', 'www.tslang.cn');
        }

        $('<li>')
          .html(`<a href="${url}" target="_blank" style="color:red;">中文</a>`)
          .appendTo('#navbar-collapse-div > ul');
      }
    },
    {
      host: 'laravel.com',
      note: '添加中文文档链接',
      run: function () {
        const url = 'https://docs.golaravel.com/docs/5.2/installation/';
        $('<li>')
          .html(`<a href="${url}" target="_blank" style="color:red;">中文文档</a>`)
          .insertBefore('.docs-wrapper .sidebar ul>li:first');
      }
    },
  ];

  const curHost = location.host;
  for (let rule of rules) {
    if (curHost.includes(rule.host)) {
      rule.run();
      break;
    }
  }
})();
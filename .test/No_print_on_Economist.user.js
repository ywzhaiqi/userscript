// ==UserScript==
// @name        No print on Economist
// @namespace   https://github.com/ywzhaiqi
// @include     http://www.economist.com/*/print
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

Object.defineProperty(window, 'print', {
    get: function() {
        return function() {}
    },
    set: function() {}
});
// ==UserScript==
// @name        youku 调整显示列数
// @namespace   https://github.com/ywzhaiqi
// @description 在 Firefox 上把优酷从2列改成3列，只适应于个人显示器尺寸。
// @include     http://*.youku.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function(){
    var fn = function(){
        var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
            ,r = 1230
            ,b = document.body
            ,classname = b.className;
        if(w < r){
            b.classList.add('yk-w970');
            b.classList.remove('yk-w1190');
        }else{
            b.classList.add('yk-w1190');
            b.classList.remove('yk-w970');
        }
    }
    window.addEventListener('resize', function(){ fn(); });

    function launch_ready(delayedNrTimes) {
        if (!document.body && delayedNrTimes < 30) {
            setTimeout(function() {
                launch_ready(delayedNrTimes + 1);
            }, 100);
            return;
        }

        fn();
    }

    launch_ready(0);

})();
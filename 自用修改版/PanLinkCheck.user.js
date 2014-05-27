// ==UserScript==
// @name        PanLinkCheck 网盘死链检查
// @namespace   http://jixun.org/
// @version     1.0.0.4
// @description 浏览网页的时候检查死链
// @include     http*://*
// @copyright   2012+, Jixun
// @run-at      document-start
// @grant       GM_xmlhttpRequest
// @note        自用修改版，2014-5-27，https://greasyfork.org/scripts/1262
// ==/UserScript==

(function () {
  var console = {
    log: false ? window.console.log.bind(window.console) : function(){},
  };

  var $$ = {
    styleAdded: false
  };
  
  // 常量定义
  var arrMarks = ['live', 'dead', 'unk', 'lock'],
      __FILE_WORKING = 0,
      __FILE_NOT_EXIST = 1,
      __FILE_UNKNOWN = 2,
      __FILE_LOCKED = 3;
  
  function parseHTML (responseText) {
    // For Firefox
    var ret = (new DOMParser()).parseFromString(responseText, "text/html");
    
    // For Chrome
    if (ret == undefined) {
      var ret = document.implementation.createHTMLDocument("");
      ret.querySelector('html').innerHTML = responseText;
    }
    return ret;
  }
  
  var addressToCheck = [
    { // 百度盘
      urlSyntax: /^(pan|yun)\.baidu\.com\/((share\/(link|init)|netdisk\/singlepublic)\?|s\/)/i,
      // checkFunc: 回调函数, 检查指定的链接内容. 4 个参数 (返回的网页内容, DOM 数据[当成 Document 来用就是], 完整链接, 链接元素)
      checkFunc: function (responseText, parsedDomContent, sFullLink, oElement) {
        var typeCode = (parsedDomContent.querySelector('p.share-frm-lbl') ? __FILE_WORKING : 			// 正常
                        (parsedDomContent.querySelector('dl.pickpw') ? __FILE_LOCKED : 				// 上锁
                         (parsedDomContent.querySelector('div#share_nofound_des') ? __FILE_NOT_EXIST :	// 不存在
                          __FILE_UNKNOWN)));															// 未知状态
        // console.log (parsedDomContent.querySelector('p.share-frm-lbl, dl.pickpw, div#share_nofound_des'));
        // 标记链接
        generalMarkLink (typeCode, oElement);
        // 告诉框架: 我已经自己处理完了
        return true;
      }
    },
    { // 360云盘（有效文件的检查未完成）
      urlSyntax: /^[^\/]*yunpan\.cn\/(?:lk|link\/data)?\/?[a-z0-9]+$/i,
      checkFunc: function(r, d, f, e) {
        var isDeadLink = function() {
            if (d.querySelector('div#linkError')) {
              return true;
            }
            var tip = d.querySelector('#doc .tip');
            if (tip) {
              return tip.textContent.indexOf('页面不存在') != -1
            }
        };

        var typeCode = (d.querySelector('strong.strong_from_name') ? __FILE_WORKING : 
                        (d.querySelector('div#extract-panel') ? __FILE_LOCKED :
                         ( isDeadLink() ? __FILE_NOT_EXIST :
                          __FILE_UNKNOWN)));
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // 快船
      urlSyntax: /^kuai\.xunlei\.com\/d(s|)\//i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('strong.strong_from_name') ? __FILE_WORKING : 
                        (d.querySelector('div.restriction_msg_y') ? __FILE_LOCKED :
                         (d.querySelector('div.z_no_result') ? __FILE_NOT_EXIST :
                          __FILE_UNKNOWN)));
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // HowFile
      urlSyntax: /^howfile\.com\/file\//i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('div#floatdiv') ? __FILE_WORKING : 
                        (d.querySelector('div.message_div') ? __FILE_NOT_EXIST :
                         __FILE_UNKNOWN));
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // Kuaipan
      urlSyntax: /^kuaipan(\.com|)\.cn\/file\/id_/i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('#errorContaier') ? __FILE_NOT_EXIST : 
                          d.querySelector ('#pwdContaier') ? __FILE_LOCKED :
                          d.querySelector ('a.download') ? __FILE_WORKING :
                        __FILE_UNKNOWN);
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // 飞速盘
      urlSyntax: /^rayfile\.com\/([^\/]+?)\/files\//i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('div.mid div.wj h1') ? __FILE_WORKING : 
                        __FILE_NOT_EXIST);
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // 115
      urlSyntax: /^115\.com\/file\//i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('.file-info') ? __FILE_WORKING : 
                         __FILE_NOT_EXIST);
        
        generalMarkLink (typeCode, e);
        return true;
      }
    },
    { // Yunfile
      urlSyntax: /^yunfile\.com\/file\//i,
      checkFunc: function (r, d, f, e) {
        var typeCode = (d.querySelector('div.downpage h2.title') ? __FILE_WORKING : 
                         __FILE_UNKNOWN);
        
        generalMarkLink (typeCode, e);
        return true;
      }
    }
  ];
  
  // 图像设定
  var pngData = [
    'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
    'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY'+
    'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy'+
    'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs'+
    'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp'+
    'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY'+
    'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ'+
    'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1'+
    '46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH'+
    'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc'+
    '04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC',
    
    'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
    'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC'+
    'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk'+
    'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE'+
    '+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29'+
    'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM'+
    '8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N'+
    'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR'+
    'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC',
    
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADD0lEQVR4XlWTzWtcZRTGf+e+985kMjNpJpkmtXUQ'+
    '0rSkIbFIKDELLUk2KiKl0E0KpZsudKEguBAXzUL/BFcu3ARBERWRoEYagpWWiJSSQD/UGGPqNCZOJmE+773ve5wJ'+
    'iuThfTiLB37P4YUjK19cIZFKYgIfEQ8RqO9v95Uf//56Mt075Ynz9nce30ulur7OdOU+TXUesWodNopoPXzxEiAB'+
    '6jwUpfjg5mtHB86/Nzz9UreGRYgamODoeNg0V39e/vKuDXcuZDK5dU8VD8W3cYiJBYxHafP+O0OTb7xr5BHN0iKE'+
    'Vdo10rIxOUbGXzi7cuvbeWxpLN2ZrcsB5F+Viw+f7ht8btbTNeLaOsnsCCbzLMn8FEH6JK5SJNr8nqGxF89U9nZn'+
    'BBDx/gdUd7eu9Q1O+KgjkT3HvZvf3Fn/6aurq4tzs+VqyvodJ9DqXyTtPnt7tUkQVMEHEGNQSTy1ubKE2hq1vSU8'+
    'oot9T55eF2vZeLh8vnd0bNLFa2h9j6Aj3YOCOsUX4yMiFIYnXrHx33iekeyRtJruIdRqyw516nAOwSCJLM1ateRs'+
    'DNoG4LUzAJr1Jh5GcZbA+DiU9fvLr5565uVJrRbxO5+gIWmy6Y4F52wbjLl28QzqhKjZoLFfBhWwFpyyXfzt/dHn'+
    'r8xm3Y4QNXC5EW4vzN3I9+bf8k2gzikyM5kBAIWZqeP09J0kCAIqu39eODV+6fNMtAG1MnHXMLe/m/us/9iJy5ls'+
    'd8NFIdYp/keLFf7T5ekkiVQXCWOomcTZfGGUeMvi9Yxy58YntwqFgUtBKuucs0Sxxargc0iCJwbPJFD1flz48M0P'+
    'PBBrVeu16lL/uWmncUgUWeqNRhtyGKDatqLOku8fmM/lC/POOQFVAHtwAzHNMKJS2adRKeEd7hfUKc46th79cp1k'+
    'TsUknSRyuvXH2nXrHHHL7eZKeZvVX3cPA5yNicIGUdTEWSunRyYYPH6ModZ0zkoUhq08ImzNer3K2x+XDv8BYjB+'+
    'gG8CRDx9cPcHNKxCsYyI0SDoQFQONljdaALwDzQll7VViYJQAAAAAElFTkSuQmCC',
    
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACM0lEQVR4nKWRT0hUURTGv3vfk4qSyJiYcIwYSYYg'+ 
    'CBdjbVzZxgiFKGldq1a2iFwlLZSMNi2KIFo7oRtjCKzZFA3l+KfSJsvqaY6ZOTPWvHnNC+8797QYzUlHgjqrez7u'+ 
    '+X3f4QD/WaKc2Nrauqu5+fgZ/15/vVIeUrOzL2OxR5FoNJr5K7Grq7vRmp7+OpuaY2t6ht9/+MiT76Z4KDGy2N5+'+ 
    '4dj6/0Zp09bW5r/U0fGEGbvHxkZHHg4O3pgYf/UAwLbq6sDBYG3tCSef70smk9/Kuvf1919OzX3m3si9x01NTZWr'+ 
    'ejgcrujtjQy8fjPJV3t6rpfOyNKmpqamoeC6GE4M3Y3FYvlVPZFIqHg8fts0DPh8e46EQiFRFsDM25VScBxncX26'+ 
    'dHoxq5khpNxhmqbcDAClFJh5w3pCSGgikOcJ0zTX9NVH5M7Fc0cbDnUa0gu8TY4MCJ37BO0C2gX4J0xT+g/U1Z1e'+ 
    'mJ9JP3+RuXK+c/gmAPxGhfbLln2VyQDIRvVhuwU6B9fNQ5CNreZ3gGwwxeH3aZ8TCJwKBoO3LMvitSxeFlDLANmA'+ 
    'tgHK4Vp/PZjy6Dx5HyAP0AJMBkASgMYfCUBLgHIAnStCKIedFSnAKACKwNoASIBJgjcFeFmAcoC2weQinS1A6GWw'+ 
    'V3RlEoCWKwmwDuAtAeoLWP8AiACSONs4DtYCrFYAWqyAygBGp7Y8W0hXCdZVABedmAWgBabmBcCiCGABK1M5YVlP'+ 
    'N976X+oXHmgjHsxZeGIAAAAASUVORK5CYII'
  ];
  
  function addMyStyle () {
    $$.styleAdded = true;
    var eStyle = document.createElement ('style');
    arrMarks.forEach (function (e, i) {
      eStyle.innerHTML += 'span.linkcheck_' + e + ' {background:transparent url(data:image/png;base64,'
      + pngData[i] + ') no-repeat 0 50%; padding-left:18px}';
    });
    document.body.appendChild (eStyle);
  }
  
  function generalMarkLink (marker, element, sAdditonalText, bTextAsHTML) {
    var sMarker, nElement = document.createElement('span');
    if (typeof(marker) == 'string'){
      sMarker = marker;
    } else {
      // 按照序号标记
      try {
        sMarker = arrMarks [marker];
      } catch (err) {
        sMarker = 'unk';
      }
    }
    if (sAdditonalText) {
      if (bTextAsHTML)
        nElement.innerHTML = sAdditonalText;
      else
        nElement.textContent = sAdditonalText;
    }
    nElement.className = 'linkcheck_' + sMarker;
    element.parentNode.insertBefore (nElement, element);
    console.log ('Marking', element, 'as', sMarker);
  }
  
  function main () {
    var links = document.querySelectorAll ('a'),
        arrLink = [];
    
    for (var i=0; i<links.length; i++) {
      if (!links[i].hasAttribute('thisLinkChecked')
          && links[i].href.substr(0, 4).toLowerCase() == 'http'
          && links[i].getAttribute ('href').trim().substr(0,1) != '#'
          && links[i].getAttribute ('href').replace(/\s/g, '') != '')
        arrLink.push(links[i]);
    }
    arrLink.forEach (function (e) {
      var bSkip = false,
          sCurLink = (e.href.match(/\:\/\/(.+)/)[1]).replace(/^www\./, '');
      
      if (e.hasAttribute('thisLinkChecked'))
        return;
      
      addressToCheck.forEach (function (o) {
        if (bSkip || !o.urlSyntax.test(sCurLink))
          return;
        
        console.log ('Checking link:', e.getAttribute ('href'));
        e.setAttribute ('thisLinkChecked', 0);
        bSkip = true;
        GM_xmlhttpRequest ({
          method: 'GET',
          url:    e.href,
          onload: function (r) {
            // 转交相应处理函数
            var ret = o.checkFunc (r.responseText, parseHTML(r.responseText),
                                   sCurLink, e);
            
            // 已经添加标记
            if (ret === true)
              return;
            
            // 标记
            generalMarkLink (ret, e);
          },
          onerror: function () {
            // 提示网页无法读取
            generalMarkLink (2, e);
          }
        })
      });
    });
  }

  
  addEventListener ('DOMContentLoaded', function () {
    // 添加样式表
    if (!$$.styleAdded)
      addMyStyle ();
    main ();

    var observer = new MutationObserver(function(mutations) {
      // console.log('1111')
      main ();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

  }, false);

})();
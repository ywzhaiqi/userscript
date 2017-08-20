// ==UserScript==
// @id             booklinkme@ywzhaiqi@gmail.com
// @name           My booklink.me 增强
// @version        2.0
// @author         ywzhaiqi@gmail.com
// @description    首页一键打开所有未读链接
// @include        *://booklink.me/*
// @include        *://m.booklink.me/*
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @connect        www.lwxs520.com
// @run-at         document-end
// @noframes
// @require https://greasyfork.org/scripts/32445-zepto-js-selector/code/Zeptojs%20+%20selector.js?version=212976
// ==/UserScript==
(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 7);
})([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
    });
    var __WEBPACK_IMPORTED_MODULE_0_zepto__ = __webpack_require__(6);
    var __WEBPACK_IMPORTED_MODULE_0_zepto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zepto__);
    var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(4);
    var __WEBPACK_IMPORTED_MODULE_2__booklinkme_css__ = __webpack_require__(1);
    __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__booklinkme_css__);
    class PcPage {
        init() {}
        addUnreadButton() {
            var appendElem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])("//td[text()='未读']")[0];
            if (!appendElem) return;
            var linkBtn = document.createElement("a");
            linkBtn.href = "javascript:void(0)";
            linkBtn.title = "一键打开所有未读链接";
            linkBtn.addEventListener("click", this._openAllUnreadLinks, false);
            var imgBtn = document.createElement("img");
            imgBtn.src = "me.png";
            imgBtn.style.maxWidth = "20px";
            linkBtn.appendChild(imgBtn);
            appendElem.appendChild(linkBtn);
            appendElem.style.width = "auto";
            console.info("新增功能：一键打开所有未读链接");
        }
        _openAllUnreadLinks(event) {
            event.preventDefault();
            var links = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
            links.forEach(function(link) {
                var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector("a");
                if (chapterLink.querySelector('font[color="800000"]')) return;
                if (__WEBPACK_IMPORTED_MODULE_1__utils__["b"]) link.click(); else GM_openInTab(link.href);
                link.parentNode.previousSibling.querySelector("font").setAttribute("color", Config.clickedColor);
                chapterLink.classList.add("mclicked");
            });
        }
    }
    class MobilePage {
        init() {
            this.setClickColor();
            this.addUnreadButton();
        }
        setClickColor() {
            const handleClick = function() {
                __WEBPACK_IMPORTED_MODULE_0_zepto___default()(this).addClass("mclicked");
            };
            const linkBlank = function() {
                __WEBPACK_IMPORTED_MODULE_0_zepto___default()(this).parent().attr("target", "_blank");
            };
            __WEBPACK_IMPORTED_MODULE_0_zepto___default()("span:contains(未读)").on("click", handleClick).each(linkBlank);
            console.info('新增功能："N未读" 链接新标签打开，打开后变色');
        }
        addUnreadButton() {
            var mainElem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])('//li[text()="主书架"]')[0];
            if (!mainElem) return;
            var unReadLinks = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])('id("m_main")/ul[1]//span[contains(text(), "未读")]');
            if (0 == unReadLinks.length) return;
            var openAllBtn = document.createElement("a");
            openAllBtn.href = "javascript:void(0)";
            openAllBtn.style.color = "red";
            openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
            var openOneLink = function() {
                var link = unReadLinks.pop().parentNode;
                link.setAttribute("target", "_blank");
                link.click();
                link.className = "mclicked";
                if (0 == unReadLinks.length) openAllBtn.parentNode.removeChild(openAllBtn); else openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
            };
            openAllBtn.addEventListener("click", function() {
                for (var i = 0; i < 4; i++) openOneLink();
            }, false);
            mainElem.appendChild(openAllBtn);
            console.info("新增功能：一键打开所有未读链接");
        }
    }
    class BookPage {
        init() {
            switch (location.pathname) {
              case "/book-1-1009272444.html":
                let newUrl = "http://www.wutuxs.com/html/7/7221/";
                this.insertToFirst(newUrl, "我的补充");
                console.info("新增：我的补充 链接");
                break;

              case "/book-10-3146622.html":
                let newIndexUrl = "http://www.lwxs520.com/books/74/74985/index.html";
                this.getAndInsertFirst(newIndexUrl);
                console.info("新增：我的补充 链接");
                break;
            }
        }
        insertToFirst(newUrl, text) {
            var firstLink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])('//font[text()="补充链接"]/..')[0];
            firstLink.insertAdjacentHTML("beforebegin", `\n        <a href="${newUrl}" target="_blank" style="margin-right: 3px;">\n            <font color="red">${text}</font>\n        </a>`);
            return firstLink;
        }
        async getAndInsertFirst(url) {
            let html = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c"])(url);
            var doc = new DOMParser().parseFromString(html, "text/html");
            if (url.includes("www.lwxs520.com")) {
                var chapters = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a"])('//div[@class="dccss"]/a', doc);
                var lastChapter = chapters[chapters.length - 1];
                this.insertToFirst(url, lastChapter.textContent);
            }
        }
    }
    function run() {
        switch (location.hostname) {
          case "booklink.me":
            new PcPage().init();
            new BookPage().init();
            break;

          case "m.booklink.me":
            new MobilePage().init();
            break;
        }
    }
    run();
}, function(module, exports) {
    (function() {
        if ("undefined" == typeof GM_addStyle) GM_addStyle = function(css) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = css;
            document.head.appendChild(style);
        };
    })();
    GM_addStyle("\n  .mclicked {\n    color: #666666 !important;\n  }");
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_exports__["a"] = GM_request;
    function GM_request(url, opt = {}) {
        return new Promise((resolve, reject) => {
            opt = Object.assign(opt, {
                method: "GET",
                url: url,
                onload: function(response) {
                    resolve(response.responseText);
                }
            });
            GM_xmlhttpRequest(opt);
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    const ua = navigator.userAgent;
    navigator.platform;
    const isFirefox = ua.match(/Firefox\/([\d.]+)/);
    __webpack_exports__["a"] = isFirefox;
    ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var __WEBPACK_IMPORTED_MODULE_0__detect__ = __webpack_require__(3);
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return __WEBPACK_IMPORTED_MODULE_0__detect__["a"];
    });
    var __WEBPACK_IMPORTED_MODULE_1__GM_request__ = __webpack_require__(2);
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return __WEBPACK_IMPORTED_MODULE_1__GM_request__["a"];
    });
    var __WEBPACK_IMPORTED_MODULE_2__selector__ = __webpack_require__(5);
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return __WEBPACK_IMPORTED_MODULE_2__selector__["a"];
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_exports__["a"] = $x;
    function $x(aXPath, aContext) {
        var nodes = [];
        var doc = document;
        var aContext = aContext || doc;
        try {
            var results = doc.evaluate(aXPath, aContext, null, XPathResult.ANY_TYPE, null);
            var node;
            while (node = results.iterateNext()) nodes.push(node);
        } catch (ex) {}
        return nodes;
    }
}, function(module, exports) {
    module.exports = Zepto;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(0);
    module.exports = __webpack_require__(0);
} ]);
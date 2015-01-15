// ==UserScript==
// @name        Douban Book Bar Mod
// @namespace   DoubanBookBar
// @license		MIT License
// @author      ElvisKang<kkx1993@gmail.com>
// @description 显示书籍的豆瓣评分并进行比价(Firefox and Chrome)，增加了淘宝阅读的支持。
// @include     *://www.amazon.cn/*
// @include     *://item.jd.com/*
// @include     *://product.dangdang.com/*
// @include     *://product.china-pub.com/*
// @include     *://product.suning.com/*
// @include     *://www.duokan.com/book/*
// @include     *://shuziitem.taobao.com/item.htm*
// @version     ver 1.1.4
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

(function () {
    "use strict";
    //设置比价栏的CSS属性
    function setBaseCss () {
        var baseCSS = [
            "#bookbar-container a {color:#228A31 !important;text-decoration:none;font-size: 13px;}",
            "#bookbar-container .bookbar-title {font-size: 14px;width:70px;}",
            "#bookbar-container span {margin-right: 5px;display: inline-block;font-size: 13px;font-weight: bold;}",
            "#bookbar-container ul {padding-left: 0;margin: 4px 0;}",
            "#bookbar-container li {list-style: none none outside; display: inline;padding: 0 4px;}",
            "#bookbar-container img{ height:16px; width:16px;}",
            "#avgScore {color:#DC0000 !important;}"
        ].join ( "" );
        GM_addStyle ( baseCSS );
    }
    // create* ----生成比价栏相关的函数
    //星级信息
    function createStarSpan (score) {
        var starSpan = document.createElement ( "span" );
        starSpan.id = "bookbar-star";
        var bgPosition = "0 " + (-14) * (10 - Math.floor ( parseFloat ( score ) + 0.8 )) + "px";
        var starSpanCSS = [
            "#bookbar-star { ",
                "background :url(http://img3.douban.com/pics/movie/bigstars.gif) no-repeat scroll " + bgPosition + " ; ",
            "width:75px; height: 14px; position: relative; top: 1px;}"
        ].join ( "" );
        GM_addStyle ( starSpanCSS );
        return starSpan;
    }
    //得分与评价信息
    function createScoreSpan (bookInfo) {
        var bookID = bookInfo.id,
            bookRating = bookInfo.rating || {},
            numRaters = bookRating.numRaters,
            averageScore = bookRating.average;
        var scoreSpan = document.createElement ( "span" ),
            infoUl = document.createElement ( "ul" ),
            commentsLink = document.createElement ( "li" ),
            bookInfoLink = document.createElement ( "li" );
        if ( numRaters === 0 ) {
            commentsLink.innerHTML = "<span>没有人评价这本书</span>";
        } else if ( numRaters < 10 ) {
            commentsLink.innerHTML = "<span>少于10人评价这本书</span>";
        } else if ( numRaters >= 10 ) {
            commentsLink.innerHTML = '<a  href="http://book.douban.com/subject/' + bookID + '/collections" target="_blank">(共' + numRaters + '人评价)</a>';
        } else {
            //获取信息出现错误
            commentsLink.innerHTML = "";
        }
        if ( commentsLink.innerHTML !== "" ) {
            var avgLi = document.createElement ( "li" ),
                starLi = document.createElement ( "li" ),
                starSpan = createStarSpan ( averageScore );
            avgLi.innerHTML = '<span>' + averageScore + '</span>';
            avgLi.id = "avgScore";
            starLi.appendChild ( starSpan );
            infoUl.appendChild ( avgLi );
            bookInfoLink.innerHTML = '<a href="http://book.douban.com/subject/' + bookID + '/" target="_blank" >(去豆瓣看这本书)</a>';
            infoUl.appendChild ( starLi );
            infoUl.appendChild ( commentsLink );
        } else {
            bookInfoLink.innerHTML = '<a href="http://book.douban.com" target="_blank">没在豆瓣找到这本书,去豆瓣逛逛?</a>';
        }
        infoUl.appendChild ( bookInfoLink );
        scoreSpan.appendChild ( infoUl );
        //console.log(scoreLi);
        return scoreSpan;
    }
    //由 createContrastPriceInfo 函数调用
    //生成每一个价格<li>标签
    function createPriceLi (iconLink, priceData) {
        var priceLi = document.createElement ( "li" ),
            link = document.createElement ( "a" ),
            img = document.createElement ( "img" );
        img.src = iconLink;
        link.href = priceData.href || "#";
        link.target = "_blank";
        if ( priceData.price === undefined ) {
            link.textContent = "[没找到]";
        } else {
            link.textContent = "￥" + priceData.price;
        }
        priceLi.appendChild ( img );
        priceLi.appendChild ( link );
        return priceLi;
    }
    //价格(其他网站)信息
    function createContrastPriceInfo (priceList) {
        var contrastPriceInfo = document.createElement ( "span" ),
            infoContainer = document.createElement ( "ul" );
        if ( priceList.length === 0 ) {
            contrastPriceInfo.innerHTML = "<span>豆瓣上没有购买信息</span>";
        } else {
            for ( var i = 0, len = priceList.length ; i < len ; i++ ) {
                var matchIndex = sitesContainer.nameList.indexOf ( priceList[i].name );
                var priceLi = createPriceLi ( sitesContainer.list[matchIndex].logo, priceList[i] );
                infoContainer.appendChild ( priceLi );
            }
            //console.log(contrastPriceInfo);
        }
        contrastPriceInfo.appendChild ( infoContainer );
        return contrastPriceInfo;
    }

    function createBar (infoRow, priceRow) {
        var bar = document.createElement ( "div" );
        bar.id = "bookbar-container";
        bar.appendChild ( infoRow );
        bar.appendChild ( priceRow );
        return bar;

    }

    function createPriceRowContainer () {
        var container = document.createElement ( "div" ),
            label = document.createElement ( "span" );
        container.id = "bookbar-priceInfo";
        label.innerHTML = "比价:";
        label.className = "bookbar-title";
        container.appendChild ( label );
        return container;
    }

    function createInfoRowContainer () {
        var container = document.createElement ( "div" ),
            label = document.createElement ( "span" );
        container.id = "bookbar-doubanInfo";
        label.className = "bookbar-title";
        label.innerHTML = "豆瓣评分:";
        container.appendChild ( label );
        return container;
    }
    function insertBar (bar,position) {
        var parent = position.parentNode;
        if ( parent.lastChild === position ) {
            parent.appendChild ( bar );
        }
        else {
            parent.insertBefore ( bar, position.nextSibling );
        }
    }
    // 获取书籍信息
    function getBookInfo (isbn) {
        if ( !isbn ) {
            return null;
        }
        GM_xmlhttpRequest ( {
            method : "get",
            url    : "http://api.douban.com/v2/book/isbn/" + isbn,
            onload : function (result) {
                //console.log(result);
                var bookInfo = JSON.parse ( result.responseText );
                getBookPrice ( bookInfo );
            }
        } );
    }

    function getBookPrice (bookInfo) {
        var doubanID = bookInfo.id || null;
        var doubanLink = "http://book.douban.com/subject/" + doubanID + "/buylinks";
        var priceList = [];
        GM_xmlhttpRequest ( {
            method : "get",
            url    : doubanLink,
            onload : function (result) {
                var container = document.createElement ( "div" );
                container.innerHTML = result.responseText;
                var list = document.evaluate ( '//table[@id="buylink-table"]/tbody/tr', container, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                var priceChecker = /[0-9]+(\.[0-9]+)?/;

                for ( var i = 1, len = list.snapshotLength ; i < len ; i++ ) {
                    var part = list.snapshotItem ( i );
                    var link_info = part.querySelectorAll ( "td.pl2" );
                    var siteName = link_info[0].textContent.trim ();
                    if ( sitesContainer.nameList.indexOf ( siteName ) !== -1 && siteName !== sitesContainer.curSite.name ) {
                        var priceInfo = {
                            "name"  : siteName,
                            "href"  : link_info[0].getElementsByTagName ( "a" )[0].href,
                            "price" : priceChecker.exec ( link_info[1].textContent.trim () )[0]
                        };
                        priceList.push ( priceInfo );
                    }
                }
                sitesContainer.curSite.createDoubanBar ( bookInfo, priceList );
            }

        } );

    }

    // 网站对象
    var sitesContainer = {
        _siteList     : [],    //可支持的网页,通过Site.list获取
        _curSite      : null,  //当前网页
        _siteNameList : [],
        addSites      : function (sitesArray) {
            if ( Object.prototype.toString.call ( sitesArray ) === '[object Array]' ) {
                this._siteList = this._siteList.concat ( sitesArray );
                for ( var i = 0 ; i < sitesArray.length ; i++ ) {
                    this._siteNameList.push ( sitesArray[i].name );
                }
            }
        },
        get list () {
            return this._siteList;
        },
        get nameList () {
            return this._siteNameList;
        },
        get curSite () {
            return this._curSite;
        },
        set curSite (href) {
            try {
                //通过对象中的checker属性匹配网站
                for ( var i = 0, len = this._siteList.length ; i < len ; i++ ) {
                    if ( Object.prototype.toString.call ( this._siteList[i].checker ) === "[object RegExp]" ) {
                        if ( this._siteList[i].checker.test ( href ) ) {
                            this._curSite = this._siteList[i];
                            return this._siteList[i];
                        }
                    }

                }

            } catch (e) {
                console.log ( "getCurSite() Error : " + e );
                return {};
            }
            return {};
        }
    };

    function SupportSite (siteInfo) {
        this.name = siteInfo.name;
        this.logo = siteInfo.logo;
        this.checker = siteInfo.checker;
        this.getISBN = siteInfo.getISBN;
        this.referencePosition = siteInfo.referencePosition;
    }

    SupportSite.prototype.createDoubanBar = function (bookInfo, priceList) {
        var referencePosition = document.querySelector ( this.referencePosition );
        var infoRowContainer = createInfoRowContainer (),
            priceRowContainer = createPriceRowContainer ();
        var scoreSpan = createScoreSpan ( bookInfo ),
            contrastPriceInfo = createContrastPriceInfo ( priceList );
        priceRowContainer.appendChild ( contrastPriceInfo );
        infoRowContainer.appendChild ( scoreSpan );
        setBaseCss ();
        var bar = createBar ( infoRowContainer, priceRowContainer);
        insertBar(bar,referencePosition);
    };

    var Amazon = new SupportSite ( {

        name : "亚马逊",

        checker : /(https?:\/\/)?(www)?\.amazon\.(com|cn)\/.*/,

        logo : "http://www.amazon.cn/favicon.ico",

        getISBN           : function () {
            var contents = document.querySelectorAll ( "div.content b" );
            try {
                for ( var i = 0 ; i <= contents.length ; i++ ) {
                    var info = contents[i];
                    if ( info.textContent === "ISBN:" || info.textContent === "条形码:" ) {
                        //console.log(info.nextSibling.data.split(",")[0].substring(1));
                        return info.nextSibling.data.split ( "," )[0].substring ( 1 );
                    }
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        referencePosition : "#tmmSwatches"
    } );

    var JD = new SupportSite ( {
        name : "京东商城",

        checker : /(https?:\/\/)?(www|item)?\.jd\.com\/.*/,

        logo : "http://www.jd.com/favicon.ico",

        getISBN           : function () {
            try {
                var isbnString = document.querySelector ( "li.fore4:nth-child(2)" ).innerHTML;
                return isbnString.split ( "：" )[1];
            } catch (e) {
                return null;
            }
        },
        referencePosition : "#name"
    } );

    var Dangdang = new SupportSite ( {

        name : "当当网",

        checker : /(https?:\/\/)?(www|product)?\.dangdang\.com\/.*/,

        logo : "http://www.dangdang.com/favicon.ico",

        getISBN           : function () {
            var scanItems = document.querySelectorAll ( "div.show_info_left" );
            try {
                for ( var i = 0 ; i < scanItems.length ; i++ ) {
                    if ( scanItems[i].textContent === "ＩＳＢＮ" || scanItems[i].textContent === "ISBN" ) {
                        return scanItems[i].nextElementSibling.innerHTML;
                    }
                }

            } catch (e) {
                return null;
            }
        },
        referencePosition : ".head"
    } );

    var Chinapub = new SupportSite ( {

        name : "China-pub",

        checker : /(https?:\/\/)?(product|www)\.china\-pub\.com\/.*/,

        logo : "http://www.china-pub.com/favicon.ico",

        getISBN           : function () {
            var list = document.querySelectorAll ( "#con_a_1 li" );
            for ( var i = 0 ; i < list.length ; i++ ) {
                if ( list[i].innerHTML.split ( "：" )[0] === "ISBN" ) {
                    return list[i].innerHTML.split ( "：" )[1].replace ( /<.*?>/g, "" ).match ( /[0-9]*/g ).join ( "" );
                }
            }
            return null;
        },
        referencePosition : ".pro_buy_star"
    } );

    var Suning = new SupportSite ( {

        name : "苏宁易购",

        checker : /(https?:\/\/)?(product)\.suning\.com\/.*/,

        logo : "http://www.suning.com/favicon.ico",

        getISBN           : function () {
            try {
                var isbn = document.querySelector ( "li.li-b:nth-child(11) > span:nth-child(2)" );
                return isbn.innerHTML;
            } catch (e) {
                return null;
            }
        },
        referencePosition : ".product-main-title"
    } );

    var DuoKan = new SupportSite ( {

        name : "多看阅读",

        checker : /(https?:\/\/)?(www)\.duokan\.com\/.*/,

        logo : "http://www.duokan.com/favicon.ico",

        getISBN           : function () {
            try {
                var isbn = document.querySelector ( "span.isbn" );
                return isbn.innerHTML;
            } catch (e) {
                return null;
            }
        },
        referencePosition : "div[itemprop=aggregateRating]"
    } );

    var Taobao = new SupportSite ( {

        name : "淘宝阅读",

        checker : /(https?:\/\/)?(shuziitem)\.taobao\.com\/item\.htm.*/,

        logo : "http://www.taobao.com/favicon.ico",

        getISBN           : function () {
            try {
                var isbn = document.querySelector ( ".vaddress b" );
                return isbn.innerHTML;
            } catch (e) {
                return null;
            }
        },
        referencePosition : "li.tb-item-rates"
    } );

    function init () {
        sitesContainer.addSites ( [Amazon, JD, Dangdang, Chinapub, Suning, DuoKan, Taobao] );
        sitesContainer.curSite = location.href;
        if ( !!(sitesContainer.curSite) ) {
            var isbn = sitesContainer.curSite.getISBN ();
            try {
                getBookInfo ( isbn );
            } catch (e) {
                throw  e;
            }
        }
    }

    init ();
}) ();

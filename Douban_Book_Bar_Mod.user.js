// ==UserScript==
// @name        Douban Book Bar Mod
// @namespace   DoubanBookBar
// @license		MIT License
// @author      ElvisKang<elviskang@foxmail.com>
// @description 以最优惠的价格买到最心仪的书
// @include     *://www.amazon.cn/*
// @include     *://item.jd.com/*
// @include     *://product.dangdang.com/*
// @include     *://product.china-pub.com/*
// @include     *://product.suning.com/*
// @include     *://www.suning.com/emall/*
// @include     *://www.duokan.com/book/*
// @include     *://shuziitem.taobao.com/item.htm*
// @version     ver 1.2.5
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
    //创建比价栏的调用控制函数在SupportSite对象的原型链中
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
        return scoreSpan;
    }

    //由 createContrastPriceInfo 函数调用
    //生成每一个价格<li>标签
    function createPriceLi (iconLink, priceData, sitePrice) {
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
            if ( sitePrice !== -1 ) {
                var difference = parseFloat(priceData.price) - parseFloat(sitePrice);
                var sgn = difference > 0 ? "+" : "";
                link.textContent += "( " + sgn + difference.toFixed(2) + " )";
            }
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
                var priceLi = createPriceLi ( sitesContainer.list[matchIndex].logo, priceList[i],priceList.curSitePrice );
                infoContainer.appendChild ( priceLi );
            }
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

    function insertBar (bar, position) {
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
                var curSitePrice = -1;
                for ( var i = 1, len = list.snapshotLength ; i < len ; i++ ) {
                    var part = list.snapshotItem ( i );
                    var link_info = part.querySelectorAll ( "td.pl2" );
                    var siteName = link_info[0].textContent.trim ();
                    if ( sitesContainer.nameList.indexOf ( siteName ) !== -1 ) {
                        if ( siteName === sitesContainer.curSite.name ) {
                            curSitePrice = priceChecker.exec ( link_info[1].textContent.trim () )[0];
                        } else {
                            var priceInfo = {
                                "name"  : siteName,
                                "href"  : link_info[0].getElementsByTagName ( "a" )[0].href,
                                "price" : priceChecker.exec ( link_info[1].textContent.trim () )[0]
                            };
                            priceList.push ( priceInfo );
                        }
                        priceList.curSitePrice = curSitePrice; // 如果为-1，则说明没有获得当前网页的书本价格
                    }
                }
                sitesContainer.curSite.createDoubanBar ( bookInfo, priceList );
            }

        } );

    }

    // 网站对象
    var sitesContainer = {
        //以下划线开头的属性为访问器属性
        _siteList     : null,    //访问可支持的网页,通过Site.list获取
        _curSite      : null,  //当前网页
        _siteNameList : [],
        addSites      : function (sitesArray) {
            if ( sitesArray instanceof Array ) {
                this._siteList = sitesArray;
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
                    if ( (this._siteList[i].checker) instanceof RegExp ) {
                        if ( this._siteList[i].checker.test ( href ) ) {
                            this._curSite = this._siteList[i];
                            return this._siteList[i];
                        }
                    }

                }

            } catch (e) {
                return null;
            }
            return null;
        }
    };

    function SupportSite (siteInfo) {
        this.name = siteInfo.name;
        this.logo = siteInfo.logo;
        this.checker = siteInfo.checker;
        this.getISBN = siteInfo.getISBN;
        this.referencePosition = siteInfo.referencePosition;
    }

    SupportSite.prototype.isEBook = false;
    SupportSite.prototype.createDoubanBar = function (bookInfo, priceList) {
        var referencePosition = document.querySelector ( this.referencePosition );
        if ( !referencePosition ) {
            log ( "Error: 插入位置没有找到" );
        }
        var infoRowContainer = createInfoRowContainer (),
            priceRowContainer = createPriceRowContainer ();
        var scoreSpan = createScoreSpan ( bookInfo ),
            contrastPriceInfo = createContrastPriceInfo ( priceList );
        priceRowContainer.appendChild ( contrastPriceInfo );
        infoRowContainer.appendChild ( scoreSpan );
        setBaseCss ();
        var bar = createBar ( infoRowContainer, priceRowContainer );
        insertBar ( bar, referencePosition );
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
            if (!scanItems.length) {
                scanItems = document.querySelectorAll('ul[name="Infodetail_pub"] > li > span');
            }

            try {
                for ( var i = 0 ; i < scanItems.length ; i++ ) {
                    if ( scanItems[i].textContent === "ＩＳＢＮ" || scanItems[i].textContent === "ISBN" ) {
                        return scanItems[i].nextElementSibling.innerHTML;
                    } else if (scanItems[i].textContent.indexOf('I S B N：') == 0) {
                        return scanItems[i].textContent.replace('I S B N：', '');
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
                var isbn = document.querySelector ( "#bookParameterField > dl:nth-child(4) > dd:nth-child(2)" );
                return isbn.innerHTML;
            } catch (e) {
                return null;
            }
        },
        referencePosition : "#existPrice"
    } );
    //苏宁第三方(文轩等)
    var SuningThird = new SupportSite ( {

        name : "苏宁易购第三方",

        checker : /(https?:\/\/)?(www)?\.suning\.com\/emall\/.*/,

        logo : "http://www.suning.com/favicon.ico",

        getISBN           : function () {
            try {
                var isbn = document.querySelector ( "li.li-b:nth-child(11) > span:nth-child(2)" );
                return isbn.innerHTML;
            } catch (e) {
                return null;
            }
        },
        referencePosition : "#productInfoUl"
    } );

    var DuoKan = new SupportSite ( {

        name : "多看阅读",

        isEBook : true,

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

		isEBook : true,

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

	function log (msg) {
        console.log ( "DoubanBookBar: " + msg );
    }

    function init () {
        sitesContainer.addSites ( [Amazon, JD, Dangdang, Chinapub, Suning, SuningThird, DuoKan, Taobao] );
        sitesContainer.curSite = location.href;
        if ( !sitesContainer.curSite ) {
            log ( "Error: 无法正确匹配当前的网站" );
        }
        var isbn = sitesContainer.curSite.getISBN ();
        if ( !isbn ) {
            log ( "Error: 无法获取ISBN" ); //判定isbn是否获取成功
        }
        try {
            getBookInfo ( isbn );
        } catch (e) {
            throw  e;
        }
    }

    init ();
}) ();

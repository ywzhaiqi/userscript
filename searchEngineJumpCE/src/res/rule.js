// 根据规则把搜索引擎列表插入到指定网站
// 以下数据来自原版和 ted423 的版本
var rules = [
    // 网页
    // /////////////第一个可以当模板看
    {name: "google网页搜索",// 你要加载的网站的名字(方便自己查找)
        // 是否启用.
        enabled: true,
        // 在哪个网站上加载,正则.
        // url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
        url: /^https?:\/\/(www|encrypted)\.google(stable)?\..{2,9}\/(webhp|search|#|$|\?)(?:.(?!&tbm=))*$/,
        // 是否要监视标题的变化
        mutationTitle: true,
        // 加载哪个类型的列表:
        // ['web'|'music'|'video'|'image'|'download'|'shopping'|'translate'|'knowledge'|'sociality']
        engineList: 'web',
        // 给引擎列表的样式
        style: '\
           border-bottom: 1px solid #E5E5E5;\
           border-top: 1px solid #E5E5E5;\
           padding-left: 135px;\
        ',

        // 插入文档,相关
        // target 将引擎跳转工具栏插入到文档的某个元素
           // (请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
        // keyword 使用 xpath 或者 css选中一个form input元素 或者 该项是一个函数，使用返回值
        // where 四种:
           // 'beforeBegin'(插入到给定元素的前面) ;
           // 'afterBegin'(作为给定元素的第一个子元素) ;
           // 'beforeEnd' (作为给定元素的最后一个子元素) ;
           // 'afterEnd'(插入到给定元素的后面);.
        insertIntoDoc: {
               /*keyword: function () {
               var input = document.getElementById('lst-ib');
               if (input) return input.value;
           }, */
           keyword: '//input[@name="q"]',
           target: 'css;#rcnt',
           where: 'beforeBegin',
        },
        // 自定义样式，我新增的
        stylish: '',
    },
    {name: "wen.lu网页搜索",
        enabled: true,
        url: /^https?:\/\/wen\.lu\//i,
        engineList: 'web',
        style: '\
            border-bottom: 1px solid #E5E5E5;\
            border-top: 1px solid #E5E5E5;\
            padding-left: 135px;\
            ',
        insertIntoDoc: {
            keyword: '//input[@name="q"]',
            target: 'css;#rcnt',
            where: 'beforeBegin',
        },
    },
    {name: "baidu 网页搜索",
        // 新增了百度简洁搜索：http://www.baidu.com/s?wd=firefox&ie=utf-8&tn=baidulocal
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu|)/,
        mutationTitle: true,
        enabled: true,
        engineList: 'web',
        style: '\
           border-top:1px solid #D9E1F7;\
           border-bottom:1px solid #D9E1F7;\
           padding-left: 138px;\
        ',
        insertIntoDoc: {
           keyword: function() {
               var input = document.querySelector('input#kw') || document.querySelector('input[name="wd"]');
               if (input) return input.value;
           },
           target: 'id("container") | html/body/table[2]',
           where: 'beforeBegin',
        },
    },
    {name: "必应网页搜索",
        url: /^https?:\/\/[^.]*\.bing\.com\/search/,
        enabled: true,
        engineList: 'web',
        style: '\
           border-top: 1px solid #E6E6E6;\
           border-bottom: 1px solid #E6E6E6;\
           margin-top:5px;\
           margin-left: 100px;\
        ',
        insertIntoDoc: {
           keyword: 'css;#sb_form_q',
           target: 'css;#b_header',
           where: 'beforeEnd',
        },
    },
    {name: "360搜索",
        url: /^https?:\/\/www\.so\.com\/s\?/,
        engineList: 'web',
        enabled: true,
        style: '\
           border-bottom: 1px solid #E0E0E0;\
           border-top: 1px solid #E0E0E0;\
           margin-bottom: 10px;\
        ',
        insertIntoDoc: {
           keyword: 'css;#keyword',
           target: 'css;#container',
           where: 'beforeBegin',
        },
        stylish: '#head{ margin-bottom: 0; }'
    },
    {name: "搜狗网页搜索",
        url: /^https?:\/\/www\.sogou\.com\/(?:web|sogou)/,
        enabled: true,
        engineList: 'web',
        style: "\
           border-top: 1px solid #ccc;\
           border-bottom: 1px solid #ccc;\
           margin-bottom: 10px;\
           padding-left: 35px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#upquery',
           target: 'css;#wrapper',
           where: 'beforeBegin',
        },
        stylish: '.header{ margin-bottom: 5px; }'
    },
    // {name: "雅虎网页搜索",
    //     url: /^https?:\/\/search\.yahoo\.com\/search/,
    //     engineList: '网页',
    //     enabled: true,
    //     style: "\
    //     text-align:left;\
    //     border-top:1px solid #D4E9F7;\
    //     border-bottom:1px solid #D4E9F7;\
    //     ",
    //     insertIntoDoc: {
    //     keyword: 'css;#yschsp',
    //     target: 'css;#hd',
    //     where: 'afterEnd'
    //     }
    // },

    // 知识
    {name: "谷歌学术",
        enabled: true,
        url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
        engineList: "知识",
        style: '\
             border-bottom:1px solid #E5E5E5;\
             border-top:1px solid #E5E5E5;\
             z-index:999;\
             position:relative;\
             ',
        insertIntoDoc: {
           target: 'css;#gs_ab',
           keyword: '//input[@name="q"]',
           where: 'beforeBegin'
        }
    },
    {name: "百度百科",
        url: /^https?:\/\/baike\.baidu\.com\/(?:sub)?view\//,
        engineList: "知识",
        enabled: true,
        style: "\
            border-top: 1px solid #2B6DAE;\
            text-align: center;\
            z-index: 999999;\
        ",
        insertIntoDoc: {
            keyword: 'css;input#word',
            target: 'css;#nav',
            // where: 'beforeBegin',
            where: 'afterEnd',
        },
    },
    {name: "互知识",
        url: /^https?:\/\/[a-z]{2,3}\.baike\.com\/[a-z]/,
        enabled: true,
        engineList: "知识",
        style: '\
            z-index:99;\
            margin:0 auto;\
        ',
        insertIntoDoc: {
            keyword: function() {
                var input;
                if (document.getElementsByClassName('ac_input')[0] != undefined) {
                    if (document.getElementsByClassName('ac_input')[0].value != "")
                        input = document.getElementsByClassName('ac_input')[0].value;
                    else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
                    else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
                } else if (document.getElementsByClassName('blue')[0].innerHTML != "") input = document.getElementsByClassName('blue')[0].innerHTML;
                else input = document.evaluate("//h1", document, null, 9, null).singleNodeValue.innerHTML;
                return input;
            },
            target: 'css;.wraper',
            where: 'beforeBegin'
        }
    },
    {name: "wiki",
        url: /^https?:\/\/..\.wikipedia\.org\/w\/index\.php(?!.*\?search=%s)/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
              margin-top:5px;\
        ',
        insertIntoDoc: {
            keyword: 'css;#searchInput',
            target: 'css;#siteNotice',
            where: 'beforeBegin'
        }
    },
    {name: "wiki",
        url: /^https?:\/\/(?:en|zh|ja)\.wikipedia\.org\/(wiki\/|w\/index\.php\?search=%s)/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
              padding-left: 0;\
        ',
        insertIntoDoc: {
            keyword: function() {
                return document.evaluate("//span[@dir='auto']", document, null, 9, null).singleNodeValue.innerHTML;
            },
            target: 'css;#siteNotice',
            where: 'beforeBegin'
        }
    },
    {name: "百度知道",
        url: /^https?:\/\/zhidao\.baidu\.com\/(search|question)/,
        enabled: true,
        engineList: "知识",
        style: '\
              position:absolute;\
              width:90px;\
              top:180px;\
              right: 2%;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "知乎",
        url: /^https?:\/\/www\.zhihu\.com\/search\?/,
        enabled: true,
        engineList: "知识",
        style: '\
              text-align;center;\
              border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#q',
            target: 'css;.zu-top',
            where: 'afterEnd'
        },
        stylish: '.sej-engine > img {padding-bottom: 3px;}'
    },
    {name: "百度文库",
        url: /^https?:\/\/wenku\.baidu\.com\/search\?/,
        enabled: true,
        engineList: "知识",
        style: '\
              border-top:1px solid #D9E1F7;\
              border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;#hd',
            where: 'afterEnd'
        }
    },
    {name: "豆丁",
        url: /^https?:\/\/www\.docin\.com\/search\.do/,
        enabled: true,
        engineList: "知识",
        style: '\
            margin:0 auto;\
            padding-top:65px;\
            border-top:1px solid #00000;\
            border-bottom:1px solid #D9E1F7;\
        ',
        insertIntoDoc: {
            keyword: 'css;input#topsearch',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },

    // 视频
    {name: "soku",
        url: /^https?:\/\/www\.soku\.com\/[a-z]/,
        engineList: "视频",
        enabled: true,
        style: "\
           border-bottom: 1px solid #EEEEEE;\
           border-top: 1px solid #EEEEEE;\
           text-align: center;\
        ",
        insertIntoDoc: {
           keyword: 'css;#headq',
           target: 'css;.sk_header',
           where: 'afterEnd'
        },
    },
    {name: "bilibili",
        url: /^https?:\/\/www\.bilibili\.com\/search\?/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E7E7E7;\
           border-bottom: 1px solid #E7E7E7;\
           width: 980px;\
           margin: 0 auto;\
        ",
        insertIntoDoc: {
           keyword: 'css;#search-keyword',
           target: 'css;body > .z',
           where: 'beforeBegin',
        },
    },
    {name: "acfan",
        url: /^https?:\/\/www\.acfun\.tv\/search/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #FFFFFF;\
           border-bottom: 1px solid #FFFFFF;\
           margin-bottom: 5px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#input-search-mainer',
           target: 'css;#mainer',
           where: 'beforeBegin',
        },
    },
    {name: "youtube",
        url: /^https?:\/\/www\.youtube\.com\/results/,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E8E8E8;\
           border-bottom: 1px solid #E8E8E8;\
        ",
        insertIntoDoc: {
           keyword: 'css;#masthead-search-term',
           target: 'css;#page-container',
           where: 'beforeBegin',
        },
    },
    {name: "niconico",
        url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
        enabled: true,
        engineList: "视频",
        style: "\
           border-top: 1px solid #E8E8E8;\
           border-bottom: 1px solid #E8E8E8;\
           text-align: center;\
        ",
        insertIntoDoc: {
           keyword: 'css;#search_united',
           target: 'css;.tagListBox',
           where: 'beforeBegin',
        },
    },
    {name: "百度视频",
        url: /^https?:\/\/v\.baidu\.com\/(v|#)/,
        enabled: true,
        engineList: "video",
        style: "\
        	margin:0 auto;\
        	width: 984px;\
		",
        insertIntoDoc: {
           keyword: 'css;#kw',
           target: 'css;#navbar',
           where: 'beforeBegin'
        }
    },
    {name: "360视频",
        url: /^https?:\/\/video\.so\.com\//,
        engineList: "video",
        enabled: true,
        style: "\
               text-align:left;\
               top:-20px;\
               margin-left:5px;\
               ",
        insertIntoDoc: {
           keyword: 'css;#kw',
           target: 'css;#head',
           where: 'afterEnd'
        }
    },
    {name: "腾讯视频",
        url: /^https?:\/\/v\.qq\.com\/search\.html\?/,
        engineList: "video",
        enabled: true,
        style: "",
        insertIntoDoc: {
           keyword: 'css;#iWordMid',
           target: 'css;.mod_big_search',
           where: 'afterEnd'
        }
    },
    // {name: "sogou视频",
    //     url: /^https?:\/\/v\.sogou\.com\/v\?/,
    //     engineList: "video",
    //     enabled: true,
    //     style: "\
    //            top:-10px;\
    //            border-top:1px solid #D9E1F7;\
    //            border-bottom:1px solid #D9E1F7;\
    //            ",
    //     insertIntoDoc: {
    //        keyword: 'css; #form_query',
    //        target: 'css;.header',
    //        where: 'afterEnd'
    //     }
    // },
    // {name: "soso视频",
    //     url: /^https?:\/\/video\.soso\.com\/v\?/,
    //     engineList: "video",
    //     enabled: true,
    //     style: "\
    //            top:-10px;\
    //            margin:0 auto;\
    //            border-top:1px solid #D9E1F7;\
    //            border-bottom:1px solid #D9E1F7;\
    //            ",
    //     insertIntoDoc: {
    //        keyword: 'css; #form_query',
    //        target: 'css;#s_search',
    //        where: 'afterEnd'
    //     }
    // },
    {name: "bing视频",
        url: /^https?:\/\/.*\.bing\.com\/video/,
        enabled: true,
        engineList: "video",
        style: '\
            left: 5px;\
            border-collapse:separate;\
        ',
        insertIntoDoc: {
           keyword: 'css;#sb_form_q',
           target: 'css;#rfPane',
           where: 'afterBegin'
        },
        stylish: '#vm_res { position: relative; top: 54px; }',
    },
    {name: "iqiyi",
        url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
        enabled: true,
        engineList: "video",
        style: '\
               margin:0 auto;\
               ',
        insertIntoDoc: {
           keyword: 'css;#data-widget-searchword',
           target: 'css;#destinationBox',
           where: 'afterEnd'
        },
    },
    {name: "Letv",
        url: /^https?:\/\/so\.letv\.com\/s\?/,
        enabled: true,
        engineList: "video",
        style: "\
               margin:0 auto;\
               border-top: 1px solid #FFFFFF;\
               border-bottom: 1px solid #FFFFFF;\
               ",
        insertIntoDoc: {
           keyword: function() {
               var input = document.getElementsByClassName("i-t")[1].value;
               if (input) return input;
           },
           target: 'css;.So-search',
           where: 'afterEnd',
        },
    },
    {name: "搜狐",
        url: /^https?:\/\/so\.tv\.sohu\.com\/mts\?/,
        enabled: true,
        engineList: "video",
        style: "\
               margin:0 auto;\
               border-top: 1px solid #FFFFFF;\
               border-bottom: 1px solid #FFFFFF;\
               ",
        insertIntoDoc: {
           keyword: 'css;#gNewSearch2',
           target: 'css;.ss-head',
           where: 'beforeEnd',
        },
    },
    {name: "56视频",
        url: /^https?:\/\/so\.56\.com\/video\//,
        enabled: true,
        engineList: "video",
        style: "\
               position:relative;\
               top:-20px;\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;.search_keyword',
           target: 'css;.header_wrap',
           where: 'beforeEnd'
        }
    },
    {name: "ku6",
        url: /^https?:\/\/so\.ku6\.com\/search/,
        engineList: "video",
        enabled: true,
        style: "\
               word-break:keep-all;\
               white-space:nowrap;\
               position:relative;\
               left:-70px;\
               ",
        insertIntoDoc: {
           keyword: 'css;#bdvSearvhInput',
           target: 'css;.ckl_header',
           where: 'beforeEnd'
        }
    },

    // 音乐
    {name: "天天动听",
        url: /^https?:\/\/www\.dongting\.com\/#/,
        enabled: true,
        engineList: "music",
        style: "\
            margin-left:23%;\
            background-color:#E2E2E2;\
            position: fixed;\
            right:0;\
        ",
        insertIntoDoc: {
            keyword: 'css;.searchBox',
            target: 'css;.head',
            where: 'beforeEnd'
        }
    },
    {name: "百度音乐",
        url: /^https?:\/\/music\.baidu\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            border-top:1px solid #CDEAF6;\
            padding-left: 80px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#ww',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },
    {name: "qq音乐",
        url: /^https?:\/\/cgi\.music\.soso\.com/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:2px auto;\
        ",
        insertIntoDoc: {
            keyword: 'css;#search_input',
            target: 'css;#search_result',
            where: 'beforeBegin'
        }
    },
    {name: "搜狗音乐",
        url: /^https?:\/\/mp3\.sogou\.com\/music\.so/,
        enabled: true,
        engineList: "music",
        style: "\
            text-align:left;\
            margin-left:30px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#queryinput',
            target: 'css;#header_sogou',
            where: 'afterEnd'
        }
    },
    {name: "音悦台",
        url: /^https?:\/\/so\.yinyuetai\.com\/mv\?/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
        ",
        insertIntoDoc: {
            keyword: '//input[@name="keyword"]',
            target: 'css;.search_title',
            where: 'beforeBegin'
        },
    },
    {name: "一听音乐",
        url: /^https?:\/\/so\.1ting\.com\//,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
            width: 960px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#keyword',
            target: 'css;.nav',
            where: 'beforeBegin'
        }
    },
    {name: "songtaste",
        url: /^https?:\/\/www\.songtaste\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            margin:0 auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            background-color:#E6E6E6;\
        ",
        insertIntoDoc: {
            keyword: 'css;#sb',
            target: 'css;head',
            where: 'beforeBegin'
        }
    },
    {name: "xiami",
        url: /^https?:\/\/www\.xiami\.com\/search/,
        enabled: true,
        engineList: "music",
        style: "\
            word-break:keep-all;\
            margin-right: 205px;\
        ",
        insertIntoDoc: {
            keyword: 'css;#search_text',
            target: 'css;.more_cols_left_inner',
            where: 'beforeBegin'
        }
    },

    // 图片
    {name: "谷歌图片",
        url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(.*tbs=sbi)|(.*tbm=isch)/,
        enabled: true,
        engineList: "image",
        style: '\
            border-top:1px solid #ccc;\
            border-bottom:1px solid #ccc;\
            ',
        insertIntoDoc: {
            keyword: 'css;input[name=q]',
            target: 'css;#top_nav',
            where: 'beforeBegin'
        }
    },
    {name: "百度图片",
        url: /^https?:\/\/image\.baidu\.c(om|n)\/i/,
        enabled: true,
        engineList: "image",
        style: '\
            margin-left:40px;\
            ',
        insertIntoDoc: {
            keyword: 'css;input#kw',
            target: 'css;#search',
            where: 'afterEnd'
        }
    },
    {name: "360图片",
        url: /^https?:\/\/\image\.so\.com\/i\?/,
        enabled: true,
        engineList: "image",
        style: '\
            word-break:keep-all;\
            white-space:nowrap;\
            position:relative;\
            z-index:50;\
            text-align:left;\
            ',
        insertIntoDoc: {
            keyword: 'css;input#search_kw',
            target: 'css;#searchBox',
            where: 'afterBegin'
        },
        etc: function() {
            document.getElementById("searchBox").style.height = '80px';
        }
    },
    {name: "bing图片",
        url: /^https?:\/\/.*\.bing\.com\/images\/search/,
        enabled: true,
        engineList: "image",
        style: '\
            top:-5px;\
            margin-left:5px;\
            border-collapse:separate;\
            ',
        insertIntoDoc: {
            keyword: 'css;#sb_form_q',
            target: 'css;#rfPane',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("rf_hold").style.height = '120px';
        }
    },
    {name: "搜狗图片",
        url: /^https?:\/\/pic\.sogou\.com\/pic/,
        engineList: "image",
        enabled: true,
        style: "\
            top:-9px;\
            border-top:1px solid #BFBDEA;\
            border-bottom:1px solid #BFBDEA;\
            ",
        insertIntoDoc: {
            keyword: 'css;#form_querytext',
            target: 'css;.fix_area',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementsByClassName("hd_fix")[0].style.height = '130px';
            document.getElementsByClassName("hd_fix")[0].nextElementSibling.style.height = '130px';
        }
    },
    {name: "有道图片",
        url: /^https?:\/\/image\.youdao\.com\/search/,
        engineList: "image",
        enabled: true,
        style: "\
            border-top:1px solid #EBF1FF;\
            border-bottom:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#w',
            where: 'beforeBegin'
        }
    },
    {name: "花瓣",
        url: /^https?:\/\/huaban\.com\/search\/\?/,
        engineList: "image",
        enabled: true,
        style: "\
            border-top:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#search_switch',
            where: 'afterEnd'
        }
    },
    {name: "flickr",
        url: /^https?:\/\/www\.flickr\.com\/search/,
        engineList: "image",
        enabled: true,
        style: "\
            position:fixed;\
            top:80px;\
            z-index:1999;\
            background-color:#FFFFFF;\
            width:100%;\
            border-top:1px solid #EBF1FF;\
            border-bottom:1px solid #EBF1FF;\
            ",
        insertIntoDoc: {
            keyword: function() {
            if (document.getElementById("autosuggest-input"))
                var input = document.getElementById("autosuggest-input").value;
            else input = "";
            return input;
            },
            target: 'css;#content',
            where: 'afterBegin'
        },
        etc: function() {
            setTimeout(function() {
            document.getElementsByTagName("section")[0].style.setProperty("top", "31px", "important");
            }, 1500);
        }
    },
    {name: "picsearch",
        url: /^http:\/\/(..|...)\.picsearch\.com\/index\.cgi/,
        engineList: "image",
        enabled: true,
        style: "\
            margin-top:80px;\
            ",
        insertIntoDoc: {
            keyword: 'css;input[name=q]',
            target: 'css;#header',
            where: 'beforeEnd'
        }
    },
    {name: "pixiv",
        url: /^http:\/\/www\.pixiv\.net\/search\.php/,
        engineList: "image",
        enabled: true,
        style: "\
            margin: 0 auto;\
            width: 970px;\
            font-family: 微软雅黑;\
        ",
        insertIntoDoc: {
            keyword: 'css;input[name=word]',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "deviantart",
        url: /^http:\/\/www\.deviantart\.com\/\?q/,
        engineList: "image",
        enabled: true,
        style: "\
            margin-bottom:10px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#searchInput',
            target: 'css;.browse-top-bar',
            where: 'afterEnd'
        }
    },
    {name: "jpg4",
        url: /^http:\/\/img\.jpger\.info\//,
        engineList: "image",
        enabled: true,
        style: "\
            margin-top:300px;\
            ",
        insertIntoDoc: {
            keyword: 'css;input[name=feed]',
            target: '//div[@align="center"]',
            where: 'beforeEnd'
        }
    },

    // 下载
    {name: "人人影视",
        url: /^https?:\/\/www\.yyets\.com\/search\//,
        engineList: "下载",
        enabled: true,
        style: '\
            border-bottom: 1px solid #00AFFF;\
            text-align: center;\
        ',
        insertIntoDoc: {
            keyword: 'css;#keyword',
            target: 'css;.topBox',
            where: 'afterEnd',
        },
    },
    {name: "极影",
        url: /^https?:\/\/bt\.ktxp\.com\/search\.php\?/,
        engineList: "下载",
        enabled: true,
        style: "\
            border-bottom: 1px solid #CAD9EA;\
            border-top: 1px solid #CAD9EA;\
            background-color: white;\
            text-align: center;\
        ",
        insertIntoDoc: {
            keyword: 'css;#top-search-wd',
            target: 'css;head',
            where: 'beforeBegin',
        },
    },
    {name: "我爱p2p",
        url: /^http:\/\/oabt\.org\/\?topic_title=/,
        engineList: "下载",
        enabled: true,
        style: "\
            border-bottom: 1px solid #3BA1DC;\
            border-top: 1px solid #3BA1DC;\
            text-align: center;\
        ",
        insertIntoDoc: {
            keyword: 'css;#username',
            target: 'css;#seamain',
            where: 'afterEnd',
        },
    },
    {name: "dmhy",
        url: /^https?:\/\/share\.dmhy\.org\/topics\/list/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;#keyword',
           target: 'css;.quick_search',
           where: 'afterEnd'
        }
    },
    {name: "kickass",
        url: /^https?:\/\/kickass\.to\/usearch\//,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               ",
        insertIntoDoc: {
           keyword: 'css;#search_box',
           target: 'css;.headmainpart',
           where: 'afterEnd'
        }
    },
    {name: "nyaa",
        url: /^https?:\/\/www\.nyaa\.se\/\?page/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               top:44px;\
               ",
        insertIntoDoc: {
           keyword: 'css;.inputsearchterm',
           target: 'css;#topbar',
           where: 'afterEnd'
        }
    },
    {name: "ed2000",
        url: /^https?:\/\/www\.ed2000\.com\/FileList\.asp/,
        engineList: "download",
        enabled: true,
        style: "\
               border: 1px solid #E5E5E5;\
               ",
        insertIntoDoc: {
           keyword: 'css;input[name=SearchWord]',
           target: 'css;.topsearch',
           where: 'afterEnd'
        },
    },
    {name: "旋风分享",
        url: /^https?:\/\/search\.t\.qq\.com\/index\.php\?(.*QQ%E6%97)/,
        engineList: "download",
        enabled: true,
        style: "\
               margin:0 auto;\
               border-top:1px solid #D4E9F7;\
               border-bottom:1px solid #D4E9F7;\
               ",
        insertIntoDoc: {
           keyword: function() {
               return getElement('css;#k2').value.substring(9)
           },
           target: 'css;.soso',
           where: 'beforeEnd'
        }
    },
    {name: "btspread",
        url: /^https?:\/\/www\.btspread\.com\/search\//,
        enabled: true,
        engineList: "download",
        style: '\
               word-break:keep-all;\
               white-space:nowrap;\
               ',
        insertIntoDoc: {
           keyword: 'css;input#search-keyword',
           target: 'css;.form-search',
           where: 'afterEnd'
        }
    },
    {name: "torrentkitty",
        url: /^https?:\/\/(www\.)?torrentkitty\.(com|org)\/search\//,
        enabled: true,
        engineList: "download",
        style: '\
               border-top:1px solid #FFFFFF;\
               border-bottom:1px solid #FFFFFF;\
               margin:0 auto;\
               margin-top:50px;\
               ',
        insertIntoDoc: {
           keyword: function() {
               return document.getElementsByTagName("h2")[0].innerHTML.slice(19, -1);
           },
           target: 'css;.wrapper',
           where: 'afterEnd'
        }
    },
    {name: "BTDigg",
        url: /^https?:\/\/btdigg\.org\/search\?/,
        enabled: true,
        engineList: "download",
        style: '\
               margin:0 auto;\
               border-top:1px solid #D4E9F7;\
               border-bottom:1px solid #D4E9F7;\
               ',
        insertIntoDoc: {
           keyword: 'css;input#searchq',
           target: 'css;.pager',
           where: 'beforeBegin'
        }
    },

    // 购物
    {name: "一淘",
        url: /^https?:\/\/s8?\.etao\.com\/search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-top:1px solid #D4E9F7;\
           border-bottom:1px solid #D4E9F7;\
           margin:0 auto;\
           word-break:keep-all;\
           white-space:nowrap;\
        ",
        insertIntoDoc: {
           keyword: 'css;#J_searchIpt',
           target: 'css;#etao-header-bd',
           where: 'beforeBegin'
        }
    },
    {name: "京东",
        url: /^https?:\/\/search\.jd\.com\/Search\?/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#key',
           target: 'css;#nav-2013',
           where: 'beforeBegin'
        }
    },
    {name: "淘宝搜索",
        url: /^https?:\/\/s\.taobao\.com\/search/,
        enabled: true,
        engineList: "购物",
        style: "\
           border-bottom: 1px solid #E5E5E5;\
           border-top: 1px solid #E5E5E5;\
        ",
        insertIntoDoc: {
           keyword: 'css;#q',
           target: 'css;.tb-container',
           where: 'beforeBegin',
        },
    },
    {name: "易迅",
        url: /^https?:\/\/searchex\.yixun\.com\/html\?/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           background-color:#FFFFFF;\
        ",
        insertIntoDoc: {
           keyword: 'css;#q_show',
           target: 'css;.ic_header',
           where: 'beforeEnd'
        }
    },
    {name: "苏宁",
        url: /^https?:\/\/(search)\.suning\.com\//,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-top:1px solid #E5E5E5;\
           margin:0 auto;\
        ",
        insertIntoDoc: {
           keyword: 'css;#searchKeywords',
           target: 'css;.g-header',
           where: 'afterEnd'
        }
    },
    {name: "天猫",
        url: /^https?:\/\/list\.tmall\.com\/\/?search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#mq',
           target: 'css;#mallNav',
           where: 'beforeBegin'
        }
    },
    {name: "亚马逊",
        url: /^https?:\/\/www\.amazon\.cn\/s\/ref/,
        enabled: true,
        engineList: "shopping",
        style: "\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#twotabsearchtextbox',
           target: 'css;#navbar',
           where: 'beforeEnd'
        }
    },
    {name: "当当",
        url: /^https?:\/\/search\.dangdang\.com\/\?key/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#key_S',
           target: 'css;#bd',
           where: 'beforeBegin'
        }
    },
    {name: "拍拍",
        url: /^https?:\/\/s\.paipai\.com\/[a-z]/,
        enabled: true,
        engineList: "shopping",
        style: "\
           text-align:left;\
        ",
        insertIntoDoc: {
           keyword: 'css;#KeyWord',
           target: 'css;.mod_s',
           where: 'beforeEnd'
        }
    },
    {name: "QQ网购",
        url: /^https?:\/\/se?\.wanggou\.com\/[a-z]/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           background-color:#C8C8C8;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
           margin-bottom:3px;\
        ",
        insertIntoDoc: {
           keyword: 'css;#KeyWord',
           target: 'css;.wg_header',
           where: 'afterEnd'
        }
    },
    {name: "360购物",
        url: /^https?:\/\/s\.mall\.360\.cn\/search/,
        enabled: true,
        engineList: "shopping",
        style: "\
           margin:0 auto;\
           word-break:keep-all;\
           white-space:nowrap;\
           border-bottom:1px solid #E5E5E5;\
           border-top:1px solid #E5E5E5;\
        ",
        insertIntoDoc: {
           keyword: 'css;#mall_keyword',
           target: 'css;.header',
           where: 'afterEnd'
        }
    },

    // 词典
    {name: "有道词典",
        url: /^https?:\/\/dict\.youdao\.com\/search/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            position:absolut;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#query',
            target: 'css;#scontainer',
            where: 'beforeBegin'
        }
    },
    {name: "爱词霸",
        url: /^https?:\/\/www\.iciba\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin-top:85px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#s',
            target: 'css;.header',
            where: 'beforeEnd'
        }
    },
    {name: "海词",
        url: /^https?:\/\/dict\.cn\/./,
        enabled: true,
        engineList: "translate",
        style: "\
            position:relative;\
            left:-150px;\
            top:-410px;\
            width:90px;\
            border:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#q',
            target: 'css;.floatsidenav',
            where: 'beforeEnd'
        }
    },
    {name: "沪江英语",
        url: /^https?:\/\/dict\.hjenglish\.com\/(en|w)/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#w',
            target: 'css;#xd_search',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("xd_search").style.height = "130px";
            document.getElementById("wrapper").style.top = "20px";
        }
    },
    {name: "沪江日语",
        url: /^https?:\/\/dict\.hjenglish\.com\/(404\/)?jp/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#w',
            target: 'css;#xd_search',
            where: 'beforeEnd'
        },
        etc: function() {
            document.getElementById("xd_search").style.height = "120px";
            document.getElementById("wrapper").style.top = "10px";
        }
    },
    {name: "汉典",
        url: /^https?:\/\/www\.zdic\.net\/sousuo/,
        enabled: true,
        engineList: "translate",
        style: "\
            word-break:keep-all;\
            white-space:nowrap;\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#q',
            target: 'css;.secpan',
            where: 'afterEnd'
        }
    },

    // 翻译
    {name: "google翻译",
        url: /^https?:\/\/translate\.google\./,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:0 auto;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#source',
            target: 'css;#gt-c',
            where: 'beforeBegin'
        }
    },
    {name: "百度翻译",
        url: /^https?:\/\/fanyi\.baidu\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            text-align:left;\
            margin-bottom:10px;\
            margin-top:0px;\
            border-bottom:1px solid #D4E9F7;\
            border-top:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#baidu_translate_input',
            target: 'css;.header',
            where: 'beforeBegin'
        }
    },
    {name: "有道翻译",
        url: /^https?:\/\/fanyi\.youdao\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin: 0 auto;\
            max-width: 1000px;\
            ",
        insertIntoDoc: {
            keyword: 'css;#inputText',
            target: '//body/*[1]',
            where: 'beforeBegin'
        }
    },
    {name: "bing词典",
        url: /^https?:\/\/(cn|www)\.bing\.com\/dict\/search\?/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin-top:80px;\
            border-top:1px solid #D4E9F7;\
            border-bottom:1px solid #D4E9F7;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#sb_form_q',
            target: 'css;#sb_form',
            where: 'afterEnd'
        }
    },
    {name: "bing翻译",
        url: /^https?:\/\/www\.bing\.com\/translator/,
        enabled: true,
        engineList: "translate",
        style: "\
            margin:5px auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#InputText',
            target: 'css;#Wrapper',
            where: 'afterBegin'
            // target: 'css;body',
            // where: 'beforeBegin'
        }
    },
    {name: "爱词霸翻译",
        url: /^https?:\/\/fy\.iciba\.com/,
        enabled: true,
        engineList: "translate",
        style: "\
            position:fixed;\
            width:90px;\
            top:100px;\
            left:40px;\
            border:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#inputC',
            target: 'css;body',
            where: 'beforeBegin'
        }
    },
    {name: "QQweibo",
        url: /^https?:\/\/search\.t\.qq\.com\/index|user\.php\?(?!.*QQ%E6%97)/,
        engineList: "sociality",
        enabled: true,
        style: "\
            margin:0 auto;\
            border-top:1px solid #D4E9F7;\
            border-bottom:1px solid #D4E9F7;\
            ",
        insertIntoDoc: {
            keyword: 'css;#k2',
            target: 'css;.soso',
            where: 'beforeEnd'
        }
    },
    {name: "weibo",
        url: /^https?:\/\/s\.weibo\.com\/weibo|user\//,
        engineList: "sociality",
        enabled: true,
        style: "\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;.searchInp_form',
            target: 'css;#pl_common_searchTop',
            where: 'afterEnd'
        }
    },
    {name: "射手字幕",
        url: /^https?:\/\/shooter\.cn\/search/,
        engineList: "web",
        enabled: true,
        style: "\
            margin:0 auto;\
            word-break:keep-all;\
            white-space:nowrap;\
            ",
        insertIntoDoc: {
            keyword: 'css;#key',
            target: 'css;#site_header',
            where: 'afterEnd'
        }
    },
];

var rule_default = {
	name: "通用规则",
    url: /.*/,
    enabled: true,
    style: "\
        margin: 0 auto;\
        max-width: 970px;\
    ",
    insertIntoDoc: {
        keyword: 'css;input[name="q"], input[name=word]',
        target: 'css;body',
        where: 'beforeBegin'
    }
};


if (typeof exports !== 'undefined') {
    exports.rules = rules;
}

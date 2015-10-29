
function Parser(){
    this.init.apply(this, arguments);
}

Parser.prototype = {
    constructor: Parser,
    get contentTxt() {  // callback 才有用
        var text = $('<div>').html(this.content).text().trim();

        // 解决第二个段落和第一个锻炼合在一起的问题
        text = text.replace(/([^\n])　　/, '$1\n　　');

        return text;
    },

    init: function (info, doc, curPageUrl) {
        this.info = info || {};
        this.doc = doc;
        this.$doc = $(doc);
        this.curPageUrl = curPageUrl || doc.URL;
        this._curPageHost = getUrlHost(this.curPageUrl);  // 当前页的 host，后面用到

        // 设置初始值
        this.isTheEnd = false;
        this.isSection = false;
    },
    applyPatch: function(){
        var contentPatch = this.info.contentPatch;
        if(contentPatch){
            try {
                contentPatch.call(this, this.$doc);
                C.log("Apply Content Patch Success.");
            } catch (e) {
                C.log("Error: Content Patch Error!", e);
            }
        }
    },
    getAll: function(callback){
        var self = this;

        C.debug('开始解析页面');

        this.applyPatch();

        var endFn = function(data) {
            if (data) {
                var div;
                if (data.content) {
                    div = $('<div id="content"></div>').html(data.content);
                } else if (data.html) {
                    div = $('<div></div>').html(data.html);
                }

                self.$doc.find('body').prepend(div);
            }

            self.parse();
            callback(self);
        };

        if (!this.hasContent() && this.info.getContent) {
            C.log('开始 info.getContent')
            this.info.getContent.call(this, this.$doc, endFn);
        } else {
            // 特殊处理，例如起点
            var ajaxScript = this.$doc.find('.' + READER_AJAX);
            if (ajaxScript.length > 0) {
                var url = ajaxScript.attr('src');
                if(!url) return;
                var charset = ajaxScript.attr('charset') || 'utf-8';

                C.log('Ajax 获取内容: ', url, ". charset=" + charset);

                var reqObj = {
                    url: url,
                    method: "GET",
                    overrideMimeType: "text/html;charset=" + charset,
                    headers: {},
                    onload: function(res){
                        var text = res.responseText;
                        text = text.replace(/document.write(ln)?\('/, "")
                                .replace("');", "")
                                .replace(/[\n\r]+/g, '</p><p>');

                        endFn({
                            content: text
                        });
                    }
                };

                // Jixun: Allow post data
                var postData = ajaxScript.data('post');

                if (postData) {
                    reqObj.method = 'POST';
                    reqObj.data = $.param(postData);
                    reqObj.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }

                GM_xmlhttpRequest(reqObj);
            } else {
                endFn();
            }
        }

        return this;
    },
    parse: function() {
        C.group('开始获取链接');
        this.getPrevUrl();
        this.getIndexUrl();
        this.getNextUrl();
        C.groupEnd();

        C.group('开始获取标题');
        this.getTitles();
        C.groupEnd();

        this.getContent();
    },

    hasContent: function() {
        var $content;

        // var $ajaxScript = this.$doc.find('.' + READER_AJAX);
        // if ($ajaxScript.length > 0) {
        //     return true;
        // }

        if(this.info.contentSelector){
            $content = this.$doc.find(this.info.contentSelector);
        }

        if (!$content || !$content.length) {
            // 按照顺序选取
            var selectors = Rule.contentSelectors;
            for(var i = 0, l = selectors.length; i < l; i++){
                $content = this.$doc.find(selectors[i]);
                if($content.length){
                    C.log("自动查找内容选择器: " + selectors[i]);
                    break;
                }
            }
        }

        this.$content = $content;
        // C.debug($content);

        return $content.size() > 0;
    },
    // 获取书名和章节标题
    getTitles: function(){
        var info = this.info,
            chapterTitle,
            bookTitle,
            docTitle = this.$doc.find("title").text();

        // 获取章节标题
        if (info.titleReg){
            var matches = docTitle.match(toRE(info.titleReg, 'i'));
            if(matches && matches.length == 3){
                var titlePos = ( info.titlePos || 0 ) + 1,
                    chapterPos = (titlePos == 1) ? 2 : 1;
                bookTitle = matches[titlePos].trim();
                chapterTitle = matches[chapterPos].trim();
            }

            C.log("TitleReg:", info.titleReg, matches);
        } else {
           chapterTitle = this.getTitleFromInfo(info.titleSelector);

           bookTitle = this.getTitleFromInfo(info.bookTitleSelector);
        }

        if(!chapterTitle){
            chapterTitle = this.autoGetChapterTitle(this.doc);
        }

        if (!bookTitle) {
            bookTitle = this.$doc.find(Rule.bookTitleSelector).text();
        }

        // 标题间增加一个空格，不准确，已注释
        chapterTitle = chapterTitle
                .replace(Rule.titleReplace, "")
                .trim();
                // .replace(/(第?\S+?[章节卷回])(.*)/, "$1 $2");

        // if (info.trimBookTitle !== false) {
        //     chapterTitle = chapterTitle.replace(bookTitle, '').trim();
        // }

        bookTitle = bookTitle.replace(/最新章节$/, '');

        docTitle = bookTitle ?
                bookTitle + ' - ' + chapterTitle :
                docTitle;

        if (Config.cn2tw) {
            bookTitle = this.convert2tw(bookTitle);
            chapterTitle = this.convert2tw(chapterTitle);
            docTitle = this.convert2tw(docTitle);
        }

        this.bookTitle = bookTitle || '目录';
        this.chapterTitle = chapterTitle;
        this.docTitle = docTitle;

        C.log("Book Title: " + this.bookTitle);
        C.log("Chapter Title: " + this.chapterTitle);
        C.log("Document Title: " + this.docTitle);
    },
    getTitleFromInfo: function(selectorOrArray) {
        var title = '';
        if (!selectorOrArray) {
            return title;
        }

        var selector,
            replace;

        if (_.isArray(selectorOrArray)) {
            selector = selectorOrArray[0];
            replace = selectorOrArray[1];
        } else {
            selector = selectorOrArray;
        }

        title = this.$doc.find(selector).remove().text().trim();

        if (replace) {
            title = title.replace(toRE(replace), '');
        }

        return title;
    },
    // 智能获取章节标题
    autoGetChapterTitle: function (document) {
        var
            _main_selector = "h1, h2, h3",
            _second_selector = "#TextTitle, #title, .ChapterName, #lbChapterName, div.h1",
            _positive_regexp = Rule.titleRegExp,
            // _positive_regexp = /第?\S+[章节卷回]|\d{2,4}/,
            // _negative_regexp = /[上前下后][一]?[页张个篇章节步]/,
            _title_remove_regexp = /最新章节|书书网/,
            $doc = $(document),
            _document_title = document.title ? document.title : $doc.find("title").text(),
            _search_document_title = ' ' + _document_title.replace(/\s+/gi, ' ') + ' '
        ;

        var _headings = $doc.find(_main_selector);
        // 加上 second selector 并去除包含的
        $doc.find(_second_selector).each(function(){
            if($(this).find(_main_selector).length === 0){
                _headings.push(this);
            }
        });

        var possibleTitles = {},
            _heading_text;

        C.groupCollapsed('自动查找章节标题');

        $(_headings).each(function(){
            var _heading = this,
                _heading_text = _heading.textContent.trim();

            if (_heading_text in possibleTitles) {
                return;
            }

            C.group('开始计算 "' + _heading_text + '" 的得分');

            // h1 为 1， h2 为 2
            var
                nodeNum = parseInt(_heading.nodeName.slice(1), 10) || 10,
                score = 10 / nodeNum,
                _heading_words = _heading_text.replace(/\s+/g, " ").split(" "),
                _matched_words = ""
            ;

            C.log("初始得分：" + score);

            // 后面这种是特殊的判断
            if (_positive_regexp.test(_heading_text) || /\d{2,4}/.test(_heading_text)) {
                score += 50;
            }
            // if(_negative_regexp.test(_heading_text)){
            //     score -= 100;
            // }

            C.log("符合正则计算后得分：" + score);

            //  count words present in title
            for (var j = 0, _j = _heading_words.length; j < _j; j++) {
                if (_search_document_title.indexOf(_heading_words[j]) > -1) {
                    _matched_words += _heading_words[j] + ' ';
                }
            }
            score += _matched_words.length * 1.5;

            C.log("跟页面标题比较后得分：" + score);

            var _font_size_text = "",
                _font_size_add_score = 0,
                _heading_style = window.getComputedStyle(_heading, null);
            if(_heading_style){
                _font_size_text = _heading_style.getPropertyValue("font-size") || 0;
                _font_size_add_score = parseInt(_font_size_text, 10) * 1.5;
            }

            score +=  _font_size_add_score;

            C.log("计算大小后得分：" + score);

            possibleTitles[_heading_text] = score;

            C.groupEnd();
        });

        // 找到分数最高的值
        var topScoreTitle,
            score_tmp = 0;
        for (_heading_text in possibleTitles) {
            if (possibleTitles[_heading_text] > score_tmp) {
                topScoreTitle = _heading_text;
                score_tmp = possibleTitles[_heading_text];
            }
        }

        var curTitle = topScoreTitle;
        if (!curTitle) {
            curTitle = _document_title;

            // 下面的正则从
            //     Firefox-Firefox浏览器论坛-卡饭论坛 - 互助分享 - 大气谦和!
            // 变为
            //     Firefox-Firefox浏览器论坛-卡饭论坛
            curTitle = curTitle.replace(/\s-\s.*/i, "")
                .replace(/_[^\[\]【】]+$/, "");
            curTitle = curTitle.trim();
            curTitle = curTitle.replace(_title_remove_regexp, '');
        }

        curTitle = curTitle.replace(Rule.titleReplace, "");

        C.groupEnd();

        return curTitle;
    },

    // 获取和处理内容
    getContent: function(){
        var self = this;

        this.hasContent();

        if (this.$content.size() <= 0) {
            // callback(this);
            console.error('没有找到内容', this.$doc);
            return;
        }

        this.content = this.handleContentText(this.$content.html(), this.info);
    },
    handleContentText: function(text, info){
        if(!text) return null;

        // 贴吧的内容处理比较耗时间
        C.group('开始内容处理');
        C.time('内容处理');

        var contentHandle = (typeof(info.contentHandle) == 'undefined') ? true : info.contentHandle;

        // 拼音字、屏蔽字修复
        if(contentHandle){
            text = this.replaceHtml(text);
        }

        /* Turn all double br's into p's */
        text = text.replace(Rule.replaceBrs, '</p>\n<p>');
        text = text.replace(/<\/p><p>/g, "</p>\n<p>");

        // GM_setClipboard(text);

        // 移除文字广告等
        text = this.replaceText(text, Rule.replaceAll);

        // 去除内容中的标题
        if(this.chapterTitle && Rule.titleRegExp.test(this.chapterTitle)){
            try {
                var reg = toReStr(this.chapterTitle).replace(/\s+/g, '\\s*');
                reg = new RegExp(reg, 'ig');
                text = text.replace(reg, "");
                C.log('去除内容中的标题', reg);
            } catch(e) {
                console.error(e);
            }
        }

        if (this.bookTitle) {
            var regStr = '（' + toReStr(this.bookTitle) + '\\d*章）'
            text = text.replace(new RegExp(regStr, 'ig'), "");
        }

        if (info.contentReplace) {
            text = this.replaceText(text, info.contentReplace);
        }

        if (Config.cn2tw) {
            text = this.convert2tw(text);
        }

        try {
            text = this.contentCustomReplace(text);
        } catch(ex) {
            console.error('自定义替换错误', ex);
        }

        // 采用 DOM 方式进行处理
        var $div = $("<div>").html(text);

        // contentRemove
        $div.find(Rule.contentRemove).remove();
        if(info.contentRemove){
            $div.find(info.contentRemove).remove();
        }

        // 给独立的文本加上 p
        $div.contents().filter(function() {
            return this.nodeType == 3 &&
                this.textContent != '\n' &&
                (!this.nextElementSibling || this.nextElementSibling.nodeName != 'A') &&
                (!this.previousElementSibling || this.previousElementSibling.nodeName != 'A');
        }).wrap('<p>');

        // 删除无效的 p，排除对大块文本的判断
        $div.find('p').filter(function() {
            var $this = $(this);
            if ($this.find('img').size())  // 排除有图片的
                return false;

            // 有效文本（排除注释、换行符、空白）个数为 0
            return $this.contents().filter(function() {
                return this.nodeType != 8 &&
                        !this.textContent.match(/^\s*$/);
            }).size() == 0;
        }).remove();

        // 把一大块的文本分段
        if (Config.split_content) {
            var $p = $div.find('p'),
                $newP;
            if ($p.length == 0 ) {
                $newP = $div;
            } else if ($p.length == 1) {
                $newP = $p;
            }

            if ($newP) {
                $newP.replaceWith('<p>' + this.splitContent($newP.html()).join('</p>\n<p>') + '</p>');
            }
        }

        if(contentHandle){
            $div.filter('br').remove();

            $div.find('*').removeAttr('style');
        }

        $div.find('p').removeAttr('class');

        // 图片居中，所有图像？
        // if(info.fixImage){
        //     $div.find("img").each(function(){
        //         this.className += " blockImage";
        //     });
        // }

        text = $div.html();

        // 修复第一行可能是空的情况
        text = text.replace(/(?:\s|&nbsp;)+<p>/, "<p>");

        // 修复当行就一个字符的
        text = text.replace(/<\/p><p>([。])/, "$1");

        if(config.paragraphBlank){
            text = text.replace(/<p>(?:\s|&nbsp;)+/g, "<p>")
                    .replace(/<p>/g, "<p>　　");
        }

        // 删除空白的、单个字符的 p
        text = text.replace(Rule.removeLineRegExp, "");

        C.timeEnd('内容处理');
        C.groupEnd();

        return text;
    },
    replaceHtml: function(text, replaceRule) {  // replaceRule 给“自定义替换规则直接生效”用
        if (!replaceRule) {
            replaceRule = Rule.replace;
        }

        // 先提取出 img
        var imgs = {};
        var i = 0;
        text = text.replace(/<(img|a)[^>]*>/g, function(img){
            imgs[i] = img;
            return "{" + (i++) + "}";
        });

        // 修正拼音字等
        text = this.contentReplacements(text, replaceRule);

        // 还原图片
        text = $.nano(text, imgs);

        return text;
    },
    contentReplacements: function (text, rule) {
        if (!text) return text;

        for (var key in rule) {
            text = text.replace(toRE(key, "ig"), rule[key]);
        }
        return text;
    },
    replaceText: function(text, rule){
        var self = this;
        switch(true) {
            case _.isRegExp(rule):
                text = text.replace(rule, '');
                break;
            case _.isString(rule):
                // 还原简写
                _.each(CHAR_ALIAS, function(value, key) {
                    rule = rule.replace(key, value);
                });
                var regexp = new RegExp(rule, 'ig');
                text = text.replace(regexp, '');
                break;
            case _.isArray(rule):
                rule.forEach(function(r){
                    text = self.replaceText(text, r);
                });
                break;
            case _.isObject(rule):
                var key;
                for(key in rule){
                    text = text.replace(new RegExp(key, "ig"), rule[key]);
                }
                break;
        }
        return text;
    },
    convert2tw: function (text) {
        if (!text) return text;

        var ii, len, str;
        str = text.split("");
        len = str.length;
        for (ii = 0; ii < len; ii++) {
            str[ii] = cn2tw[str[ii]] || str[ii];
        }

        str = str.join("");

        return str;
    },
    contentCustomReplace: function (text) {
        if (!text) return text;

        for (var key in Rule.customReplace) {
            text = text.replace(new RegExp(key, 'ig'), Rule.customReplace[key]);
        }
        return text;
    },
    splitContent: function (text) {  // 有些章节整个都集中在一起，没有分段，这个函数用于简易分段
        if (text.indexOf('。') == -1) {
            return [text];
        }

        var hasMark = false,
            lines = []
            charCotainer = [];

        text.split('').forEach(function(c) {
            charCotainer.push(c);

            if (c == '“') {
                hasMark = true;
            } else if (c == '”') {
                hasMark = false;
            } else if (c == '。' && !hasMark) {
                lines.push(charCotainer.join(''));
                charCotainer = [];
            }
        });

        return lines;
    },

    // 获取上下页及目录页链接
    getPrevUrl: function(){
        var url = '',
            link, selector;

        if (this.info.prevSelector === false) {
            this.prevUrl = url;
            return url;
        }

        if (this.info.prevUrl && _.isFunction(this.info.prevUrl)) {
            url = this.info.prevUrl(this.$doc);
            url = this.checkLinks(url);
        }

        if (!url) {
            selector = this.info.prevSelector || Rule.prevSelector;
            link = this.$doc.find(selector);
            if(link.length){
                url = this.checkLinks(link);
            }
        }

        if (url) {
            C.log("找到上一页链接: " + url);
        } else {
            C.log("无法找到上一页链接");
        }

        this.prevUrl = url || '';
        return url;
    },
    getIndexUrl: function(){
        var url = '',
            link;

        if (this.info.indexSelector === false) {
            this.indexUrl = url;
            return url;
        }

        if (this.info.indexSelector && _.isFunction(this.info.indexSelector)) {
            url = this.info.indexSelector(this.$doc);
        } else if(this.info.indexSelector){
            link = this.$doc.find(this.info.indexSelector);
        } else {
            var selectors = Rule.indexSelectors;
            var _indexLink;
            // 按照顺序选取目录链接
            for(var i = 0, l = selectors.length; i < l; i++){
                _indexLink = this.$doc.find(selectors[i]);
                if(_indexLink.length > 0){
                    link = _indexLink;
                    break;
                }
            }
        }

        if(link && link.length){
            url = this.checkLinks(link);
            C.log("找到目录链接: " + url);
        }

        if (!url) {
            C.log("无法找到目录链接.");
        }

        this.indexUrl = url;
        return url;
    },
    getNextUrl: function(){
        var url = '',
            link,
            selector = this.info.nextSelector || Rule.nextSelector;

        if (this.info.nextSelector === false) {
            this.nextUrl = url;
            return url;
        }

        if (this.info.nextUrl && _.isFunction(this.info.nextUrl)) {
            url = this.info.nextUrl(this.$doc);
            url = this.checkLinks(url);
        }

        if (!url) {
            link = this.$doc.find(selector);
            if(link.length){
                url = this.checkLinks(link);
            }
        }

        if (url) {
            C.log("找到下一页链接: " + url);
        } else {
            C.log("无法找到下一页链接");
        }

        this.nextUrl = url || '';
        this.isTheEnd = !this.checkNextUrl(url);
        if(this.isTheEnd){
            this.theEndColor = config.end_color;
        }

        return url;
    },
    checkNextUrl: function(url){
        if (this.info.checkSection) {
            if (/\/\d+_\d+\.html$/.test(this.curPageUrl)) {
                this.isSection = true;
                if(url == this.indexUrl){
                    return false;
                }else{
                    return true;
                }
            }
        }

        // 跟 include 比较
        var includeUrl = this.info.includeUrl || this.getIncludeUrl();
        if (!toRE(includeUrl).test(url))
            return false;

        switch(true){
            case url === '':
            case Rule.nextUrlIgnore.some(function(re) { return toRE(re).test(url) }):
            case url === this.indexUrl:
            case url === this.prevUrl:
            case url === this.curPageUrl:
            case Rule.nextUrlCompare.test(this.prevUrl) && !Rule.nextUrlCompare.test(url):
                return false;
            default:
                return true;
        }
    },
    getIncludeUrl: function() {
        var includeUrl = this.info.url;

        if (!includeUrl && typeof GM_info !== 'undefined') {
            var locationHref = location.href;
            GM_info.script.includes.some(function(includeStr) {
                var iUrl = wildcardToRegExpStr(includeStr);
                if (toRE(iUrl).test(locationHref)) {
                    includeUrl = iUrl;
                    return true;
                }
            });
        }

        this.info.includeUrl = includeUrl;
        return includeUrl;
    },
    checkLinks: function(links){
        var self = this;
        if (_.isString(links)) {
            return this.getFullHref(links);
        }

        var url = "";
        links && links.each(function(){
            url = $(this).attr("href");
            if(!url || url.indexOf("#") === 0 || url.indexOf("javascript:") === 0)
                return;

            url = self.getFullHref(this);
            return false;
        });

        return url;
    },
    getLinkUrl: function(linkOrUrl) {
        // if (linkOrUrl && )
        return linkOrUrl;
    },
    getFullHref: function(href) {
        if(!href) return '';

        if (!_.isString(href)) {
            href = href.getAttribute('href');
        }

        if (href.indexOf('http://') === 0) {
            return href;
        }

        var a = this.a;
        if (!a) {
            this.a = a = document.createElement('a');
        }
        a.href = href;

        // 检测 host 是否和 当前页的一致
        if (a.host != this._curPageHost) {
            a.host = this._curPageHost;
        }

        return a.href;
    },
};

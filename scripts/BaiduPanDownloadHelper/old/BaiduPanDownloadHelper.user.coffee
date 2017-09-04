`
// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper
// @version        3.0
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    批量导出百度盘的下载链接
// @grant          GM_setClipboard
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @homepageURL    http://userscripts.org/scripts/show/162138
// @updateURL      http://userscripts.org/scripts/source/162138.meta.js
// @downloadURL    https://userscripts.org/scripts/source/162138.user.js
// @include        *n.baidu.com/share/link*
// @include        *n.baidu.com/s/*
// @include        http://yun.baidu.com/share/home*
// @include        http://yun.baidu.com/pcloud/album/info*
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// @run-at         document-end
// ==/UserScript==
`

Config =
    COPY_TPL: '{dlink}'
    ARIA2C_TPL: 'aria2c -c -x 10 -s 10 --out "{server_filename}" "{dlink}"'
    TRIM_TITLES: [  # 文件名移除的部分
        " [v.BDpan.COM]",
    ]
    debug: true

debug = if Config.debug then console.debug.bind(console) else ->

# 
isChrome = !! this.chrome

# 引用网页变量
FileUtils = unsafeWindow.FileUtils
Utilities = unsafeWindow.Utilities
disk = unsafeWindow.disk
Page = unsafeWindow.Page

class App
    constructor: ->
        pageType = @determineCurrentPageType()
        if pageType
            @processPage(pageType)

    determineCurrentPageType: ->
        path = location.pathname
        switch path
            when '/share/home' then pageType = 'shareHome'
            when '/disk/home' then pageType = 'diskHome'
            when '/pcloud/album/info' then pageType = 'album'
            else
                if path is '/share/link' or path.indexOf('/s/') != -1
                    pageType = if document.getElementById('barCmdTransfer') then 'shareDir' else 'shareOne'
        debug "pageType: ", pageType

        return pageType

    processPage: (pageType) ->
        @allPageProcessor()

        this[pageType + 'PageProcessor']?()

    allPageProcessor: ->
        # 去掉云管家提示，来自 Crack Url Wait Code Login For Chrome
        unsafeWindow.navigator.__defineGetter__('platform', -> "")

    shareOnePageProcessor: ->
        # By Yulei  Share easy downloads helper
        $('#downFileButtom').attr
                "href": $.parseJSON(disk.util.ViewShareUtils.viewShareData).dlink
            .find('b').css('color', 'red')

    shareHomePageProcessor: ->
        $('section.flag10-fns')
            .attr('title', '双击复制所有链接')
            .dblclick((e) => @copyAllLinks(e.target))

    diskHomePageProcessor: ->
        @API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1'

    albumPageProcessor: ->
        _mAlbumId = (disk.ui.album.albuminfo && disk.ui.album.albuminfo.album_id) || disk.getParam("album_id")
        _mUk = (disk.ui.album.uinfo && disk.ui.album.uinfo.uk) || disk.getParam("uk") || disk.getParam("query_uk")
        @API_URL = "/pcloud/album/listfile?album_id=" + _mAlbumId + "&query_uk=" + _mUk + "&start=0" + "&limit=100"

    shareDirPageProcessor: ->
        GM_addStyle Res.shareDirCSS

        #  添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .appendTo('#file_action_buttons')
            .click (e) => @downloadAll()

        # 得到 API URL
        shareId = FileUtils.share_id || disk.getParam['shareid']
        uk = FileUtils.sysUK || disk.getParam['uk']
        @API_URL = '/share/list?channel=chunlei&clienttype=0&web=1&page=1&shareid=' + shareId + '&uk=' + uk

    downloadAll: ->
        @notice = Utilities.useToast
            toastMode: disk.ui.Toast.MODE_CAUTION
            msg: "正在获取中，请稍后..."
            sticky: true

        @getCheckedItems()

    copyAllLinks: (elem) ->
        urls = []
        $('.file-item, .sharegrid-des').each () ->
            url = $(this).attr('_link') || $(this).attr('_href')
            title = $(this).find('div[title], .sharegrid-des-title').attr('title')

            if url
                # 去除标题的广告文字
                $.map Config.TRIM_TITLES, (s) ->
                    title = title.replace(s, '')

                urls.push title + '\n\r' + url

        @copy urls, false

    getCheckedItems: ->
        @checkedItems = FileUtils.getListViewCheckedItems?()
        if not @checkedItems
            return

        @fetchCount = 0
        for item in @checkedItems
            if parseInt(item.isdir, 10) is 1
                @fetchCount += 1
                @getList item

        # 没有文件夹的情况
        @handleResult()

    getList: (item) ->
        dir = item.path or disk.getParam('dir/path')
        restUrl = @API_URL + (if dir then '&dir=' + encodeURIComponent(dir) else '')

        debug '获取数据', restUrl
        $.get restUrl, (result) =>
            debug '获取数据成功', result
            @fetchCount -= 1
            if result? and parseInt(result.errno) is 0 and result.list?
                item.children = result.list
                @handleResult(item)
            else
                Utilities.useToast
                    toastMode: disk.ui.Toast.MODE_CAUTION
                    msg: "获取数据出错, " + restUrl
                    sticky: false

    handleResult: (item) ->
        if @fetchCount is 0
            debug "全部文件夹获取完成", @checkedItems
            @showPanel()
            @notice.setVisible(false)

    showPanel: ->
        if not @$panel
            @$panel = @createPanel()
        else
            linksHTML = @createDLinksHtml()
            $("#mDownload-links").html(linksHTML)
            @$panel.show()

    createPanel: ->
        $container = $('<div>').attr('id', 'mDownload-container')
        linksHTML = @createDLinksHtml();

        $('<button>').attr('id', 'mDownload-close-button')
            .html('关闭')
            .appendTo($container)
            .click =>
                $container.hide()
                @checkedItems = null

        $('<button>').attr('id', 'mDownload-export-button')
            .html('导出')
            .appendTo($container)
            .click ->
                GM_openInTab 'data:text/html;charset=utf-8,' + encodeURIComponent(linksHTML)

        $('<button>').attr('id', 'mDownload-copy-button')
            .html('复制')
            .appendTo($container)
            .click =>
                @copyDlinks()

        $('<button>').attr('id', 'mDownload-copy-aria2-button')
            .html('复制 Aria2c')
            .appendTo($container)
            .click =>
                @copyDlinks(null, 'aria2c')

        $linksDiv = $('<div>').attr('id', 'mDownload-links')
            .html(linksHTML)
            .appendTo($container)

        $container.appendTo('body')

        return $container;

    dir_tpl: "<b style='padding-left:{padding_left}'>{server_filename}</b>"

    dlinks_tpl: "<a class='dlinks' href={dlink} style='padding-left:{padding_left}'>{server_filename}</a>"

    createDLinksHtml: ->
        htmls = []
        isAdded = false
        for item in @checkedItems
            item.padding_left = "0px"
            if parseInt(item.isdir, 10) is 1
                htmls.push template(@dir_tpl, item)
                if not item.children then continue

                for i in item.children
                    i.padding_left = "15px"
                    if i.dlink
                        htmls.push template(@dlinks_tpl, i)
                    else
                        htmls.push template(@dir_tpl, i)
            else if item.dlink
                if not isAdded
                    htmls.push "<b>---------------</b>"
                    isAdded = true
                htmls.push template(@dlinks_tpl, item)

        return  htmls.join("<br>")

    copyDlinks: (items, tpl) ->
        items = items or @checkedItems
        tpl = tpl or Config.COPY_TPL

        arr = []
        for item in items
            if item.children
                item.children.forEach (i)->
                    arr.push template(tpl, i)
            else
                arr.push template(tpl, item)

       return @copy arr

    copy: (arr, isDlink = true) ->
        GM_setClipboard arr.join(if isChrome then '\r' else '\n'), 'text'

        Utilities.useToast
            toastMode: disk.ui.Toast.MODE_CAUTION
            msg: '已经复制 <b>' + arr.length + '</b> 条' + (if isDlink then '下载' else '') + '链接到剪贴板'
            sticky: false

Res =
    shareDirCSS: """
        #mDownload-container{
            position: fixed;
            z-index: 1000;
            left: 314px;
            top: 120px;
            background: white;
            padding: 10px;
            border: 1px solid rgb(153, 153, 153);
            box-shadow: 0px 0px 9px rgb(153, 153, 153);
        }
        #mDownload-container button{
            margin-right: 10px;
        }
        #mDownload-links{
            margin-top: 10px;
            max-height: 400px;
            overflow: auto;
        }
        #mDownload-links b{
            color: red;
        }
        """

# 来自 ThunderLixianExporter.user.js      
ARIA2 = ( ->
    jsonrpc_version = '2.0'
   
    get_auth = (url) ->
        url.match(/^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(?:\/\/)?(?:([^:@]*(?::[^:@]*)?)?@)?/)[1]

    request = (jsonrpc_path, method, params) ->
        request_obj =
            jsonrpc: jsonrpc_version
            method: method
            id: (new Date()).getTime().toString()

        if params then request_obj['params'] = params

        xhr = new XMLHttpRequest()
        auth = get_auth jsonrpc_path
        xhr.open "POST", jsonrpc_path + "?tm=" + (new Date()).getTime().toString(), true
        xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"
        if auth then xhr.setRequestHeader "Authorization", "Basic " + btoa(auth)
        xhr.send JSON.stringify(request_obj)

    return (jsonrpc_path) ->
        @jsonrpc_path = jsonrpc_path;
        @addUri = (uri, options) ->
            request(@jsonrpc_path, 'aria2.addUri', [[uri, ], options])
        return this
)()

`
function template(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split('.'),
            value = data[keys.shift()];
        keys.forEach(function(key) {
            value = value[key];
        });
        return (value === null || value === undefined) ? '' : value;
    });
}
`

app = new App()
// ==UserScript==
// @name          cnbeta-comments
// @namespace     http://hackwaly.me/user-js/cnbeta-comments/
// @description   show "expired" comments in "cnbeta.com"
// @include       http://www.cnbeta.com/articles/*
// @include       http://cnbeta.com/articles/*
// @author        hackwaly@gmail.com
// @updateURL     http://userscripts.org/scripts/source/152818.meta.js
// @downloadURL   http://userscripts.org/scripts/source/152818.user.js
// @version       0.5.0
// @thanks        FlyingSnow
// @grant         GM_xmlhttpRequest
// ==/UserScript==

var target = document.querySelector(".hotcomments");
var observer = new MutationObserver(function(e){
    // 被隐藏了
    console.log("开始获取隐藏的评论")
    run();
    observer.disconnect();
});
observer.observe(target, { attributes: true });
setTimeout(function(){
    observer.disconnect();
}, 30 * 1000);

function run(){
    var contentElm = document.getElementById('J_hotcommt_list');
    var articleId = /\/([0-9]+)\..*$/.exec(location.href)[1];
    var tplComment = '<li><div class="comContent"><p class="title"><span class="userName">#{name}</span>' +
        '<span class="time">#{date}</span></p><div class="con"><em id="hotcon#{tid}">#{commentHTML}</em></div>' +
        '</div><div class="re_mark"><span action-tid="#{tid}">' +
        '<a class="commt_a_link" action-type="share" href="javascript:;" title="分享"><span class="b">分享</span></a>' +
        '<a class="commt_a_link" supported="false" action-type="support" href="javascript:;" title="支持"><span>支持(<em>#{support}</em>)</span></a>' +
        '<a class="commt_a_link" againsted="false" action-type="against" href="javascript:;" title="反对"><span>反对(<em>#{against}</em>)</span></a>' +
        '<a class="commt_a_link" reported="false" action-type="report" href="javascript:;" title="此评论有问题，点击举报"><span>举报</span></a>' +
        '<a class="commt_a_link" action-type="reply" href="javascript:;"><span>回复</span></a></span></div></li>';
    var reUnicoded = /[\u00FF-\uFFFF]/;
    var reHasMojibake = /[\u0081-\u00FE][\u0040-\u007E\u0080-\u00FE]/;

    function createBlobURLUnsafe(array, mimeType){
        var blob = null;
        try {
            blob = new Blob(array, { type: mimeType });
        } catch(ex){
            var builder = new (
                window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MsBlobBuilder ||
                    window.oBlobBuilder)();
            array.forEach(function (item){
                builder.append(item);
            });
            blob = builder.getBlob(mimeType);
        }
        return (
            window.webkitURL ||
                window.mozURL ||
                window.msURL ||
                window.oURL ||
                window.URL).createObjectURL(blob);
    }
    function createBlobURL(array, mimeType){
        try {
            return createBlobURLUnsafe(array, mimeType);
        } catch (ex){}
        return null;
    }

    var MAGIC = 'cnbeta_comments_gbk_to_unicode';
    function requestGbk2Unicode(data, callback){
        var blobUrl = createBlobURL([
            '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="gbk"/>' +
                '<title></title>' +
                '</head>' +
                '<body>' +
                '<script id="mojibake" type="text/cdata">', data, '</script>' +
                '<script>' +
                'parent.postMessage("', MAGIC, '" + document.getElementById("mojibake").text, "*");' +
                '</script>' +
                '</body>' +
                '</html>'], 'text/html');
        if (blobUrl) {
            var iframe = document.createElement('iframe');
            iframe.style.cssText = 'position:absolute;left:-9999em;top:-9999em;visibility:hidden;';
            var cleanUp = function (){
                if (iframe) {
                    iframe.parentNode.removeChild(iframe);
                    iframe = null;
                }
            };
            window.addEventListener('message', function (evt){
                var data = evt.data || '';
                if (data.slice(0, MAGIC.length) === MAGIC) {
                    window.removeEventListener('message', arguments.callee, false);
                    cleanUp();
                    callback(data.slice(MAGIC.length));
                }
            }, false);
            setTimeout(function (){
                cleanUp();
            }, 16000);
            iframe.setAttribute('src', blobUrl);
            (document.body ||
                document.getElementsByTagName('head')[0] ||
                document.documentElement).appendChild(iframe);
        }
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.cnbeta.com/api/getComment.php?article=' + articleId,
        onload: function (response){
            document.querySelector('.hotcomments').style.display = 'block';
            var comments = JSON.parse(response.responseText);
            var hasMojibake = false;
            var mojibakes = [];
            comments.forEach(function (comment, index){
                var commentString = comment['comment'] || '';
                if (!reUnicoded.test(commentString) && reHasMojibake.test(commentString)) {
                    hasMojibake = true;
                    comments[index]['comment'] = '[被乱码和谐的评论内容]';
                    mojibakes.push({
                        content: commentString,
                        applier: function (comments, decoded){
                            comments[index]['comment'] = decoded;
                        }
                    });
                }
                var authorString = comment['name'] || '';
                if (!reUnicoded.test(authorString) && reHasMojibake.test(authorString)) {
                    hasMojibake = true;
                    comments[index]['name'] = '[被乱码和谐的评论员]';
                    mojibakes.push({
                        content: authorString,
                        applier: function (comments, decoded){
                            comments[index]['name'] = decoded;
                        }
                    });
                }
            });
            renderComments(comments);

            if (!hasMojibake) return;
            // clone one.
            comments = JSON.parse(response.responseText);
            var concated = mojibakes.map(function (mojibake){
                return mojibake.content;
            }).join('');

            var data = new Uint8Array(concated.length);
            for (var i=0; i<concated.length; i++) {
                data[i] = concated.charCodeAt(i) & 0xFF;
            }

            requestGbk2Unicode(data, function (decoded){
                var offset = 0;
                mojibakes.forEach(function (mojibake){
                    var length = mojibake.content.length >> 1;
                    mojibake.applier(comments, decoded.slice(offset, offset + length));
                    offset += length;
                });
                renderComments(comments);
            });
        }
    });

    var _escapeMap = {
        ' ': '&nbsp;',
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;'
    };
    function _escape(m){
        return _escapeMap[m];
    }
    function encodeHtml(str, noBreak){
        str = str.replace(/[ <>&"]/g, _escape);
        if (!noBreak) {
            str = str.replace(/\r?\n/g, '<br/>');
        }
        return str;
    }
    function renderComments(comments){
        var totalVotes = 0;
        comments.forEach(function (comment, index){
            comment["floor"] = index;
            comment["aid"] = articleId;
            comment["name"] = encodeHtml(comment["name"], true) || '匿名人士';
            comment["commentHTML"] = encodeHtml(comment["comment"], false);
            var supportVotes = Number(comment["support"]);
            var againstVotes = Number(comment["against"]);
            var votes = supportVotes + againstVotes;
            comment._votes = votes;
            totalVotes += votes;
        });
        comments.sort(function (a, b){
            return b._votes - a._votes;
        });
        var hotVotes = totalVotes * 8 / 10;
        var tempVotes = 0;
        var hotIndex = 0;
        while (hotIndex < comments.length) {
            tempVotes += comments[hotIndex]._votes;
            if (tempVotes > hotVotes) {
                break;
            }
            hotIndex ++;
        }
        comments = comments.slice(0, hotIndex);
        contentElm.innerHTML = comments.map(function (comment){
            return format(tplComment, comment);
        }).join('');
    }

    function format(tpl, ctx){
        return tpl.replace(/#\{([^\}]+)\}/g, function (m, p1){
            return ctx[p1];
        });
    }
}
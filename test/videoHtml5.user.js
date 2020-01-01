// ==UserScript==
// @name         video Html5
// @namespace    https://github.com/ywzhaiqi
// @version      0.1
// @description  enter something useful
// @author       You
// @include      http://v.qq.com/cover/k/*.html
// @grant        GM_xmlhttpRequest
// @noframes
// ==/UserScript==



var ns = {
    parseByFlvxz: function(url) {
        url = 'https://q1.flvxz.com/getFlv.php?url=' + utf8_to_b64(url);

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                'Referer': 'http://flvxz.com/'
            },
            onload: function(response) {
                console.log(response.responseText);
            }
        });
    }
};


function run() {
    var player = document.querySelector('#mod_player embed');
    if (!player) {
        console.error('没有找到播放器')
        return;
    }
    player.style.display = 'none';

    var videoUrl = 'http://video.dispatch.tc.qq.com/90360058/m0015lsh4v6.p201.1.mp4?vkey=C353E990034D5268A25D4F89B7393A9B252B6D5C2DFE66B67DEE61C7C65786FCD4B3884AAFA075710620DA90450B600C311FFBBDDECE56AE';

    var video = document.createElement('video');
    video.src = videoUrl;
    video.controls = "controls";
    video.autoplay = "true";
    video.width = "898";

    player.parentNode.parentNode.appendChild(video);

    document.getElementById('btn_player_expand').click();
}

// run()


function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

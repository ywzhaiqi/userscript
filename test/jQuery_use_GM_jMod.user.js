// ==UserScript==
// @name         让 jQuery 使用 GM_xmlhttpRequest jMod
// @filename     jQuery_use_GM_jMod.user.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  必须有 dataType: 'html',
// @author       yyy
// @include      http://y.guten.me/
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==


var jMod = {
    jQueryExtensions: {}
};

// 让外部 jQuery 直接使用 GM_xmlhttpRequest
// 来源：https://github.com/jgjake2/myUserJS-API/blob/master/src/jQuery/Ajax.js

+
(function() {


    function mExportFunction(func, scope, args) {
        if (EXISTS(exportFunction)) {
            try {
                return exportFunction(func, scope, args);
            } catch (e) {}
        }
        var name = '';
        if (args && args.defineAs)
            name = args.defineAs;
        else if (typeof func === "function" && func.name != '')
            name = func.name
        if (name != '')
            try { return (scope[name] = func); } catch (e) {}
    }

    +
    function() {
        jMod.jQueryExtensions.CrossOriginSupportTransportFn = function(_jQueryObj, dataType) {
            return function(options, originalOptions, jqXHR) {
                var CrossOriginEnabled = true;
                try {
                    CrossOriginEnabled = jMod.Config("jQueryExtensions.CrossOrigin");
                } catch (e) {}
                if ('undefined' != typeof GM_xmlhttpRequest && CrossOriginEnabled) {
                    var extend = (_jQueryObj || $ || jMod).extend,
                        mergedOptions = extend(true, {}, options, originalOptions),
                        optionMap = {
                            context: "context",
                            overrideMimeType: "overrideMimeType",
                            timeout: "timeout",
                            username: "user",
                            password: "password",
                            onreadystatechange: "onreadystatechange",
                            ontimeout: "ontimeout",
                            onprogress: "onprogress",
                            binary: "binary"
                        };
                    return {
                        send: function(headers, callback) {
                            var origType = (originalOptions.dataType || "").toLowerCase(),
                                gm_request_options = {
                                    method: options.type || "GET",
                                    url: options.url,
                                    data: extend({}, options.data || {}, originalOptions.data || {}),
                                    headers: headers,
                                    onload: function(response) {
                                        var dResponse = {
                                                text: response.responseText
                                            },
                                            rContentType = "",
                                            key;
                                        try {
                                            rContentType = /Content-Type:\s*([^\s]+)/i.exec(response.responseHeaders)[1];
                                        } catch (e) {}
                                        if ("html" === origType || /text\/html/i.test(rContentType)) dResponse.html = response.responseText;
                                        else if ("json" === origType || "text" !== origType && /\/json/i.test(rContentType)) try {
                                            dResponse.json = $.parseJSON(response.responseText);
                                        } catch (e) {} else if ("xml" == origType || "text" !== origType && /\/xml/i.test(rContentType))
                                            if (response.responseXML) dResponse.xml = response.responseXML;
                                            else try {
                                                dResponse.xml = new DOMParser().parseFromString(response.responseText, "text/xml");
                                            } catch (e) {}
                                        callback(200, "success", dResponse, response.responseHeaders);
                                    },
                                    onerror: function(response) {
                                        callback(404, "error", {
                                            text: response.responseText
                                        }, response.responseHeaders);
                                    }
                                };
                            for (key in optionMap)
                                if ('undefined' != typeof mergedOptions[key]) gm_request_options[optionMap[key]] = mergedOptions[key];
                            if (false === mergedOptions.async) gm_request_options.synchronous = true;
                            GM_xmlhttpRequest(gm_request_options);
                        },
                        abort: function() {}
                    };
                }
            };
        };

        function exportjQueryTransportFn(_jQueryObj, dataType) {
            return unsafeWindow.globaljQueryCrossOriginSupportFn || (jMod.jQueryExtensions._globaljQueryCrossOriginSupportFn = mExportFunction(jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType), unsafeWindow, {
                defineAs: "globaljQueryCrossOriginSupportFn",
                allowCallbacks: true,
                allowCrossOriginArguments: true
            }));
        }
        jMod.jQueryExtensions.addCrossOriginSupport = function(_jQueryObj, dataType) {
            if ('undefined' == typeof GM_xmlhttpRequest) return;
            if (!_jQueryObj && !(_jQueryObj = jMod.jQuery)) return;
            if (true === _jQueryObj.jModCrossOriginSupport) return;
            _jQueryObj.ajaxTransport(dataType || "* text html xml json", jMod.jQueryExtensions.CrossOriginSupportTransportFn(_jQueryObj, dataType));
            _jQueryObj.extend({
                jModCrossOriginSupport: true
            });
        };
        jMod.jQueryExtensions.exportCrossOriginSupport = function(_jQueryObj, dataType) {
            if ('undefined' == typeof GM_xmlhttpRequest) return;
            if (!_jQueryObj) return;
            if (true === _jQueryObj.jModCrossOriginSupport) return;
            _jQueryObj.ajaxTransport(dataType || "* text html xml json", exportjQueryTransportFn(_jQueryObj, dataType));
            _jQueryObj.extend({
                jModCrossOriginSupport: true
            });
        };
    }()

})()

jMod.jQueryExtensions.addCrossOriginSupport(jQuery)

console.log('Test $.ajax("http://google.com")');
$.ajax({
    url: 'http://google.com',
    contentType: 'text/html',
    type: 'GET',
    dataType: 'html',
    // onprogress: function(response){
    //  console.log('onprogress response', response);
    // },
    // onreadystatechange: function(response){
    //  console.log('onreadystatechange response', response);
    // }
})
.done(function(data, textStatus, jqXHR) {
    console.log("$.ajax() success: ", arguments);
})
.fail(function() {
    console.log("$.ajax() error", arguments);
});
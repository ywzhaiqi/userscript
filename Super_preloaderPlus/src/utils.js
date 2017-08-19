
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function imgToBlobUrl (b64Data) {
    var contentType = "image/png";
    var blob = b64toBlob(b64Data, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}


function $C(type, atArr, inner, action, listen) {
    var e = document.createElement(type);
    for (var at in atArr) {
        if (atArr.hasOwnProperty(at)) {
            e.setAttribute(at, atArr[at]);
        }
    }
    if (action && listen) {
        e.addEventListener(action, listen, false);
    }
    if (inner) {
        e.innerHTML = inner;
    }
    return e;
}

// css 获取单个元素
function getElementByCSS(css, contextNode) {
    return (contextNode || document).querySelector(css);
}

// css 获取所有元素
function getAllElementsByCSS(css, contextNode) {
    return (contextNode || document).querySelectorAll(css);
}

// xpath 获取单个元素
function getElementByXpath(xpath, contextNode, doc) {
    doc = doc || document;
    contextNode = contextNode || doc;
    return doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// xpath 获取多个元素.
function getAllElementsByXpath(xpath, contextNode, doc) {
    doc = doc || document;
    contextNode = contextNode || doc;
    return doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// 获取多个元素
function getAllElements(selector, contextNode, doc, win) {
    var ret = [];
    if (!selector) return ret;
    var Eles;
    doc = doc || document;
    win = win || window;
    contextNode = contextNode || doc;
    if (typeof selector == 'string') {
        if (selector.search(/^css;/i) === 0) {
            Eles = getAllElementsByCSS(selector.slice(4), contextNode);
        } else {
            Eles = getAllElementsByXpath(selector, contextNode, doc);
        }
    } else {
        Eles = selector(doc, win);
        if (!Eles) return ret;
        if (Eles.nodeType) { //单个元素.
            ret[0] = Eles;
            return ret;
        }
    }

    function unique(array) { //数组去重并且保持数组顺序.
        var i, ca, ca2, j;
        for (i = 0; i < array.length; i++) {
            ca = array[i];
            for (j = i + 1; j < array.length; j++) {
                ca2 = array[j];
                if (ca2 == ca) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
        return array;
    }

    function makeArray(x) {
        var ret = [];
        var i, ii;
        var x_x;
        if (x.pop) { //普通的 array
            for (i = 0, ii = x.length; i < ii; i++) {
                x_x = x[i];
                if (x_x) {
                    if (x_x.nodeType) { //普通类型,直接放进去.
                        ret.push(x_x);
                    } else {
                        ret = ret.concat(makeArray(x_x)); //嵌套的.
                    }
                }
            }
            //alert(ret)
            return unique(ret);
        } else if (x.item) { //nodelist or HTMLcollection
            i = x.length;
            while (i) {
                ret[--i] = x[i];
            }
            /*
            for(i=0,ii=x.length;i<ii;i++){
                ret.push(x[i]);
            };
            */
            return ret;
        } else if (x.iterateNext) { //XPathResult
            i = x.snapshotLength;
            while (i) {
                ret[--i] = x.snapshotItem(i);
            }
            /*
            for(i=0,ii=x.snapshotLength;i<ii;i++){
                ret.push(x.snapshotItem(i));
            };
            */
            return ret;
        }
    }

    return makeArray(Eles);
}

// 获取最后一个元素.
function getLastElement(selector, contextNode, doc, win) {
    var eles = getAllElements(selector, contextNode, doc, win);
    var l = eles.length;
    if (l > 0) {
        return eles[l - 1];
    }
}

function saveValue(key, value) {
    localStorage.setItem(key, encodeURIComponent(value));
}

function getValue(key) {
    var value = localStorage.getItem(key);
    return value ? decodeURIComponent(value) : undefined;
}

function createDocumentByString(str) {  // string转为DOM
    if (!str) {
        C.error('没有找到要转成DOM的字符串');
        return;
    }
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml');
    }

    var doc;
    try {
        // firefox and chrome 30+，Opera 12 会报错
        doc = new DOMParser().parseFromString(str, 'text/html');
    } catch (ex) {}

    if (doc) {
        return doc;
    }

    if (document.implementation.createHTMLDocument) {
        doc = document.implementation.createHTMLDocument('superPreloader');
    } else {
        try {
            doc = document.cloneNode(false);
            doc.appendChild(doc.importNode(document.documentElement, false));
            doc.documentElement.appendChild(doc.createElement('head'));
            doc.documentElement.appendChild(doc.createElement('body'));
        } catch (e) {}
    }
    if (!doc) return;
    var range = document.createRange();
    range.selectNodeContents(document.body);
    var fragment = range.createContextualFragment(str);
    doc.body.appendChild(fragment);
    var headChildNames = {
        TITLE: true,
        META: true,
        LINK: true,
        STYLE: true,
        BASE: true
    };
    var child;
    var body = doc.body;
    var bchilds = body.childNodes;
    for (var i = bchilds.length - 1; i >= 0; i--) { //移除head的子元素
        child = bchilds[i];
        if (headChildNames[child.nodeName]) body.removeChild(child);
    }
    //alert(doc.documentElement.innerHTML);
    //debug(doc);
    //debug(doc.documentElement.innerHTML);
    return doc;
}

// 从相对路径的a.href获取完全的href值.
function getFullHref(href) {
    if (typeof href != 'string') href = href.getAttribute('href');
    //alert(href);
    //if(href.search(/^https?:/)==0)return href;//http打头,不一定就是完整的href;
    var a = getFullHref.a;
    if (!a) {
        getFullHref.a = a = document.createElement('a');
    }
    a.href = href;
    //alert(a.href);
    return a.href;
}

// 任何转成字符串，存储，修改过
function xToString(x) {
    function toStr(x) {
        switch (typeof x) {
            case 'undefined':
                return Str(x);
            case 'boolean':
                return Str(x);
            case 'number':
                return Str(x);
            case 'string':
                return ('"' +
                    (x.replace(/(?:\r\n|\n|\r|\t|\\|")/g, function(a) {
                        var ret;
                        switch (a) { //转成字面量
                            case '\r\n':
                                ret = '\\r\\n';
                                break;
                            case '\n':
                                ret = '\\n';
                                break;
                            case '\r':
                                ret = '\\r';
                                break;
                            case '\t':
                                ret = '\\t';
                                break;
                            case '\\':
                                ret = '\\\\';
                                break;
                            case '"':
                                ret = '\\"';
                                break;
                            default:
                                break;
                        }
                        return ret;
                    })) + '"');
            case 'function':
                var fnStr = Str(x);
                return fnStr.indexOf('native code') == -1 ? fnStr : 'function(){}';
            case 'object':
                //注,object的除了单纯{},其他的对象的属性会造成丢失..
                if (x === null) {
                    return Str(x);
                }
                switch (x.constructor.name) {
                    case "Object":
                        var i;
                        var rStr = '';
                        for (i in x) {
                            if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
                                continue;
                            }
                            rStr += toStr(i) + ':' + toStr(x[i]) + ',';
                        }
                        return ('{' + rStr.replace(/,$/i, '') + '}');
                    case "Array":
                        var i;
                        var rStr = '';
                        for (i in x) {
                            if (!x.hasOwnProperty(i)) { //去掉原型链上的属性.
                                continue;
                            }
                            rStr += toStr(x[i]) + ',';
                        }
                        return '[' + rStr.replace(/,$/i, '') + ']';
                    case "String":
                        return toStr(Str(x));
                    case "RegExp":
                        return Str(x);
                    case "Number":
                        return Str(x);
                    case "Boolean":
                        return Str(x);
                    default:
                        //alert(x.constructor);//漏了什么类型么?
                        break;
                }
            default:
                break;
        }
    }
    var Str = String;
    return toStr(x);
}

function toRE(obj) {
    if (obj instanceof RegExp) {
        return obj;
    } else if (obj instanceof Array) {
        return new RegExp(obj[0], obj[1]);
    } else {
        if (obj.search(/^wildc;/i) === 0) {
            obj = wildcardToRegExpStr(obj.slice(6));
        }
        return new RegExp(obj);
    }
}

function wildcardToRegExpStr(urlstr) {
    if (urlstr.source) return urlstr.source;
    var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
        return str === "*" ? ".*" : "[^/]*";
    });
    return "^" + reg + "$";
}

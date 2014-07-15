NextPageModY.user.js
====================

改自 [Next Page for Greasemonkey By Sunwan](http://userscripts.org:8080/scripts/show/27251)

 - **新增：上一页、下一页的调用事件。**原脚本的 Firegestures 调用代码已失效，可采用新方法调用或下面的通用方法。
 - **新增：设置界面。**
 - **新增：是否跳过跨域的链接**。如果存在 yyets.com get douban 脚本并插入了页码，原脚本会找到插入的下一页而不是原页面的下一页。
 - **修正：在文字输入框或选择框按键会生效的问题**
 - **修改：放宽了尾部 regexp 的判断**，以便支持这个 [测试页面](http://www.sbkk8.cn/mingzhu/ertong/guaiwudashiquanji/guanwu12/210292.html) 的翻页。
 - **新增：站点规则以适应自动查找失效的网页。**
 - 如需在本地文件中生效，需要在 about:config 中设置 `extensions.greasemonkey.fileIsGreaseable` 为 `true`。

### 调用代码（FireGestures/MouseGestures2.uc.js）

下一页

```js
    var
        srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument
    ;
    var dispatchEvent = function (eventName) {
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        doc.dispatchEvent(evt);
    };

    dispatchEvent('nextpage.go');
```

上一页

```js
    var
        srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument
    ;
    var dispatchEvent = function (eventName) {
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        doc.dispatchEvent(evt);
    };

    dispatchEvent('nextpage.back');
```

### 发送按键代码


原脚本的 Firegestures 调用代码已失效。下面的是通用的发送按键代码。

下一页（发送 →键）

```js
	var
        srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument,
        win = doc.defaultView
    ;
	var run = function () {
	    var ev = document.createEvent("KeyboardEvent");
	    ev.initKeyEvent("keydown", true, true, window, false, false, false, false, 39, 0);
	    document.body.dispatchEvent(ev);
	};

	let sandbox = new Cu.Sandbox(win, {sandboxPrototype: win});
	sandbox.window       = win;
	sandbox.document     = win.document;
	Cu.evalInSandbox('(' + run.toString() + ')()', sandbox);
```

上一页（发送←键）

```js
	var
        srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
        doc = srcNode.ownerDocument,
        win = doc.defaultView
    ;
	var run = function () {
	    var ev = document.createEvent("KeyboardEvent");
	    ev.initKeyEvent("keydown", true, true, window, false, false, false, false, 37, 0);
	    document.body.dispatchEvent(ev);
	};

	let sandbox = new Cu.Sandbox(win, {sandboxPrototype: win});
	sandbox.window       = win;
	sandbox.document     = win.document;
	Cu.evalInSandbox('(' + run.toString() + ')()', sandbox);
```

### MouseGestures2.uc.js

如果用了 MouseGestures2.uc.js，应该为下面的格式，然后用上面的代码替换里面的 ...

```js
	"L": {
		name : "上一页",
		cmd : function (gestures, event) {
			...
		}
	},
```
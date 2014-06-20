NextPageModY.user.js
====================

改自 [Next Page for Greasemonkey](http://userscripts.org:8080/scripts/show/27251)

 - 增加了上一页、下一页的调用事件。原脚本的 Firegestures 调用代码已失效，可采用新方法调用或下面的通用方法。
 - 增加了设置界面。
 - 修正：在文字输入框或选择框按键会生效的问题。

### 调用代码（FireGestures）

下一页

```js
	var doc = FireGestures.sourceNode.ownerDocument;
	function dispatchEvent(eventName) {
	    var event = doc.createEvent('HTMLEvents');
	    event.initEvent(eventName, true, false);
	    doc.dispatchEvent(event);
	}

	dispatchEvent('nextpage.go');
```

上一页

```js
	var doc = FireGestures.sourceNode.ownerDocument;
	function dispatchEvent(eventName) {
	    var event = doc.createEvent('HTMLEvents');
	    event.initEvent(eventName, true, false);
	    doc.dispatchEvent(event);
	}

	dispatchEvent('nextpage.back');
```

### 发送按键代码


原脚本的 Firegestures 调用代码已失效。下面的是通用的发送按键代码。

下一页（发送 →键）

```js
	var srcNode = FireGestures.sourceNode;
	var doc = srcNode.ownerDocument,
	    win = doc.defaultView;

	var run = function () {
	    var e = document.createEvent("KeyboardEvent");
	    e.initKeyEvent("keydown", true, true, window, false, false, false, false, 39, 0);
	    document.body.dispatchEvent(e);
	};

	let sandbox = new Cu.Sandbox(win, {sandboxPrototype: win});
	sandbox.window       = win;
	sandbox.document     = win.document;
	Cu.evalInSandbox('(' + run.toString() + ')()', sandbox);
```

上一页（发送←键）

```js
	var srcNode = FireGestures.sourceNode;
	var doc = srcNode.ownerDocument,
	    win = doc.defaultView;

	var run = function () {
	    var e = document.createEvent("KeyboardEvent");
	    e.initKeyEvent("keydown", true, true, window, false, false, false, false, 37, 0);
	    document.body.dispatchEvent(e);
	};

	let sandbox = new Cu.Sandbox(win, {sandboxPrototype: win});
	sandbox.window       = win;
	sandbox.document     = win.document;
	Cu.evalInSandbox('(' + run.toString() + ')()', sandbox);
```
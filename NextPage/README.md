NextPageModY.user.js
====================

改自 [Next Page for Greasemonkey](http://userscripts.org:8080/scripts/show/27251)

 - 增加了上一页、下一页的调用事件。原脚本的 Firegestures 调用代码已失效，可采用新方法调用或下面的通用方法。
 - 增加了设置界面。
 - 修正：在文字输入框或选择框按键会生效的问题。

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
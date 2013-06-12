Readability 中文增强版
======================

基于readability 1.7.1，改进中文阅读。

### 修改说明

 - 完善中文下一页，修正下一页乱码的问题。
 - 全新改写自动提取标题功能。（未完善）
 - 修改：原来的 "马上加载" 改为 "底部自动加载"
 - 增加：对页面的提前处理，以应对翻页是脚本的情况
 - 增加：所有加载的链接列表在底部（可选，默认关闭）

### 使用说明

 - 通过执行 `X_readability();` 手动调用。脚本内置 AUTOSI 定义自动调用的站点。FireGestures 调用代码： `content.window.wrappedJSObject.X_readability();`
 - 参数 window.loadNextPageImmediately 可控制是否立即加载下一页，默认滚到底部加载.
 - CSS在最底部修改。
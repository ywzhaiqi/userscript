# 2014年的 README


Greasemonkey 和 Scriptish
-------------------------

- Scriptish 缺点
    - 修改 `@include` 后需要刷新2次才会成功，可能有些页面需要再次刷新才能生效。
    - 输出到控制台的信息中文可能不正常。
    - 安装脚本时没有进度条，如果 require 数量较多，需要等待安装窗口的出现。
    - 不支持 GM_info、@grant。
    - **严重bug**，存在于 0.1.11 版本，同一个作者的2个中文文件名脚本，会被安装在同一个目录，同一时间只能安装一个脚本。最新 nightly 版（0.1.13pre）已修复。

### 设置及转换

- Scriptish 取消勾选 `要求用户脚本使用 HTTPS 更新`，该选项可能会让脚本更新失败
- [How To: Manually transfer user scripts from Greasemonkey to Scriptish · scriptish/scriptish Wiki]( https://github.com/scriptish/scriptish/wiki/How-To%3A--Manually-transfer-user-scripts-from-Greasemonkey-to-Scriptish)

#### 复制用户脚本清单和批量安装 GM 脚本

设置 about:config 中的 chrome.enabled 为 true 后，在代码片段速记器中选择环境 “浏览器” 运行。

详见 [批量导出用户脚本和批量安装 GM 脚本代码 - 卡饭论坛](http://bbs.kafan.cn/thread-1747445-1-1.html)
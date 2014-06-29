BaiduPanDownloadHelper
======================

批量导出百度盘的下载链接，支持2层目录，支持个人主页、分享文件夹或单文件、分享专辑页面、分享主页，支持复制到剪贴板、复制为 Aria2 格式、YAAW。

![效果图](个人主页.png)

设置界面（Greasemonkey/Tampermonkey 的用户脚本命令处打开）

![setting](setting.jpg)

![history.png](history.png)

安装说明
--------

支持 Firefox（Greasemonkey/Scriptish）， Chrome（Tampermonkey）

非常感谢 [BaiduPanMD5Button](https://userscripts.org/scripts/show/156906)

功能简介
-------

- 全局
	- 去除云管家提示（已禁用，会造成文件夹上传失效），*来自 Crack Url Wait Code Login For Chrome*
	- 去除大文件云管家限制，来自 [网盘工具箱](http://userscripts.org:8080/scripts/show/159911)，个人主页的是自己写的。
- 个人主页
    - 选中条目后可点击 "批量下载" 按钮，批量得到下载链接，支持2层目录
    - 左侧增加自定义快捷目录，设置在 "更多-设置"
    - 设置页面标题，根据 hash 变化而变化，方便历史记录检索
- 分享界面（文件夹）
    - **已失效**，某次改版后只能一个个链接的获取，连续获取几次就会让你输入验证码，所以只能保存到自己网盘再批量下载。
- 分享界面（单文件）
    - 当文件不存在时，如果可能会添加这个人的分享主页链接
    - 下载按钮会添加下载链接，变红色

其它说明
--------

 - 新增自动填写提取密码，来自 [网盘自动填写提取密码](https://greasyfork.org/scripts/1002)
 - 分享主页：双击复制所有链接到剪贴板，可用 iDown 的 lua 脚本实现直接批量下载。（**lua 脚本已失效**）
 	- TODO: iDown 文件下载的问题。TLF-MiniSD——史蒂芬·斯皮尔伯格 http://yun.baidu.com/s/1zMWXu
 - 勾选条目后，新增右键 “复制"、"复制 aria2" 菜单

更新
-------

  - 详见 [History for BaiduPanDownloadHelper](https://github.com/ywzhaiqi/userscript/commits/master/BaiduPanDownloadHelper)
  - ....
  - 2014-05-11，版本 3.5.8。**百度盘改版，修正下载链接的获取**。个人主页新增快捷链接（设置按钮在右上的更多处）。**更改更新地址到 greasyfork**。
  - 2014-01-17，[版本 3.5.7][0]。修正 aria2 的 UA。
  - 2014-01-08，[版本 3.5.6][1]。增加 aria2 的 UA 和 Refer，来着 [解析出来的地址限速的？ -- Userscripts.org][2]。
  - 2013-12-17，[版本 3.5.5][3]。移除 aria2 和 YAAW 的 header 参数
  - 2013-12-16，[版本 3.5.4][4]。aria2 和 YAAW 加上 header 参数
  - 2013-12-02，[版本 3.5.3][5]。更改 @include 地址包含 https
  - 2013-12-02，[版本 3.5.2][6]。修正百度盘单文件下载链接。
  - 2013-11-18，[版本 3.5.1][7]。去除单文件下载提示。
  - 2013-11-16，[版本 3.5][8]。**分享文件夹的批量下载已失效**，百度盘改版，需要输入验证码。
  - 2013-11-15，[版本 3.4][9]。修正 jsonrpc 路径的保存，增加单个文件导出到YAAW，获取错误后打开验证码。增加分享主页批量保存（未启用）。
  - 2013-11-13，[版本 3.3][10]。修正一个bug。
  - 2013-11-09，版本 3.2。增加 Aria2 JSON-RPC Path 的设置。
  - 2013-11-08，版本 3.1。修正单文件下载，应对百度盘改版。
  - 2013-11-07，[版本 3.0.1][11]。修正分享主页双击的问题。
  - 2013-11-06，版本 3.0。大幅改进，新增个人主页、分享专辑页面的支持，分享主页双击复制所有链接，YAAW。
  - 2013-10-30，版本 2.9。添加 Aria2 参数，增加单文件下载。
  - 2013-10-29，[版本 2.8][12]。修正复制到剪贴板的问题。新增复制为 Aria2c 格式。
  - 2013-10-26，[版本 2.7][13]。修正首页单文件夹的问题。新增右键 "复制" 菜单。
  - 2013-10-22，[版本 2.6][14]。修正文件夹的判定。
  - 2013-10-09，版本 2.5，更改 @include
  - 2013-10-03，版本 2.4，增加 http\*://yun.baidu.com/share/link\* 包含链接
  - 2013-08-27，版本 2.2，调整下格式
  - 2013-08-27，版本 2.1，增加滚动条
  - 2013-07-22，版本 2.0，全部重写
  - 2013-06-05，版本 1.7，增加当前页面链接显示
  - 2013-06-01，版本 1.6，修复控制台错误
  - 2013-05-13，版本 1.5，修复当前无路径下的问题，修复复制到剪贴板的问题
  - 2013-05-10，版本 1.4，改成无弹窗版
  - 2013-04-09，版本 1.3，完善无文件夹下的获取，其它细微改进，感谢 rpzfirefoxgmjs 的反馈
  - 2013-04-01，版本 1.2.1，改进包含的网址，感谢 海峰无敌 的反馈
  - 2013-03-28，版本 1.2，增加 复制到剪贴板按钮，其它改进
  - 2013-03-17，版本 1.1，增加 导出链接（包括文件夹下） 按钮，完善脚本
  - 2013-03-16，版本 1.0，简易版本

测试
----

### 百度盘链接（测试用）

- 个人主页：http://pan.baidu.com/disk/home
- 分享主页1： http://pan.baidu.com/share/home?uk=2214641459#category/type=0


[0]: http://userscripts.org/scripts/diff/162138/808570
[1]: http://userscripts.org/scripts/diff/162138/757990
[2]: http://userscripts.org/topics/136081?page=1#posts-557836
[3]: http://userscripts.org/scripts/diff/162138/693261
[4]: http://userscripts.org/scripts/diff/162138/692329
[5]: http://userscripts.org/scripts/diff/162138/686745
[6]: http://userscripts.org/scripts/diff/162138/686733
[7]: http://userscripts.org/scripts/diff/162138/671938
[8]: http://userscripts.org/scripts/diff/162138/669662
[9]: http://userscripts.org/scripts/diff/162138/669196
[10]: http://userscripts.org/scripts/diff/162138/668670
[11]: http://userscripts.org/scripts/diff/162138/665700
[12]: http://userscripts.org/scripts/diff/162138/659078
[13]: http://userscripts.org/scripts/diff/162138/656944
[14]: http://userscripts.org/scripts/diff/162138/655451
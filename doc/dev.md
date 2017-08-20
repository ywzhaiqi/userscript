GM 脚本开发相关
=============

## 辅助库

快速搭建设置界面

- [GM_config CN](https://greasyfork.org/zh-CN/scripts/6158-gm-config-cn): sizzlemctwizzle/GM_config 修改版
- [sizzlemctwizzle/GM_config](https://github.com/sizzlemctwizzle/GM_config)：A lightweight, reusable, cross-browser graphical settings framework for inclusion in user scripts.
	- [greasyfork.org 引用链接](https://greasyfork.org/scripts/917-gm-config)
- JoeSimmons
	- [JoeSimmons/GM_config](https://greasyfork.org/scripts/1884-gm-config)： JoeSimmons 的版本。
	- [joesimmons/jsl](https://github.com/joesimmons/jsl)：JoeSimmons' Library。

DOM 库

- [Zepto.js + selector](https://greasyfork.org/zh-CN/scripts/32445-zepto-js-selector): Zepto 库，新增了 selector 模块。

## 开发技巧

### Tampermonkey 引用本地文件

1. 在扩展界面勾选 `允许访问本地网址`
2. 脚本添加 `// @require file://C:\dev\test.user.js`

### webpack 运行

在 `src` 目录运行命令 `build test.js [-w]` 会在 `..` 目录生成 `test.user.js`

参考

- [freund17/webpack-userscript](https://github.com/freund17/webpack-userscript): Template for a Tempermonkey/Greasemonkey userscript using webpack
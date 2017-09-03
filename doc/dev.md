GM 脚本开发相关
=============

## 辅助库

快速搭建设置界面

- [sizzlemctwizzle/GM_config](https://github.com/sizzlemctwizzle/GM_config)：A lightweight, reusable, cross-browser graphical settings framework for inclusion in user scripts.
	- [greasyfork.org 引用链接](https://greasyfork.org/scripts/917-gm-config)
	- **[GM_config CN](https://greasyfork.org/zh-CN/scripts/6158-gm-config-cn)**: 我的修改版
- JoeSimmons
	- [JoeSimmons/GM_config](https://greasyfork.org/scripts/1884-gm-config)： JoeSimmons 的版本。
	- [joesimmons/jsl](https://github.com/joesimmons/jsl)：JoeSimmons' Library。

DOM 库

- [Zepto.js + selector](https://greasyfork.org/zh-CN/scripts/32445-zepto-js-selector): Zepto 库，新增了 selector 模块。

## 开发技巧

### chrome 下调试

直接插入 `debugger`

### Tampermonkey 引用本地文件

1. 在扩展界面勾选 `允许访问本地网址`
2. 脚本添加 `// @require file://C:\dev\test.user.js`
3. (可选) 建立 chrome 开发配置：`chrome --user-data-dir=XXX`

可惜：错误信息不够详细

### Greasemonkey 下调试

建立硬链接
```shell
mklink MyNovelReader.user.js XXX\dist\MyNovelReader.user.js /H
```

### 引入 webpack（已弃）

改用 rollup

参考

- [freund17/webpack-userscript](https://github.com/freund17/webpack-userscript): Template for a Tempermonkey/Greasemonkey userscript using webpack
- [userscript-css-loader](https://github.com/dorian-marchal/userscript-css-loader): Simple webpack loader module for using CSS in userscripts

### 关于运行路径放置的问题

`build` 命令有2种放法：根目录、src 目录。（需要有自动补全）
- 根目录：`npm run build src/test.js`，可是 windows cmd 不支持
- src 目录：`build test.js`
GM 脚本开发相关
=============

## 部分脚本的构建

Linux 下

```bash
yarn build src/MyNovelReader/ -- -w
```

运行会以 watch 方式在 `scripts/` 目录下生成 `MyNovelReader.user.js`

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

### Greasemonkey 下调试（建立硬链接）

先切换到 Greasemonkey 脚本目录

#### Windows 下

```cmd
mklink MyNovelReader.user.js XXX\scripts\MyNovelReader.user.js
# 或
mklink MyNovelReader.user.js XXX\scripts\MyNovelReader.user.js /H
```
#### Linux 下

```bash
ln XXX/scripts/MyNovelReader.user.js MyNovelReader.user.js
```

### 引入 webpack（已弃）

改用 rollup

参考

- [freund17/webpack-userscript](https://github.com/freund17/webpack-userscript): Template for a Tempermonkey/Greasemonkey userscript using webpack
- [userscript-css-loader](https://github.com/dorian-marchal/userscript-css-loader): Simple webpack loader module for using CSS in userscripts
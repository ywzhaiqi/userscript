::脚本更新
@ECHO OFF&PUSHD %~DP0 &TITLE 脚本更新

set d=wget -c -N --no-check-certificate -O

%d% Douban_Book_Shopping_Helper.user.js http://userscripts.org:8080/scripts/source/172327.user.js
%d% cnbeta_comments.user.js http://userscripts.org:8080/scripts/source/152818.user.js

ECHO.&ECHO.完成! &PAUSE >NUL 2>NUL
function addGlobalStyle() {
    // 添加全局样式和自定义样式
    var style = document.getElementById('sej-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'sej-style';
        style.type = 'text/css';
        style.textContent = MAIN_CSS + '\n' + (matchedRule.stylish || '');
        document.head.appendChild(style);
    }
}

function addContainer(iTarget, iInput) {
    var pageEncoding = (document.characterSet || document.charset).toLowerCase();

    // 创建dom
    var aPattern = '<a href="" class="sej-engine"' + (prefs.openInNewTab ? ' target="_blank" ' : ' ') +
        'encoding="$encoding$" url="$url$" onclick="$onclick$" _title="$title$">' +
        '<img src="$favicon$" class="sej-engine-icon" />$form$<span>$name$</span></a>';

    var container = document.createElement('sejspan');
    container.id = 'sej-container';

    container.addEventListener('mousedown', mousedownhandler, true);

    // container.style.cssText = 'margin: 0 auto; max-width: 1100px;';
    if (matchedRule.style) {
        container.style.cssText = matchedRule.style;
    }

    var dropLists = [];

    // 根据搜索列表的类型得到数据
    var engineListDataStr = engineListData[prefs.engineListDataType] || engineListData.normal;
    var allEngineList = parseDataStr(engineListDataStr);
    var isFirstDropList = true;
    var isMatched = false;  // 当前搜索只匹配一次

    Object.keys(allEngineList).forEach(function (categoryStr) {
        var categoryArr = categoryStr.split('-');

        var category = {
            str: categoryStr,
            name: categoryArr[0],
            icon: categoryArr[1],
            insert: categoryArr[2]
        };

        var engines = [];

        var engineList = allEngineList[categoryStr];
        engineList.forEach(function (engine) {
            if (matchedRule.engineList && !isMatched && toRE(matchedRule.url).test(engine.url)) { // 去掉跳转到当前引擎的引擎
                isMatched = true;
                return;
            }

            var a = aPattern.replace('$encoding$', (engine.encoding || 'utf-8').toLowerCase())
                            .replace('$url$', engine.url)
                            .replace('$name$', engine.name)
                            .replace('$title$', engine.name);
            if (engine.favicon) {
                a = a.replace('$favicon$', engine.favicon);
            } else {
                a = a.replace('src="$favicon$"', '');
            }

            if (engine.method && engine.method.toUpperCase() == 'POST') {
                var f = wrapToHide(getPostFormHTML(engine.url, engine.args, prefs.openInNewTab));
                a = a.replace('$form$', f);
                a = a.replace('$onclick$', "this.getElementsByTagName('form')[0].submit();return false;");
            } else {
                a = a.replace('$form$', '');
                a = a.replace('onclick="$onclick$"', '');
            }

            engines.push(a);
        });

        // 非空列表
        if (!engines.length) return;

        // 插入一个节点给 insertBefore 用
        var lastInsertTitle = category.name;
        engines = engines.join('') + '<span class="sej-engine" _title="' + lastInsertTitle + '" style="display: none;"></span>';

        if (isTheSameCategory(category.name, matchedRule.engineList)) {
            container.innerHTML = '<sejspan id="sej-expanded-category" title="点击打开设置窗口">'+ category.name +'</sejspan>' + engines;
        } else {
            var dropList = document.createElement('sejspan');
            dropList.className = 'sej-drop-list';
            dropList.innerHTML = engines;

            // 有子 droplist
            var a = dropList.firstElementChild.cloneNode(true);
            a.className = a.className + ' sej-drop-list-trigger';
            a.lastChild.textContent = category.name;

            // 更改图标
            if (category.icon) {
                var e = engineList[category.icon - 1];
                if (e && e.favicon) {  // 数字匹配
                    a.firstChild.src = e.favicon;
                } else {  // 名称匹配
                    for (var i = 0; i < engineList.length; i++) {
                        if (engineList[i].name == category.icon) {
                            a.firstChild.src = engineList[i].favicon;
                            break;
                        }
                    };
                }
            }

            // 是否为第一个 droplist
            if (isFirstDropList) {
                a.className += ' first';
                isFirstDropList = false;
            }

            // 重新插入的位置
            if (typeof category.insert !== 'undefined') {
                a.dataset.horizontal = true;
                a.dataset.insert = category.insert;
            }

            dropLists.push({
                a: a,
                dropList: dropList
            });
        };
    });

    dropLists.forEach(function (item, index) {
        var a = item.a,
            dropList = item.dropList;

        // 移到某个类别里面
        var ins;
        var insert = a.dataset.insert;
        if (typeof insert !== 'undefined') {
            ins = document.querySelector('.sej-engine[_title="' + insert + '"]:not(.sej-drop-list-trigger)');
        }

        if (ins) {
            ins.parentNode.insertBefore(a, ins);
        } else {
            container.appendChild(a);
        }

        if (a.dataset.horizontal && a.parentNode.id === container.id) {  // 如果是顶层，菜单不需要修正
            a.removeAttribute('data-horizontal');

            // 插入到第一个类别前面
            // ins = container.querySelector('a.sej-engine.first');
            ins = container.querySelector('a.sej-engine:not(.sej-drop-list-trigger)');
            ins.parentNode.insertBefore(a, ins);
        }

        if (prefs.position == 'left') {  // 如果再左边的话，修正弹出菜单的位置
            a.dataset.horizontal = true;
        }

        document.body.appendChild(dropList);

        dropList.addEventListener('mousedown', mousedownhandler, true);

        new DropDownList(a, dropList);
    });

    // 添加设置按钮
    if (!prefs.hidePrefsBtn) {
        var configBtn = document.createElement('a');
        configBtn.innerHTML = '<img class="sej-engine-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbklEQVQ4jZWSu0oDURCGp9BCLcRCAzFGsjvzHwyoWbMzYKWdErBREQQLG/F90qW1y5sEfYGgTyBewBtRiYlFdkPibowOnGrn+883Z5bo95ogKk+O6RkNQ6wFsbbvry38iWAOD5mDIhGRSHjgYF0H64qE50REhUKw7FhPRsC6B9GOE31z0GYM94/YtYM99wL1NBEArC8CepcAk+fF80qSauGgV70m/YRoTURLzEERElYh1nKwLsRuEqDnlWcd6xFEOw7WBewiYShhNbYA9CyfX50b+GhPg5rMtpl8o6A42AOxdiazNhOp28NwgG79DBDR0vBb6Ec2W54mIqJcLjcFhBWIfkWK9eQIWhtY63EfHm6yRqwHaJ053Ga2TcAuHPQzurmZugHPK+cd9H78GvVVZGMlEcBsO9EIjxBrxOP0jLQD6CXEbuMRUi2AsOL7G0xE5Hzd7d8a/b5LS0FWRPdT4ZSacLBniL4zB/N/hf5d3635oJ6ZNLU9AAAAAElFTkSuQmCC" />';
        configBtn.onclick = openPrefs;
        container.appendChild(configBtn);
    }
    // 点击最前面的 "类别" 按钮打开设置窗口
    var categoryBtn = container.querySelector('#sej-expanded-category');
    if (categoryBtn) {
        categoryBtn.addEventListener('click', openPrefs, false);
    }

    // 设置插入的位置
    var insertWhere = matchedRule.insertIntoDoc.where;
    if (matchedRule.left != false) {
        switch (prefs.position) {
            case 'left':
                prefs.hideEnglineLabel = 0;
                insertWhere = 'beforebegin';
                iTarget = document.body;
                container.style.cssText = '\
                    position: fixed;\
                    top: 104px;\
                    width: 100px;\
                    z-index: 9999;\
                ';
                GM_addStyle('#sej-container > a { width: 100px; }');
                break;
            case 'top':
                insertWhere = 'beforebegin';
                iTarget = document.body;
                break;
            case 'default':
                break;
        }
    }

    // 插入到文档中
    switch (insertWhere.toLowerCase()) {
        case 'beforebegin' :
            iTarget.parentNode.insertBefore(container, iTarget);
        break;
        case 'afterbegin' :
            if (iTarget.firstChild) {
                iTarget.insertBefore(container, iTarget.firstChild);
            } else {
                iTarget.appendChild(container);
            }
        break;
        case 'beforeend' :
            iTarget.appendChild(container);
        break;
        case 'afterend' :
            if (iTarget.nextSibling) {
                iTarget.parentNode.insertBefore(container, iTarget.nextSibling);
            } else {
                iTarget.parentNode.appendChild(container);
            }
        break;

    };

    var isTwoLine = container.clientHeight / container.children[1].clientHeight > 2;

    // 插入后调整下，如果变成两行，隐藏文字
    if (prefs.hideEnglineLabel == 2 || (prefs.hideEnglineLabel == 1 && isTwoLine)) {
        [].forEach.call(document.querySelectorAll('#sej-container > a[class="sej-engine"] > span'), function(span) {
            var link = span.parentNode;
            link.classList.add('only-icon');
            link.setAttribute('title', span.textContent);
        });

        // 取消前面的距离并居中
        // if (isTwoLine) {
        //     container.style.paddingLeft = '';
        //     container.style.textAlign = 'center';
        // }
    }

    if (typeof matchedRule.endFix == 'function') {
        try {
            matchedRule.endFix();
        } catch(ex) {
            console.error('endFix 错误', ex);
        }
    }

    function mousedownhandler(e) {
        var target = e.target;

        target = getElementByXPath('ancestor-or-self::a[contains(@class, "sej-engine")]', target);

        // if (!target || target.className.indexOf('sej-engine') == -1) return;
        if (!target || !this.contains(target)) return;

        var value;
        if (typeof iInput == 'function') {
            value = iInput();
        } else {
            if (iInput.nodeName == 'INPUT' || iInput.localName == 'textarea') {
                value = iInput.value;
            } else {
                value = iInput.textContent;
            }
        }

        // 根据后代元素中是否存在 form 元素，判断提交方式并进行处理
        // 如果没有 form 元素，将会使用 GET 方法提交；如果有，将会使用 POST 方法提交
        var forms = target.getElementsByTagName('form');
        if (forms.length == 0) { // 提交方式为 GET
            // 处理编码
            var encoding = target.getAttribute('encoding');
            if (encoding == 'utf-8') {
                value = encodeURIComponent(value);
            } else if (encoding.indexOf('gb') == 0) {// 引擎接受gbk编码
                if (pageEncoding.indexOf('gb') != 0) {// 如果当前页面也使用gbk编码的话，那么不需要再编码
                    value = toGBK(value);
                }
            } else if (encoding == 'ASCII') {
                value = toASCII(value);
            }

            // console.log(value);
            target.href = target.getAttribute('url').replace(/%s/g, value); // 替换“全部”关键词
        } else { // 提交方式为 POST
            var inputs = target.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = inputs[i].value.replace(/%s/g, value); // // 替换“全部”关键词
            }
        }
    }
}

function run() {
    // 百度搜索插入到顶部搜索条下面就会造成页面部分元素的消失，所以需要每个部分都判断下是否存在

    // 判断插入位置和输入框是否存在
    var iTarget = getElement(matchedRule.insertIntoDoc.target);
    var iInput;
    if (typeof matchedRule.insertIntoDoc.keyword == 'function') {
        iInput = matchedRule.insertIntoDoc.keyword;
        if (!iInput()) {
            return;
        }
    } else {
        iInput = getElement(matchedRule.insertIntoDoc.keyword);
    }
    debug('插入的位置为 %o', iTarget);
    debug('匹配的输入框为 %o', iInput);

    if (!iTarget || !iInput) {
        debug('不存在插入的位置或匹配的输入框', iTarget, iInput);
        return;
    }

    addGlobalStyle();

    // 判断是否存在
    var container = document.getElementById('sej-container'),
        sejspan = document.querySelector('sejspan.sej-drop-list');

    if (!container || !sejspan) {
        if (container) {
            container.parentNode.removeChild(container);
        }
        addContainer(iTarget, iInput);
    }
}

function remove() {
    var elems = document.querySelectorAll('#sej-container, sejspan.sej-drop-list');
    if (!elems) return;

    [].forEach.call(elems, function(elem) {
        elem.parentNode.removeChild(elem);
    });
}

// iframe 禁止加载
if (window.self != window.top) return;

loadPrefs();

loadIconData();

var matchedRule;

rules.some(function (rule) {
    if (toRE(rule.url).test(location.href)) {
        matchedRule = rule;
        if (typeof rule.etc == 'function') {
            try {
                rule.etc();
            } catch(ex) {
                console.error('执行 etc 错误', ex);
            }
        }
        return true;
    };
});


debug('匹配的规则为', matchedRule);

if (!matchedRule || !matchedRule.enabled) return;

run();

if (matchedRule.mutationTitle) {
    debug('添加标题节点监视器: title');

    var watch = document.querySelector('title');
    var observer = new MutationObserver(function(mutations){
        debug('标题发生了变化', document.title);
        run();
    });
    observer.observe(watch, {childList: true, subtree: true, characterData: true});
}


})()

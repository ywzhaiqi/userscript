
var engineListData = {
    custom: '',
    my: <%= res['my.js'] %>,
    simple: <%= res['simple.js'] %>,
    wenke: <%= res['wenke.js'] %>,
    ted423: <%= res['ted423.js'] %>,
};

var MAIN_CSS = <%= res.mainCss %>;

var ICON_DATA = JSON.parse(GM_getResourceText('iconData.json'));

var ICON_DATA_CUSTOM = {
    'www.doukan.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACR0lEQVQ4jaWLzUuTAQCH37/ANnWToQd1Tc0ypSVhkJ06eI3+AfHQB3SZbqhYjnJ+kB/Z0EksFRplXwoKUmDUoUOdkiaBfZlsTef2bu+77w/H00E3tW56eC7P8/sJmdlGMi8bDsdsI8L283McBSH9tJ6jIKQcelIOPcnHepLzV9j+NU/6+wuSr5rItj3Oknp24YATktN1JKfriE3WkhGXIeGBhIf0+hviU7Vke3K6jrjjPBn32wNeSNhrSNhrCD08zba0Sia8Ria8RsL1gfDEKbI9bq8hZK8n8XMRefxkzgsxWzUxWzXBB1VszHWQ9q+Q8i7jmmpGsp4g26O2agJjZ4h9nUMcqcx5IWqtIGqtQL6vw91ThtNYidOow9NbRmhUR7ZHrBUER3RsWMoIDh/PeSE8rCU8rCU0pCU4Xo9oa8A/WElwsJzQbssiD2mRrLXIQ3tOCA2UEhooReovJfKuh9Tv10QWDcj9O34/8j0dsaVbSH17TpAtJciWEgJ3i3H16Yl8niG+MoP0qAlpt8mWEqT+cqJLt/GNXkS8U5zzQtCsIWjWIHZrcHcUsWq5hPxxkrjzCZH3vYRmrxFeMBD9NMbmxGX+tBchdu98gmYNQqBLTaBLjdilZqtTxXpbIV9ualmzNeNbMBNYNON1XOVHRxXrhkK2OlWIu59AlxpBbC8gi7+9AK+pAHdrPt9uKHC25LHSksf36wpchny8pp3N/o/gNyr5F1+bks1WJR6DAo9BwWarkq22/3d+oxLBZ1LhMxw7HCYVfwH7br97wWxejQAAAABJRU5ErkJggg==',
    'pan.baidu.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jZ3MS0hUURwG8NOmVjGLFtGm9i1aGESRUItWs1CoICiKIMhtybSwKOhND1KooCGhF9j15kRBFDHgjIJiUmSOIyaak/mayTNzz/ucEL4Wl5ujbszFb/P9v+9PfN+PSSk9a61zzmE1rLVOSuml0+kYEUJ41lqshRDCI8YYt9YHxhhHjLFYjiuL9vwfXOxewNWeBWQn3IpOhBhjUE1rg2tdBodeWZz56HD6ncPhDos3w0t7EaJ1OIrkpxVqH5VxJ8uhtQaTGqc6GOqeVaC1xvI+CcOQmp5Bv9+JeKIbqS/lf/n5tyXUNBfRN2kQiMW+1hpEKQ2lNFKDAkeelzBUfxKVfQcw0dCI/GgR2e8MBz2OeJtEvE3i2GuJgSmJaEeUUsj94tj5YA5HX5Yw1dmL33dbUKjZi6b6G9h+bwa1ySK8rwypbwz7H5cQf1oEFxJKKRApFe53lbDlyjj6xyuQUkJKib66E9h9NoNt138gPbyYt2TD7sBPBikViBASD7OzWJ/Io+NzEUJIzFc49iQy2HAujye9YRbJTVbQ4E2iSDmEkOGDwhzDpgt5bGwawvEXE9hxewSkMYfL76cghFiiUBJo/cRBAxE+4FyAc4GeMYpdrQWsuzmGzc3juJWZBecc0T3yYXAeWy+NYHQ6AOcChDHuqgtBwMHYymG16M4Yd4RS6jEWjv4XpeV2kkwmY5RSLwiYW+0wCJijlHq+78f+AjFijgdXSBqcAAAAAElFTkSuQmCC',
    'ditu.google.cn': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jZ2T3W9TdRjHf//F4cbE+YaxvYIrTDQuU+LLhYneiR1yQ+jBizVwQ0xqE4IXQAgZOes6cUHWTTPp2zmup4d14thKCIKkp9Cm6wt0zK1dxyiYRV3L7+NF240Qr/wmn8vn8+T5Pc9PCCGElfnhhWRmQklmYltcL8eU6+WkIjrJf/xB01ac5D96vymej6araMZz6F3c5N97l7TiwFac2IqT7FtvoxkqQgghEldiP//19wZSyv9kvhgl59hFWnHS3/MS9g4n2Z270HSVa3MawpzRLYBS1e50dlOq2kigsHiXIUPd6mwrTtKKg7Ti4KjHzeh3AYQ5E7WklATMATRdZagzgpSSJxsNNEMldXMMe4dza4zBvne2BVPJ8GUpJYH4AJrREegqT59K1hp1NENlbmGS2vg30lacnOvr5ajH/awg1BaYnu3HM1RarRa3Fn5F01Vq9VBrYy3GjVd3bxVb0e+Z0iOIqelL1marRb1RI2AOMGJ6WKyVyVVuoxkqSytjrSfrk5QLcfRPPuXsSS+35wzupIy2IGpOxIYMlXTpKg9WCjSbTcoP7qIZKqWKv9lYG6VSDJO+kSA0fJpMyiA7HyM3G2kLwmYw1t391bTO5maTynIBO3Oq+bCm0Vj1s177luVykPytMHfmouRmQ+R++aktiJjB6PbxuOlmrV5iejb8j8tnkcv+yHp1iEerw6wujnL/93EWkhMdQXx8imeyVDjE48c1AGr1dc4F53H5LFw+iyupCCsVP49W/TysjnQFwbimu9EMlT+Kh1i+d4RQ/OKfmfwSAKnfFvj86wSuLj6L85O6zNqB9iVeMi5ENL1dvFQ8KP0XBze+8F3m4IkZipUqAC5vHJfPot+boN+b4DNvgn3eBOfHwgghRM/JwN5rlv5h+qvjrhnHXs+FN3oPD7/edziwf+CU7vry+PRrverIy28eOPvKngNnXtyz/4x6bBD12CBCiJ7uh+z5n4h/AWy0oXdRPD+0AAAAAElFTkSuQmCC',
    'map.baidu.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADm0lEQVQ4jaXB308bBQAH8PNFY4y/nkyIGkd88YEXQ1zQOB8W4tiDP8aYMjRDB3R0pRSGUShu0GyUzhmNWVyM28NGcCQQWULawcYcIFCuo9e7/ri2sLZ3V/qL629oaXt3/fpH+PkQ7e3tr9jJjTthgSfDoS3rTjxK+v1u0rH+iPTFgiQb2CbdzH3S7aPIbes4KSx+ZHUtnyfNy7OTLS0tzxJarfYbMREpQi4hILLVVMCJ0qIFe79fQ+biAJLMEpIZEnnvDzigjyHt01f9/KLi4P6VOrrbPyQu9PUNpcWoVKnsIyZ4sX/VgOrkBJTrvyLXdASRj+tRpE5jn/kEXu8NsBEnwrtbsotfw7nznZ8TOp1WH+OfVgqVIspL89WDM6cgGy9DvjSEclcroodeRfpWFwrlGHyhFdCh5aonbFX4uLva26tpJnQ6rT4c9FcUKKiY72Gv6QNUtB0oq9pw0HIUkZrnIN76E2UAycgmHIEH8ITXFDHBQ63uOUkM9A/o4zuCVJAAyWlG9r0a7DcdRvFYPXL1byD61kvI0VaUKgUcZOPYCf8DeotV5jZCOPVVZzPR19M5nIoHpIPgbyhtH0dRexjZ159Htu5lZF4jEFR9DcrnRizoQSIRx4bTgZmVTWXWJqLty5bTxGDPkeEc9YUksydQTMwj4rcheugFpF98Bol33oTlzk2YzbNYWNrA9CqHv9d5bId5JcSHUf9unYoY7Hl/eM9+XMrGGbABL1x5FqmfDcgRBOZbW3Hj7l1Mzq3DQsXA7RZQKpchlQrKzNQEamtr24jevsHh5Oa3UnbLBIajwSWdyKci8DW9jSfTati3E7j9mAcTTAGQsZdNwmZdUW7+cR1qteoEoRu4qN/lVyR4P0Uu4wTFrcEeXEUg8hCSuwn5mA2WzTimV0MQBA5bLI2pv24rC5Z7UKk6ThI6nVqfyZQqiP+CtKu1yoYZpJMcCvkyst4RlNgz4CMJTCxxWKY5rC8/qE5PTShu5gk0mnPNRL9Op98RhFJGDMiio18Wdyi5kM/JuXRS3o145RQzIIuCVV6lBXmJdMn352ZkhrJVxLggazSaZqK7u2vIbluDw24DzbBwMRQ8TgpeDwPWzcDl8sHFUGCdm2DsVnhcFLigH0/9bpw92/4Z0dDQUPfj4HcL10yXmatXLjlMRgNtGhulx8dGadPYKG0aG6FNRgNtMhron4wG2nRlxDE+Nkrrv7/wqLGxsYb4v/4DCtLPHdhzlSIAAAAASUVORK5CYII=',
    'map.sogou.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADXElEQVQ4jSXQ/0ucdQDA8adcW26tzWLXbMnFkLZi1/IHYZtBEWVmlCyi38ciCEZlPyiMGLLRbIhRtI1i/RQUQUIp1og5te080/NS88t2+jz3fL/z7rw7z9O7+zx3z/Puh15/wkvyPA+A3LqGqUxhytNYShhLnsaWpzGjIVLmIsIp8Nvsuwz8086C/ROVyiaeW0LyPI9sWsNQJjHlSczoBOZqCEOdwtDDmGYETZukWNhgZW2QH6aa+CXSSiIfxQWkTFrFkEOY0SCmGcZKL2GvLZJQwsTnRonPjBCfHcVWIwhRYEb9GiMzi7PxM07mOyRDDmEqf2MlF0kE/yB+4TzGa63o/ka0/T60Oh/ajj1YV3vZcASIAm7iDK4iUVH9SKY8gW3OYZ7vQj1QT2znbvTAcaz3z2B91oXV0431SSfZ4bs4hUHEaj2V2E5QJSrKPiS7pGL3fU5s1yPE9j+O0fo6yfg9Etsa8ZJOhgICqIpzCO1ZiulehH6Uiu5HqI1ItmtjfXSOWM0u1EMNqP7DGC0tmG+2Y713muQHH5LuOcvmUBPlVAfCakXozRSzP1KWG5AMO0I8fBuzrR3N9yRK7W6UB/agSHUo0l5k6SGU2n3ItUdIXmjDSz6MiB1DxHy4qS4kczWEaYSx4/PEgzfJDt0ie6ObTP9LrPe+itV2CvVgA+qBx9ADzQjtCdCP4W1HkNP8n2isjhO/H6RImSq/4lUCUPIjtl5mrfstYnt9yDWPYn/cBsU+8vltBhY8Lo9uIpn3JtgQDpnLX2I0HsXuaGLtnWasV06i1geQHzyE+rSfZM+neCWFaBKuBstcvFXlm7sCydnaxt36lvxAB0bTCfTnAmhHnsd8sYXE2VOsXz9BceV7wGVUcbg0UuKLMY++cY/+OwJJaC9QVSQ8qwYv+RRO/A2cxEm8tTrcXACPITaLObZzCaaNEpdGqvT/5XFl3OPaRBEpb3TiqjsgJuGohylmbuCoPqrm2zhbFpnUOvrKHfTVEIg8g0slLo7AlTGHiJZDKgvI6Z048g4q1nEc7RmqmeuUyxWS9n301XHs2BSGHCJl/UuxXOJacIvf57PgOUhQoVQBffkrEuGDpI1hUllYmr3Jwswwy/NjLM2OsDx/m4XIn8jROWKaCq6g6sJ/D10qASlZkFEAAAAASUVORK5CYII=',
    'www.city8.com': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpklEQVQ4jVWTsW8cRRSH94/I3cysCaJAkSLBzsxadKSHFoxvZteiJEj5D4JIE9EkBUSigApwEbg7OlAk6yDCJk0IQRTU/AmJd96cLe5OfBRzVkTxpNXO7vc+zXu/StuA8nuMmw7T9Oz4jkv+XS61+2gbGfmIcR3KBZQLaBsY+X10O2HkA5V6bcK4LR8ZF1EuMN7tMTagbU/tItoGjA3Uvke/HtA+om35p1K2R7nIIM/IZ0tUM8H4CS81B6gt0LR9MfB7aN+hbY9xBwUwthMkP0fSKYOcIrIsdBu23UuJLLlx8x6m6TFNLBbthMq4jm9mC4ZlJmXhcP4Tn3x2n5wzKQ+cD0sWJ78jMnA4PeLhr49JWYqZ66hUM8HYQM5npNMlb7z1IZ9+/SPL4Rk/Hz/lq/mCx3/8hYggIgwps5SMaiZoG6nUbof2HWk4J+fMqO04OnlCzgmzG1Cu6OZ0jnEdI799ZyN1G6guVEQGJJ1imsji5DfScEZKGRkS2h2QZUC5iIhw4+a9Mhl38AKQZSDlAW0Di+OniAzFLAvad4gI2gZSSgXgi3l18ZCTcJoF4yIPT55spxE4SwMj15OTMG4jIkMBtBNqF6mU30O5wGZ6mc0Pu4zbjl++eIfNTKNtz/robbQNrKaGR3eusJlpbl2/hmn7conaRpSLbGaazaxGucjx3atsvjdoG1jPNca/x2Z6mfVc8+1HbVnp7TZW2nf8O61ZTesCme7w/PBl1lPF31++wmZWY9wBq6nhwW33v1IuUF10X892+GeuWH9X8+jOFR7cdhzfvcqt69fQNvLxB2+ymilW89Loz89fRftIVVQu5t1hmsi47RjbsA3XRRpfBKh2kZEvYau0jdS+Q9kevd1/00SMK3lQfh/tO3aaAtTufbTfnrvIf82uRTTaZu87AAAAAElFTkSuQmCC',
};

// rules 和 engineList 的对应
var categoryMap = {
    'web': '网页',
    'video': '视频',
    'music': '音乐',
    'image': '图片',
    'knowledge': '知识',
    'sociality': '社交',
    'shopping': '购物',
    'download': '下载',
    'translate': '翻译',
    '译&词典': '翻译'
};

var engineListIntroduce = getMStr(function() {/*
<div>
    <h2>分类规则：</h2>
    <i>【名称最好不要更改，类别跟站点规则有个对应关系】</i>
    <p>1、"音乐-5" 或 "音乐-音悦Tai"，代表类别是 "音乐"，图标使用下面的第5个，即音悦台的图标，否则使用默认的第1个。</p>
    <p>2、"dev--百度百科"，代表插入到 "百度百科" 搜索的前面</p>
    <p>3、"其它--购物"，代表插入到 "购物" 类别的最后一个</p>
</div>
<div>
    <h2>搜索引擎规则：</h2>
    <code>名称，地址（%s 关键字）， 编码（特殊的填gbk），站点图标</code>
    <p>1、"//" 开头会被忽略</p>
    <p>2、中间分隔符：中文逗号（，） 或 英文逗号 + 空格（, ）</p>
    <p>3、编码可省略，可直接填站点图标，站点图标也可省略</p>
    <p>4、POST 方式</p>
</div>
 */});

function introduceToHtml() {
    return engineListIntroduce.replace(/(（.*?）)/g, '<span>$1</span>')
            .replace(/"(.*?)"/g, '<span>$1</span>')
}

function isTheSameCategory(c1, c2) {
    return (categoryMap[c1] || c1) == (categoryMap[c2] || c2);
}

// 合并规则
function loadIconData() {
   Object.keys(ICON_DATA_CUSTOM).forEach(function(key) {
       ICON_DATA[key] = ICON_DATA_CUSTOM[key];
   });
}

// 列表对象
function DropDownList(a, list) {
    this.a = a;
    this.list = list;
    this.init();
};
DropDownList.zIndex = 100000000;

DropDownList.prototype = {
    hidden: true,
    showDelay: 233,
    hideDelay: 266,
    aShownClass: 'sej-drop-list-trigger-shown',

    init: function () {
        var a = this.a;
        var list = this.list;

        var self = this;

        // 进入显示
        mouseEventListener.add('mouseenter', a, function () {
            clearTimeout(self.hideTimerId);

            if (self.hidden) {
                self.showTimerId = setTimeout(function () {
                    self.show();
                }, self.showDelay);
            } else {
                var style = list.style;
                style.zIndex = DropDownList.zIndex ++;
                style.opacity = 0.96;
            };
        });

        // 离开隐藏
        mouseEventListener.add('mouseleave', a, function () {
            clearTimeout(self.showTimerId);

            if (!self.hidden) {
                list.style.opacity = 0.3;
                self.hideTimerId = setTimeout(function () {
                    self.hide();
                }, self.hideDelay);
            };
        });

        mouseEventListener.add('mouseenter', list, function () {
            clearTimeout(self.hideTimerId);

            var style = list.style;
            style.zIndex = DropDownList.zIndex ++;
            style.opacity = 0.96;
        });

        mouseEventListener.add('mouseleave', list, function () {

            list.style.opacity = 0.3;
            self.hideTimerId = setTimeout(function () {
                self.hide();
            }, self.hideDelay);
        });

    },
    show: function () {
        if (!this.hidden) return;
        this.hidden = false;

        var scrolled = getScrolled();
        var aBCRect = this.a.getBoundingClientRect();

        var style = this.list.style;

        var top, left;
        if (this.a.dataset.horizontal) { // 向右展开
            top = scrolled.y + aBCRect.top;
            left = scrolled.x + aBCRect.left + this.a.clientWidth;
        } else { // 默认的向下展开
            top = scrolled.y + aBCRect.bottom;
            left = scrolled.x + aBCRect.left;
        }

        style.top = top + 6 + 'px';
        style.left = left + 'px';
        style.zIndex = DropDownList.zIndex ++;
        style.display = 'block';

        setTimeout(function () {
            style.opacity = 0.96;
            style.top = top + 'px';
        }, 30);

        this.a.classList.add(this.aShownClass);

    },
    hide: function () {
        if (this.hidden) return;
        this.hidden = true;

        var style = this.list.style;
        style.display = 'none';
        style.opacity = 0.3;

        this.a.classList.remove(this.aShownClass);

    },
};

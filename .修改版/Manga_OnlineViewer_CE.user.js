// ==UserScript==
// @name        Manga OnlineViewer CE
// @description Shows all pages at once in online view. MangaFox, MangaReader/MangaPanda, MangaStream, MangaInn, AnyManga, AnimeA, MangaHere, MangaShare, Batoto, MangaDevil, MangaCow, MangaChapter, 7manga, MangaPirate.net and MangaBee/OneManga.me manga sites. Fakku, HBrowse, Hentai2Read and Doujin-moe Hentai sites.
// @version   9.01
// @date      2014-07-30
// @author    Tago
// @modified  ywzhaiqi
// @namespace https://greasyfork.org/users/1849-tago
// @grant  GM_getValue
// @grant  GM_setValue
// @grant  GM_xmlhttpRequest
// @require http://code.jquery.com/jquery-2.1.1.min.js
// @homePageURL https://github.com/ywzhaiqi/userscript/tree/master/.%E4%BF%AE%E6%94%B9%E7%89%88

// @include /http://mh.5652.com/mh/\d+/\d+/\d+.shtml/
// @include /http://(www|manhua)\.(dmzj|178)\.com/.+/.+shtml/
// @include /http://www\.imanhua\.com\/comic\/.+/
// @include /http://www\.tuku\.cc/comic/\d+/\d+//
// @include /http://www\.xindm\.cn\/mh/.+/
// @include http://www.kkkmh.com/manhua/*/*/*.html*
// 国外的
// @include http://hentai4manga.com/hentai_manga/*/*/*

// @include /http://mangafox.me/manga/.+/.+//
// @include /http://www.mangareader.net/.+/.+/
// @include /http://www.mangapanda.com/.+/.+/
// @include /http://.*(mangastream|readms).com/r.*/.+/
// @include /http://www.mangainn.com/manga/chapter/.+/
// @include /http://www.anymanga.com/.+/.+/.+/
// @include /http://manga.animea.net/.+chapter.+.html/
// @include /http://.*(7manga|boxmanga).com/online_manga/.+/
// @include /http://www.mangahere.co/manga/.+/.+/
// @include /http://www.batoto.net/read/.+/
// @include /http://.*mangadevil.com/read/.+/
// @include /http://www.manga2u.me/.+/.+//
// @include /https://starkana.org/manga/.+/.+/chapter/.+/
// @include /http://www.fakku.net/.+/.+/
// @include /http://www.hbrowse.com/.+/
// @include /http://www.doujin-moe.us/.+/
// @include /http://hentai2read.com/.+/.+//
// @include /http://mngacow.com/.+/.+//
// @include /http://www.mangachapter.net/[0-9]+/.+/[0-9]+.+html/
// @include /http://.*(mangabee|manga2u|onemanga|mangasky|mangamofo|mangadoom)\.(com|me)/.+/.+//
// @include /http://*mangajoy.com/.+/.+/[0-9]+/
// @include /http://www.mangabird.com/[a-z\-]+[0-9]+/
// @include /http://eatmanga.com/Manga-Scan/.+/.+//
// @include /http://.*senmanga.com/.+/.+\/?/
// @include /http://manga.lyght.net/series/.+\.html/
// @include /http://luscious.net/c/.+/
// @include /http://www.wondersluts.com/.+/
// @include /http://hentaimangaonline.com/image/.+//
// @include /http://exhentai.org/s/.+/.+/
// @include /http://g.e-hentai.org/s/.+/.+/
// @include /http://pururin.com/view/.+/.+/.+/
// @include /https?://fufufuu.net/m/.+/.+/
// @include /.+/read/.+/
// @history 6.00 Full Script Overhaul
// @history 7.00 Large code clean up, Individual page functions
// @history 8.00 Layout Improvement, Fix Chrome compatibility, Improved Zoom
// @history 9.00 Added Thumbnails Navigation, Improved performance
// @history 9.01 Added MangaJoy
// ==/UserScript==
var VERBOSE = false;function mConsole(s){if(VERBOSE) console.log(s || "");}
mConsole("Starting Manga OnlineViewer");

//OnlineViewer
(function (){
    $(document).ready(function () {
        mConsole("Identifying Site");
        // Manga Sites
        // 我添加的站点
        OnlineViewer(/mh.5652/, mh5652, 0);
        OnlineViewer(/(dmzj|178)/, dmzj, 0);
        OnlineViewer(/imanhua/, imanhua, 0);
        OnlineViewer(/tuku.cc/, tukuCc, 0);
        OnlineViewer(/xindm/, xindm, 0);
        OnlineViewer(/kkkmh/, kkkmh, 0);
        // 国外的
        OnlineViewer(/hentai4manga/, hentai4manga, 0);

        OnlineViewer(/mangafox/, MangaFox);
        OnlineViewer(/(mangareader|mangapanda)/, MangaReader);
        OnlineViewer(/(mangastream|readms)/, MangaStream);
        OnlineViewer(/anymanga/, AnyManga);
        OnlineViewer(/mangainn/, MangaInn);
        OnlineViewer(/manga\.animea/, AnimeA);
        OnlineViewer(/mangahere/, MangaHere);
        OnlineViewer(/(boxmanga|7manga)/, BoxManga);
        OnlineViewer(/batoto/, Batoto);
        OnlineViewer(/mangadevil/, MangaDevil);
        OnlineViewer(/mangachapter/, MangaChapter);
        OnlineViewer(/(mngacow|mangabee|onemanga|manga2u|mangasky|mangamofo|mangadoom)/, WPManga);
        OnlineViewer(/mangajoy/, MangaJoy);
        OnlineViewer(/starkana/, Starkana);
        OnlineViewer(/eatmanga/, EatManga);
        OnlineViewer(/senmanga/, SenManga);
        OnlineViewer(/mangabird/, MangaBird);
        OnlineViewer(/manga.lyght/, MangaLyght);
        // Hentai sites
        OnlineViewer(/fakku.net/, Fakku);
        OnlineViewer(/doujin-moe.us/, DoujinMoeNM);
        OnlineViewer(/hbrowse/, HBrowser);
        OnlineViewer(/hentai2read/, WPManga);
        OnlineViewer(/(luscious|wondersluts)/, Luscious);
        OnlineViewer(/hentaimangaonline/, HentaiMangaOnline);
        OnlineViewer(/(exhentai|e-hentai)/, ExHentai);
        OnlineViewer(/pururin/, Pururin);
        OnlineViewer(/fufufuu/, Fufufuu);
        // FoOlSlide
        if ($("meta[content~='FoOlSlide']").length > 0) {
            setTimeout(function () {
                formatPage(FoOlSlide());
            }, 3000);
        }
    });
    // Check if url matches the site
    function OnlineViewer(check, callback, timer) {
        if (check.test(window.location.host)) {
            if (timer == 0) {
                formatPage(callback());
            } else {
                setTimeout(function () {
                    formatPage(callback());
                }, timer || 3000);
            }
        }
    }   
    //Organize the site adding place holders for the manga pages
    function formatPage(Manga) {
        mConsole("Found " + Manga.quant + " pages,");
        if (Manga.before !== undefined ) Manga.before();
        if (Manga.quant > 0) {
            setTimeout(function() {
                $("body > :not(#MangaOnlineViewer)").remove();
                $("body").removeClass().addClass(GM_getValue("MangaTheme", "Light"));
                $("script").remove();
                $("head > :not(title, meta)").remove();
                // $('head').append("<script src='http://code.jquery.com/jquery-2.0.3.min.js'></script>");
                reader(Manga);
                $("#PagesPerSecond option[value="+GM_getValue("MangaTimer", 1000)+"]").attr("selected","true");
                $("#DefaultZoom option[value="+GM_getValue("MangaZoom", 100)+"]").attr("selected","true");
                $(".ChapterControl a[href*='undefined']").attr("href", "");
                configCSS();            
                setTimeout(function () {             
                    addPages(Manga);
                    controls();
                    setKeyDownEvents();
                    checkImagesLoaded();            
                    mConsole("Site rebuild done");
                    setTimeout(function () {                
                        loadPages(Manga);
                    }, 50);
                }, 50);
            }, Manga.timeout || 0);
        }
    }
    //Images
    var enlage = "data:image/png;base64,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";
    var reduce = "data:image/png;base64,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%3D%3D";
    var restore = "data:image/png;base64,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%3D";
    var fitwidth = "data:image/png;base64,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";
    var reload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC70lEQVR4XrXQa0xTdxgG8Pd/es6x2JbL2iINtCQdAkvAuOAwBMKMfiBZJGWMYQIx68plwwEbUfACeIlGyJbQVYMxsjGGZkHDIFZHIBurboOQESgLldaISMu6cmprSi/0cnp6TL8IiSb9tN+H5+OTJw/8r/rHVgCgAr7qmZKoLown7y3rgiMnf4aY2q/roeP6Aio/9RtZc/F33kedMw0lx3WnDzcP88pbhmE7DLb5dcYKc4+cmG2DfXva5D5qecFe0JuD3Wa7T+XYxOp8RNIhQZIfK+8Yeb1gdMEFhDgR1xoDBxxhUuOkUY+XxVq9GPnFBmLzvDhK93B31lu58sxnkAOl6gmIwqNx1eCDD3P2waUHf+Q7gsEOGoWkDArq6YjfhyfFZ0X4vEyaA5gHMfsZv/f9t+z9T6hwLvNqgWnZAicmx/mrNluR3W7+208ZVLRtXpnEed6YmCn6E0Q7vGGOf3bTtXbNaTZO25aMEceKCV4p674Dn3yvEyi6bhfkHW0XjrIsFKon4NPhxYT83qmz0vPa07tqr7ybuL8qLq1uEF4jEUuh9KQaiqubUXF1E6hnLaCZ+5dT1TsWv+ezb8QJB1VkG8tCTDcWKfjBQOHKSUpeol1TFfb99fGe1qtEkfoefD4wB19PPI1v/k4nrzg3QNRotFsnqkaWgAcvsIePPRlOGi9x0JjCFwplRdxhdXZKKpEpyyVJMk5KebwKT4ixUVbTEAMZsHWi1Q5GysE1WV21z9b8lxxr3kN+q18IG/wD/3l3n11YYTSrtsCPLqe7aNNpX/yyryvkWP4HolA0pGf6gSWmMCxYUYloUTfQWDoKM4AAsRiLIlwcC6UIgrNCZLnsNmoncZ4ofP+mZqsgStY0CCzji8ciu08hmtfIBNZXI3TQirGEm2AC8wJ2/Zc485AxCHxGP6+DN5LV3gJZ3VB2uuruT2mV3yoTi6tTxIX1wuR3PiDeazMACTFIlC2QWnOOk1rVWSApOyaXKBoglpfB+En628ogAgAAAABJRU5ErkJggg%3D%3D";
    var menu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVHjaYvz//z8DJQAggFhgDDaz2ccVJHgt3rz8cu/9+z9FDGKCGxnYeRkY/rMxMLBzMTDwANlMnAwMzNwMDNxcDP9n84P1AQQQE8wA9v8MBqV5Vgyz+9yVlFRFNjB8+DWV4e8/MQZG/C4ACCC4Af+APnn3n4lB20qWYU6/J0NYoHoW089/exn+/vfDZwBAAMEN+MHA+u7I8VcM+6/+Y3jwn5shM8OUoavCREdChGstw+//k4A2cGIzACCAGGGByGi5xJLhF/MEFV05Myt3PQY+IV4GI2kGBsH/3xlmrnnKsOv010v/2LmyGTh5jjDwAMNgFiQMAAIIYYDNMiDBwcvwg6mSW0IoV8lAhYdLQpJBV4aRwVvzH8OFax8YJq/7/OHdF5aZDMI8jcBA/A7SBxBAaAawQzAnrxEDM/t0bjERMxYxeQZeblaGRFsGBlX+3wwzdnxlOHaX6cT/eXyWIH0AAQSPRgYxDWBIMkAx4ydeLsbv7CzMDB9//Gf4+JuBYdYRBgZPbWag2RwMTKwM8PAACCAWtDDhZvj9L0dCgqvUQFtM+M53YYZvXxgZlET/M/z5+Yth2a4/P379YJrHwM1cBdMAEEAIA/7/12D8zzBdUUXQQVJRhuHcO3aG70DfSQn+ZXj36hfD2w9/7/77z5zHwMa4HaQapg0ggJBcwLRdQEZM4Y+YJMPpZ0wMPBwMDHysvxiePP7J8OMX82IGFpY8oPc+gL2IBAACCG4AIxuHxDdmAYbvX5kYBDj/Mvz58Z3h2cu/9/4zsjQysDAuwpWQAAIIbsB/FnYGJiYmBm7GXwyf3n4H2sqwjIGZuR4odQdfSgQIIHhKZGRmv/X3+3eG92+/vgRqjmVgYY4G5oM7DAQyK0AAMVKanQECDADMwNCYef7LugAAAABJRU5ErkJggg==";
    var zoomin = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoUlEQVQ4jZXQu2tTYRjH8e9535OTmDQxaZuYU6NNi9a7CaiQSczmWBGKm0WHLkL9DxTETSkF0YqD1kEUvCJI6yBxUiTVqPUKLa1JJfZiehLTkzQ3h1htQBB/08sLz+e5KKzKmXMXgk1O16lyuRJ0N7cemJv9lpifn0/ksrnhK4NnY/wlcuUxcPn6gKPJeVNv2xhuD24OtrT4aXK1+NfYHeHFbLa3o2uXe/zls9G/AucvXRtwujwnd+/ey7auLvR1PrwtHvR1Xta3BViqOjCM75HOLduD7149f9AAXBy+Ha5Uqtf27Y3Q2R7AqqlIqSAVBVUKbFYNn7eV5HdBcWku3NG14+mHxIupFUDMpJL9fn0D7YH1lCoK+QKUynD07CRCAaFAs8vKntBOmv2bsdrs/asnEJUq4TZdR5UKDiustYMUUDRzmMtQAwTgb3bh14NYNK17NaDmzULYscaGFPXCI6cnKZo5CmaOQ/0jFMwsDy/1oKoKrR4XFovWcEQ19yM/ZWSNoCo3IBW4faYTgP3HRnhy5SDVGmTy9VVUKbBqlgZAmEtLicmpaaSoISWovyYpmFmEAEX582eaBppFJhqAUml5MP7qNV/Ts6gSpKx3G7vVg1CgWoVSBbI/8mTmviAUBhuAu8MXYkZm4f6Ne4+YXcjULy9AAWo1MJdhYdHg8cgdPr2Nk/oYb5hAAmzaFho1DGPr64+TW/PFMlbNSiZXYN4wmfgyw/j4Sz6/f4PHViWdTh+JRqOj8Xg8DfVGv9Nz/GSv2+3pd3s84SanE01KqrVKorxcHNzZ4SOdTl+NxWIUi8VFXdejQ0NDiQbgX+nr6+sNhUK/EbvdHpX/LvuTsbGxRCAQmI5EIt2pVMqWTCYP/xewgvh8vmmv19s9MTFx4ifGBwN4Ure0EAAAAABJRU5ErkJggg%3D%3D";
    var zoomout = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClElEQVQ4jZWQTUsbURiFz9w7mYmOSfNhYkZjjVJTba0J1EKW8R8IBXEpdOGmoP+gBemuRQJSCV1Uuyhd2C8KhXSVrlqK0bGkrS4MamJNNRonMZmJSSZdxFgHBOmBy3u5cJ733MPgnKYfz3paTOYHlUrVY7G1Bvf3/kiZTEbK5/ILz0KPorhAtHGZCb+YEVpMr8T2q/4uT6/HbnehxWx3NTUJ/qNcbrzbe8sSX/4SuRDwZG5+xmS2Tg0ODqHf64XY5oTDboXY5kBHuxtFTYAsHwZ6rt/w/Fj5+l4HeLqw6K9Wtfk7QwH0dLnBcywoZUAZBiwlMPIcnI5WJA8JSsV9f7f35udf0rfNBoDspJKTLrETXe4OlKsMCipQrgAMA5DTYzPzuO0bgM3VC97YPHk+Aalq8LeLIljKQOCBK80AJUChBCgnQA0AAeCymeESPTBw3Mh5AFtQVL/QZAQldePYwwRKSh6qkkdJOYaq5PBhbhQsy6DVaobBwOlKZPPHhU05J3tY2gnKAIvTPQAArQZoWn1mC/WvsJSA5ww6AFGKRSmxuQVKaqAUYE+TUAYgpN5F401RZHAGKukA5fJJaGllFb/Te2ApQOlpeaQ+NQ0oV4HccQHZ/W0QBiEd4M3CbFTOHrx7+fYj9g6yZ2YGQK1WL/LgSManyGusx5eQWlvSJaAAcK3fF5FluW91LdFXKFXAczyyeRUZWUFiewfx+DLWf36Hjdewu7s7FgwGI7FYLA3UF51p9N7UuMVinbRYrX6TyQQDpdBqValyUgoNdDuRTqefR6NRqKp6JIricDgclnSAyzQxMTHu8/nOIIIgDNPLbf8Ui8Ukt9u9FQgERlKplDGZTN79L0AD4nQ6txwOx8jGxsb9vyYg/nmG24G2AAAAAElFTkSuQmCC";
    var zoomrestore = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsUlEQVR4Xp2SW0iTYRjH/5/fYdtnTc0jrhPW0Dwt7HC3mZBeKF1pbVoO26V3RkK3URcqiLBADRxEXZR2o9LuDAaKeSHOw1ZuRdBhTs3cNL9tbt/29m6gqASBP/jB8168fx6e50FHR0eb1Wp9PjAwMJS0v79/aHBw0NbV1fWiurr6Av5Hc3PzbXKAQCBAnE4nsdvtpLe3N2Qyme7W19fnVVVV8fgXra2t9wglFouR5eVl4nA4SDAYJHvE4/HE1OSkq6WlxczzfAaOkMayrAKUiYn3cLncMBgM8K1vYnbxIz55v2B6doEprdSV9XR399TV1d0CIBwKoChBYdk01NbehNv7FcHtPziVnQ3CKxCJxjDhmMYJdVa+xdL2QBTFs4cCqFw4HIbX+xlqtRo//GvIzc9HFDx2EgK2IMLj/42ZuXkY9IZiGlB8NECIRqNITxeRhBMU8EsEHzeicK2F8TPEYEVi8GP1F3Jy80SO43IAMHsBXLImhCCwGQAt8G1lHf7vEviTWal3PCFDIXA4f7oQ66v+CB327qEOGAYQBAEZGWr4fD6Ua89BlgKAHIHA0/DwDs5nqXCl4hLG39lXJGnHA4DsdwBCwPMcWI7H6OgYzGYz0pUiphY+YXMjhJIzBbhxVY/ZmQ/o6+uTI5HdNBzEct/SGYmEydLiIrHZbOSZ1ZqqSVwmSf5sBcn42Bi5dv06KSoqInTtSwAq9odIQCDLMra2t6DRFILlWLwZHsaDh53JM8fjJ0/hnJ+HrrICoVAoodfrywG8pl7e2wKbHIRWq4VOp0NDQwNMRiOampqojTAa76Rsb2+HJElzHo8HNTU1ZSqV6hWAEoZenkmrvfhIqVTy2IMACUJSBcMwKelneWTk7UvaRalGo7FkZmbC7XY34hiUUa1UG7Ucx0BBzaMWUMW/uh49keTZSXYAAAAASUVORK5CYII%3D";
    var zoomwidth = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACyUlEQVR4XqWSX0hTbRjAn/ecdSbbNJdFK/p3tTAvXI4IwrwJ6vtEqK819abIG1GCYRcFs+FNXdS+z82tP1ARpX7VVUVoYgWl07oItH8KUcHUxf7Y5v667exse3rfEUsxr/rBw3k453l/D895XmI2m3dJkqQGilwuj25YX2FGgFpCuApEhGw2G+QITCdT6QZRFJEQAkvhKisrr1RVVY3Q53OFQjGcTqebjxmObjMYDMqmxkal8djR7YhYX6pSuZhwBQ6HYw4RpcHBAan7v3/ziWQK/7Z7kJFIxPGv7jkMR6LodPRgj912x2KxQFdXVzHAbrfPIqW/rw8XQiFsuu7Djvte9M8H0fPNi6f/n8XDlz0YDC1gZ6f5lc1mY2eKIYOf8DyB9l4vfIqoYMaPYPiaBkYuD5AUJWi9HYfdcqG0rKwMlv6HoiBPC6+d2ARtdxOgKefhwpG1wCY+PxgDd0CCWy2bwWoVI5FIlDbjVgrWCAJEowtgN5bDuScZUClKCp2CyTjcbNkA8ej3rChmwjzJQy6HwCA0iiqtVgsvR8Ygk4rBxQYOovFFiC2mwGlUQSIWgkePB5J0zVU8yZUCEuConOeWCHQ6Hej1ehh1jUE4HCl0RzqX1+eD4eGnyPOykuPG+i0YfO+XcXgij2T5CIgI1dXVLIGhoaHiOyZSq9Ugzb/1ZKWdOw7otspdHyZu5Mr1OSq5y1Yxg4i5TCaDLBhut3tZeDwebG0/ZbW21Uw6THvj7+6dwauW5rSz2/qPDCk5Cr2yhXFoChqN5tdV5TjgeR54QhSX+idrLCf3BJ65RsnB/bXKkenJXiZghwrxG4o75whCKAHgmvi8sU6v9Y9PffGVKDUVMtpBTovWwOoUJIIglLD8ozsND1+/0Tg79o0LXH5AFggEHphMJgUASLAKAmVqauoFyxfFPLQdWgc1dYbaOuNZIGyEP+EHsrF5Hxph5xoAAAAASUVORK5CYII%3D";
    var hide = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbpJREFUeNrUk8FKAlEUhu9oqRQ2JCG0UBgNWijWQkFhiAqaXERLceE21+16A1+gRQshCFy5MGiTCROBguEqzGkVI0kgumihOKQw3f4zOL2Aqw58MHPv+f9zzr0zAuecLRIOtmAsbCAgrIf5KGtgHyggBHzzvC+ggxp4AiNbZxsIMDh1u91niqJs5XI5v6Zpq41Gw0WbsizPIpHIpFQqDWu12vt0Oi1Cd0d1aQQPOE8kEhf1el2uVCrbpmmuBwIB12RiMAIiF63RHuVQLmksrdPpTKPq42AwmBqGwQlVVTlFsXjNZfmAK8oJR1fc3qdc0pB2CS7ZZDLpQ/uu2WxmzVUoFFDZZJeXV9Z7OBxln59vzN6nXNKgUJYMblqt1vpoNNr2IChBkiSmqk2WSh1ZAo/HzZaXpT+DbwQ0H6R1OhyOfrfb/Wk2m2Y8Ht8QRdGLeZmmvbJQaIeJog/VNXZ4uGcZ67rez+fz9ziLW7oVAXPYV5FEA8fpdDqayWSivV5vs91ue6liLBYbB4PBfrlc7lSr1Q4aeMDyM52TbWB/FysgAnaBH3jn62MwBC9AA4b97Qj//19Y2OBXgAEA3HnRUkre/J0AAAAASUVORK5CYII%3D";
    var settings = "data:image/png;base64,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%3D";
    //Inject CSS for this script
    function configCSS() {
        $("style, link[type='text/css'], link[href$='css']").remove();
        var css = '<style type="text/css">' +
            /*! normalize.css v1.0.0 | MIT License | git.io/normalize */'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html,button,input,select,textarea{font-family:sans-serif}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em;margin:.83em 0}h3{font-size:1.17em;margin:1em 0}h4{font-size:1em;margin:1.33em 0}h5{font-size:.83em;margin:1.67em 0}h6{font-size:.75em;margin:2.33em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}blockquote{margin:1em 40px}dfn{font-style:italic}mark{background:#ff0;color:#000}p,pre{margin:1em 0}code,kbd,pre,samp{font-family:monospace,serif;_font-family:"courier new",monospace;font-size:1em}pre{white-space:pre;white-space:pre-wrap;word-wrap:break-word}q{quotes:none}q:before,q:after{content:"";content:none}small{font-size:75%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}dl,menu,ol,ul{margin:1em 0}dd{margin:0 0 0 40px}menu,ol,ul{padding:0 0 0 40px}nav ul,nav ol{list-style:none;list-style-image:none}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}figure{margin:0}form{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0;white-space:normal;*margin-left:-7px}button,input,select,textarea{font-size:100%;margin:0;vertical-align:baseline;*vertical-align:middle}button,input{line-height:normal}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;*overflow:visible}button[disabled],input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;*height:13px;*width:13px}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}' +
            'html{font-size:100%}' +
            'img{height:auto;max-width:100%;vertical-align:middle;border:0 none}' +
            'button,input,select,textarea{margin:0;font-size:100%;vertical-align:middle}' +
            'button,input{line-height:normal}' +
            'body{margin:0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#333;background-color:#FFF}' +
            'a{color:#08C;text-decoration:none}' +
            'label,input,button,select,textarea{font-size:14px;font-weight:normal;line-height:20px}' +
            'input,button,select,textarea{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}' +
            'select,textarea,input[type="text"],input[type="password"],input[type="datetime"],input[type="datetime-local"],input[type="date"],input[type="month"],input[type="time"],input[type="week"],input[type="number"],input[type="email"],input[type="url"],input[type="search"],input[type="tel"],input[type="color"],.uneditable-input{display:inline-block;height:20px;padding:4px 6px;margin-bottom:10px;font-size:14px;line-height:20px;color:#555;vertical-align:middle;border-radius:4px 4px 4px 4px}' +
            'input:not([type="checkbox"]),textarea,.uneditable-input{width:206px}' +
            'textarea,input[type="text"],input[type="password"],input[type="datetime"],input[type="datetime-local"],input[type="date"],input[type="month"],input[type="time"],input[type="week"],input[type="number"],input[type="email"],input[type="url"],input[type="search"],input[type="tel"],input[type="color"],.uneditable-input{background-color:#FFF;border:1px solid #CCC;box-shadow:0 1px 1px rgba(0,0,0,0.075) inset;transition:border .2s linear 0,box-shadow .2s linear 0}' +
            'input,textarea,.uneditable-input{margin-left:0}' +
            'body{font-family:sans-serif;font-size:12pt;padding:0}' +
            '#MangaOnlineViewer{width:100%;height:100%;padding-bottom: 100px;}' +
            '#MangaOnlineViewer #Chapter{text-align:center;margin: 25px auto 0;display:block;}' +
            '#MangaOnlineViewer #ViewerControls{padding: 8px;position:fixed;top:0;left:190px;}' +
            '#MangaOnlineViewer select{height:20px;padding:0;margin-bottom:5px}' +
            '#MangaOnlineViewer .controlButton{cursor:pointer;border:0 none;}' +
            '#MangaOnlineViewer #ImageOptions {left: 0px;position: absolute;top: 0px;width: auto;}' +
            '#MangaOnlineViewer #ImageOptions .painel {padding:4.5px;}' +
            '#MangaOnlineViewer #ImageOptions:hover {position:fixed;}' +
            '#MangaOnlineViewer #ImageOptions.settingsOpen {position:fixed;}' +
            '#MangaOnlineViewer #ImageOptions #menu {position:fixed;top: 45px;}' +
            '#MangaOnlineViewer #ImageOptions #Zoom {position:relative;left: 18px;}' +
            '#MangaOnlineViewer .MangaPage{width:100%;display:inline-block;text-align:center;align:center}' +
            '#MangaOnlineViewer .PageContent{margin:0 0 15px;text-align:center;display:inline-block}' +
            '#MangaOnlineViewer .fitWidthIfOversized .PageContent img { max-width: ' + $(window).width() + 'px;}' +
            '#MangaOnlineViewer #gotoPage{width:35px;}' +
            '#MangaOnlineViewer #ThemeSelector{width:110px;}' +
            '#MangaOnlineViewer #PagesPerSecond{width:46px;}' +
            '#MangaOnlineViewer .ChapterControl{-moz-user-select:none;-webkit-user-select: none;margin-right:120px;margin-top: 1px;float: right;}' +
            '#MangaOnlineViewer .ChapterControl a{display:inline-block;width: 80px;height:25px;text-align:center;margin-left: 3px;margin-left: 3px;}' +
            '#MangaOnlineViewer .ChapterControl a[href="#"],#MangaOnlineViewer .ChapterControl a[href=""]{visibility:hidden}' +
            '#MangaOnlineViewer .ViewerTitle{display: block;text-align: center;height:35px;}' +
            '#MangaOnlineViewer #Counters {position: absolute;right: 10px;top: 10px;}'+
            '#MangaOnlineViewer .PageFunctions{-moz-user-select:none;-webkit-user-select: none;font-family:monospace;font-size:10pt;padding-right:120px;text-align:right}' +
            '#MangaOnlineViewer .PageFunctions>span{min-width:20px;text-align:center;display:inline-block;padding:2px 10px}' +
            '#MangaOnlineViewer .PageFunctions > a {height: 16px;width: 16px; padding: 10px;}'+
            '#MangaOnlineViewer .PageFunctions .Reload {background: url("'+reload+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions .Hide {background: url("'+hide+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions .ZoomIn {background: url("'+zoomin+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions .ZoomOut {background: url("'+zoomout+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions .ZoomRestore {background: url("'+zoomrestore+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions .ZoomWidth {background: url("'+zoomwidth+'") no-repeat scroll center center transparent;}'+
            '#MangaOnlineViewer .PageFunctions a{opacity:0.2}'+
            '#MangaOnlineViewer .PageFunctions:hover a{opacity:1}'+
            '#MangaOnlineViewer #NavigationCounters {margin-top: 5px;width: 100%;z-index: 50;position: fixed;}'+
            '#MangaOnlineViewer #Navigation {bottom: -170px;height: 180px;overflow: auto;overflow-x: auto;overflow-y: hidden;padding-bottom: 20px;position: fixed;white-space: nowrap;width: 100%;}'+
            '#MangaOnlineViewer #Navigation:hover {bottom: 0;}'+
            '#MangaOnlineViewer #Navigation.disabled {display: none;}'+
            '#MangaOnlineViewer #Navigation.visible {bottom: 0;}'+
            '#MangaOnlineViewer #Navigation .ThumbNail {display: inline-block;height: 150px;margin: 25px 5px 0;position: relative;}'+
            '#MangaOnlineViewer #Navigation .ThumbNail span {display: block;opacity: 0.8;position: relative;top: -30px;width: 100%;}'+
            '#MangaOnlineViewer #Navigation .ThumbNail img {align-content: center;cursor: pointer;display: inline-block;margin-bottom: -10px;margin-top: 10px;max-height: 150px;min-height: 150px;min-width: 100px;}'+
            '#MangaOnlineViewer #Navigation .nav {behavior:url(-ms-transform.htc);-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);-o-transform:rotate(-90deg);}';
        var themes = [ //   body       text       border     painel     dark1      dark2
            ["Dark",        "#000000", "#ffffff", "#666666", "#333333", "#111111", "#282828"],
            ["Light",       "#eeeeec", "#2e3436", "#888a85", "#babdb6", "#c8cec2", "#d3d7cf"],
            ["Dark_Blue",   "#000000", "#91a0b0", "#586980", "#3e4b5b", "#161c24", "#222c3b"],
            ["Tango_Blue",  "#000000", "#82a0bf", "#3d669b", "#304c77", "#081425", "#102747"],
            ["Lime",        "#000000", "#8abd59", "#608d34", "#38531f", "#233413", "#293e17"],
            ["Plum",        "#000000", "#ad7fa8", "#75507b", "#49324d", "#1d1020", "#311b37"],
            ["Light_Plum",  "#eeeeec", "#5c3566", "#9b71a2", "#ad7fa8", "#d2b8ce", "#c4a3c0"],
            ["Alpha_Blue",  "#000000", "#82a0bf", "rgba(56,109,164,0.9)", "#304c77", "#081425", "rgba(18,41,75,0.8)"]
        ];
        for (var i = 0; i < themes.length; i++) {
            css += '.' + themes[i][0] + ' .controlLable, .' + themes[i][0] + ' .ViewerTitle, .' + themes[i][0] + '{color: ' + themes[i][2] + ';}';
            css += '.' + themes[i][0] + ' {background: none repeat scroll 0 0 ' + themes[i][1] + ';}';
            css += '.' + themes[i][0] + ' .PageFunctions a.visible, .' + themes[i][0] + ' a, .' + themes[i][0] + ' a:link, .' + themes[i][0] + ' a:visited, .' + themes[i][0] + ' a:active, .' + themes[i][0] + ' a:focus{ text-decoration:none; color: ' + themes[i][2] + ';}';
            css += '.' + themes[i][0] + ' .PageFunctions { border: 1px solid ' + themes[i][3] + '; border-bottom: medium none;    border-left: medium none;    border-right: medium none;}';
            css += '.' + themes[i][0] + ' .PageFunctions > span, .' + themes[i][0] + ' .ThumbNail span {background: none repeat scroll 0 0 ' + themes[i][4] + '; color: ' + themes[i][2] + ';}';
            css += '.' + themes[i][0] + ' .painel {background: none repeat scroll 0 0 ' + themes[i][4] + '; color: ' + themes[i][2] + ';border: thin solid ' + themes[i][3] + ';}';
            css += '.' + themes[i][0] + ' .PageContent, .' + themes[i][0] + ' .ThumbNail img { outline: 2px solid ' + themes[i][6] + '; background: none repeat scroll 0 0 ' + themes[i][5] + ';}';
            css += '.' + themes[i][0] + ' .ChapterControl a { border: 1px solid ' + themes[i][3] + '; background: -moz-linear-gradient(left top , ' + themes[i][6] + ', ' + themes[i][4] + ') repeat scroll 0 0 transparent; background: -webkit-linear-gradient(left , ' + themes[i][6] + ' 41%, ' + themes[i][4] + ' 71%) repeat scroll 0 0 transparent; }';
            $("#ThemeSelector").append("<option value='" + themes[i][0] + "' " + (GM_getValue("MangaTheme", "Light") == themes[i][0] ? "selected" : "") + ">" + themes[i][0].replace("_", " ") + "</option>");
        }
        css += '</style>';
        $('head').append(css);
    }
    //Builde the reader main body
    function reader(Manga){
        var reader = "<div id='MangaOnlineViewer' class='" + GM_getValue("MangaTheme", "Light") + "' style='min-height: 1080px;' >" +
                        "<div class='ViewerTitle'><br/>" +
                            "<a id='series' href='" + Manga.series + "'> " + Manga.title + " <br/>(Return to Chapter List)</a>" +
                        "</div>" +
                        "<div id='ChapterControlTop' class='ChapterControl'>" +
                            "<a name='bottom' href='#ChapterControlBottom' style='display: none;'>Bottom</a>" +
                            "<a class='prev' name='prev' href='" + Manga.prev + "'>Previous</a>" +
                            "<a class='next' name='next' href='" + Manga.next + "'>Next</a>" +
                        "</div>" +
                        "<div id='Chapter' align='center' class='" + (GM_getValue("MangaFitWidthIfOversized", "true") == "true" ?"fitWidthIfOversized" : "" ) + "'></div>" +
                        "<div class='ViewerTitle'><br/>" +
                            "<a id='series' href='" + Manga.series + "'> " + Manga.title + " <br/>(Return to Chapter List)</a>" +
                        "</div>" +
                        "<div id='ChapterControlBottom' class='ChapterControl'>" +
                            "<a name='top' href='#MangaOnlineViewer'>Top</a>" +
                            "<a class='prev' name='prev' href='" + Manga.prev + "'>Previous</a>" +
                            "<a class='next' name='next' href='" + Manga.next + "'>Next</a>" +
                        "</div>" +
                        "<div id='ImageOptions'>" +
                            "<div class='painel'>" +
                                "<img id='enlarge' alt='Enlarge' src='" + enlage + "' class='controlButton'/> " +
                                "<img id='restore' alt='Restore' src='" + restore + "' class='controlButton'/> " +
                                "<img id='reduce' alt='Reduce' src='" + reduce + "' class='controlButton'/> " +
                                "<img id='fitwidth' alt='Fit Width' src='" + fitwidth + "' class='controlButton'/> " +
                                "<img id='settings' alt='settings' src='" + settings + "' class='controlButton'/>" +
                            "</div>" +
                            "<img id='menu' alt='menu' src='" + menu + "' class=''/>" +
                            "<div id='Zoom' class='controlLable'>Zoom: <b>"+GM_getValue("MangaZoom", 100)+"</b> %</div>" +
                        "</div>" +
                        "<div id='ViewerControls' class='painel' style='display: none;>" +
                            "<span class='controlLable'>Theme:</span> <select id='ThemeSelector'></select> " +
                            "<span class='controlLable'>Pages/Second:</span> "+
                            "<select id='PagesPerSecond'>"+
                                "<option value='3000'>0.3</option>"+
                                "<option value='2000'>0.5</option>"+
                                "<option value='1000'>01</option>"+
                                "<option value='500'>02</option>"+
                                "<option value='250'>04</option>"+
                                "<option value='125'>08</option>"+
                                "<option value='100'>10</option>"+
                            "</select> " +
                            "<span class='controlLable'>Default Zoom:</span> "+
                            "<select id='DefaultZoom'>"+
                                "<option value='50'>50%</option>"+
                                "<option value='75'>75%</option>"+
                                "<option value='100'>100%</option>"+
                                "<option value='125'>125%</option>"+
                                "<option value='150'>150%</option>"+
                                "<option value='175'>175%</option>"+
                                "<option value='200'>200%</option>"+
                                "<option value='1000'>Fit Width</option>"+
                            "</select> " +
                            "<span class='controlLable'>Fit Width if Oversized:</span> "+
                            "<input type='checkbox' val='true' name='fitIfOversized' id='fitIfOversized' "+ (GM_getValue("MangaFitWidthIfOversized", "true") == "true" ?"checked" : "" ) +"> " +
                            "<span class='controlLable'>Show Thumbnails:</span> "+
                            "<input type='checkbox' val='true' name='showThumbnails' id='showThumbnails' "+ (GM_getValue("MangaShowThumbnails", "true") == "true" ?"checked" : "" ) +"> " +
                        "</div>" +  
                        "<div id='Counters' class='controlLable'>" +
                            "<i>0</i> of <b>" + Manga.quant + "</b> Pages Loaded" +
                            "<span class='controlLable'>Go to Page:</span> <select id='gotoPage'><option selected>#</option></select>" +
                        "</div>" +
                        "<div id='Navigation' align='center' class='painel " + (GM_getValue("MangaShowThumbnails", "true") == "true" ?"" : "disabled" ) + "'>"+
                            "<div id='NavigationCounters' class='controlLable'>" +
                            "<img id='' alt='menu' src='" + menu + "' class='nav'/>" +
                                " <i>0</i> of <b>" + Manga.quant + "</b> Pages Loaded " +
                            "<img id='' alt='menu' src='" + menu + "' class='nav'/>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
        $("body").append(reader);
    }
    //Add Pages Place holders
    function addPages(Manga){
        var pages = [],options =[],thumbs = [];
        for (var i = 1; i <= Manga.quant; i++) {
            pages.push("<div id='Page" + i + "' class='MangaPage'>" +
                            "<div class='PageFunctions'>" +
                                "<a class='ZoomIn controlButton'></a> " +
                                "<a class='ZoomRestore controlButton'></a>" +
                                "<a class='ZoomOut controlButton'></a>" +
                                "<a class='ZoomWidth controlButton'></a> " +
                                "<a class='Hide controlButton'></a> " +
                                "<a class='Reload controlButton'></a> " +
                                "<span>" + i + "</span>" +
                            "</div>" +
                            "<div class='PageContent' style='display: none;'></div>" +
                        "</div>");
            options.push("<option value='" + i + "'>" + i + "</option>");
            thumbs.push("<div id='ThumbNail" + i + "' class='ThumbNail'>" +
                            "<img id='ThumbNailImg" + i + "' alt='' src=''/>" +
                            "<span>" + i + "</span>" +                  
                        "</div>");
        }
        $("#Chapter").append(pages.join(''));
        $("#gotoPage").append(options.join(''));
        $("#Navigation").append(thumbs.join(''));
    }
    //Adds an image to the place-holder div
    function addImg(index, src, error) {
        var page = '#Page' + index + ' .PageContent';
        var img = "<img id='PageImg" + index + "' alt='PageImg" + index + "' src='" + src + "'/>";
        $(page).append(img).slideToggle();
        $("#ThumbNailImg" + index).attr("src",src);
    }
    //Adds an optional image just in case the primary does not load
    function addAltImg(index, src) {
        $('img#PageImg' + index).attr("altsrc", src);
    }
    //Default ajax operation
    function getHtml(url, action) {
      $.ajax({
            type: "GET",
            url: url,
            dataType: "html",
            async: false,
            success: action
        });
    }
    //Load Pages Entry
    function loadPages(Manga) {
      mConsole("Loading Images");
        if (Manga.pages !== undefined) {        
            mConsole("Method manual bulk");
            Manga.pages();
        } else {        
                if (Manga.page !== undefined) {
                    mConsole("Method manual individual");
                } else {
                    mConsole("Method automatic");
                }
                mConsole("Intervals: "+ Manga.timer  || "Default(1000)");
            loadImg(Manga, 0);
        }
    }
    //Load Images on the background
    function loadImg(Manga, index) {
        if (++index <= Manga.quant) {
            mConsole("Page " + index);
            setTimeout(function () {
                if (Manga.page !== undefined) {
                    Manga.page(index);
                } else {
                    getHtml(resolveUrl(Manga,index), function (html) {
                        addImg(index, $(html).find(Manga.img).attr('src'));
                    });
                }
                loadImg(Manga, index);
            },Manga.timer || GM_getValue("MangaTimer", 1000));
        }
    }
    //Get the pages url
    function resolveUrl(Manga,index){
        var url = window.location.href;
        if (Manga.url !== undefined) {
            url = Manga.url(index);
        } else if (Manga.data !== undefined) {
            url = $(Manga.data).eq(index - 1).val();
        } else {
            if (window.location.href.lastIndexOf("/") != window.location.href.length - 1) {
                url += "/";
            }
            url += index;
        }
        return url;
    }
    //Checks if all images loaded correctly
    function checkImagesLoaded() {
        var p = $(".PageContent:empty").length;
        $(".PageContent img").filter(function () {
            var image = $(this);
            if (image.context.naturalWidth == 0 ||
                image.readyState == 'uninitialized') {
                return true;
            }
            return false;
        }).each(function () {
            p++;
            reloadImage($(this));
        });
        $("#Counters i").html($("#Counters b").html() - p);
        $("#NavigationCounters i").html($("#NavigationCounters b").html() - p);
        if (p > 0) {
            setTimeout(function () {
                checkImagesLoaded();
            }, 3000);
        } else {
            applyDefaultZoom();
            mConsole("Images Loading Completed");
        }
    };
    //Force reload the image
    function reloadImage(img){
        var src = img.attr("src");
        if ($(this).attr("altsrc") !== undefined) {
            var altsrc = img.attr("altsrc");
            img.removeAttr("src");
            img.attr("altsrc", src);
            setTimeout(function () {
                img.attr("src", altsrc);
                img.removeAttr('width');
            }, 500);
        } else {
            img.removeAttr("src");
            setTimeout(function () {
                img.attr("src", src);
                img.removeAttr('width');
            }, 500);
        }
    }
    //After pages load apply default Zoom
    function applyDefaultZoom(){
        var w = GM_getValue("MangaZoom", 100);
        if(w == 1000) {
            $("#fitwidth").click();
        } else {
            $("#Zoom b").html(w);
            $(".PageContent img").removeAttr('width');
            $(".PageContent img").each(function () {
                $(this).attr('width', $(this).width()*(w/100));
            });
         }
    }
    //Clean key press configurations and set some when specified
    function setKeyDownEvents() {
        document.onkeydown = null;
        document.onkeypress = null;
        window.onkeydown = null;
        window.onkeypress = null;
        window.onload = null;
        document.body.onload = null;
        $(document).unbind("keypress");
        $(document).unbind("keydown");
        function processKey(e) {
            var a = e.keyCode || e.which;
         if($.inArray(a,[39,46,190,37,44,188,43,107,61,45,109,42,106,56,104,53,101]) != -1){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            switch (a) {
               case 39://down:right
               case 46://press:right / down:.
               case 190://press:.
                  $(".ChapterControl:first .next")[0].click();
                  break;
               case 37://down:left
               case 44://press:left / down:,
               case 188://press:,
                  $(".ChapterControl:first .prev")[0].click();
                  break;
               case 43://+
               case 107://numpad+
               case 61://=
                  $('#enlarge').click();
                  break;
               case 45://-
               case 109://numpad-
                  $('#reduce').click();
                  break;
               case 42://5
               case 106://numpad5
               case 56://8
               case 104://numpad8
                  $('#restore').click();
                  break;
               case 53://*
               case 101://numpad*
                  $('#fitwidth').click();
                  break;
            }
            return false;
         }
        }
        if (navigator.userAgent.match(/mozilla/i)) {
            $(document).keypress(processKey);
        } else {
            $(document).keydown(processKey);
        }
    }
    //Controls for the extra features added to the sites
    function controls() {
        // Size Controls
        $('#enlarge').click(function () {
            $("#Zoom b").html(parseInt($("#Zoom b").html())+10);
            $(".PageContent img").removeAttr('width');
            $(".PageContent img").each(function () {
                $(this).attr('width', $(this).width()*($("#Zoom b").html()/100));
            });
        });
        $('#reduce').click(function () {
            $("#Zoom b").html(parseInt($("#Zoom b").html())-10);
            $(".PageContent img").removeAttr('width');
            $(".PageContent img").each(function () {
                $(this).attr('width', $(this).width()*($("#Zoom b").html()/100));
            });
        });
        $('#restore').click(function () {
            $("#Zoom b").html("100");
            $(".PageContent img").removeAttr('width');
        });
        $('#fitwidth').click(function () {
            $("#Zoom b").html("1000");
            $(".PageContent img").each(function () {
                $(this).attr('width', $("html").width());
            });
        });
        $("#fitIfOversized").change(function(){
            $("#Chapter").toggleClass("fitWidthIfOversized");
            if($(this).is(':checked'))
                GM_setValue("MangaFitWidthIfOversized", "true");
            else
                GM_setValue("MangaFitWidthIfOversized", "false");
        });
        $("#showThumbnails").change(function(){
            $("#Navigation").toggleClass("disabled");
            if($(this).is(':checked'))
                GM_setValue("MangaShowThumbnails", "true");
            else
                GM_setValue("MangaShowThumbnails", "false");
        });
        $('#PagesPerSecond').change(function () {
            GM_setValue("MangaTimer", $(this).val());
        });
        $('#DefaultZoom').change(function () {
            var w = $(this).val();
            $("#Zoom b").html(w);
            if(w == 1000) {
                $("#fitwidth").click();
            } else {
                $("#Zoom b").html(w);
                $(".PageContent img").each(function () {
                    $(this).attr('width', $(this).width()*(w/100));
                });
             }
            GM_setValue("MangaZoom", w);
        });
        // Theme Control
        $('#ThemeSelector').change(function () {
            $("#MangaOnlineViewer , body").removeClass();
            $("#MangaOnlineViewer , body").addClass($(this).val());
            GM_setValue("MangaTheme", $(this).val());
        });
        // Goto Page and ThumbNails
        function scrollToElement(ele) {
            $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
        }
        $("#gotoPage").bind("change", function () {
            scrollToElement($("#Page" + $(this).val()));
        });     
        $(".ThumbNail").bind("click", function () {
            scrollToElement($("#Page" + $(this).find("span").html()));
        });
        //Settings Control
        $("#settings").click(function () {
            $("#ViewerControls").slideToggle();
            $("#ImageOptions").toggleClass("settingsOpen");
            $("#Navigation").toggleClass("visible"); 
        });
        //Individual Page functions
        //Reload Page
        $('.Reload').click(function () {
            reloadImage($(this).parents(".MangaPage").find(".PageContent img"));
        });
        //ZoomIn
        $('.ZoomIn').click(function () {
            var img = $(this).parents(".MangaPage").find(".PageContent img");
            img.attr('width', img.width() + (img.width() / 3));
        });
        //ZoomOut
        $('.ZoomOut').click(function () {
            var img = $(this).parents(".MangaPage").find(".PageContent img");
            img.attr('width', img.width() - (img.width() / 3));
        });
        //ZoomRestore
        $('.ZoomRestore').click(function () {
            var img = $(this).parents(".MangaPage").find(".PageContent img");
            $(".PageContent img").removeAttr('width');
        });
        //ZoomWidth
        $('.ZoomWidth').click(function () {
            var img = $(this).parents(".MangaPage").find(".PageContent img");
            img.attr('width', $("html").width());
        });
        //Hide
        $('.Hide').click(function () {
            var img = $(this).parents(".MangaPage").find(".PageContent");
            img.slideToggle("slow");
        });
    }

    // == mh.5652.com
    var mh5652 = function () {
        mConsole("Loading mh5652");
        return {
            // 标题
            title: $.trim($(".BrowseConT_infoTitle span:first").text() + $('.path_bar a:last')[0].nextSibling.nodeValue),
            // 目录页网址
            series: $(".path_bar a:last").attr("href"),
            // 这一话共几页
            quant: $('.Directory_bar select option:last').attr('value'),
            // 上一话
            prev: $("#mh_directory .pre").attr("href"),
            // 下一话
            next: $("#mh_directory .next").attr("href"),
            // 一开始执行的函数。下面这个是直接提取页面内容得到所有的图片地址
            before: function() {
                var input = document.body.innerHTML;
                var regex = /page.add\('.*?','(.*?)'\)/g;

                var matches, output = [];
                while (matches = regex.exec(input)) {
                    output.push(matches[1]);
                }

                this.imageUrls = output;
            },
            // 添加图片到页面，其中 addImg 函数
            pages: function () {
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, this.imageUrls[i - 1]);
                }
            },
        };
    }
    var dmzj = function () {
        mConsole("Loading dmzj");
        return {
            title: $(".display_middle").text().trim(),
            series: $("a.redhotl").attr("href"),
            quant: $('#jump_select option:last').attr('value'),
            prev: $("a#prev_chapter").attr("href"),
            next: $("a#next_chapter").attr("href"),
            pages: function () {
                var img_prefix = unsafeWindow.img_prefix,
                    arr_pages = unsafeWindow.arr_pages;
                var image_source;
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    image_source = img_prefix + arr_pages[i-1];
                    addImg(i, image_source);
                }
            },
        };
    }
    var imanhua = function () {
        mConsole("Loading imanhua");
        return {
            title: $("#title h1").text() + ' - ' + $("#title h2").text(),
            series: $("#title h1 a").attr("href"),
            quant: $('#pageSelect option:last').attr('value'),
            prev: "#",
            next: "#",
            // timeout: 1000,
            before: function() {
                // 获取下一章、上一章的网址
                function run() {
                    function getChapterUrl(callback) {
                        $.getJSON('http://feedback.imanhua.com/chapter' + '?cb=?', {
                            bid: cInfo.bid,
                            cid: cInfo.cid
                        }, callback)
                    }

                    getChapterUrl(function (data) {
                        var next = '/comic/' + cInfo.bid + '/list_' + data.n + '.html';
                        var prev = '/comic/' + cInfo.bid + '/list_' + data.p + '.html';

                        setTimeout(function() {
                            $('.next').attr('href', next);
                            $('.prev').attr('href', prev);
                        }, 500)
                    });
                }
                
                var script = document.createElement('script');
                script.textContent = ';(' + run.toString() + ')();';
                document.body.appendChild(script);
                document.body.removeChild(script);
            },
            pages: function () {
                var pVars = unsafeWindow.pVars,
                    cInfo = unsafeWindow.cInfo,
                    arr = [],
                    curServNum = pVars.curServ,
                    serverUrl = getServerUrl(),
                    midUrl = cInfo.cid > 7910 ? "/Files/Images/" + cInfo.bid + "/" + cInfo.cid + "/" : "",
                    name,
                    image_source;
                
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    name = encodeURI(cInfo.files[i - 1]);
                    image_source = "http://" + serverUrl + midUrl + name;
                    addImg(i, image_source);
                }
                
                function getServerUrl(n) {
                    if (n = n || !1, n === !1) arr.push(curServNum);
                     else {
                        var t = Math.floor(Math.random() * pVars.priServ);
                        if ((',' + arr.toString() + ',') .indexOf(',' + t + ',') == - 1) arr.push(t),
                        curServNum = t;
                         else if (arr.length >= pVars.priServ) curServNum = pVars.priServ;
                         else return getServerUrl(!0)
                    }
                    return pVars.servs[curServNum].host
                }
            },
        };
    }
    var tukuCc = function () {
        mConsole("Loading tukuCc");
        return {
            title: $.trim($(".currentPos > a:last")[0].nextSibling.nodeValue.replace('在线阅读', '')),
            series: $(".currentPos > a:last").attr('href'),
            quant: $("div.pages select option:last").text().match(/[0-9]+/),
            prev: $("div.pages a:contains(上一章)").attr("href"),
            next: $("#nextchapter").attr("href"),
            pages: function() {
                var getImgUrl = unsafeWindow.getImgUrl;
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, getImgUrl(i, 0));
                }
            },
        };
    }
    var xindm = function () {
        mConsole("Loading xindm");
        return {
            title: $("span.black_02 b").text().trim(),
            series: $('a:contains(新动漫首页)').next().attr('href'),
            quant: $("select#PageSelect1 option:last").val(),
            prev: $("a:contains(上一章)").attr("href"),
            next: $("a:contains(下一章)").attr("href"),
            pages: function() {
                var PicServerNow = unsafeWindow.PicServerNow,
                    ArrayPhoto = unsafeWindow.ArrayPhoto;
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, PicServerNow + ArrayPhoto[i-1]);
                }
            },
        };
    }
    var kkkmh = function () {
        mConsole("Loading kkkmh");
        return {
            title: $("div.notice.green").text().trim().replace('你正在观看的是', ''),
            series: $('#chapter-func a:contains(返回目录)').attr('href'),
            quant: $("select#select_menu option:last").val(),
            prev: $('#chapter-func a:contains(上一章)').attr('href'),
            next: $('#chapter-func a:contains(下一章)').attr('href'),
            pages: function() {
                var current_pic_server = unsafeWindow.current_pic_server,
                    hex2bin = unsafeWindow.hex2bin,
                    pic = unsafeWindow.pic;
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, current_pic_server + hex2bin(pic[i - 1]));
                }
            },
        };
    }

    var hentai4manga = function () {
        mConsole("Loading hentai4manga");
        return {
            title: $(".category-label").text().trim(),
            series: location.href.replace(/\/\d+\//, '/'),
            quant: $('select#sl option').size(),
            prev: "#",
            next: "#",
            url: function (i) {
                return "../" + i + "/";
            },
            img: '#textboxContent img'
        };
    }

    // == MangaFox ===================================================================================================================================
    var MangaFox = function () {
        mConsole("Loading MangaFox");
        return {
            title: $("#series .no").text().trim(),
            series: $("#series a:last").attr("href"),
            quant: $('select.m:first option:last').prev().val(),
            prev: $("#chnav p:first a").attr("href"),
            next: $("#chnav p:last a").attr("href"),
            url: function (i) {
                return i + ".html";
            },
            img: 'img#image'
        };
    }
    // == MangaReader =================================================================================================================================
    var MangaReader = function () {
        mConsole("Loading MangaReader");
        return {
            title: $("#mangainfo h1").text(),
            series: $("#mangainfo a").attr("href"),
            quant: $('select#pageMenu option:last').html(),
            prev: $("#mangainfo_bas a:last").attr("href"),
            next: $("#mangainfo_bas a:first").attr("href"),
            img: 'img#img',
            before: function(){
                if(window.location.pathname.match(/\/.+\/.+\/chapter-[0-9]+.*/)){
                    var path = window.location.pathname.split("/");     
                    window.location.pathname = "/" +path[2] +"/"+path[3].match(/[0-9]+/);
                } else if(window.location.search){
               window.location.href = window.location.pathname;
            }
            }
        };
    }
    // == MangaStream =================================================================================================================================
    var MangaStream = function () {
        mConsole("Loading MangaStream");
        return {
            title: $(".btn:eq(1)").text().trim(),
            series: $("div.controls div.btn-group ul.dropdown-menu:first li a:last").attr("href"),
            quant: $("div.controls div.btn-group ul.dropdown-menu li:last").text().match(/[0-9]+/),
            prev: $(".dropdown-menu:eq(1) a").eq($(".dropdown-menu:eq(1) a").index($(".dropdown-menu:eq(1) a[href*='"+location.pathname+"']"))+1).attr("href"),
            next: $(".dropdown-menu:eq(1) a").eq($(".dropdown-menu:eq(1) a").index($(".dropdown-menu:eq(1) a[href*='"+location.pathname+"']"))-1).attr("href"),
            url: function (i) { return window.location.href.substring(0, window.location.href.lastIndexOf("\/") + 1) + i; },
            img: 'img#manga-page'
        };
    }
    // == MangaInn  ===================================================================================================================================
    var MangaInn = function () {
        mConsole("Loading MangaInn");
        return {
            title: $("#gotomangainfo2").text().replace(" - ", ""),
            series: $("#gotoMangaInfo").attr("href"),
            quant: $('select#cmbpages option:last').html(),
            prev: $("#chapters option:selected").prev().val(),
            next: $("#chapters option:selected").next().val(),
            url: function (i) { return location.href + '/page_' + i; },
            img: 'img#imgPage'
        };
    }
    // == AnyManga ===================================================================================================================================
    var AnyManga = function () {
        mConsole("Loading AnyManga");
        return {
            title: $(".linktop-manga").text(),
            series: $("a.linktop-manga:first").attr("href"),
            quant: $('select[name=page_select]:first option').length,
            prev: "#",
            next: "#",
            data: $('select[name=page_select]:first option'),
            pages: function () {
                var pathname = window.location.pathname.split('/');
                var manga = pathname[1];
                var volume = pathname[2];
                var chapter = pathname[3] == "" ? "001" : pathname[3];
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    var image = this.data.eq(i - 1).val();
                    addImg(i, "/manga/" + manga + "/" + volume + "/" + chapter + "/" + image + ".png");
                    addAltImg(i, "/manga/" + manga + "/" + volume + "/" + chapter + "/" + image + ".jpg");
                }
            }
        };
    }
    // == AnimeA =====================================================================================================================================
    var AnimeA = function () {
        mConsole("Loading AnimeA");
        return {
            title: $(".contents > h1 > a").text(),
            series: $("div#content div.contents h1 > a").attr("href"),
            quant: $('select.pageselect:first option:last').val(),
            prev: window.location.pathname.replace(/-chapter-.+.html/, $("#chapterlistfooter option:selected").prev().val() + ".html"),
            next: window.location.pathname.replace(/-chapter-.+.html/, $("#chapterlistfooter option:selected").next().val() + ".html"),
            url: function (i) {
                var pathname = window.location.pathname;
                return pathname.replace(/(-page-[0-9]+)?\.html/,"-page-"+i+".html") ;
            },
            img: 'img#scanmr'
        };
    }
    // == MangaHere ===================================================================================================================================
    var MangaHere = function () {
        mConsole("Loading MangaHere");
        return {
            title: $(".title h1").text(),
            series: $("div.title h2 a").attr("href"),
            quant: $(".right select:first option:last").html(),
            prev: $("#top_chapter_list option:selected").prev().val(),
            next: $("#top_chapter_list option:selected").next().val(),
            data: $(".right select.wid60:first").html().replace(/\n */g, ""),
            img: 'img#image'
        };
    }
    // == BoxManga =====================================================================================================================================
    var BoxManga = function () {
        mConsole("Loading BoxManga");
        return {
            title: $(".manga:first b").text(),
            series: $("a.manga").attr("href"),
            quant: $("#pageindex option:last").val(),
            prev: "#",
            next: "#",
            pages: function () {
                var pages = $('#pic').val().split('\n');
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, "http://www.boxmanga.com/0/" + pages[i - 1] + ".jpg");
                }
            }
        };
    }
    // == Batoto ==================================================================================================================================
    var Batoto = function () {
        mConsole("Loading Batoto");
        return {
            title: $(".moderation_bar li:first").text(),
            series: $("div.moderation_bar a:first").attr("href"),
            quant: $("select#page_select:first option").length,
            prev: $("img[src$='pprev.png']:first").parent().attr("href"),
            next: $("img[src$='nnext.png']:first").parent().attr("href"),
            data: $("#page_select").html(),
            img: '#comic_page'
        };
    }
    // == MangaDevil ==================================================================================================================================
    var MangaDevil = function () {
        mConsole("Loading MangaDevil");
        return {
            title: $("title").text().replace(" - Manga Devil", ""),
            series: "#",
            quant: $("select[name=page] option").length,
            prev: $("#chapter_navigation select[name='chapter'] option:selected").prev().val(),
            next: $("#chapter_navigation select[name='chapter'] option:selected").next().val(),
            data: $("#manga_image img").attr("src"),
            pages: function () {
                var imageUrl = this.data.split("/");
                var url = this.data.replace(imageUrl[imageUrl.length - 1], "");
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, url + i + ".jpg");
                    addAltImg(i, url + i + ".png");
                }
            }
        };
    }
    // == WPManga ==================================================================================================================================
    var WPManga = function () {
        mConsole("Loading WPManga");
        return {
            title: $(".wpm_pag h1").text().trim(),
            series: $("h1.ttl a").attr("href"),
            quant: $("select.cbo_wpm_pag:first option:last").html(),
            prev: $(".cbo_wpm_chp").attr("onchange").replace(/location.href=\'/, "").replace(/\'.+/, $(".cbo_wpm_chp option:selected").next().val()),
            next: $(".cbo_wpm_chp").attr("onchange").replace(/location.href=\'/, "").replace(/\'.+/, $(".cbo_wpm_chp option:selected").prev().val()),
            url: function (i) {
                var pathname = window.location.pathname.split('/');
                return "/" + pathname[1] + "/" + pathname[2] + "/" + i + "/";
            },
            img: "img.manga-page , .prw > a img, .prw a img"
        };
    }
    // == MangaJoy ==================================================================================================================================
    var MangaJoy = function () {
        mConsole("Loading MangaJoy");
        return {
            title: $("h1.fl a:eq(1)").html().trim(),
            series: $("h1.fl a:eq(1)").attr("href"),
            quant: $(".wpm_nav_rdr select:last option:last").html(),
            prev: "#",
            next: "#",
            url: function (i) {
                var pathname = window.location.pathname.split('/');
                return "/" + pathname[1] + "/" + pathname[2] + "/" + i + "/";
            },
            img: "#img_mng_enl"
        };
    }
    // == SenManga ===================================================================================================================================
    var SenManga = function () {
        mConsole("Loading SenManga");
        if (window.location.href.match("raw")) {
         return {
            title: $(".walk:first").text().trim(),
            series: $("div.walk:first a:eq(1)").attr("href"),
            quant: $("select[name='page'] option:last").val(),
            prev: $("div.walk:first a:eq(1)").attr("href") + $(".pager select:first option:selected").next().val(),
            next: $("div.walk:first a:eq(1)").attr("href") + $(".pager select:first option:selected").prev().val(),
            url: function (i) {
               var pathname = window.location.pathname.split('/');
               return "/" + pathname[1] + "/" + pathname[2] + "/" + i + "/";
            },
            img: "#picture",
            before: function(){
               $("body").contents().filter(function () {
                  return this.nodeType == 3; //Node.TEXT_NODE
               }).remove();
            }
         };
      } else {
         return {
            title: $(".wpm_pag h1").text().trim(),
            series: $("h1.ttl a").attr("href"),
            quant: $(".pager:first select:last option:last").val(),
            prev: "../" + $(".cbo_wpm_chp option:selected").next().val(),
            next: "../" + $(".cbo_wpm_chp option:selected").prev().val(),
            url: function (i) {
               var pathname = window.location.pathname.split('/');
               return "/" + pathname[1] + "/" + pathname[2] + "/" + i + "/";
            },
            img: "#picture",
            pages:function(){
               var self = this;
               for (var i = 1; i <= self.quant; i++) {
                  mConsole("Page " + i);
                  $.ajax({
                     type: "GET",
                     url: self.url(i),
                     dataType: "text",
                     async: false,
                     success: function(html){
                        addImg(i, html.match(/id=\"picture\" src=\"(.+?)\"/)[1]);
                     }
                  });
               }
            },
            before: function(){
               $("body").contents().filter(function () {
                  return this.nodeType == 3; //Node.TEXT_NODE
               }).remove();
            }
         };
      }
    }
    // == MangaChapter ===================================================================================================================================
    var MangaChapter = function () {
        mConsole("Loading MangaChapter");
        return {
            title: $(".content h1").text().trim(),
            series: $("div.box-read h2 a").attr("href"),
            quant: $("select.wd60:first option").length,
            prev: $("#top_chapter_list option:selected").next().val(),
            next: $("#top_chapter_list option:selected").prev().val(),
            data: $("select.wd60:first").html().trim().replace(/> </g, "><"),
            img: "#viewer a img"
        };
    }
    // == Starkana ===================================================================================================================================
    var Starkana = function () {
        mConsole("Loading Starkana");
        return {
            title: $("title").text().replace(" - Read Online & Direct Download @ Starkana", "").trim(),
            series: $("#bc2 a:eq(2)").attr("href"),
            quant: $('select#page_switch option:last').html(),
            prev: $("#chapter_switch option:selected").next().val(),
            next: $("#chapter_switch option:selected").prev().val(),
            data: $('select#page_switch').html(),
            img: "img.dyn"
        };
    }
    // == EatManga ===================================================================================================================================
    var EatManga = function () {
        mConsole("Loading EatManga");
        return {
            title: $("#main_content h1").text().split(",")[0].trim(),
            series: $("ul#crumbs li a:eq(2)").attr("href"),
            quant: $('select#pages option:last').html(),
            prev: $("#top_chapter_list option:selected").next().val(),
            next: $("#top_chapter_list option:selected").prev().val(),
            data: $('select#pages').html(),
            img: "#eatmanga_image , #eatmanga_image_big"
        };
    }
    // == MangaBird  ===================================================================================================================================
    var MangaBird = function () {
        mConsole("Loading MangaBird");
        return {
            title: $("h1.title").text().replace(" - ", ""),
            series: $("span.term a").attr("href"),
            quant: $(".pager a").length,
            prev: "#",
            next: "#",
            url: function (i) { return window.location.href + '?page=' + (i-1); },
            img: "div.content a img"
        };
    }
    // == MangaLyght ========================================================================================================================
    var MangaLyght = function () {
        mConsole("Loading MangaLyght");
        return {
            title: $("div.entry h1 a").text().trim(),
            series: $("div.entry h1 a").attr("href"),
            quant: $(".selectpage option").length,
            prev: (window.location.pathname + "?ch=" + $(".selectchapter option:selected").prev().val()).replace(" ","+"),
            next: (window.location.pathname + "?ch=" + $(".selectchapter option:selected").next().val()).replace(" ","+"),
            data: $("form[name='pageSelector1']").attr("action") + "?ch=" + $(".selectchapter option:selected").val().replace(" ","+") + "&page=",
            url: function (i) {
                return this.data + i;
            },
            img: "#mainimage"
        };
    }
    // == Fakku =======================================================================================================================================
    var Fakku = function () {
        mConsole("Loading Fakku");
        return {
            title: $(".chapter a:eq(1)").text().trim(),
            series: $("a.a-series-title:first").attr("href"),
            quant: $(".drop option:last").val(),
            prev: "#",
            next: "#",
            data: $("#thumbs img, .current-page").attr("src").replace("thumbs","images").replace(/[0-9]+(\.thumb)?\.jpg$/, ""),
            pages: function () {
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    var str = '' + i;
                    while (str.length < 3) str = '0' + str;
                    addImg(i, this.data + str + ".jpg");
                }
            }
        };
    }
    // == HBrowser ====================================================================================================================================
    var HBrowser = function () {
        mConsole("Loading HBrowser");
        return {
            title: $('.listTable td.listLong:first').text().trim(),
            series: $("a.pageLink:eq(1)").attr("href"),
            quant: $('td.pageList a, td.pageList strong').length -1,
            prev: $("#chapters + table a.listLink").eq($("#chapters + table a.listLink").index($("#chapters + table a.listLink[href='"+window.location.href+"']"))-1).attr("href"),
            next: $("#chapters + table a.listLink").eq($("#chapters + table a.listLink").index($("#chapters + table a.listLink[href='"+window.location.href+"']"))+1).attr("href"),
            url:function(i){
                var str = '' + i;
                while (str.length < 3) str = '0' + str;
                return window.location.href +"/"+ str;
            },
            img: 'td.pageImage a img',
            before: function(){$('html > head').append($('<style>#main a:visited, #pageMain a:visited { color: darkred !important; }</style>'));}
        };
    }
    // == Doujin-Moe Non-members ========================================================================================================================
    var DoujinMoeNM = function () {
        mConsole("Loading DoujinMoeNM");
        return {
            title: $(".title").text(),
            series: $(".title a").eq(-2).attr("href"),
            quant: $("#gallery > :not(.thumbs)").length,
            prev: "#",
            next: "#",
            data: $("#gallery > djm:not(.thumbs)"),
            page: function (i) {
                addImg(i, this.data.eq(i - 1).attr("file"));
            }
        };
    }
    // == Luscious ========================================================================================================================
    var Luscious = function () {
        mConsole("Loading Luscious");
        return {
            title: $("#main .center h1:first").text().split("|")[0].trim(),
            series: "#",
            quant: $(".image > a > img").length,
            prev: "#",
            next: $(".next").attr("href"),
            data: $(".image > a > img"),
            pages: function () {
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, this.data.eq(i - 1).attr('src').replace(".640x0", ""));
                }
            },
            before: function(){
        mConsole("Loading MangaFox");
                var url = window.location.href;
                if (url.match("style=blog") && !url.match("position")) {
                    window.location = url.replace(/page\/[0-9]+.+/, "sorted/position/page/1/?style=blog");
                } else if (url.match("/pictures/album/.*/id")) {
                    window.location = url.replace(/id.*/, "sorted/position/page/1/?style=blog");
                } else {
                    $('a.cover').each(function () {
                        var href = $(this).attr('href');
                        if (href.match("/pictures/album/.*/id")) {
                            $(this).attr('href', href.replace(/id.*/, "sorted/position/page/1/?style=blog"));
                        }
                    });
                }
            }
        };
    }
    // == HentaiMangaOnline ========================================================================================================================
    var HentaiMangaOnline = function () {
        mConsole("Loading HentaiMangaOnline");
        return {
            title: $(".breadcrumb li:eq(2)").text().trim(),
            series: $("ul.breadcrumb li a:eq(2)").attr("href"),
            quant: $("select option").length,
            prev: "#",
            next: "#",
            data: $("select").html(),
            img: 'a img'
        };
    }
    // == ExHentai ========================================================================================================================
    var ExHentai = function () {
        mConsole("Loading ExHentai");
        return {
            title: $("#il h1").text().trim(),
            series: $("div#i5 div.sb a").attr("href"),
            quant: $(".sn div span:last").text(),
            prev: "#",
            next: "#",
            url: window.location.href,
            timer: 3000,
            page: function (i) {
                var self = this;
                getHtml(self.url, function (html) {
                    addImg(i, $(html).find("#img").attr("src"));
                    self.url = $(html).find("#img").parent().attr("href");
                });
            }
        };
    }
    // == Pururin ========================================================================================================================
    var Pururin = function () {
        mConsole("Loading Pururin");
        return {
            title: $(".header-breadcrumbs a:eq(3)").text().trim(),
            series: $(".header-breadcrumbs a:eq(3)").attr("href"),
            quant: $(".image-pageSelect option").length,
            prev: "#",
            next: "#",
            data: $(".image-pageSelect").html(),
            img: "img.b"
        };
    }
    // == fufufuu ========================================================================================================================
    var Fufufuu = function () {
        mConsole("Loading Fufufuu");
        var temp = JSON.parse(atob($("#payload").text()))
        return {
            title: $(".manga-title span:last").text().trim(),
            series: "",
            quant: temp.page_list.length,
            prev: "#",
            next: "#",
            data: temp,
            pages: function(){
                for (var i = 1; i <= this.quant; i++) {
                    mConsole("Page " + i);
                    addImg(i, this.data.page_list[i - 1].url);
                }
            }
        };
    }
    // == FoOlSlide ========================================================================================================================
    var FoOlSlide = function () {
        mConsole("Loading FoOlSlide");
        return {
            title: $("title").text().trim(),
            series: $("div.tbtitle div.text a:first").attr("href"),
            quant: $(".topbar_right .dropdown li").length,
            prev: "#",
            next: "#",
            url: function (i) {
                var url = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + "/";
                return url.match(/page\/$/ ? url : url += "page/") + i;
            },
            img: "img.open"
        };
    }
})();
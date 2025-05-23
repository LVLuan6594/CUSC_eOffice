!function(t) {
    var a = []
      , i = 0
      , e = t(".khai-giang-container").find("a.nentang-link-img-wrapper > img").length;
    t(".khai-giang-container").find("a.nentang-link-img-wrapper > img").each(function(n, r) {
        var l = t(this).parent()
          , o = t(this);
        t("<img>").attr("src", t(r).attr("src")).on("load", function(n) {
            var r = t(this);
            !function(t, n, r) {
                console.log(t),
                console.log(i),
                t.attr("data-image-loaded", i);
                var l = ""
                  , o = t.attr("href")
                  , h = n.attr("src");
                (o.indexOf(".jpg") || o.indexOf(".jpeg") || o.indexOf(".png") || o.indexOf(".gif") || o.indexOf(".svg")) && (l = o);
                (h.indexOf(".jpg") || h.indexOf(".jpeg") || h.indexOf(".png") || h.indexOf(".gif") || h.indexOf(".svg")) && (l = h);
                var g = ""
                  , d = ""
                  , p = t.data("width")
                  , s = t.data("height")
                  , c = n.data("width") || n[0].naturalWidth
                  , u = n.data("height") || n[0].naturalHeight;
                g = p || (c || Math.max(300, n.width(), n[0].naturalWidth, r[0].naturalWidth));
                d = s || (u || Math.max(300, n.height(), n[0].naturalHeight, r[0].naturalHeight));
                var w = {
                    src: l,
                    w: g,
                    h: d,
                    title: t.data("alt")
                };
                a.push(w),
                ++i == e && (console.log("ALL IMAGES LOADED"),
                console.log(i))
            }(l, o, r)
        })
    }),
    t(".khai-giang-container a.nentang-link-img-wrapper:has(img)").click(function(i) {
        if (a && !(a.length < 1)) {
            i.preventDefault();
            var e = t(this).attr("data-image-loaded") || 0
              , n = t(".pswp")[0];
            new PhotoSwipe(n,PhotoSwipeUI_Default,a,{
                index: e,
                pid: e,
                bgOpacity: .85,
                showHideOpacity: !0,
                closeOnScroll: !1,
                shareButtons: [{
                    id: "facebook",
                    label: "Chia sẻ lên Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Chia sẻ lên Tweetter",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Chia sẻ lên Pinterest",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Tải ảnh về",
                    url: "{{raw_image_url}}",
                    download: !0
                }, {
                    id: "opennewtab",
                    label: "Mở ảnh trong tab mới",
                    url: "{{raw_image_url}}"
                }]
            }).init()
        }
    })
}(jQuery);



var var scrollTopPositionInit = 0;
function stopScroll(state) {
    //Есди страница уже фиксирована, то вызов этой функции с аргументом state = true, ничего не сделает
    if (state && $("html")[0].style.position == "fixed") {
        return false;
    }

    if (state) {
        scrollTop = $(window).scrollTop();
        $("html").css({
            position: "fixed",
            top: -scrollTopPositionInit
        });
    } else {
        $("html").css({
            position: "static"
        });
        $(window).scrollTop(scrollTopPositionInit);
    }
}

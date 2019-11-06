

//ES 5
var scrollTopPositionInit = 0;
function stopScroll(state) {
    //Есди страница уже фиксирована, то вызов этой функции с аргументом state = true, ничего не сделает
    if (state && $("html")[0].style.position == "fixed") {
        return false;
    }

    if (state) {
        scrollTopPositionInit = $(window).scrollTop();
        $("html").css({
            position: "fixed",
            top: -scrollTopPositionInit,
            width: "100%"
        });
    } else {
        $("html").css({
            position: "static"
        });
        $(window).scrollTop(scrollTopPositionInit);
    }
}

//ES 6
class StopScroll {
    constructor() {
        this.scrollTopPositionInit = 0;
        this.stopScrollIsActive = false;
    }

    scroll(flag) {
        const that = this;
        const body = document.querySelector("body"),
            html = document.querySelector("html");

        if (flag) {
            html.setAttribute(
                "style",
                `
                    position:static; 
                `
            );

            if (that.stopScrollIsActive) {
                window.scrollTo(0, that.scrollTopPositionInit);
                that.stopScrollIsActive = false;
            }
        } else {
            that.scrollTopPositionInit = window.pageYOffset;
            html.setAttribute(
                "style",
                `
                    width: 100%;
                    position:fixed; 
                    top: ${that.scrollTopPositionInit * -1}px;
                `
            );

            that.stopScrollIsActive = true;
        }
    }
}

let stopScroll = new StopScroll();

//Функция scroll принмает 1 аргумент (true / false)
//true - скролл разрешен
//false - скролл запрещен
stopScroll.scroll()


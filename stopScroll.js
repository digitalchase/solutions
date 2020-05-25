class StopScroll {
    constructor() {
        this.scrollTopPositionInit = 0;
        this.stopScrollIsActive = false;

        document.querySelector("html").style.overflow = 'auto';
    }

    scroll(flag) {
        const that = this;
        const body = document.querySelector("body"),
            html = document.querySelector("html");

        if (!flag) {
            html.style.overflow = 'auto';

            if (that.stopScrollIsActive) {
                window.scrollTo(0, that.scrollTopPositionInit);
                that.stopScrollIsActive = false;
            }
        } else {

            that.scrollTopPositionInit = window.pageYOffset;
            html.style.overflow = 'hidden';

            that.stopScrollIsActive = true;
        }
    }
}

let stopScroll = new StopScroll();

export default stopScroll;

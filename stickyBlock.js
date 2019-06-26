var $sticky = $(".sticky"); // Элемент который будет плавать
var $stickyrStopper = $(".sticky-stopper"); // Элемент который будет стопить плавание

var generalSidebarHeight = $sticky.innerHeight();
var stickyTop = $sticky.offset().top;
var stickOffset = 0;
var stickyStopperPosition = $stickyrStopper.offset().top;
var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
var diff = stopPoint + stickOffset;

function stickyBlock() {
    // scroll event
    var windowTop = $(window).scrollTop(); // returns number

    if (stopPoint < windowTop) {
        $sticky.css({
            position: "absolute",
            top: diff
        });
    } else if (stickyTop < windowTop + stickOffset) {
        $sticky.css({
            position: "fixed",
            top: stickOffset
        });
    } else {
        $sticky.css({
            position: "absolute",
            top: 'initial'
        });
    }
}

stickyBlock();
$(window).scroll(stickyBlock);

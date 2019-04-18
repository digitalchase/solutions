//Функция определения 
function currentBrowser() {
    var ua = navigator.userAgent;
    if (ua.match(/MSIE/)) return;
    if (ua.match(/Firefox/)) return;
    if (ua.match(/Opera/)) return;
    if (ua.match(/Chrome/)) return;
    if (ua.match(/Safari/)) {
        $('body').addClass('safari');
        return;
    };
    $('body').addClass('ie');
}
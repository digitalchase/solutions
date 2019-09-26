//Функция определения мобильная ли эта система или нет
function checkTouchDevice() {
    return !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
}

//Функция определяет тач устроство
function checkTouchDevice() {
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
        return true;
    } else {
        return false;
    }
}

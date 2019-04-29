/*
  Иногда бывает такое, что при изменение размера окна необходимо менять и сам класс или при загрузке странице на после определенного разрешие нужно поменять класс.
*/

//Для этого нужно вызвать функцию ниже и передать в нее объект со следующими полями
                |
                |
                |
                V
/*
    obj = {
        element:, // Элемент над которым делать изменения
        toggleClass, // Что изменить
        toggleToClass, // На что изменить
        breakpoint // Точка на которой это сделать
    }
*/

function toggleClassWhenWindowResiae(obj) {
    if ($(obj.element).length == 0) {
        return false;
    }

    if (window.innerWidth <= obj.breakpoint && $(obj.element).length && $(obj.element).hasClass(obj.toggleClass)) {
        $(obj.element)
            .removeClass(obj.toggleClass)
            .addClass(obj.toggleToClass);
    } else if (window.innerWidth > obj.breakpoint && $(obj.element).length && $(obj.element).hasClass(obj.toggleToClass)) {
        $(obj.element)
            .removeClass(obj.toggleToClass)
            .addClass(obj.toggleClass);
    }
}

//Просто вызов
toggleClassWhenWindowResiae(changeBtnInmuseumSliderDetail);

//Вызов при изменение ширины окна браузера
$(window).resize(function() {
    toggleClassWhenWindowResiae(changeBtnInmuseumSliderDetail);
});

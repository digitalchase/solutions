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
    if ($(obj.element).length === 0) {
        return false;
    }

    if (window.innerWidth <= obj.breakpoint && $(obj.element).hasClass(obj.toggleClass)) {
        $(obj.element).removeClass(obj.toggleClass);
        if (obj.toggleToClass.trim() !== "") {
            obj.element.addClass(obj.toggleToClass);
        }
    } else if (window.innerWidth > obj.breakpoint && !$(obj.element).hasClass(obj.toggleClass)) {
        if (obj.toggleToClass.trim() !== "") {
            $(obj.element).removeClass(obj.toggleToClass);
        }
        $(obj.element).addClass(obj.toggleClass);
    }
}

/*-- Пример вызова --*/

var changeBtnInmuseumSliderDetail = {
      element: ".btn-type-nav",
      toggleClass: "btn-type-nav-white",
      toggleToClass: "btn-type-nav-purple",
      breakpoint: 1000
 };

//Просто вызов
toggleClassWhenWindowResiae(changeBtnInmuseumSliderDetail);

//Вызов при изменение ширины окна браузера
$(window).resize(function() {
    toggleClassWhenWindowResiae(changeBtnInmuseumSliderDetail);
});



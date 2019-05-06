//Иногда бывает такое, что необходимо в слайдере элементы выставить в колонку, но у элементов разная высота
//в swiper slider api по этому поводу ничего не говорят, поэтому можно использовать вот такой костыль
//Его нужно засунуть в метод on.init, что бы запускался сразу же после того как swiper создастся

//В качестве param в функцию необходимо передать объект, ниже пример


var itemArray = Array.from($("#eventSlider").find(".swiper-slide")); //Создаем массив из объекта который нам вернется из jquery

var obj = {
    swiperSelector: "#eventSlider", //Селектор слайдера на который вызывается new Swiper('...') (обязательный параметр)
    contentSelector: ".eventItem", //Селектор обертки контента внутри .swiper-slide (не обязательный параметр). Если его не передать  или если его не окажется внутри .swiper-slide, возьмется сам .swiper-slide,
    slideArray: itemArray //Массив слайдов
}

function autoHeightSlideInSwiperColumn(param) {
      if (!(param.slideArray instanceof Array) || param.swiperSelector == "" || $(param.swiperSelector).length == 0) {
          return false;
      }

      param.slideArray.map(function(el) {
          //Задаем высоту слайдов от высоты контента
          $(el).css({
              height:
                  param.contentSelector == "" || $(el).find(param.contentSelector).length == 0
                      ? $(el).innerHeight()
                      : $(el)
                            .find(".eventItem")
                            .innerHeight()
          });
          //Сдвигаем все слайды кроме первого в колонке вврех, на столько, что бы они были впритык друг к другу
          if ($(el).attr("data-swiper-row") == "1") {
              $(el).css({
                  top: $(el).prev().length
                      ? $(el)
                            .prev()
                            .height() -
                        ($(el).offset().top - $(param.swiperSelector).offset().top)
                      : 0
              });
          }
      });
  }

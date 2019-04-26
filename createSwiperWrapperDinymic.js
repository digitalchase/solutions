//Иногда бывает задача сделать возможность создавать слайдер, но  в той части которая вносится из админки.
//Проблема в том, что ниодин контентщик не станет запариваться и создавать все обертки для слайдов, контейнеры и т.д.

//В примере создается один из самых простых swiper slider, просто картинки и стрелочки для навигации

/*
  !!!!!! P.S. весь код ниже написан на es5 и jquery 2.2.4 . Код можно переписать на es6, jsx и т.д. 
  Ниже +- универсальный вариант
*/

//Код ниже может помочь решить эту проблему

//Первое что нужно сделать это создать в html настолько простую структуру, что бы контентщик особо не парился
//Мне нравится следующий вариант
<div class=" slider">
    <img src="" alt="">
    <img src="" alt="">
    <img src="" alt="">
    <img src="" alt="">
</div>


//Получаем весь массив слайдеров (а вдруг их будет больше одного)
var arrSlider = $(".slider"); 

//Создаем класс для каждого слайдера, что бы у него бала своя логика и методы
function CreateSliderConstruction(el, index) {
        
    //Для того, что бы не потерять контекст создаем переменную к которой привяжем this
    var that = this; 

    
    that.imageArray = $(el).find("img"); //Получаем массив картинок
    that.swiperContainer = null; //Создаем переменную для swiper container
    that.navigation = null; //Создаем переменную для навигации

    //Базовая обертка swiper slider 
    that.basicWrapper = function() {
         
        //Тут создаем структуру следующего вида (пример на emmet) .swiper-container > .swiper-wrapper
        //Так же .swiper-container даем атрибут data-sliderIndex="N", что бы знать, сколько подобных слайдеров было создано
        that.swiperContainer = '<div class="swiper-container data-sliderIndex="' + index + '">' + 
                                        '<div class="swiper-wrapper"></div>' + 
                                "</div>";
        
        //Создаем элемент навигации с кнопками, верстку можено менять как угодно, так же даем класс data-navIndex, что бы знать к какому слайдеру относится эта навигация
        that.navigation ='<div class="articleSliderNavigation" data-navIndex="' + index +'">' +
                                '<div class="btn-container">' +
                                        '<div class="btn-prev"></div>' +
                                        '<div class="btn-next"></div>'+
                                "</div>" +
                            "</div>";

        //Добавляем в наш контейнер (в примере это .slider) swiper-container и рядом навигацию
        $(el).html(that.swiperContainer);
        $(el).append(that.navigation);

        //Вызываем метод который поместит наши .swiper-slide в .slider-wrapper
        that.appendImageInSlider(that.imageArray);
    };

    //Оборачиваем картинку в swiper-slide
    that.appendImageInSlider = function(array) {
        array.each(function(index, element) {
            
                
            //При помощи jquery создаю DOM объект .swiper-slide
            //Это все можно сделать так же как выше создавались swiper-container
            $("<div>", {
                class: "swiper-slide",
                //В .swiper-slide добавляем div.image и даем ему свойство background-image  
                append: $("<div>", {
                    class: "image",
                    css: {
                        backgroundImage: "url(" + $(element).attr("src") + ")"
                    }
                })
            }).appendTo($(el).find(".swiper-wrapper")); //Помещяем созданный элемент в .swiper-wrapper
        });
            
        //Вызываем метод который инициализирует swiper slider
        that.createSwiperSlider();
    };

    that.createSwiperSlider = function() {
            
        //Обходим все наши .slider .swiper-container и вызываем на них swiper slider 
        $("el .swiper-container").each(function(index, element) {
            
            //Парамерры настроек можно вынести как отдельную переменную
            new Swiper(element, {
                slidesPerView: 1,
                navigation: {
                    prevEl: '.articleSliderNavigation[data-navIndex="' + index + '"] .btn-prev',
                    nextEl: '.articleSliderNavigation[data-navIndex="' + index + '"] .btn-next'
                }
            });
        });
    };
}


//Начинаем создавать слайдеры на основе массива
arrSlider.each(function(index, element) {
    var a = new CreateSliderConstruction(element, index);
    a.basicWrapper();
});

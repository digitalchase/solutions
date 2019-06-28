//Запуск множества слайдеров с одинаковым классом на одной странице
//Так же внутри предусмотрены проверки на то, что слайдер не активируется если слайдов недостаточно для активации

//Ниже пример верстки слайдера

if ($(".pageSlider").length) {
    var pageSlider_sliderArray = [];

    function pageSlider_init() {
        //Цикл по все слайдерам на странице
        $(".pageSlider").each(function(index, val) {
            //В массиве создаю объект по слайдер
            pageSlider_sliderArray.push({
                slidesWidth: 0,
                sliderObj: 0
            });

            //Записываю длину слайдов в слайдере в соответствующий объект в массиве
            $(val)
                .find(".swiper-slide")
                .each(function(indexSlides, val) {
                    pageSlider_sliderArray[index].slidesWidth += $(val).innerWidth();
                });

            //Условие на запуск слайдера
            if (pageSlider_sliderArray[index].sliderObj === 0 && pageSlider_sliderArray[index].slidesWidth > $(document).width()) {
                //Показываем кнопки
                $(val)
                    .find(".btn-pageSlider")
                    .show();

                //Запуск слайдера и запись объекта в массив
                pageSlider_sliderArray[index].sliderObj = new Swiper($(val).find(".swiper-container"), {
                    slidesPerView: "auto",
                });
                //Условие которое убивает слайдер если нужно
            } else if (pageSlider_sliderArray[index].sliderObj !== 0 && pageSlider_sliderArray[index].slidesWidth <= $(document).width()) {
                pageSlider_sliderArray[index].sliderObj.destroy();
                pageSlider_sliderArray[index].sliderObj = 0;
                $(val)
                    .find(".btn-pageSlider")
                    .hide();
            }
        });
    }

    pageSlider_init();
    
    //Функция throttle это тротлинг сама функция есть в нашем репозитории throttle.js
    $(window).resize(throttle(pageSlider_init, 1000));
    
    //Можно запускать и просто так. Но тротлинг уменьшает нагрузку если юзер начинает ресайзить браузер
    $(window).resize(pageSlider_init);
 
 
 
<div class="pageSlider">
    <div class="btn btn-pageSlider btn-prev">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 21 40" style="enable-background:new 0 0 21 40;" xml:space="preserve">
            <polyline class="st0" points="20,1 1,20 20,39 "/>
        </svg>
    </div>

    <div class="swiper-container">
        <div class="swiper-wrapper">

            <div class="swiper-slide" style="background-image:url('')"></div>
            <div class="swiper-slide" style="background-image:url('')"></div>
            
        </div>
    </div>

    <div class="btn btn-pageSlider btn-next">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 21 40" style="enable-background:new 0 0 21 40;" xml:space="preserve">
            <polyline class="st0" points="20,1 1,20 20,39 "/>
        </svg>
    </div>
</div>
    
}

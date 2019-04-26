//Иногда бывает задача сделать возможность создавать слайдер, но  в той части которая вносится из админки.
Проблема в том, что ниодин контентщик не станет запариваться и создавать все обертки для слайдов, контейнеры и т.д.

Код ниже может помочь решить эту проблему

var arrSlider = $(".eventContent .slider");

        function CreateSliderConstruction(el, iter) {
            var that = this;

            // console.log(el);
            that.imageArray = $(el).find("img");
            that.swiperContainer = null;
            that.swiperWrapper = null;
            that.navigation = null;

            //Базовая обертка slider wrapper
            that.basicWrapper = function() {
                that.swiperContainer = '<div class="swiper-container data-sliderIndex="' + iter + '">' + '<div class="swiper-wrapper">' + "</div>" + "</div>";
                that.navigation =
                    '<div class="articleSliderNavigation" data-navIndex="' +
                    iter +
                    '">' +
                    '<div class="btn-container">' +
                    '<div class="btn btn-circle btn-type-nav btn-prev">' +
                    '<div class="btn__shape"></div>' +
                    '<div class="btn__icon"></div>' +
                    "</div>" +
                    '<div class="btn btn-circle btn-type-nav btn-next">' +
                    '<div class="btn__shape"></div>' +
                    '<div class="btn__icon"></div>' +
                    "</div>" +
                    "</div>" +
                    '<div class="custom-fraction"></div>' +
                    "</div>";

                $(el).html(that.swiperContainer);
                $(el).append(that.navigation);

                that.appendImageInSlider(that.imageArray);
            };

            //Оборачиваем картинку в swiper-slide
            that.appendImageInSlider = function(array) {
                array.each(function(index, element) {
                    console.log($(element).attr("src"));
                    $("<div>", {
                        class: "swiper-slide",

                        append: $("<div>", {
                            class: "image",
                            css: {
                                backgroundImage: "url(" + $(element).attr("src") + ")"
                            }
                        })
                    }).appendTo($(el).find(".swiper-wrapper"));
                });
                // $(element).remove();
                that.createSwiperSlider();
            };

            that.createSwiperSlider = function() {
                $(".slider .swiper-container").each(function(index, element) {
                    new Swiper(element, {
                        slidesPerView: 1,
                        pagination: {
                            el: '.articleSliderNavigation[data-navIndex="' + index + '"] .custom-fraction',
                            type: "fraction"
                        },
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

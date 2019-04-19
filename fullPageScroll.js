Если вдруг понадобится делать поэкранный скролл, то вот рабочий самописный вариант (есть плагин fullPage, но он не очень)
Все что необходимо это поделить верстку на элементы с тегом <section> и дать каждому уникальный id
Так же скрипт умеет следить за хешом в url и открывать страницу сразу с нужной секции

//Скролл по секциям
var flag_anchor = false; 
var anchors = []; // Массив якорей

//Создаине массива якорей
$("section").each(function() {
    $anchor = $(this).attr("id");
    anchors.push($anchor);
});

var currentIndex = null; //Текущий индекс хеша

//Получение индекса хеша
function getIndex() {
    $.each(anchors, function(index, value) {
        str = window.location.hash;
        localHesh = str.substr(1);
        if (localHesh == value) {
            currentIndex = index;
            return false
        }
    });
}



function scroll(orintation) {

    if (flag_anchor) {
        return false;
    }
    flag_anchor = true; //Флаг

    if(orintation < 0) {
        --currentIndex;
    } else {
        ++currentIndex;
    }

    var nextAnchor = anchors[currentIndex];
    var $target = $("#" + nextAnchor); //Получам секцию на которую нужно проскроллить страницу
    if ($target != "#") {
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = nextAnchor; //Меняешь хеш в URL 
            flag_anchor = false; //Флаг   
        });

    }
};



$(document).on('wheel', function(event) {
    var e = event;
    var div = $('[data-fullscroll="true"]');
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        e = e || window.event;
        delta = e.originalEvent.deltaY;
        getIndex();
        if (delta < 0) {
          //TOP
          if (currentIndex == 0 || flag_anchor) {
              return false
          }
          // --currentIndex;
          scroll(delta);
      } else {
          //BOTTOM
          if (currentIndex > anchors.length - 2 || flag_anchor) {
              return false
          }
          // ++currentIndex;
          scroll(delta);
      }
    }
});

//Если нужно сделать скролл к следующей секции по клику на кнопку
$('.btn-anchor').click(function() {
    currentIndex = $(this).attr('data-nextSection')-1;
    scroll();
});

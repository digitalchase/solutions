/*
  --- HTML EXAMPLE ---
  <input type="text" id="withAttr" _dc-data-type="phone" _dc-data-placeholder="asd" _dc-data-mask="+7 (___) ___ ____" _dc-data-cursor-move-end />
  <input type="text" id="withOutAttr" />
  <input type="text" id="defaultSettings" />
  

/*
    options = {
        mask: String //обязательный аргумент. Задаем вид маски "+7 (___) ___ ____" вместо нижнего подчеркивания подставятся цифры.
                     //так же можно внести в атрибут _dc-data-mask="+7 (___) ___ ____"
        cursorMoveEnd: Boolean // Поумолчанию false. true - При любом редактировании значения в input, переносит каретку в конец строки
                               // Можно записать как data атрибу _dc-daata-cursor-move-end
        placeholder: String // Так же можно внести это поле на самом элементе в атрибут _dc-data-placeholder
    }
*/

var options = {
  mask: "+7 (___) ___ ____",
  cursorMoveEnd: true,
  placeholder: "Введите номер"
}


// Первый аргумент принимает либо строку (селектор элемента), либо элемент Node
new DcNumberMask('#withOutAttr', options); //Параметры из optiosn
new DcNumberMask('#withAttr'); //Параметры из атрибутов
new DcNumberMask('#defaultSettings'); //Стандартные настройки


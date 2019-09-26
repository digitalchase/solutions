/*
 Пример верстки
 Первый пустой <option> нужен для того, что бы добавить placeholder на селект и значение селекта было '' поумолчанию
 <select name="" id="" _dc_customSelect>
    <option></option>
    <option value="Павел Дзюбло">Павел Дзюбло</option>
    <option value="Кирилина Вера">Кирилина Вера</option>
</select>
*/

/*Запуск кастомного селекта*/

/*
    placeholder: String, //Placeholder на селект
    search: Boolean, //Показывать инпут поиска или нет
    searchPlaceholder: String, //Placeholder для инпута поиска
    notFoundContent: String, //Текст который будет выводится если в выдаче поиска нет ничего (можно html строку)
    baronScrollInit: Boolean, //Активация кастомного скролла (требуется плагин baron.js https://github.com/Diokuz/baron)
    btnReset: Boolean, //Показывать кнопку сброса значений
    multiple: Boolean, //Активация мультиселекта
    multiplePlaceholder: String, //Плейсхолдер для мультиселекта, если выбраны элементы
    on: {
        dropdownOpen: Function,
        dropdownClose: Function
    }
    
    Каждый параметр, "on" исключение, можно передать как data атрибут.
    Пример:
      notFoundContent == data-not-found-content="<h1>Контент не найде</h1>"
      multiple == data-multiple
    
*/

//Активация на два селекта  (если не передавать опции. Значения поумолчанию будут браться из data атрибутов)                                                                                                                                                                                                    
$("[_dc_customSelect]").dcInitCustomSelect([
        {
          placeholder: "Все",
          search: true,
          searchPlaceholder: "Поиск",
          notFoundContent: "Лектор не найден",
          baronScrollInit: true,
         on: {
           init: function(el) {
             console.log(el)
           }
         }
      },
      {
          placeholder: "Asd",
          search: true,
          searchPlaceholder: "Поиск",
          notFoundContent: "<h1>sdf</h1>",
          baronScrollInit: true
      }
  ]);

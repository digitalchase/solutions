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
    placeholder: undefined, //Плейсхолдер на селекте (если нет этого параметра, то будет значение поумолчанию)
    search: false, //(ture or false) если true true то в дропдауне селекта будет строка для поиска
    searchPlaceholder: undefined, //Плейсхолдер на поиске селекта, если его нет, то значени по умолчанию
    notFoundContent: undefined, //Сюда можно вставить как текст, так и верстку
    baronScrollInit: undefined, //Активация кастомного скролла в дропдауне
    on: { //Коллбеки. Каждый колбек имеет один аргумент который равер враперу селекта
        init: null,
        dropdownOpen: null, //Поумолчанию в каждое событие передается элемент селекта
        dropdownClose: null //Поумолчанию в каждое событие передается элемент селекта
    }
*/

                                                                                                                                                                                                            
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

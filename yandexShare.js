//На старницу подключить два файлы
//<script src="https://yastatic.net/share2/share.js"></script>
//<script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
//Пример и документация https://tech.yandex.ru/share/

//Вызывать функцию на странице где будет шаринг
//В качестве параметра передать селектор в котором лежит элемент с классом .sharingBlock__social, шаринг применится именно на .sharingBlock__social
//Данные для шаринга нужно передать атрибутами контейнера который передается в функцию (ниже будет пример верстки там будет понятнее)

function createShareBlock(sharingContainer) {
    var shareBlock = $(sharingContainer).find(".sharingBlock__social");

    //Создание шаринга
    if (shareBlock.length) {
        Ya.share2(shareBlock[0], {
            content: {
                title: shareBlock.attr("data-title"),
                url: shareBlock.attr("data-url"),
                description: shareBlock.attr("data-description"),
                image: shareBlock.attr("data-image")
            },
            theme: {
                services: "facebook,telegram,vkontakte", //список соц сетей в которые можно шарить
                bare: true
            }
        });
    }
}

createShareBlock('.sharingContainer')

<div 
  class="sharingContainer" 
  data-title="Заголовок" 
  data-url="ссылка на страрицу которая шарится" 
  data-description="описание" 
  data-image="картинка"
>
  <div class="sharingBlock__social"></div>
</div>


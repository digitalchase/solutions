//Плагин по ссылке на гитхаб (копию лучше где нибудь хранить) https://github.com/Diokuz/baron
//На страницу лучше подключить baron.js (baron.css опционально)

//Ниже пример верстки, функции вызова и самого вызова скрипта

//Для корректной работы у элемента .customScroll__scroller должна быть указана какая-нибудь высота в пикселях 

//P.S. Плага вроде древняя и ее уже не особо поддерживают.
//Работает хорошо везде, так как не убивает реальный скролл, а просто прячет его. То есть мы используем обычный браузерный скролл, а не имитируем его
//В плаге нет никаких методо для отключения скролла, если контента стало мало (нужно будет дописать...).

<div class="customScroll-wrapper">
    <div class="customScroll__scroller">
        <div class="customScroll__scroller_container">
            <p>Пока Земля вращается вокруг своей оси, будут появляться и&nbsp;исчезать разнообразные виды животных и&nbsp;растений. Каждое из&nbsp;них&nbsp;&mdash; это очередной поворот Колеса Эволюции. Оно символизирует естественный процесс развития живой природы и&nbsp;двигается под воздействием наследственности, борьбы за&nbsp;существование и&nbsp;естественного отбора.<br> <br> Мы&nbsp;не&nbsp;можем повлиять на&nbsp;ход эволюции. Но&nbsp;в&nbsp;наших силах защитить и&nbsp;сберечь окружающий мир. А&nbsp;чтобы узнать о&nbsp;нём больше, нужно просто внимательно рассмотреть витрину Дарвиновского музея в&nbsp;ЦДМ. </p>                                
        </div>
    </div>
    <div class="customScroll__scroller_track">
        <div class="customScroll__scroller_bar"></div>
    </div>
</div>

//Активация кастомного скролла
function customScrollInit(selector) {
    baron({
        root: selector, //selector
        scroller: ".customScroll__scroller",
        bar: ".customScroll__scroller_bar",
        scrollingCls: "_scrolling",
        draggingCls: "_dragging"
    });
}
customScrollInit(".customScroll-wrapper");

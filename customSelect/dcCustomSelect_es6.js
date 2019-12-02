(function($) {
    class DcCustomSelect {
        constructor(_el, _options) {
            this.el = this.is("String", _el) ? $(_el) : _el;
            this.uniqId = "dc" + Date.parse(new Date()); //Уникальный id (количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC)
            this.select = $(`[data-uniqId="${this.uniqId}"]`);
            this.defaultOpitons = {
                placeholder:
                    this.el.data("placeholder") != undefined
                        ? this.el.data("placeholder")
                        : "Выберите",
                search: this.el.data("search") != undefined ? true : false,
                searchPlaceholder:
                    this.el.data("search-placeholder") != undefined
                        ? this.el.data("search-placeholder")
                        : "Поиск",
                notFoundContent:
                    this.el.data("not-found-content") != undefined
                        ? this.el.data("not-found-content")
                        : "Совпадений не найдено",
                baronScrollInit: this.el.data("baron-scroll-init") != undefined ? true : false,
                btnReset: this.el.data("btn-reset") != undefined ? true : false,
                multiple: this.el.data("multiple") != undefined ? true : false,
                multiplePlaceholder:
                    this.el.data("multiple-placeholder") != undefined
                        ? this.el.data("multiple-placeholder")
                        : undefined,
                on: {
                    dropdownOpen: null, //Поумолчанию в каждое событие передается элемент селекта
                    dropdownClose: null //Поумолчанию в каждое событие передается элемент селекта
                    // changeValue: null //Поумолчанию в каждое событие передается элемент селекта
                }
            };

            //Возможно что эта штука и не понадобится
            this.state = {
                init: false,
                dropdownIsOpen: false
            };

            this.uiComponent = {};

            this.options = this.is("Object", _options)
                ? Object.assign(this.defaultOpitons, _options)
                : this.defaultOpitons;

            if (this.state.init == false) {
                this.init();
            }
        }

        // Сравнение типов
        is(type, obj) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
        }

        init() {
            let { search } = this.options;

            this.el.wrap(`<div class="_dc_customSelect-wrapper" id="${this.uniqId}"/>`);
            this.el.hide();

            // Передаем враппер дальше, что бы наполнить его кастомным визуалом
            this.createSelectUi($(`#${this.uniqId}`));

            this.bindFunctionOnUi();

            //Ловим клик вне селекта
            this.outerClick();

            if (search === true) {
                this.searchInit();
            }

            //Записываем, что селекта активировался
            this.state.init = true;
        }

        createSelectUi(el) {
            let that = this,
                {
                    placeholder,
                    search,
                    searchPlaceholder,
                    notFoundContent,
                    baronScrollInit,
                    btnReset,
                    multiple
                } = this.options,
                dropdownList = "",
                btnResetElement = "",
                searchBlock = "";

            // Ищу все option в селекте и создаю обычные элементы
            let newList = [];

            //Создание элементов внутри кастомного селекта
            // multiple = false;
            if (multiple) {
                el.addClass("_dc_customSelect-multiple");
                el.find("select").attr("multiple", "");
                Array.from(
                    el.find("select option").each((index, val) => {
                        if ($(val).attr("value") == undefined) {
                            return;
                        }
                        newList.push(`
                                <label class="_dc_customSelect__list_item">
                                    <input type="checkbox" value="${$(val).attr("value")}">
                                    <div class="_dc_customSelect__list_customCheckbox">
                                        <div class="_dc_customSelect__list_customCheckbox_box"></div>
                                        <div class="_dc_customSelect__list_customCheckbox_text">${$(
                                            val
                                        ).text()}</div> 
                                    </div>
                                </label>
                            `);
                    })
                );
            } else {
                const selectedOption = el.find("option[selected]");
                const selectedElemIndex = selectedOption.length ? selectedOption.index() : 0;
                Array.from(
                    el.find("select option").each((index, val) => {
                        if ($(val).attr("value") == undefined) {
                            return;
                        }
                        newList.push(`
                                <div class="_dc_customSelect__list_item ${
                                    index === selectedElemIndex ? "active" : ""
                                }" data-value="${$(val).attr("value")}">${$(val).text()}</div>
                            `);
                    })
                );
            }

            // Активация и добавление барона или стандарт
            if (that.is("Function", window.baron) && baronScrollInit === true) {
                dropdownList = `
                            <div class="_dc_customSelect__customScroll-wrapper">
                                <div class="_dc_customSelect__customScroll_scroller">
                                    <div class="_dc_customSelect__list ${
                                        btnReset ? " _dc_customSelect__list-offsetBottom" : ""
                                    }">
                                        ${newList.join("")}
                                    </div>
                                </div>
                                <div class="_dc_customSelect__customScroll_track ${
                                    btnReset ? " _dc_customSelect__customScroll_track-btnReset" : ""
                                }">
                                    <div class="_dc_customSelect__customScroll_bar"></div>
                                </div>
                            </div>
                        `;
            } else {
                dropdownList = `
                            <div class="_dc_customSelect__list ${
                                btnReset ? " _dc_customSelect__list-offsetBottom" : ""
                            }">
                                ${newList.join("")}
                            </div>
                        `;
            }

            if (btnReset === true) {
                btnResetElement = `
                        <div class="_dc_customSelect__btnReset">
                            <div class="_dc_customSelect__btnReset_icon"></div>
                            <div class="_dc_customSelect__btnReset_text">Сброс</div>
                            <div class="_dc_customSelect__btnReset_trigger"></div>
                        </div>
                    `;
            }

            if (search) {
                searchBlock = `
                        <div class="_dc_customSelect__search">
                            <div class="_dc_customSelect__search_input">
                                <input type="search" autocomplete="off" placeholder="${searchPlaceholder}" />
                                <div class="_dc_customSelect__search_icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#999999"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="_dc_customSelect__not-found" style="display: none">
                            ${notFoundContent}
                        </div>
                    `;
            }

            // Создаю визул кастомного селекта
            el.append(`
                        <div class="_dc_customSelect__select">
                            <div class="_dc_customSelect__select_text"></div>
                            <div class="_dc_customSelect__trigger">
                                <div class="_dc_customSelect__trigger_arrow">
                                    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.354 4.30459C8.354 4.36492 8.32052 4.43279 8.2703 4.47804L7.85177 4.8551C7.80155 4.90035 7.72621 4.93051 7.65925 4.93051C7.59229 4.93051 7.51695 4.90035 7.46673 4.8551L4.17711 1.89141L0.887486 4.8551C0.837262 4.90035 0.761927 4.93051 0.694963 4.93051C0.619628 4.93051 0.552664 4.90035 0.502441 4.8551L0.0839138 4.47804C0.0336905 4.43279 0.000208855 4.36492 0.000208855 4.30459C0.000208855 4.24426 0.0336905 4.17639 0.0839138 4.13114L3.98458 0.616946C4.03481 0.571699 4.11014 0.541535 4.17711 0.541535C4.24407 0.541535 4.31941 0.571699 4.36963 0.616946L8.2703 4.13114C8.32052 4.17639 8.354 4.24426 8.354 4.30459Z" fill="#333333"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="_dc_customSelect__dropdown">
                            ${searchBlock}
                            ${dropdownList}
                            ${btnResetElement}
                        </div>
                    `);

            //Инит baron js (опции нельзя передавать)
            if (that.is("Function", window.baron) && baronScrollInit) {
                window.baronInit = []; //Создаю массив для хранения и доступа к скроллам
                window.baronInit[that.uniqId] = baron({
                    root: $(`#${that.uniqId} ._dc_customSelect__customScroll-wrapper`).selector, //selector
                    scroller: "._dc_customSelect__customScroll_scroller",
                    bar: "._dc_customSelect__customScroll_bar",
                    scrollingCls: "_scrolling",
                    draggingCls: "_dragging"
                });
            }

            //Создаю объект с элементами которые использую в скриптах
            let parent = $(`#${this.uniqId}`);
            this.uiComponent = {
                globalWrapper: parent,
                selectBox: parent.find("._dc_customSelect__select"),
                selectEl: parent.find("select"),
                selectPlaceholder: parent.find("._dc_customSelect__select_text"),
                dropdown: parent.find("._dc_customSelect__dropdown"),
                searchInput: parent.find('[type="search"]'),
                notFoundBlockMessage: parent.find("._dc_customSelect__not-found"),
                list: parent.find("._dc_customSelect__list"),
                listItems: parent.find("._dc_customSelect__list_item"),
                btnResetElement: parent.find("._dc_customSelect__btnReset_trigger")
            };

            //Настройка плейсхолдера
            let { selectEl } = this.uiComponent;
            const selectedOption = selectEl.find("option[selected]");
            const firstOption = selectEl.find("option").eq(0);

            if (selectedOption.length) {
                that.setVal(selectedOption.val().trim(), true);
                that.updatePlaceholder(selectedOption.text().trim());
            } else if (firstOption.val().trim() === "") {
                that.setVal("", true);
                that.updatePlaceholder(placeholder);
            } else {
                that.setVal(firstOption.val().trim(), true);
                that.updatePlaceholder(firstOption.text().trim());
            }
        }

        //Довление функции поиска в дропдаун
        searchInit() {
            const {
                globalWrapper,
                searchInput,
                listItems,
                notFoundBlockMessage
            } = this.uiComponent;

            searchInput.on("input", function() {
                let that = $(this);

                // Удаление класса котрый прячет поисковую выдачу
                if (globalWrapper.is(".notFound")) {
                    globalWrapper.removeClass("notFound");
                }

                listItems.each(function(i, val) {
                    let text = that.val().toLowerCase();
                    let re = new RegExp(text, "i");
                    let testReg = re.test(
                        $(val)
                            .text()
                            .toLowerCase()
                    );
                    if (testReg) {
                        $(val).show();
                    } else {
                        $(val).hide();
                    }
                });

                // Проверка на то есть ли хоть один элемент в выдаче поиска
                if (Array.from(listItems).filter(el => $(el).is(":visible")).length === 0) {
                    notFoundBlockMessage.show();
                    globalWrapper.addClass("notFound");
                } else if (notFoundBlockMessage.is(":visible")) {
                    notFoundBlockMessage.hide();
                }
            });
        }

        //присваиваем клики на UI
        bindFunctionOnUi() {
            let { on, btnReset, multiple, placeholder, multiplePlaceholder } = this.options,
                { globalWrapper } = this.state,
                { selectBox, listItems, btnResetElement, selectEl } = this.uiComponent,
                parent = $(`#${this.uniqId}`);

            const that = this;

            //Клик _dc_customSelect__select
            selectBox.on("click", function() {
                const { dropdownIsOpen } = that.state;
                // Открытие и закрытие селекта

                if (dropdownIsOpen) {
                    that.closeDropdown();
                } else {
                    that.openDropdown();
                }

                //Коллбеки на закрытие и открытие
                if (on !== undefined && that.is("Object", on)) {
                    if (that.is("Function", on.dropdownOpen) && dropdownIsOpen) {
                        on.dropdownOpen(globalWrapper);
                    } else if (that.is("Function", on.dropdownClose) && !dropdownIsOpen) {
                        on.dropdownClose(globalWrapper);
                    }
                }
            });

            //другое поведение при мульти селекте
            if (multiple) {
                let arrVal;
                let arrPlaceholder;
                //По клику на элемент в селекте добавляем его value в select.val
                listItems.on("click", function() {
                    $(this).toggleClass("active");

                    listItems.find("input:checked").each((i, el) => {
                        $(el)
                            .parent("._dc_customSelect__list_item")
                            .addClass("active");
                    });

                    that.setVal($(this).attr("data-value"));

                    arrVal = [];
                    listItems.find("input:checked").each((i, el) => {
                        arrVal.push($(el).val());
                    });

                    arrPlaceholder = [];
                    listItems.find("input:checked").each((i, el) => {
                        const elParent = $(el).parents("._dc_customSelect__list_item");
                        arrPlaceholder.push(
                            elParent.find("._dc_customSelect__list_customCheckbox_text").text()
                        );
                    });

                    selectEl.val(arrVal);

                    let newPlaceholder;

                    if (arrPlaceholder.join(", ").trim() === "") {
                        newPlaceholder = placeholder;
                    } else {
                        newPlaceholder =
                            multiplePlaceholder != undefined
                                ? multiplePlaceholder
                                : arrPlaceholder.join(", ").trim();
                    }

                    that.updatePlaceholder(newPlaceholder);
                });
            } else {
                //По клику на элемент в селекте добавляем его value в select.val
                listItems.on("click", function() {
                    that.setVal($(this).attr("data-value"));

                    listItems.removeClass("active");
                    $(this).addClass("active");

                    that.updatePlaceholder($(this).text());

                    that.closeDropdown();
                });
            }

            //событие для сброса значения
            if (btnResetElement.length && btnReset) {
                btnResetElement.on("click", function() {
                    that.resetValue();
                });
            }
        }

        //Клик вне селекта
        outerClick() {
            let { on } = this.options,
                { globalWrapper } = this.uiComponent;
            const that = this;

            $(document).click(function(e) {
                const { dropdownIsOpen } = that.state;
                // событие клика по веб-документу
                var div = globalWrapper; // тут указываем ID элемента
                if (
                    !div.is(e.target) && // если клик был не по нашему блоку
                    div.has(e.target).length === 0 &&
                    dropdownIsOpen
                ) {
                    // и не по его дочерним элементам
                    that.closeDropdown();
                }
            });
        }

        //Сброс значения
        resetValue(newPlaceholder) {
            const that = this,
                { btnResetElement, listItems } = this.uiComponent,
                { placeholder, multiple } = this.options;

            btnResetElement.on("click", function() {
                that.setVal("");
                that.closeDropdown();
                that.updatePlaceholder(newPlaceholder != undefined ? newPlaceholder : placeholder);
                listItems.removeClass("active");

                if (multiple) {
                    listItems.find("input:checked").prop("checked", false);
                }
            });
        }

        //Открывает дропдаун
        openDropdown() {
            let { on, baronScrollInit } = this.options;

            const that = this;
            let parent = $(`#${this.uniqId}`);
            parent.find("._dc_customSelect__dropdown").css({
                position: "absolute",
                top: parent.innerHeight(),
                left: 0,
                width: "100%"
            });

            parent.addClass("dropped");
            //Меняем стейт
            this.state.dropdownIsOpen = true;

            //Прячу скролл если высота контента меньше области прокрутки
            if (that.is("Function", window.baron) && baronScrollInit) {
                if (
                    parent.find("._dc_customSelect__customScroll_scroller").height() >
                    parent.find("._dc_customSelect__list").innerHeight()
                ) {
                    parent.find("._dc_customSelect__customScroll_track").hide();
                } else {
                    parent.find("._dc_customSelect__customScroll_track").show();
                    window.baronInit[that.uniqId].update();
                }
            }

            if (on !== undefined && that.is("Object", on)) {
                if (that.is("Function", on.dropdownOpen) && parent.is(".dropped")) {
                    on.dropdownOpen(that.el.parent());
                }
            }
        }

        //закрывает дропдаун
        closeDropdown() {
            const that = this;

            let { on, multiple } = this.options,
                { globalWrapper, listItems, selectEl } = this.uiComponent;

            globalWrapper.removeClass("dropped");
            globalWrapper.find('[type="search"]').val("");
            globalWrapper.find("._dc_customSelect__not-found").hide();
            globalWrapper.removeClass("notFound");
            globalWrapper.find("._dc_customSelect__list_item").show();

            this.state.dropdownIsOpen = false;

            if (on !== undefined && that.is("Object", on)) {
                if (that.is("Function", on.dropdownClose) && !globalWrapper.is(".dropped")) {
                    on.dropdownClose(that.el.parent());
                }
            }
        }

        setVal(value, init) {
            const { selectEl } = this.uiComponent;
            selectEl.val(value);

            if (init) return false;

            selectEl.trigger("change");
        }

        updatePlaceholder(text) {
            const { selectPlaceholder } = this.uiComponent;
            selectPlaceholder.html(text);
        }

        getVal() {
            const { selectEl } = this.uiComponent;
            return selectEl.val();
        }
    }

    $.fn.dcInitCustomSelect = function(_options) {
        var options = _options;

        return this.each(function(index) {
            $(this).attr("data-uniqId", "dc" + Date.parse(new Date()) + index);
            new DcCustomSelect($(this), options ? options[index] : "");
        });
    };
})(jQuery);

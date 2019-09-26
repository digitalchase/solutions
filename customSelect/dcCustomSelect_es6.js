"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

(function($) {
  var DcCustomSelect =
    /*#__PURE__*/
    (function() {
      function DcCustomSelect(_el, _options) {
        _classCallCheck(this, DcCustomSelect);

        this.el = this.is("String", _el) ? $(_el) : _el;
        this.uniqId = "dc" + Date.parse(new Date()); //Уникальный id (количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC)

        this.select = $('[data-uniqId="'.concat(this.uniqId, '"]'));
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
          baronScrollInit:
            this.el.data("baron-scroll-init") != undefined ? true : false,
          btnReset: this.el.data("btn-reset") != undefined ? true : false,
          multiple: this.el.data("multiple") != undefined ? true : false,
          multiplePlaceholder:
            this.el.data("multiple-placeholder") != undefined
              ? this.el.data("multiple-placeholder")
              : undefined,
          on: {
            dropdownOpen: null,
            //Поумолчанию в каждое событие передается элемент селекта
            dropdownClose: null //Поумолчанию в каждое событие передается элемент селекта
          }
        }; //Возможно что эта штука и не понадобится

        this.state = {
          init: false,
          dropdownIsOpen: false
        };
        this.uiComponent = {};
        this.options = this.is("Object", _options)
          ? Object.assign(this.defaultOpitons, _options)
          : this.defaultOpitons;
        console.log(_options);

        if (this.state.init == false) {
          this.init();
        }
      } // Сравнение типов

      _createClass(DcCustomSelect, [
        {
          key: "is",
          value: function is(type, obj) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
          } //Получение параметров из аттрибутов (Вроде не нужна)
          // getAttributeVal = () => {
          //     let a = {};
          //     $(this.el[0].attributes).each(function () {
          //         if (this.nodeName.match(/data-/) && !this.nodeName.match(/uniqid/)) {
          //             let key = this.nodeName
          //                 .split("-")
          //                 .filter(val => val != "data")
          //                 .map((val, i) => (i != 0 ? val[0].toUpperCase() + val.slice(1) : val))
          //                 .join("");
          //             let value = this.nodeValue;
          //             a[key] = value;
          //             console.log(`${key}: ${value}`);
          //         }
          //     });
          //     return a;
          // };
        },
        {
          key: "init",
          value: function init() {
            var search = this.options.search;
            this.el.wrap(
              '<div class="_dc_customSelect-wrapper" id="'.concat(
                this.uniqId,
                '"/>'
              )
            );
            this.el.hide(); // Передаем враппер дальше, что бы наполнить его кастомным визуалом

            this.createSelectUi($("#".concat(this.uniqId)));
            this.bindFunctionOnUi(); //Ловим клик вне селекта

            this.outerClick();

            if (search === true) {
              this.searchInit();
            } //Записываем, что селекта активировался

            this.state.init = true;
          }
        },
        {
          key: "createSelectUi",
          value: function createSelectUi(el) {
            var that = this,
              _this$options = this.options,
              placeholder = _this$options.placeholder,
              search = _this$options.search,
              searchPlaceholder = _this$options.searchPlaceholder,
              notFoundContent = _this$options.notFoundContent,
              baronScrollInit = _this$options.baronScrollInit,
              btnReset = _this$options.btnReset,
              multiple = _this$options.multiple,
              dropdownList = "",
              btnResetElement = "",
              searchBlock = ""; // Ищу все option в селекте и создаю обычные элементы

            var newList = []; //Создание элементов внутри кастомного селекта
            // multiple = false;

            if (multiple) {
              el.find("select").attr("multiple", "");
              Array.from(
                el.find("select option").each(function(index, val) {
                  if ($(val).attr("value") == undefined) {
                    return;
                  }

                  newList.push(
                    '\n                                        <label class="_dc_customSelect__list_item">\n                                            <input type="checkbox" value="'
                      .concat(
                        $(val).attr("value"),
                        '">\n                                            <div class="_dc_customSelect__list_customCheckbox">\n                                                <div class="_dc_customSelect__list_customCheckbox_box"></div>\n                                                <div class="_dc_customSelect__list_customCheckbox_text">'
                      )
                      .concat(
                        $(val).text(),
                        "</div> \n                                            </div>\n                                        </label>\n                                    "
                      )
                  );
                })
              );
            } else {
              Array.from(
                el.find("select option").each(function(index, val) {
                  if ($(val).attr("value") == undefined) {
                    return;
                  }

                  newList.push(
                    '\n                                        <div class="_dc_customSelect__list_item" data-value="'
                      .concat($(val).attr("value"), '">')
                      .concat(
                        $(val).text(),
                        "</div>\n                                    "
                      )
                  );
                })
              );
            } // Активация и добавление барона или стандарт

            if (that.is("Function", window.baron) && baronScrollInit === true) {
              dropdownList = '\n                                    <div class="_dc_customSelect__customScroll-wrapper">\n                                        <div class="_dc_customSelect__customScroll_scroller">\n                                            <div class="_dc_customSelect__list '
                .concat(
                  btnReset ? " _dc_customSelect__list-offsetBottom" : "",
                  '">\n                                                '
                )
                .concat(
                  newList.join(""),
                  '\n                                            </div>\n                                        </div>\n                                        <div class="_dc_customSelect__customScroll_track '
                )
                .concat(
                  btnReset
                    ? " _dc_customSelect__customScroll_track-btnReset"
                    : "",
                  '">\n                                            <div class="_dc_customSelect__customScroll_bar"></div>\n                                        </div>\n                                    </div>\n                                '
                );
            } else {
              dropdownList = '\n                                    <div class="_dc_customSelect__list '
                .concat(
                  btnReset ? " _dc_customSelect__list-offsetBottom" : "",
                  '">\n                                        '
                )
                .concat(
                  newList.join(""),
                  "\n                                    </div>\n                                "
                );
            }

            if (btnReset === true) {
              btnResetElement =
                '\n                                <div class="_dc_customSelect__btnReset">\n                                    <div class="_dc_customSelect__btnReset_icon"></div>\n                                    <div class="_dc_customSelect__btnReset_text">\u0421\u0431\u0440\u043E\u0441</div>\n                                    <div class="_dc_customSelect__btnReset_trigger"></div>\n                                </div>\n                            ';
            }

            if (search) {
              searchBlock = '\n                                <div class="_dc_customSelect__search">\n                                    <div class="_dc_customSelect__search_input">\n                                        <input type="search" autocomplete="off" placeholder="'
                .concat(
                  searchPlaceholder,
                  '" />\n                                        <div class="_dc_customSelect__search_icon">\n                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#999999"/>\n                                            </svg>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="_dc_customSelect__not-found" style="display: none">\n                                    '
                )
                .concat(
                  notFoundContent,
                  "\n                                </div>\n                            "
                );
            } // Создаю визул кастомного селекта

            el.append(
              '\n                                <div class="_dc_customSelect__select">\n                                    <div class="_dc_customSelect__select_text"></div>\n                                    <div class="_dc_customSelect__trigger">\n                                        <div class="_dc_customSelect__trigger_arrow">\n                                            <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                <path d="M8.354 4.30459C8.354 4.36492 8.32052 4.43279 8.2703 4.47804L7.85177 4.8551C7.80155 4.90035 7.72621 4.93051 7.65925 4.93051C7.59229 4.93051 7.51695 4.90035 7.46673 4.8551L4.17711 1.89141L0.887486 4.8551C0.837262 4.90035 0.761927 4.93051 0.694963 4.93051C0.619628 4.93051 0.552664 4.90035 0.502441 4.8551L0.0839138 4.47804C0.0336905 4.43279 0.000208855 4.36492 0.000208855 4.30459C0.000208855 4.24426 0.0336905 4.17639 0.0839138 4.13114L3.98458 0.616946C4.03481 0.571699 4.11014 0.541535 4.17711 0.541535C4.24407 0.541535 4.31941 0.571699 4.36963 0.616946L8.2703 4.13114C8.32052 4.17639 8.354 4.24426 8.354 4.30459Z" fill="#333333"/>\n                                            </svg>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="_dc_customSelect__dropdown">\n                                    '
                .concat(searchBlock, "\n                                    ")
                .concat(dropdownList, "\n                                    ")
                .concat(
                  btnResetElement,
                  "\n                                </div>\n                            "
                )
            ); //Инит baron js (опции нельзя передавать)

            if (that.is("Function", window.baron) && baronScrollInit) {
              window.baronInit = []; //Создаю массив для хранения и доступа к скроллам

              window.baronInit[that.uniqId] = baron({
                root: $(
                  "#".concat(
                    that.uniqId,
                    " ._dc_customSelect__customScroll-wrapper"
                  )
                ).selector,
                //selector
                scroller: "._dc_customSelect__customScroll_scroller",
                bar: "._dc_customSelect__customScroll_bar",
                scrollingCls: "_scrolling",
                draggingCls: "_dragging"
              });
            } //Создаю объект с элементами которые использую в скриптах

            var parent = $("#".concat(this.uniqId));
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
              btnResetElement: parent.find(
                "._dc_customSelect__btnReset_trigger"
              )
            }; //Настройка плейсхолдера

            var selectEl = this.uiComponent.selectEl;

            if (
              selectEl
                .find("option")
                .eq(0)
                .val()
                .trim() === ""
            ) {
              that.setVal("");
              that.updatePlaceholder(placeholder);
            } else {
              that.setVal(
                selectEl
                  .find("option")
                  .eq(0)
                  .val()
                  .trim()
              );
              that.updatePlaceholder(
                selectEl
                  .find("option")
                  .eq(0)
                  .text()
                  .trim()
              );
            }
          } //Довление функции поиска в дропдаун
        },
        {
          key: "searchInit",
          value: function searchInit() {
            var _this$uiComponent = this.uiComponent,
              globalWrapper = _this$uiComponent.globalWrapper,
              searchInput = _this$uiComponent.searchInput,
              listItems = _this$uiComponent.listItems,
              notFoundBlockMessage = _this$uiComponent.notFoundBlockMessage;
            searchInput.on("input", function() {
              var that = $(this); // Удаление класса котрый прячет поисковую выдачу

              if (globalWrapper.is(".notFound")) {
                globalWrapper.removeClass("notFound");
              }

              listItems.each(function(i, val) {
                if (
                  !$(val)
                    .text()
                    .toLowerCase()
                    .includes(that.val().toLowerCase())
                ) {
                  $(val).hide();
                } else {
                  $(val).show();
                }
              }); // Проверка на то есть ли хоть один элемент в выдаче поиска

              if (
                Array.from(listItems).filter(function(el) {
                  return $(el).is(":visible");
                }).length === 0
              ) {
                notFoundBlockMessage.show();
                globalWrapper.addClass("notFound");
              } else if (notFoundBlockMessage.is(":visible")) {
                notFoundBlockMessage.hide();
              }
            });
          } //присваиваем клики на UI
        },
        {
          key: "bindFunctionOnUi",
          value: function bindFunctionOnUi() {
            var _this$options2 = this.options,
              on = _this$options2.on,
              btnReset = _this$options2.btnReset,
              multiple = _this$options2.multiple,
              placeholder = _this$options2.placeholder,
              multiplePlaceholder = _this$options2.multiplePlaceholder,
              _this$state = this.state,
              dropdownIsOpen = _this$state.dropdownIsOpen,
              globalWrapper = _this$state.globalWrapper,
              _this$uiComponent2 = this.uiComponent,
              selectBox = _this$uiComponent2.selectBox,
              listItems = _this$uiComponent2.listItems,
              btnResetElement = _this$uiComponent2.btnResetElement,
              selectEl = _this$uiComponent2.selectEl,
              parent = $("#".concat(this.uniqId));
            var that = this; //Клик _dc_customSelect__select

            selectBox.on("click", function() {
              // Открытие и закрытие селекта
              if (dropdownIsOpen) {
                that.closeDropdown();
              } else {
                that.openDropdown();
              }

              console.log(on); //Коллбеки на закрытие и открытие

              if (on !== undefined && that.is("Object", on)) {
                if (that.is("Function", on.dropdownOpen) && dropdownIsOpen) {
                  on.dropdownOpen(globalWrapper);
                } else if (
                  that.is("Function", on.dropdownClose) &&
                  !dropdownIsOpen
                ) {
                  on.dropdownClose(globalWrapper);
                }
              }
            }); //другое поведение при мульти селекте

            if (multiple) {
              var arrVal; //По клику на элемент в селекте добавляем его value в select.val

              listItems.on("click", function() {
                $(this).toggleClass("active");
                listItems.find("input:checked").each(function(i, el) {
                  $(el)
                    .parent("._dc_customSelect__list_item")
                    .addClass("active");
                });
                that.setVal($(this).attr("data-value"));
                arrVal = [];
                listItems.find("input:checked").each(function(i, el) {
                  arrVal.push($(el).val());
                });
                selectEl.val(arrVal);
                var newPlaceholder;

                if (arrVal.join(", ").trim() === "") {
                  newPlaceholder = placeholder;
                } else {
                  newPlaceholder =
                    multiplePlaceholder != undefined
                      ? multiplePlaceholder
                      : arrVal.join(", ").trim();
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
            } //событие для сброса значения

            if (btnResetElement.length && btnReset) {
              btnResetElement.on("click", function() {
                that.resetValue();
              });
            }
          } //Клик вне селекта
        },
        {
          key: "outerClick",
          value: function outerClick() {
            var on = this.options.on,
              globalWrapper = this.uiComponent.globalWrapper;
            var that = this;
            $(document).click(function(e) {
              // событие клика по веб-документу
              var div = globalWrapper; // тут указываем ID элемента

              if (
                !div.is(e.target) && // если клик был не по нашему блоку
                div.has(e.target).length === 0
              ) {
                // и не по его дочерним элементам
                that.closeDropdown();
              }
            });
          } //Сброс значения
        },
        {
          key: "resetValue",
          value: function resetValue(newPlaceholder) {
            var that = this,
              _this$uiComponent3 = this.uiComponent,
              btnResetElement = _this$uiComponent3.btnResetElement,
              listItems = _this$uiComponent3.listItems,
              _this$options3 = this.options,
              placeholder = _this$options3.placeholder,
              multiple = _this$options3.multiple;
            btnResetElement.on("click", function() {
              that.setVal("");
              that.closeDropdown();
              that.updatePlaceholder(
                newPlaceholder != undefined ? newPlaceholder : placeholder
              );
              listItems.removeClass("active");

              if (multiple) {
                listItems.find("input:checked").prop("checked", false);
              }
            });
          } //Открывает дропдаун
        },
        {
          key: "openDropdown",
          value: function openDropdown() {
            var _this$options4 = this.options,
              on = _this$options4.on,
              baronScrollInit = _this$options4.baronScrollInit,
              dropdownIsOpen = this.state.dropdownIsOpen;
            var that = this;
            var parent = $("#".concat(this.uniqId));
            parent.find("._dc_customSelect__dropdown").css({
              position: "absolute",
              top: parent.innerHeight(),
              left: 0,
              width: "100%"
            });
            parent.addClass("dropped"); //Меняем стейт

            dropdownIsOpen = true; //Прячу скролл если высота контента меньше области прокрутки

            if (that.is("Function", window.baron) && baronScrollInit) {
              if (
                parent
                  .find("._dc_customSelect__customScroll_scroller")
                  .height() >
                parent.find("._dc_customSelect__list").innerHeight()
              ) {
                parent.find("._dc_customSelect__customScroll_track").hide();
              } else {
                parent.find("._dc_customSelect__customScroll_track").show();
                window.baronInit[that.uniqId].update();
              }
            }

            if (on !== undefined && that.is("Object", on)) {
              if (
                that.is("Function", on.dropdownOpen) &&
                parent.is(".dropped")
              ) {
                on.dropdownOpen(that.el.parent());
              }
            }
          } //закрывает дропдаун
        },
        {
          key: "closeDropdown",
          value: function closeDropdown() {
            var that = this;
            var _this$options5 = this.options,
              on = _this$options5.on,
              multiple = _this$options5.multiple,
              dropdownIsOpen = this.state.dropdownIsOpen,
              _this$uiComponent4 = this.uiComponent,
              globalWrapper = _this$uiComponent4.globalWrapper,
              listItems = _this$uiComponent4.listItems,
              selectEl = _this$uiComponent4.selectEl;
            globalWrapper.removeClass("dropped");
            globalWrapper.find('[type="search"]').val("");
            globalWrapper.find("._dc_customSelect__not-found").hide();
            globalWrapper.removeClass("notFound");
            globalWrapper.find("._dc_customSelect__list_item").show();
            dropdownIsOpen = false;

            if (on !== undefined && that.is("Object", on)) {
              if (
                that.is("Function", on.dropdownClose) &&
                !globalWrapper.is(".dropped")
              ) {
                on.dropdownClose(that.el.parent());
              }
            }
          }
        },
        {
          key: "setVal",
          value: function setVal(value) {
            var selectEl = this.uiComponent.selectEl;
            selectEl.val(value);
            selectEl.trigger("change");
          }
        },
        {
          key: "updatePlaceholder",
          value: function updatePlaceholder(text) {
            var selectPlaceholder = this.uiComponent.selectPlaceholder;
            selectPlaceholder.html(text);
          }
        },
        {
          key: "getVal",
          value: function getVal() {
            var selectEl = this.uiComponent.selectEl;
            return selectEl.val();
          }
        }
      ]);

      return DcCustomSelect;
    })();

  $.fn.dcInitCustomSelect = function(_options) {
    var options = _options;
    return this.each(function(index) {
      $(this).attr("data-uniqId", "dc" + Date.parse(new Date()) + index);
      new DcCustomSelect($(this), options ? options[index] : "");
    });
  };
})(jQuery);

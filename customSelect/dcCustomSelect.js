(function($) {
  class DcCustomSelect {
      constructor(_el, _options) {
          this.el = this.is("String", _el) ? $(_el) : _el;
          this.options = this.is("Object", _options)
              ? _options
              : {
                    placeholder: undefined,
                    search: false,
                    searchPlaceholder: undefined,
                    notFoundContent: undefined,
                    baronScrollInit: undefined,
                    on: {
                        init: null,
                        dropdownOpen: null, //Поумолчанию в каждое событие передается элемент селекта
                        dropdownClose: null //Поумолчанию в каждое событие передается элемент селекта
                    }
                };
          this.uniqId = this.el.attr("data-uniqId") === undefined ? `dc${Date.parse(new Date())}` : this.el.attr("data-uniqId"); //Уникальный id (количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC)
          this.init();
      }

      // Сравнение типов
      is(type, obj) {
          var clas = Object.prototype.toString.call(obj).slice(8, -1);
          return obj !== undefined && obj !== null && clas === type;
      }

      init() {
          this.el.wrap(`<div class="_dc_customSelect-wrapper" id="${this.uniqId}"/>`);
          this.el.hide();

          let { on, search } = this.options,
              parent = $(`#${this.uniqId}`);

          // Передаем враппер дальше, что бы наполнить его кастомным визуалом
          this.createSelectUi($(`#${this.uniqId}`));

          this.bindFunctionOnUi();

          //Ловим клик вне селекта
          this.outerClick();

          if (search === true) {
              this.searchInit();
          }

          if (on !== undefined && this.is("Object", on)) {
              if (this.is("Function", on.init) && !parent.is(".dropped")) {
                  on.init(parent);
              }
          }
      }

      createSelectUi(el) {
          let that = this,
              { placeholder, search, searchPlaceholder, notFoundContent, baronScrollInit } = this.options,
              dropdownList = "",
              placeholderDefault =
                  el
                      .find("select option")
                      .eq(0)
                      .attr("value") === "" ||
                  el
                      .find("select option")
                      .eq(0)
                      .attr("value") === undefined
                      ? "Выберите из списка"
                      : el
                            .find("select option")
                            .eq(0)
                            .attr("value");

          // Ищу все option в селекте и создаю обычные элементы
          let newList = [];
          Array.from(
              el.find("select option").each((index, val) => {
                  newList.push(`<div class="_dc_customSelect__list_item" data-value="${$(val).attr("value")}">${$(val).text()}</div>`);
              })
          );

          // Активация и добавление барона или стандарт
          if (that.is("Function", window.baron) && baronScrollInit === true) {
              dropdownList = `
          <div class="_dc_customSelect__customScroll-wrapper">
              <div class="_dc_customSelect__customScroll_scroller">
                  <div class="_dc_customSelect__list">
                      ${newList.join("")}
                  </div>
              </div>
              <div class="_dc_customSelect__customScroll_track">
                  <div class="_dc_customSelect__customScroll_bar"></div>
              </div>
          </div>
      `;
          } else {
              dropdownList = `
          <div class="_dc_customSelect__list">
              ${newList.join("")}
          </div>
      `;
          }

          // Создаю визул кастомного селекта
          el.append(`
      <div class="_dc_customSelect__select">
          <div class="_dc_customSelect__select_text">${placeholder !== undefined ? placeholder : placeholderDefault}</div>
          <div class="_dc_customSelect__trigger">
              <div class="_dc_customSelect__trigger_arrow">
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.354 4.30459C8.354 4.36492 8.32052 4.43279 8.2703 4.47804L7.85177 4.8551C7.80155 4.90035 7.72621 4.93051 7.65925 4.93051C7.59229 4.93051 7.51695 4.90035 7.46673 4.8551L4.17711 1.89141L0.887486 4.8551C0.837262 4.90035 0.761927 4.93051 0.694963 4.93051C0.619628 4.93051 0.552664 4.90035 0.502441 4.8551L0.0839138 4.47804C0.0336905 4.43279 0.000208855 4.36492 0.000208855 4.30459C0.000208855 4.24426 0.0336905 4.17639 0.0839138 4.13114L3.98458 0.616946C4.03481 0.571699 4.11014 0.541535 4.17711 0.541535C4.24407 0.541535 4.31941 0.571699 4.36963 0.616946L8.2703 4.13114C8.32052 4.17639 8.354 4.24426 8.354 4.30459Z" fill="#333333"/>
                  </svg>
              </div>
          </div>
      </div>
      <div class="_dc_customSelect__dropdown">
          <div class="_dc_customSelect__search" style="display:${search === true ? "block" : "none"}">
              <div class="_dc_customSelect__search_input">
                  <input type="search" autocomplete="off" placeholder="${searchPlaceholder !== undefined ? searchPlaceholder : ""}" />
                  <div class="_dc_customSelect__search_icon">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#999999"/>
                      </svg>
                  </div>
              </div>
          </div>
          <div class="_dc_customSelect__not-found" style="display: none">${notFoundContent !== undefined ? notFoundContent : "Совпадений не найдено"}</div>
          ${dropdownList}
      </div>
  `);

          //Инит baron js (опции нельзя передавать)
          if (that.is("Function", window.baron) && baronScrollInit === true) {
              window.baronInit = []; //Создаю массив для хранения и доступа к скроллам
              window.baronInit[that.uniqId] = baron({
                  root: $(`#${that.uniqId} ._dc_customSelect__customScroll-wrapper`).selector, //selector
                  scroller: "._dc_customSelect__customScroll_scroller",
                  bar: "._dc_customSelect__customScroll_bar",
                  scrollingCls: "_scrolling",
                  draggingCls: "_dragging"
              });
          }

          //Настройка плейсхолдера
          if (
              $(`#${this.uniqId}`)
                  .find("._dc_customSelect__list_item")
                  .eq(0)
                  .attr("data-value") === "undefined" ||
              $(`#${this.uniqId}`)
                  .find("._dc_customSelect__list_item")
                  .eq(0)
                  .attr("data-value") === ""
          ) {
              that.setVal("");
              that.updatePlaceholder(placeholder !== undefined ? placeholder : el.find("select").attr("data-placeholder"));
          } else {
              that.setVal(
                  $(`#${this.uniqId}`)
                      .find("._dc_customSelect__list_item")
                      .eq(0)
                      .attr("data-value")
              );
              that.updatePlaceholder(
                  $(`#${this.uniqId}`)
                      .find("._dc_customSelect__list_item")
                      .eq(0)
                      .text()
              );
          }
      }

      //Довление функции поиска в дропдаун
      searchInit() {
          let parent = $(`#${this.uniqId}`);

          parent.find('[type="search"]').on("input", function() {
              let that = $(this);

              // Удаление класса котрый прячет поисковую выдачу
              if (parent.is(".notFound")) {
                  parent.removeClass("notFound");
              }

              parent.find("._dc_customSelect__list_item").each(function(i, val) {
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
              });

              // Проверка на то есть ли хоть один элемент в выдаче поиска
              if (parent.find("._dc_customSelect__list_item:visible").length === 0) {
                  parent.find("._dc_customSelect__not-found").show();
                  parent.addClass("notFound");
              } else if (parent.find("._dc_customSelect__not-found").is(":visible")) {
                  parent.find("._dc_customSelect__not-found").hide();
              }
          });
      }

      //присваиваем клики на UI
      bindFunctionOnUi() {
          let parent = $(`#${this.uniqId}`);

          const that = this;

          //Клик _dc_customSelect__select
          parent.find("._dc_customSelect__select").on("click", function() {
              // Открытие и закрытие селекта
              if (parent.is(".dropped")) {
                  that.closeDropdown();
              } else {
                  that.openDropdown();
              }
          });

          //По клику на элемент в селекте добавляем его value в select.val
          parent.find("._dc_customSelect__list_item").on("click", function() {
              that.setVal($(this).attr("data-value"));

              parent.find("._dc_customSelect__list_item").removeClass("active");
              $(this).addClass("active");

              that.updatePlaceholder(
                  $(`#${that.uniqId}`)
                      .find("._dc_customSelect__list_item.active")
                      .text()
              );
              that.closeDropdown();
          });
      }

      //Клик вне селекта
      outerClick() {
          const that = this;

          let parent = $(`#${this.uniqId}`);

          $(document).click(function(e) {
              // событие клика по веб-документу
              var div = parent; // тут указываем ID элемента

              //Вызываем закрытие только если открыт селект
              if (parent.is(".dropped")) {
                  if (
                      !div.is(e.target) && // если клик был не по нашему блоку
                      div.has(e.target).length === 0
                  ) {
                      // и не по его дочерним элементам
                      that.closeDropdown();
                  }
              }
          });
      }

      //Открывает дропдаун
      openDropdown() {
          let { on, baronScrollInit } = this.options,
              parent = $(`#${this.uniqId}`);

          parent.find("._dc_customSelect__dropdown").css({
              position: "absolute",
              top: parent.innerHeight(),
              left: 0,
              width: "100%"
          });

          parent.addClass("dropped");

          //Прячу скролл если высота контента меньше области прокрутки
          if (this.is("Function", window.baron) && baronScrollInit === true) {
              if (parent.find("._dc_customSelect__customScroll_scroller").height() > parent.find("._dc_customSelect__list").innerHeight()) {
                  parent.find("._dc_customSelect__customScroll_track").hide();
              } else {
                  parent.find("._dc_customSelect__customScroll_track").show();
                  window.baronInit[this.uniqId].update();
              }
          }

          if (on !== undefined && this.is("Object", on)) {
              if (this.is("Function", on.dropdownOpen) && parent.is(".dropped")) {
                  on.dropdownOpen(parent);
              }
          }
      }

      //закрывает дропдаун
      closeDropdown() {
          let { on } = this.options,
              parent = $(`#${this.uniqId}`);

          parent.removeClass("dropped");

          parent.find('[type="search"]').val("");
          parent.find("._dc_customSelect__not-found").hide();
          parent.removeClass("notFound");
          parent.find("._dc_customSelect__list_item").show();

          if (on !== undefined && this.is("Object", on)) {
              if (this.is("Function", on.dropdownClose) && !parent.is(".dropped")) {
                  on.dropdownClose(parent);
              }
          }
      }

      setVal(value) {
          this.el.val(value);
          this.el.trigger("change");
      }

      updatePlaceholder(text) {
          $(`#${this.uniqId}`)
              .find("._dc_customSelect__select_text")
              .html(text);
      }

      getVal() {
          return this.el.val();
      }
  }

  $.fn.dcInitCustomSelect = function(_options) {
      var options = _options,
          defaultOptions = {
              placeholder: undefined,
              search: false,
              searchPlaceholder: undefined,
              notFoundContent: undefined,
              baronScrollInit: undefined,
              on: {
                  dropdownOpen: null, //Поумолчанию в каждое событие передается элемент селекта
                  dropdownClose: null //Поумолчанию в каждое событие передается элемент селекта
              }
          };
      return this.each(function(index) {
          $(this).attr("data-uniqId", "dc" + Date.parse(new Date()) + index);
          new DcCustomSelect($(this), options ? options[index] : "");
      });
  };
})(jQuery);

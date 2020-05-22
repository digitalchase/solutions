class DcNumberMask {
    constructor(elem, obj) {
        this.el = (() => {
            if (this.is("String", elem)) {
                return document.querySelector(elem);
            } else if(this.is("HTMLInputElement", elem)) {
                return elem;
            } else {
                throw "first argument must be a String or HTMLInputElement";
            }
        })();


        this.options = (() => {
            const el = this.el;
            if (this.is("Object", obj) || obj === undefined) {
                return Object.assign({
                    mask:
                        el.getAttribute("_dc-data-mask") === null
                            ? ""
                            : el.getAttribute("_dc-data-mask"),
                    cursorMoveEnd:
                        el.getAttribute("_dc-data-cursor-move-end") !== null ? true : false,
                    placeholder:
                        el.getAttribute("_dc-data-placeholder") === null
                            ? el.getAttribute("placeholder")
                            : el.getAttribute("_dc-data-placeholder")
                }, obj)
            } else {
                throw "second argument must be an Object";
            }
        })();

        if (this.options.mask === "") throw "argument mask is required";

        this.init();
    }

    // Сравнение типов
    is(type, obj) {

        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    init() {
        this.setParamsDefault();
        this.bindEvent();
    }

    setParamsDefault() {
        const { el } = this
        const {
            options: { placeholder }
        } = this;

        if (
            el.getAttribute("placeholder") !== null ||
            el.getAttribute("_dc-data-placeholder") !== null
        ) {
            el.setAttribute("placeholder", placeholder);
        }
    }

    bindEvent() {
        const { el } = this;

        el.addEventListener("input", () => this.setMask(event), false);
        el.addEventListener("focus", () => this.setMask(event), false);
        el.addEventListener("blur", () => this.setMask(event), false);
    }

    setCursorPosition(pos) {
        const { el } = this;
        const {
            options: { cursorMoveEnd }
        } = this;
        el.focus();

        if (cursorMoveEnd) {
            if (el.setSelectionRange) el.setSelectionRange(pos, pos);
            else if (el.createTextRange) {
                var range = el.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        }
    }

    setMask(event) {
        const { el } = this;
        const {
            options: { mask }
        } = this;

        let matrix = mask,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = el.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        el.value = matrix.replace(/./g, a => {
            return /[_\d]/.test(a) && i < val.length
                ? val.charAt(i++)
                : i >= val.length
                    ? ""
                    : a;
        });

        if (event.type == "blur") {
            if (el.value.length == 2) el.value = "";
        } else this.setCursorPosition(el.value.length);

        const pureValue = el.value.replace(/\(?\)?\s?\+?/g, "");
        el.setAttribute("_dc-data-purevalue", pureValue);
    }
}

export default DcNumberMask;

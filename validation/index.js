class ValidationType {
    constructor() {
        this.valueNotString = 'value must will be of type String';
    }

    is(type, obj) {
        const clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    email(val) {
        if(!this.is('String', val)) throw this.valueNotString;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    }

    password(val, minPasswordLength) {
        return val.length >= minPasswordLength
    }

    confirmPassword(password, confPassword) {
        const pasVal = password.value.trim();
        const confPasVal = confPassword.value.trim();
        if(!this.is('String', pasVal) || !this.is('String', confPasVal)) throw this.valueNotString;
        return pasVal === confPasVal;
    }

    checked(el) {
        if(el.getAttribute('type') !== 'checkbox' || el.getAttribute('type') !== 'radio') throw 'element must have the attribute name="checkbox|radio"';
        return el.checked;
    }

    mobilePhone(_val) {
        if(!this.is('String', _val)) throw this.valueNotString;
        if(_val === '') throw 'field is empty';
        const val = _val.match( /\d+/g).join('');
        return val.length === 11;
    }

    checkboxGroup(el, _min = 1, _max = null) {

        if(isNaN(Number(_max)) && _max !== null) throw 'attribute max must be a Number';
        if(isNaN(Number(_min))) throw 'attribute min must be a Number';
        if(Number(_min) < 0 || Number(_max) < 0) throw "max and min must be greater than 0";
        if(Number(_min) > Number(_max)) throw "max must be less than or equal to min";

        const min = isNaN(Number(_min)) || _min < 0 ? 0 : Number(_min);
        const max = isNaN(Number(_max)) || _max < 0 ? null : Number(_max);
        const inputsArr = Array.from(el.querySelectorAll('input[type="checkbox"]'));

        if(inputsArr.length === 0) return  false;
        if(min === 0) return true;
        if(min === 1) return inputsArr.some(input => input.checked);


        let minCounter = 0;
        inputsArr.forEach(input => input.checked ? minCounter++ : "");

        if(max !== null) {
            if(minCounter > max) return false;
        }

        if(minCounter >= min) return true;
    }

    radioButtonGroup(el) {
        const inputsArr = Array.from(el.querySelectorAll('input[type="radio"]'));
        if(inputsArr.length === 0) return  false;
        return inputsArr.some(input => input.checked);
    }
}


class Validation extends ValidationType {
    constructor({elements = [], passwordLength = 0, inputsMinLength = 0}) {
        super();
        this.minPasswordLength = passwordLength;
        this.elements = elements;
        this.inputsMinLength = inputsMinLength;
    }

    startAll() {
        const classValid = '_dc-validation-access'; //Класс при успешной валидации
        const classError = '_dc-validation-error'; //Класс при ошибки валидации
        const arr = Array.isArray(this.elements) ? this.elements : Array.from(this.elements); //Преобразование nodeList в Array
        const minLengthDefault = this.inputsMinLength; //Минимальная длина поля

        arr.forEach(el => {

            // Перед проверкой удаляем все классы связанные с валидацией
            if(el.classList.contains(classError)) el.classList.remove(classError);
            if(el.classList.contains(classValid)) el.classList.remove(classValid);

            // Тип валадиции которую нужно провести
            const validationType = el.getAttribute("_dc-data-validation"); //Получаю тип валидации

            if(validationType === null) return false;

            const elNodeName = el.nodeName; //Получаю NodeName
            const validNodeName = ['INPUT', 'TEXTAREA']; //Все допустимые NodeName
            const nodeNameValidation = validNodeName.includes(elNodeName); //Проверка на то совпадает ли NodeName с допустимыми
            const elValue = nodeNameValidation ? el.value.trim() : "NOT_EDITABLE_FIELD"; //Получаю value элемента
            const attValueMinLength = el.getAttribute("_dc-data-minlength");
            const minLength = isNaN(Number(attValueMinLength)) ? minLengthDefault : Number(attValueMinLength);

            /* Если тип валидации пустой, проверяется только минимальная длина */
            if (nodeNameValidation) {
                if (validationType === "") {
                    if (elValue.length >= minLength) {
                        el.classList.add(classValid);
                    } else {
                        el.classList.add(classError);
                    }
                    return false;
                }
            }

            // Функция добавление класса после валидации
            const addTheCorrectClass = (flag) => {flag ? el.classList.add(classValid) : el.classList.add(classError)};

            switch (validationType) {
                // Провека email при помощи маски
                case "email":
                    addTheCorrectClass(super.email(elValue));
                    break;

                // Проверка длины пароля
                case "password":
                    addTheCorrectClass(super.password(elValue, this.minPasswordLength));
                    break;

                // Проверка повторного пароля
                case "confirmPassword":
                    // Нахожу поле пароля
                    const inputPassword = arr.find(input => {
                        const inputAttr = input.getAttribute('_dc-data-validation');
                        return inputAttr === 'password' ? input : null;
                    });


                    // Выдаем ошибку если не найдено поле с которомы сравнивать
                    if(typeof inputPassword === "undefined") throw 'could not find field to compare.';
                    // Прерываем скрипт если у поля пароля с которым сравниваем не прошло валидацию
                    if(inputPassword.classList.contains(classError) || !inputPassword.classList.contains(classValid)) return false;
                    addTheCorrectClass(super.confirmPassword(inputPassword, el));
                    break;

                // Проверка нажат ли чекбокс
                case "checked":
                    addTheCorrectClass(super.checked(el));
                    break;

                case "mobilePhone":
                    addTheCorrectClass(super.mobilePhone(elValue));
                    break;

                case "checkboxGroup":
                    const minChecked = el.getAttribute('_dc-data-minChecked');
                    const maxChecked = el.getAttribute('_dc-data-maxChecked');

                    addTheCorrectClass(super.checkboxGroup(el, minChecked, maxChecked));
                    break;
                case "radioButtonGroup":
                    addTheCorrectClass(super.radioButtonGroup(el));
                    break;
            }
        });
    }
}


export {ValidationType};
export default Validation;


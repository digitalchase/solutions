//Ввод только цифр в input
function proverka(input) {
  input.value = input.value.replace(/[^\d,]/g, '');
};


//Ввод только кириллицы
function proverka(input) {
  input.value = input.value.replace(/[^а-яА-Я]/,'');
};

// Ввод только букв
function proverka(input) {
  const regexp = /[№<>@!#$%^&*()_+[\]{}?:;|'\"\\,.\/~\-={0-9}]/g;
  input.value = input.value.replace(regexp, "");
};


// найти все цифры в строке
function proverka(string) {
  return string.match( /[\d.?\d]+/g);
};


//Деления на разряды
function prettyNumber(string) {
  var parts = string.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

//Валидация на email, проверяет структуру xxx@xxx.xx (только латинские буквы)
function validEMail(sEmail) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(sEmail);
}

//Проверка на наличие букв
function hasLetters(string) {
  return (/[А-ЯA-Zа-яa-z]/.test(string));
};

//Проверка на наличие строчных букв
function hasLowerCase(string) {
  return (/[а-яa-z]/.test(string));
};

//Проверка на наличие заглавных 
function hasUpperCase(string) {
  return (/[А-ЯA-Z]/.test(string));
};

//Проверка на наличие цифр
function hasNum(string) {
  return (/[0-9]/.test(string));
};

//Проверка на наличие спецсимволов
function hasSpecialSymbols(string) {
  var specialChars = "№<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  for(i = 0; i < specialChars.length;i++){
    if(string.indexOf(specialChars[i]) > -1){
      return true
    }
  }
  return false;
};

function isUrl(value) {
  const rexp = /^(?:https?:\/\/)?(?:www\.)?(?:[-\wа-яё]+(?:\.[-\wа-яё]+)+)((?:\/[-\wа-яё\/]+)+(?:\.[-\wа-яё]+)?)?(?:#(?:[-\wа-яё]+)?)?\??(?:(?<=\?)(?:[-\wа-яё]+=?(?:(?<==)(?:[-\wа-яё%]+))?&?)+)?$/gi
  return rexp.test(value);
}

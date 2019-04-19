 
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

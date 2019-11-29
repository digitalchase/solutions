//Ввод только цифр в input
function proverka(input) {
  input.value = input.value.replace(/[^\d,]/g, '');
};


//Ввод только кириллицы
function proverka(input) {
  input.value = input.value.replace(/[^а-яА-Я]/,'');
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

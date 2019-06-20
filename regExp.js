//Ввод только цифр в input
function proverka(input) {
  input.value = input.value.replace(/[^\d,]/g, '');
};

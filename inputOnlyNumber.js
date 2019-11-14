//Запрет на ввод чего угодно кроме цифр
$("input").on("input", function() {
    $(this).val(
        $(this)
            .val()
            .replace(/\D/, "")
    );
});

//Ввод только цифр и одной точки
function onlyDigits() {
  this.value = this.value.replace(/[^\d\.]/g, "");
  if(this.value.match(/\./g).length > 1) {
    this.value = this.value.substr(0, this.value.lastIndexOf("."));
  }
}

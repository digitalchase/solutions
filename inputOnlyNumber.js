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

$("input").on("input", function() {
  const that = $(this);

  that.val(that.val().replace(/[^\d\.]/g, ""));

  const matchParam = that.val().match(/\./g);

  if (matchParam != null) {
    if (that.val().match(/\./g).length > 1) {
      that.val(that.val().substr(0, this.value.lastIndexOf(".")));
    }
  }
});

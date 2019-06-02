//Запрет на ввод чего угодно кроме цифр
$("input").on("input", function() {
    $(this).val(
        $(this)
            .val()
            .replace(/\D/, "")
    );
});

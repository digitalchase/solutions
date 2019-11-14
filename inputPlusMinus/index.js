if ($("[data-toggleInputContainer]").length) {
  $("[data-toggleInputContainer]").each(function() {
    const toggleBtn = $(this).find("[data-toggleInput]");
    const input = $(this).find("[data-inputEl]");
    const step = (() => {
      if (
        input.data("step") === undefined ||
        input.data("step") === "" ||
        isNaN(Number(input.data("step")))
      ) {
        return 1;
      } else {
        return Number(input.data("step"));
      }
    })();
    
    //Ввод только цифр, без плавующей точки
//     input.on("input", function() {
//       const that = $(this);
//       that.val(that.val().replace(/\D/, ""));
//     });
    
    //Ввод только цифр, с плаующей точкой
//     input.on("input", function() {
//       const that = $(this);

//       that.val(that.val().replace(/[^\d\.]/g, ""));

//       const matchParam = that.val().match(/\./g);

//       if (matchParam != null) {
//         if (that.val().match(/\./g).length > 1) {
//           that.val(that.val().substr(0, this.value.lastIndexOf(".")));
//         }
//       }
//     });

    toggleBtn.on("click", function() {
      switch ($(this).data("toggleinput")) {
        case "plus":
          input.val(Number(input.val()) + step);
          break;
        case "minus":
          input.val(Number(input.val()) - step);
          break;
      }

      if (isNaN(Number(input.val()))) {
        input.val(0);
      }

      input.trigger("change");
    });
  });
}

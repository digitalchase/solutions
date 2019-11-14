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

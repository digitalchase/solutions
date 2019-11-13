if ($(".customInput-wrapper[data-maxlength]").length) {
  const inputWithMaxLength = $(".customInput-wrapper[data-maxlength]");

  inputWithMaxLength.each((i, el) => {
    const maxlength = $(el).data("maxlength");
    
    if (isNaN(Number(maxlength))) return false;

    const writableElem = $(el).find("input, textarea");
    const currentLength = writableElem.val().trim().length;
    let letterCountElem = $(el).find(".letterCount");

    writableElem.attr("maxlength", maxlength);

    if (letterCountElem.length) letterCountElem.remove();

    letterCountElem = `
            <div class="letterCount">
                <div class="letterCount__current" data-current>${currentLength}</div>
                <div class="letterCount__separator">\\</div>
                <div class="letterCount__max" data-max>${maxlength}</div>
            </div>
        `;

    $(el).append(letterCountElem);

    const letterCountNodeElem = $(el).find(".letterCount");

    writableElem.on("input", function() {
      const that = $(this);
      const valLength = that.val().trim().length;

      letterCountNodeElem.find("[data-current]").text(valLength);
      that.css({
        paddingRight: letterCountNodeElem.innerWidth() + 15
      });
    });
  });
}

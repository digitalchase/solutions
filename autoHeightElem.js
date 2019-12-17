//Находит элемент с максимальной высотой и выставляет ее все элементом с тем же классом

//Принимает селектор элемента по которым будет проходиться
const autoHeight = (selector) => {
    const elems =  document.querySelectorAll(selector);
    elems.forEach(el => el.removeAttribute('style'));
    const itemHeight = Array.from(elems).reduce((accum, el) => {
        let h = el.offsetHeight;
        if (Number(h) > accum) accum = h;
        return accum;
    }, 0);
    elems.forEach(el => el.style.height = `${itemHeight}px`);
}

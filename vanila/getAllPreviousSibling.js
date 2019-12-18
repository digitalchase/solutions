const getPreviousSibling = (elem, selector) => {
    let arr = [];

    // Get the next sibling element
    let sibling = elem.previousElementSibling;

    // If there's no selector, return the first sibling
    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) {
            arr.push(sibling);
        };
        sibling = sibling.previousElementSibling;
    }
    return arr;
};

import Validation, {ValidationType} from "./index";

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const arrInputs = document.querySelectorAll('form [_dc-data-validation]'); // Можно использовать и jquery 
    const valid = new Validation({elements: arrInputs, inputsMinLength: 2, passwordLength: 6});
    valid.startAll();
});

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm)

function submitForm(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const inputDelay = form.querySelector('.input-delay');
    const delay = parseInt(inputDelay.value);
    const state = form.querySelector('input[name="state"]:checked'); 

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state.value === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)

    })

    promise.then((delay) => {
        iziToast.success({
            title: 'Ok',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: '#59A10D',
            messageColor: '#FFF',
            titleColor: '#FFF',
            font: ['Montserrat', 'Arial'],
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '1.5',
            
        });
        inputDelay.value = '';
        state.checked = false;
    }) .catch((delay) => {
        iziToast.error({
            title: 'Error',
            messageColor: '#FFF',
            backgroundColor: '#EF4040',
            titleColor: '#FFF',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight'
        });
        inputDelay.value = '';
        state.checked = false;
    })
}


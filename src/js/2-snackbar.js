import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const delayInput = document.querySelector('input[type = "number"]');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    const box = document.querySelector('input[type="radio"]:checked');
    event.preventDefault();
    const delay = Number(delayInput.value);
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (box.value === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay)
    })
    .then((message) => { 
        iziToast.success({
            title: "Fulfilled",
            message,
            position: 'topRight',
        });
    })
    .catch((message) => {
        iziToast.error({
            title: "Rejected",
            message,
            position: 'topRight',
        });
    })
    form.reset();
};

    

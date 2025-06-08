import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: 'topRight',
            });
            dataBtn.disabled = true;
        } else {
            userSelectedDate = selectedDates[0].getTime();
            dataBtn.disabled = false;
        }
    },
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addZero(value) {
    return value.toString().padStart(2, "0");
}

function updateDisplay({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addZero(days);
    document.querySelector('[data-hours]').textContent = addZero(hours);
    document.querySelector('[data-minutes]').textContent = addZero(minutes);
    document.querySelector('[data-seconds]').textContent = addZero(seconds);
}

let userSelectedDate;
let intervalId;

const dateCatcher = document.querySelector("#datetime-picker");
const dataBtn = document.querySelector('[data-start]');
const fp = flatpickr("#datetime-picker", options);

dataBtn.disabled = true;
dataBtn.addEventListener("click", clickHandler);

function countSeconds() {
    const msDiff = userSelectedDate - Date.now();

    if (msDiff <= 0) {
        clearInterval(intervalId);
        return;
    }

    updateDisplay(convertMs(msDiff));
}

function clickHandler(event) {
    dataBtn.disabled = true;           
    dateCatcher.disabled = true;  
    intervalId = setInterval(countSeconds, 1000);
}

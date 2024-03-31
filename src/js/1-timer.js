console.log('Timer');

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const value = timer.querySelectorAll('.value');


let userSelectedDate;
let timerInterval;


flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        // dateFormat: "Y-m-d",
        // timeFormat: "H:i",
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                userSelectedDate = selectedDate;
                startBtn.disabled = false;
            } else {
                userSelectedDate = null;
                startBtn.disabled = true;
                window.alert("Please choose a date in the future");
            }
        }
});
    
startBtn.addEventListener('click', () => {
    if (userSelectedDate) {
        startBtn.disabled = true;
        input.disabled = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
})

function updateTimer() {
    const currentTime = new Date().getTime();
    const difference = userSelectedDate - currentTime;
    
    if (difference <= 0) {
        clearInterval(timerInterval);
        if (timer) {
            value.forEach(number => {
                number.textContent = "00";
            });
        }
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
}

function padZero(num) {
    return String(num).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minuates
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





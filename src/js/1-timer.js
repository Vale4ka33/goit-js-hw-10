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
setButtonState("disable");
setBorder('#808080');

// Функція для встановлення рамки коли таймер активний
function setBorder(color) {
    input.style.border = `1px solid ${color}`;
}

// Функція для встановлення стану кнопки
function setButtonState(state) {
    switch (state) {
        case "disable":
            startBtn.disabled = true;
            startBtn.style.backgroundColor = "";
            startBtn.style.color = "";
            break;
        case "normal":
            startBtn.disabled = false;
            startBtn.style.backgroundColor = "#4E75FF"; 
            startBtn.style.color = "#fff"; 
            break;
        default:
            break;
    }
}

// Ініціалізація Flatpickr
flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                userSelectedDate = selectedDate;
                startBtn.disabled = false;
                setButtonState("normal");
                setBorder('#4E75FF');
                
            } else {
                userSelectedDate = null;
                startBtn.disabled = true;
               iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                    messageColor: '#fff',
                    titleColor: '#fff',
                    backgroundColor: '#EF4040',
               });
                setBorder('#808080');
            }
        }
});
    

// Додавання обробника події при натисканні на кнопку старт
startBtn.addEventListener('click', () => {
    if (userSelectedDate) {
        startBtn.disabled = true;
        input.disabled = true;
        timerInterval = setInterval(updateTimer, 1000);
        setButtonState("disable");
    }
})

// Додавання обробника події для стану hover кнопки
startBtn.addEventListener('mouseenter', () => {
    if (!startBtn.disabled) {
        startBtn.style.backgroundColor = "#6C8CFF"; // 
    }
});

// Додавання обробника події для стану normal кнопки
startBtn.addEventListener('mouseleave', () => {
    if (!startBtn.disabled) {
        startBtn.style.backgroundColor = "#4E75FF"; // 
    }
});


// Функція для оновлення таймера
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
        setButtonState("disable");
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    value[0].textContent = padZero(days);
    value[1].textContent = padZero(hours);
    value[2].textContent = padZero(minutes);
    value[3].textContent = padZero(seconds);
}

// Функція для додавання нуля до чисел
function padZero(num) {
    return String(num).padStart(2, '0');
}

// Функція для перетворення мілісекунд в об'єкт з часом
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






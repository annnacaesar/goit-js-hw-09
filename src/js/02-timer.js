import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
		input: document.querySelector('#datetime-picker'),
		btnStartStop: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

// refs.btnStartStop.disabled = true;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
		 const userSelectedData = this.selectedDates[0].getTime()
      const currentData = Date.now()
      const deltaTime = userSelectedData - currentData
      
		if (deltaTime > 0) {
			refs.btnStartStop.disabled = false;
		} else {
			Notify.failure("Please choose a date in the future");
      refs.btnStartStop.disabled = true
      refs.input.disabled = true
		}
  },
};

const fp = flatpickr(refs.input, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function onClickbtnStart() {
	if (timerId) return;
	const startCount = fp.selectedDates[0];
	timerId = setInterval(() => {
		// refs.btnStartStop.textContent = 'Stop';
    if(startCount.getTime() <= Date.now()){
			clearInterval(timerId);
      return
    }
    const deltaTime = startCount - Date.now()
    const time = convertMs(deltaTime);
    updateClockFace(time);
  }, 1000);
}

// function onClickbtnStop() {
// 	clearInterval(timerId);
// 	refs.btnStartStop.textContent = 'Start';
// 	timerId = null;
// }

// function handleClick () {
// 	if (timerId) {
// 		onClickbtnStop();
// 	} else {
// 		onClickbtnStart();
// 	}
// }

refs.btnStartStop.addEventListener('click', onClickbtnStart);

function updateClockFace ({ days, hours, minutes, seconds }) {
	refs.days.textContent = days;
	refs.hours.textContent = hours;
	refs.minutes.textContent = minutes;
	refs.seconds.textContent = seconds;
};



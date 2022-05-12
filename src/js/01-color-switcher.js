const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onChangeColor);
btnStop.addEventListener('click', onStopChangeColor);

let colorId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeColor() {
	if (setInterval) {
		btnStart.setAttribute("disabled", "disabled");
	}
	colorId = setInterval(() => {
		body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopChangeColor () {
	clearInterval(colorId);
	btnStart.removeAttribute("disabled", "disabled");
}


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const btn = document.querySelector('button');

form.addEventListener('input', onSetOptions)
btn.addEventListener('click', onBtnClick)

const options = {};

function onSetOptions (event) {
  event.preventDefault();
  options[event.target.name] = Number(event.target.value);
  console.log(options);
};

function onBtnClick(event) {
  event.preventDefault();
  console.log('клик по кнопці');
  Promise.all(arrPromise(options));
};

function arrPromise ({delay, step, amount}) {
  const arr = [];
  let allDelay = delay;

  for (let position = 1; position <= amount; position += 1) {
    allDelay += step;
    arr.push(createPromise(position, allDelay).then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }))
  }
  return arr;
};

function createPromise(position, delay) {
      const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {

      setTimeout(() => {
            if (shouldResolve) {
                    resolve({ position, delay })
                  } else {
                    reject({ position, delay})
                  }
      }, delay)
   })
};
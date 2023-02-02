import throttle from 'lodash.throttle';

const inputForm = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

inputForm.addEventListener('submit', onFormSubmit);
inputForm.addEventListener('input', throttle(onFormData, 500));

fillingTextarea();

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget;
  const formInput = {
    email: email.value,
    message: message.value,
  };

  console.log(formInput);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormData(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillingTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    formData = JSON.parse(savedMessage);
    email.value = formData.email;
    message.value = formData.message;
  }
}

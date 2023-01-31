import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input[name=email]');
const textArea = document.querySelector(
  '.feedback-form textarea[name=message]'
);
const storage = {};
const KEY = 'feedback-form-state';

form.addEventListener('input', throttle(currentOnForm, 500));
form.addEventListener('submit', onSubmitForm);

function currentOnForm(e) {
  const keyStorage = e.target.name;
  storage[keyStorage] = e.target.value;

  localStorage.setItem(KEY, JSON.stringify(storage));
}

function setCurrentState(key) {
  const parseStorage = JSON.parse(localStorage.getItem(key));

  if (parseStorage !== null) {
    if (parseStorage.email !== undefined) {
      email.value = parseStorage.email;
    }
    if (parseStorage.message !== undefined) {
      textArea.value = parseStorage.message;
    }
  }
}

function onSubmitForm(e) {
  if (
    storage.email === undefined ||
    storage.message === undefined ||
    storage.email.trim() === '' ||
    storage.message.trim() === ''
  ) {
    alert('Для відправки форми усі поля мають бути заповнені');
    return;
  }
  e.preventDefault();
  form.reset();
  localStorage.removeItem(KEY);
  console.log(storage);
  delete storage.email;
  delete storage.message;
}

setCurrentState(KEY);

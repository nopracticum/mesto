const selectorsSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
}

function hideInputError(form, input, selectorsSet) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(selectorsSet.errorClass);
  input.classList.remove(selectorsSet.inputErrorClass);
}

function showInputError(form, input, message, selectorsSet) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  errorMessage.textContent = message;
  errorMessage.classList.add(selectorsSet.errorClass);
  input.classList.add(selectorsSet.inputErrorClass);
}

function submitBtnState(form, selectorsSet) {
  const submitBtn = form.querySelector(selectorsSet.submitButtonSelector);
  if (form.checkValidity()) {
    submitBtn.removeAttribute(selectorsSet.inactiveButtonAttribute);
  } else {
    submitBtn.setAttribute(selectorsSet.inactiveButtonAttribute, true);
  }
}

function checkInputValidity (form, input, selectorsSet) {
  submitBtnState(form, selectorsSet);
  if (input.validity.valid) {
    hideInputError(form, input, selectorsSet);
  } else {
    showInputError(form, input, input.validationMessage, selectorsSet);
  }
}

function setEventListeners (form, selectorsSet) {
  const inputsList = Array.from(form.querySelectorAll(selectorsSet.inputSelector));
  inputsList.forEach((input) => {input.addEventListener('input', () => checkInputValidity(form, input, selectorsSet))})
  form.addEventListener('reset', () => {
  setTimeout(() => { 
    submitBtnState(form, selectorsSet), 0})
  })
}

function enableValidation (selectorsSet) {
  const formsList = Array.from(document.querySelectorAll(selectorsSet.formSelector));
  formsList.forEach((form) => {
    form.addEventListener('submit', (evt) => {evt.preventDefault()});
    setEventListeners(form, selectorsSet);
  })
}

enableValidation(selectorsSet);
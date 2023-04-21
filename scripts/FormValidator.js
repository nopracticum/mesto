const selectorsSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor (selectorsSet, form) {
    this._selectorsSet = selectorsSet;
    this._form = form;
  }

  _hideInputError(input) {
    const errorMessage = this._form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._selectorsSet.errorClass);
    input.classList.remove(this._selectorsSet.inputErrorClass);
  }
  
  _showInputError(input, message) {
    const errorMessage = this._form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = message;
    errorMessage.classList.add(this._selectorsSet.errorClass);
    input.classList.add(this._selectorsSet.inputErrorClass);
  }
  
  _submitBtnState() {
    const submitBtn = this._form.querySelector(this._selectorsSet.submitButtonSelector);
    if (this._form.checkValidity()) {
      submitBtn.removeAttribute(this._selectorsSet.inactiveButtonAttribute);
    } else {
      submitBtn.setAttribute(this._selectorsSet.inactiveButtonAttribute, true);
    }
  }
  
  _checkInputValidity (input) {
    this._submitBtnState();
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }
  
  _setEventListeners () {
    const inputsList = Array.from(this._form.querySelectorAll(this._selectorsSet.inputSelector));
    inputsList.forEach((input) => {input.addEventListener('input', () => this._checkInputValidity(input))});
    this._form.addEventListener('reset', () => {
    setTimeout(() => { 
      this._submitBtnState(), 0})
    })
  }

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
    this._setEventListeners();
  }
}

export {FormValidator, selectorsSet};
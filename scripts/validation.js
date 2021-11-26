export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
    errorMessage
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = ' ';
  }

  _checkInputValidity = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
  ) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  _disableButton(buttonElement, inactiveClass) {
    buttonElement.classList.add(inactiveClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
  _enableButton(buttonElement, inactiveClass) {
    buttonElement.classList.remove(inactiveClass);
    buttonElement.removeAttribute('disabled');
  }
  _toggleButtonState(inputList, buttonElement, inactiveClass) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, inactiveClass);
    } else {
      this._enableButton(buttonElement, inactiveClass);
    }
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
    formElement.addEventListener('submit', () =>
      this._disableButton(buttonElement, settings.inactiveButtonClass)
    );
    this._toggleButtonState(
      inputList,
      buttonElement,
      settings.inactiveButtonClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          settings.inputErrorClass,
          settings.errorClass
        );
        this._toggleButtonState(
          inputList,
          buttonElement,
          settings.inactiveButtonClass
        );
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._form, this._settings);
  }
}

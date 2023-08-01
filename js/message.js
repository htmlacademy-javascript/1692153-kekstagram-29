/* eslint-disable no-use-before-define */
import {isEscapeKey} from './util.js';

const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

const renderMessage = () => {
  const popupContainer = document.querySelector('main');

  errorMessageElement.classList.add('hidden');
  successMessage.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorMessageElement);
  popupContainer.insertAdjacentElement('afterbegin', successMessage);
};

const messageDelete = (cls) => {
  const booklet = bodyElement.querySelector(`.${cls}`);
  booklet.remove();
};

renderMessage();

export const showMessage = (cls) => {
  const message = bodyElement.querySelector(`.${cls}`);
  const closeButton = message.querySelector(`.${cls}__button`);
  message.classList.remove('hidden');

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onCloseButtonClick = () => {
    closePopup();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);

  const closePopup = () => {
    messageDelete (cls);
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);
  };
};


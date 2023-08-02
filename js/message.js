/* eslint-disable no-use-before-define */
import {isEscapeKey} from './util.js';

const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

const renderMessage = () => {
  const popupContainer = document.querySelector('main');

  errorMessageElement.classList.add('hidden');
  successMessageElement.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorMessageElement);
  popupContainer.insertAdjacentElement('afterbegin', successMessageElement);
};

const messageDelete = (cls) => {
  const booklet = bodyElement.querySelector(`.${cls}`);
  booklet.remove();
};

renderMessage();

export const showMessage = (cls) => {
  const messageElement = bodyElement.querySelector(`.${cls}`);
  const closeButtonElement = messageElement.querySelector(`.${cls}__button`);
  messageElement.classList.remove('hidden');

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
  closeButtonElement.addEventListener('click', onCloseButtonClick);

  const closePopup = () => {
    messageDelete (cls);
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonElement.removeEventListener('click', onCloseButtonClick);
  };
};


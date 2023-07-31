import {isEscapeKey} from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

function renderMessage() {
  const popupContainer = document.querySelector('main');

  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorMessage);
  popupContainer.insertAdjacentElement('afterbegin', successMessage);
}

const messageDelete = (cls) => {
  const booklet = bodyElement.querySelector(`.${cls}`);
  booklet.remove();
};

renderMessage();

export function showMessage(cls) {
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

  function closePopup () {
    messageDelete (cls);
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);
    // message.removeEventListener('click',onScreenAreaClick);
  }
}


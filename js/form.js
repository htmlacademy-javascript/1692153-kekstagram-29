/* eslint-disable no-use-before-define */
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {showMessage} from './message.js';
import {resetDefault} from './range-slider.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const formElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadInputElement = document.querySelector('.img-upload__input');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const uploadSubmitElement = document.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const closeModal = () => {
  formElement.reset();
  pristine.reset();

  document.querySelector('body').classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');

  uploadInputElement.value = '';
  resetDefault();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');

  uploadCancelElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};


const blockUploadSubmit = () => {
  uploadSubmitElement.disabled = true;
};

const unblockUploadSubmit = () => {
  uploadSubmitElement.disabled = false;
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const cancelCloseModal = () => document.activeElement === textHashtagsElement || document.activeElement === textDescriptionElement;

export const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !cancelCloseModal()) {
    evt.preventDefault();
    closeModal();
  }
};

const uploadFormData = async () => {
  try {
    const formData = new FormData(formElement);
    blockUploadSubmit();
    await sendData(formData);
    unblockUploadSubmit();
    showMessage('success');
    closeModal();
  } catch {
    unblockUploadSubmit();
    showMessage('error');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  uploadFormData();
};


pristine.addValidator(textHashtagsElement, hasValidCount, errorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtagsElement, hasUniqueTags, errorText.NOT_UNIQUE,1,true);
pristine.addValidator(textHashtagsElement, hasValidTags, errorText.INVALID_PATTERN,2,true);

formElement.addEventListener('submit', onUploadFormSubmit);

uploadInputElement.addEventListener('change', openModal);

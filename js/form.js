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

const form = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const closeModal = () => {
  form.reset();
  pristine.reset();

  document.querySelector('body').classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');

  uploadInput.value = '';
  resetDefault();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');

  uploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};


const blockUploadSubmit = () => {
  uploadSubmit.disabled = true;
};

const unblockUploadSubmit = () => {
  uploadSubmit.disabled = false;
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const cancelCloseModal = () => document.activeElement === textHashtags || document.activeElement === textDescription;

export function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !cancelCloseModal()) {
    evt.preventDefault();
    closeModal();
  }
}

const uploadFormData = async () => {
  try {
    const formData = new FormData(form);
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


pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,1,true);
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,2,true);

form.addEventListener('submit', onUploadFormSubmit);

uploadInput.addEventListener('change', openModal);

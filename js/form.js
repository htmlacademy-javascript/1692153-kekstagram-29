import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {showMessage} from './message.js';

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

  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);

};

const openModal = () => {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');

  uploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};


function blockUploadSubmit() {
  uploadSubmit.disabled = true;
}

function unblockUploadSubmit() {
  uploadSubmit.disabled = false;
}

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


function onFormFieldKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const uploadFormData = async () => {
  try {
    const formData = new FormData(form);
    blockUploadSubmit();
    await sendData(formData);
    unblockUploadSubmit();
    showMessage('success');
    closeModal ();
  } catch {
    showMessage('error');
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

import './pictures.js';
import {isEscapeKey} from './util.js';


const bigPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const pictureCancelElement = bigPictureModal.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPictureCancelElementClick = () => {
  closeBigPicture();
};


function openBigPicture () {
  bigPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.addEventListener('click', onPictureCancelElementClick);
}


function closeBigPicture() {
  bigPictureModal.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.removeEventListener('click', onPictureCancelElementClick);
}

const onPicturesContainerClick = (evt) => {
  if (evt.target.closest('.picture')) {
    openBigPicture();
  }
};


picturesContainer.addEventListener('click', onPicturesContainerClick);

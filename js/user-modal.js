/* eslint-disable no-use-before-define */
import {data} from './data.js';
import {isEscapeKey} from './util.js';

const fullPicture = document.querySelector('.big-picture');
const fullPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const pictureCancelElement = fullPictureModal.querySelector('.big-picture__cancel');
const commentsCounter = fullPicture.querySelector('.social__comment-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onPictureCancelElementClick = () => {
  closeFullPicture();
};

function closeFullPicture() {
  fullPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.removeEventListener('click', onPictureCancelElementClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

function openFullPicture() {
  fullPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.addEventListener('click', onPictureCancelElementClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}


const onPicturesContainerClick = ({target}) => {
  if (!target.closest('.picture')) {
    return;
  }
  const cardId = target.closest('.picture').dataset.id;
  const photoData = data.find((element) => element.id === Number(cardId));
  fillBigPicture(photoData);
  openFullPicture();
};

function createComment({avatar, name, message}) {
  return `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
 </li>`;
}

const renderCommentsList = (comments) => {
  fullPicture.querySelector('.social__comments').innerHTML = comments.map((value) => createComment(value)).join('');
};


const renderCommentsCounter = (loadedComments, totalComments) => {
  commentsCounter.textContent = `${loadedComments} из ${totalComments} комментариев`;

  if (loadedComments === totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};


const COMMENTS_PER_PORTION = 5;
let loadingStep = 1;

const onCommentsLoaderClick = () => {
  loadingStep = loadingStep + 1;
  const comments = JSON.parse(fullPicture.dataset.comments);
  const restComments = comments.slice(0, loadingStep * COMMENTS_PER_PORTION);
  renderCommentsList(restComments);
  renderCommentsCounter(restComments.length, comments.length);
};


function fillBigPicture ({url, likes, comments, description}) {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.social__caption').textContent = description;
  fullPicture.dataset.comments = JSON.stringify(comments);

  loadingStep = 1;
  const initialComments = comments.slice(0, COMMENTS_PER_PORTION);
  renderCommentsList(initialComments);
  renderCommentsCounter(initialComments.length, comments.length);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);

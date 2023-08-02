/* eslint-disable no-use-before-define */
import {data} from './load.js';
import {isEscapeKey} from './util.js';

const fullPictureElement = document.querySelector('.big-picture');
const fullPictureModalElement = document.querySelector('.big-picture');
const picturesContainerElement = document.querySelector('.pictures');
const pictureCancelElement = fullPictureModalElement.querySelector('.big-picture__cancel');
const commentsCounterElement = fullPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = fullPictureElement.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onPictureCancelElementClick = () => {
  closeFullPicture();
};

const closeFullPicture = () => {
  fullPictureModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.removeEventListener('click', onPictureCancelElementClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const openFullPicture = () => {
  fullPictureModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCancelElement.addEventListener('click', onPictureCancelElementClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};


const onPicturesContainerClick = ({target}) => {
  if (!target.closest('.picture')) {
    return;
  }
  const cardId = target.closest('.picture').dataset.id;
  const photoData = data.find((element) => element.id === Number(cardId));
  fillBigPicture(photoData);
  openFullPicture();
};

const createComment = ({avatar, name, message}) => `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
 </li>`;

const renderCommentsList = (comments) => {
  fullPictureElement.querySelector('.social__comments').innerHTML = comments.map((value) => createComment(value)).join('');
};


const renderCommentsCounter = (loadedComments, totalComments) => {
  commentsCounterElement.textContent = `${loadedComments} из ${totalComments} комментариев`;

  if (loadedComments === totalComments) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};


const COMMENTS_PER_PORTION = 5;
let loadingStep = 1;

const onCommentsLoaderClick = () => {
  loadingStep = loadingStep + 1;
  const comments = JSON.parse(fullPictureElement.dataset.comments);
  const restComments = comments.slice(0, loadingStep * COMMENTS_PER_PORTION);
  renderCommentsList(restComments);
  renderCommentsCounter(restComments.length, comments.length);
};


const fillBigPicture = ({url, likes, comments, description}) => {
  fullPictureElement.querySelector('.big-picture__img img').src = url;
  fullPictureElement.querySelector('.likes-count').textContent = likes;
  fullPictureElement.querySelector('.social__caption').textContent = description;
  fullPictureElement.dataset.comments = JSON.stringify(comments);

  loadingStep = 1;
  const initialComments = comments.slice(0, COMMENTS_PER_PORTION);
  renderCommentsList(initialComments);
  renderCommentsCounter(initialComments.length, comments.length);
};

picturesContainerElement.addEventListener('click', onPicturesContainerClick);

import {debounce} from './util.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const fillCardTemplate = ({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.dataset.id = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  return pictureElement;
};

const resetPhotos = () => {
  const pictures = picturesContainerElement.querySelectorAll('.picture');
  pictures.forEach((picture)=> {
    picture.remove();
  });
};

export const renderPictures = (data) => {
  resetPhotos();
  data.forEach((card) => {
    fragment.appendChild(fillCardTemplate(card));
  });
  picturesContainerElement.appendChild(fragment);
};

export const renderPicturesWithDebounce = debounce(renderPictures);


import {debounce} from './util.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const fillCardTemplate = ({id, url, description, likes, comments}) => {
  const picture = pictureTemplateElement.cloneNode(true);
  picture.dataset.id = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
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


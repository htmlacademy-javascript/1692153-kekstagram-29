import {data} from './load.js';
import {renderPicturesWithDebounce} from './pictures.js';


const filterDefaultButtonElement = document.querySelector('#filter-default');
const filterRandomButtonElement = document.querySelector('#filter-random');
const filterDiscussedButtonElement = document.querySelector('#filter-discussed');
const imageFilterElement = document.querySelector('.img-filters');
const imageFilterButtonElement = imageFilterElement.querySelector('.img-filters__form');

const getRandomPhotos = (arr) => {
  for (let i = 0 ; (i < 10) && (i < arr.length) ; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const photo = arr[r];
    arr[r] = arr[i];
    arr[i] = photo;
  }
  return arr.slice(0, 10);
};

const getDiscussedPhotosFirst = (arr) => arr.sort((a, b) => b.comments.length - a.comments.length);

const getFilterData = (id) => {
  const idToFilter = {
    'filter-default': data,
    'filter-random': getRandomPhotos([...data]),
    'filter-discussed': getDiscussedPhotosFirst ([...data])
  };
  return idToFilter[id];
};

const setActiveFilterButton = (evt) => {
  imageFilterButtonElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const onFilterClick = (evt) => {
  const pictures = getFilterData (evt.target.id);
  setActiveFilterButton(evt);
  renderPicturesWithDebounce(pictures);
};

export const initializeFilters = () => {
  imageFilterElement.classList.remove('img-filters--inactive');

  filterDefaultButtonElement.addEventListener('click', onFilterClick);
  filterRandomButtonElement.addEventListener('click', onFilterClick);
  filterDiscussedButtonElement.addEventListener('click', onFilterClick);
};


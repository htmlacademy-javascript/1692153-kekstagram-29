import {data} from './load.js';
import {renderPicturesWithDebounce} from './pictures.js';


const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const imageFilter = document.querySelector('.img-filters');
const imageFilterButton = imageFilter.querySelector('.img-filters__form');

function getRandomPhotos(arr) {
  for (let i = 0 ; (i < 10) && (i < arr.length) ; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const photo = arr[r];
    arr[r] = arr[i];
    arr[i] = photo;
  }
  return arr.slice(0, 10);
}

function getDiscussedPhotosFirst (arr) {
  return arr.sort((a, b) => b.comments.length - a.comments.length);
}

function getFilterData (id) {
  const idToFilter = {
    'filter-default': data,
    'filter-random': getRandomPhotos([...data]),
    'filter-discussed': getDiscussedPhotosFirst ([...data])
  };
  return idToFilter[id];
}

function setActiveFilterButton (evt) {
  imageFilterButton.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

function onFilterClick(evt) {
  const pictures = getFilterData (evt.target.id);
  setActiveFilterButton(evt);
  renderPicturesWithDebounce(pictures);
}

export function initializeFilters() {
  imageFilter.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', onFilterClick);
  filterRandomButton.addEventListener('click', onFilterClick);
  filterDiscussedButton.addEventListener('click', onFilterClick);
}


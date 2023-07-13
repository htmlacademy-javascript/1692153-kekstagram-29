import {data} from './data.js';

const picturesContainer = document.querySelector('.pictures');

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

function fillbigPicture ({url, likes, comments, description}) {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social-caption').textContent = description;
  bigPicture.querySelector('.social-comments').innerHTML = comments.map((value) => createComment (value)).join('');
}

function onPicturesContainerClick(evt) {
  const cardId = evt.target.clsest('.picture').dataset.id;

  const photoData = data.find((element) => element.id === Number(cardId));
  fillbigPicture(photoData);
}
picturesContainer.addEventListener('click', onPicturesContainerClick);

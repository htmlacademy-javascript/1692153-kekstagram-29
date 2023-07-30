const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const fillCardTemplate = ({id, url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.dataset.id = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
};

export const renderPictures = (data) => {
  data.forEach((card) => {
    fragment.appendChild(fillCardTemplate(card));
  });
  picturesContainer.appendChild(fragment);

};



const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const DESCRIPTIONS = [
  'Лужа в Кишенёве',
  'Град в Ингушетии',
  'Автобусная остановка в Братиславе',
  'Старухи в Челябинске',
  'Синий ларёк в Грозном'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Офёкл',
  'Свирид',
  'Сидор',
  'Артурик',
  'Богданка',
  'Валера'
];

const getComment = () => ({
  id: getRandomNumberFromRange(1, 25),
  avatar: `img/${getRandomNumberFromRange(1, 6)}.svg`,
  message: MESSAGES[getRandomNumberFromRange(0, MESSAGES.length)],
  name: NAMES[getRandomNumberFromRange(0, NAMES.length)]
});

const getPicture = (index) => ({
  id: index,
  url: `photo/${index}.jpg`,
  description: DESCRIPTIONS[getRandomNumberFromRange(0, DESCRIPTIONS.length)],
  likes: getRandomNumberFromRange(15, 200),
  comments: Array.from({length: getRandomNumberFromRange(0, 20)}, getComment)
});

const pictures = Array.from({length: 25}, (_, index) => getPicture(index + 1));

window.console.log(pictures);

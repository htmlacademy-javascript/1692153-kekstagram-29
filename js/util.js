export const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};

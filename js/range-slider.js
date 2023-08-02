const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const rangeContainerElement = document.querySelector('.effect-level');
const rangeSliderElement = document.querySelector('.effect-level__slider');
const rangeInputElement = document.querySelector('.effect-level__value');
const effectsElement = document.querySelector('.effects');
const reducePictureElement = document.querySelector('.scale__control--smaller');
const increasePictureElement = document.querySelector('.scale__control--bigger');
const valueScaleElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

reducePictureElement.addEventListener('click', () => {
  const value = parseInt(valueScaleElement.value, 10);
  if (value > 25) {
    valueScaleElement.value = `${value - 25}%`;
    imagePreviewElement.style.cssText += `transform: scale(${parseInt(valueScaleElement.value, 10) / 100})`;
  }
});

increasePictureElement.addEventListener('click', () => {
  const value = parseInt(valueScaleElement.value, 10);
  if (value < 100) {
    valueScaleElement.value = `${value + 25}%`;
    imagePreviewElement.style.cssText += `transform: scale(${parseInt(valueScaleElement.value, 10) / 100})`;
  }
});

export const resetDefault = () => {
  rangeContainerElement.classList.add('hidden');
  valueScaleElement.value = '100%';
  imagePreviewElement.style.cssText = 'transform: scale(1); filter: none';
};

const hideRangeSlider = () => {
  rangeContainerElement.classList.add('hidden');
};

hideRangeSlider ();

const showRangeSlider = () => {
  rangeContainerElement.classList.remove('hidden');
};


const updateSlider = () => {
  rangeSliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max
  });
};

const onEffectsClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) =>effect.name === evt.target.value);
    imagePreviewElement.className = `img-upload__preview effects__preview--${currentEffect.name}`;

    updateSlider ();

    if (currentEffect.name === 'none') {
      hideRangeSlider();
    } else {
      showRangeSlider();
    }
  }
};

const onRangeSliderUpdate = () => {
  const rangesSliderValue = rangeSliderElement.noUiSlider.get();
  rangeInputElement.value = rangesSliderValue;
  imagePreviewElement.style.filter = `${currentEffect.style}(${rangesSliderValue}${currentEffect.unit})`;

  if (currentEffect.name === 'none') {
    imagePreviewElement.style.filter = DEFAULT_EFFECT.style;
  }
};

noUiSlider.create(rangeSliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min
});

effectsElement.addEventListener ('click', onEffectsClick);
rangeSliderElement.noUiSlider.on('update', onRangeSliderUpdate);

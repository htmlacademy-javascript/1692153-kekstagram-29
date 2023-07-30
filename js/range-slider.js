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

const rangeContainer = document.querySelector('.effect-level');
const rangeSlider = document.querySelector('.effect-level__slider');
const rangeInput = document.querySelector('.effect-level__value');
const effects = document.querySelector('.effects');
const reducePictureElement = document.querySelector('.scale__control--smaller');
const increasePictureElement = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

reducePictureElement.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value > 25) {
    valueScale.value = `${value - 25}%`;
    imagePreview.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

increasePictureElement.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value < 100) {
    valueScale.value = `${value + 25}%`;
    imagePreview.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

export const resetDefault = () => {
  rangeContainer.classList.add('hidden');
  // valueScale.value = '100%';
  imagePreview.style.cssText = 'transform: scale(1); filter: none';
};

function hideRangeSlider () {
  rangeContainer.classList.add('hidden');
}

hideRangeSlider ();

function showRangeSlider () {
  rangeContainer.classList.remove('hidden');
}


function updateSlider () {
  rangeSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max
  });
}

function onEffectsClick(evt) {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) =>effect.name === evt.target.value);
    imagePreview.className = `img-upload__preview effects__preview--${currentEffect.name}`;

    updateSlider ();

    if (currentEffect.name === 'none') {
      hideRangeSlider();
    } else {
      showRangeSlider();
    }
  }
}

function onRangeSliderUpdate () {
  const rangesSliderValue = rangeSlider.noUiSlider.get();
  rangeInput.value = rangesSliderValue;
  imagePreview.style.filter = `${currentEffect.style}(${rangesSliderValue}${currentEffect.unit})`;

  if (currentEffect.name === 'none') {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  }
}

noUiSlider.create(rangeSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min
});

effects.addEventListener ('click', onEffectsClick);
rangeSlider.noUiSlider.on('update', onRangeSliderUpdate);

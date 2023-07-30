import {getData} from './api.js';
import {showAlertError} from './util.js';
import {renderPictures} from './pictures.js';

let data = null;

try {
  data = await getData();
  renderPictures(data);
} catch {
  showAlertError('Ваши данные очень важны для нас. В настоящий момент они не загружены. Попробуйте перезагрузить страницу!');
}

export {data};

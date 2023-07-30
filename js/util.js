const isEscapeKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;

const showAlertError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-alert');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {showAlertError, isEscapeKey};

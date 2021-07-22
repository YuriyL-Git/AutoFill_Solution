import getBtnByText from './get-btn-by-text';

const modalCloseHandler = (callback: Function):void => {
  const container = document.querySelector('.MuiDialog-container');
  const btnCancel = getBtnByText('cancel', container);

  const containerListener = (event: Event): void => {
    if (event.target !== container) return;
    callback(false);
    container.removeEventListener('mouseup', containerListener, false);
  };

  const btnListener = (): void => {
    callback(false);
    container.removeEventListener('click', btnListener, false);
  };

  btnCancel?.addEventListener('click', btnListener, false);
  container?.addEventListener('mouseup', containerListener, false);
};


export default modalCloseHandler;

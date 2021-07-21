const validateModalInputs = (): boolean => {
  const modalWindow = document.querySelector('.MuiDialog-container');
  const errorsList = modalWindow.querySelectorAll('.Mui-error');

  if (errorsList.length > 0) return false;
  return true;
};

export default validateModalInputs;

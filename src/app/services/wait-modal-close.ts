const CHECK_INTERVAL = 100;

const waitModalClose = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');
      if (!modalWindow) {
        clearInterval(modalInterval);
        resolve(true);
      }
    }, CHECK_INTERVAL);
  });
};

export default waitModalClose;

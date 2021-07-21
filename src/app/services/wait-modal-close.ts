const CHECK_INTERVAL = 100;

const waitModalClose = async (rows: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const modalInterval = setInterval(() => {
      const modalWindow = document.querySelector('.MuiDialog-container');

      if (!modalWindow) {
        clearInterval(modalInterval);

        const filledRows = document.querySelectorAll('.MuiTableRow-root');
        if (filledRows.length !== rows + 2) {
          reject(false);
        }
        resolve(true);
      }
    }, CHECK_INTERVAL);
  });
};

export default waitModalClose;

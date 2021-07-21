const convertDate = (input: string) => {
  if (!input) return;
  const dateArr = input.split('-');
  const year = dateArr.shift();
  dateArr.push(year);

  return dateArr.join('/');
};

export default convertDate;

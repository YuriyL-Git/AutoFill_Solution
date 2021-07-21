const convertDate = (input: string) => {
  if (!input) return;
  return input.split('-').reverse().join('/');

};

export default convertDate;

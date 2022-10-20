export const isValidEmail = (email) => {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (result === null) {
    return false;
  }
  return true;
};

export const isValidAmount = (min, max, amount) => {
  if (
    parseInt(amount) < min ||
    parseInt(amount) > max ||
    parseInt(amount) % 100 !== 0
  ) {
    return false;
  }
  return true;
};

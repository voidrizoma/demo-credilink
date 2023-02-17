export interface Validation {
  validEmail: boolean;
  validAmount: boolean
}

export const initValidation = {
  validEmail: true,
  validAmount: true
}

export const isValidEmail = (email: string) => {
  
  if (email === "") {
    return false
  }

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

export const isValidAmount = (min: number, max: number, amount: string) => {
  if (!amount?.length || parseInt(amount) < 0) {
    return false
  }
  // if (
  //   parseInt(amount) < min ||
  //   parseInt(amount) > max ||
  //   parseInt(amount) % 100 !== 0
  // ) {
  //   return false;
  // }
  return true;
};

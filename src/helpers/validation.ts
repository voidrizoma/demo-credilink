export interface Validation {
  validEmail: boolean;
  validAmount: boolean;
  validPhone: boolean;
}

export const initValidation = {
  validEmail: true,
  validAmount: true,
  validPhone: true
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
  return true;
};

export const isValidPhone = (phone: string) => {
  if (phone?.length !== 10 || !/^[0-9]+$/.test(phone)) {
    console.log('invalid')
    return false
  }
  return true;
};

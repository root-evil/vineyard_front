export const is = (type, val) =>
  ![undefined, null].includes(val) && val.constructor === type;

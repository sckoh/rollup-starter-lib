import { SubmissionError } from 'redux-form';
import defaultShouldError from 'redux-form/lib/defaultShouldError';
import Big from 'big.js';

export const isInvalid = (errors = {}) => !!Object.keys(errors).length;

export const isValid = (errors = {}) => !isInvalid(errors);

export const validateSubmit = (validate, submit) => (formValues, dispatch, props) => {
  const validated = validate(formValues, props, true);
  if (isInvalid(validated)) {
    throw new SubmissionError(validated);
  }
  if (submit) {
    return submit(formValues);
  }
};

export const shouldError = customShouldError => (config) => {
  if (defaultShouldError(config)) {
    return true;
  }
  if (customShouldError(config)) {
    return true;
  }
  return false;
};

const countDecimals = (value) => {
  if (value % 1 !== 0) {
    return value.toString().split('.')[1].length;
  }
  return 0;
};

export const normalizeDecimal = decimalPoint => (value) => {
  if (!value || !value.length || value[value.length - 1] === '.') {
    return value;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(value)) {
    if (countDecimals(parseFloat(value)) <= decimalPoint) {
      return value;
    }
    const factor = decimalPoint > 0 ? Big(10).pow(decimalPoint) : 1;
    return Big(value)
      .times(factor)
      .round(0, 0)
      .div(factor)
      .valueOf();
  }
  return value;
};

export default {};

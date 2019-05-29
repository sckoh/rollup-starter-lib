import { SubmissionError } from 'redux-form';
import defaultShouldError from 'redux-form/lib/defaultShouldError';

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

export default {};

export const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0/* first error */];

export function email(value) {
  let result = false;
  if (!isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    result = true;
  }
  return result;
}

export function required(value) {
  let result = true;
  if (isEmpty(value)) {
    result = false;
  }
  return result;
}

export function minLength(min) {
  return value => {
    let result = true;
    if (!isEmpty(value) && value.length < min) {
      result = false;
    }
    return result;
  };
}

export function maxLength(max) {
  return value => {
    let result = true;
    if (!isEmpty(value) && value.length > max) {
      result = false;
    }
    return result;
  };
}

export function integer(value) {
  let result = true;
  if (!Number.isInteger(Number(value))) {
    result = false;
  }
  return result;
}

export function oneOf(enumeration) {
  return value => {
    let result = true;
    if (!~enumeration.indexOf(value)) {
      result = false;
    }
    return result;
  };
}

export function match(field) {
  return (value, data) => {
    let result = true;
    if (data) {
      if (value !== data[field]) {
        result = false;
      }
    }
    return result;
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

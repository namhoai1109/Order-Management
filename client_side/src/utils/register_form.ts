import { roles } from '@/constants/roles';
import { keyRegisterCustomer } from '@/pages/Login/components/RegisterCustomer/constants';
import { keyRegisterPartner } from '@/pages/Login/components/RegisterPartner/constants';
import { keyRegisterShipper } from '@/pages/Login/components/RegisterShipper/constants';
import { message } from 'antd';
import { ChangeEvent } from 'react';

export const REGEX_TEST_NUMBER = /^-?\d*(\.\d*)?$/;

const getKeys = (type: string) => {
  switch (type) {
    case roles.CUSTOMER:
      return keyRegisterCustomer;
    case roles.SHIPPER:
      return keyRegisterShipper;
    case roles.PARTNER:
      return keyRegisterPartner;
    default:
      return keyRegisterCustomer;
  }
};

export const getDefaultValues = (type: string) => {
  const keys = getKeys(type);
  let defaultValues: TObjectHasFlexibleKey = {};
  Object.values(keys).forEach((value) => {
    defaultValues = { ...defaultValues, [value]: '' };
  });

  return defaultValues;
};

export const checkEmptyField = (
  type: string,
  values: TObjectHasFlexibleKey,
  setError: (keyOfValue: string) => void,
) => {
  const keys = getKeys(type);
  let numFieldError = 0;
  Object.values(keys).forEach((keyOfValues) => {
    if (values[keyOfValues] === '') {
      setError(keyOfValues);
      numFieldError++;
    }
  });
  if (numFieldError === 0) {
    return true;
  } else {
    return false;
  }
};

export const checkConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    message.error('Password and confirm password are not the same');
    return false;
  } else {
    return true;
  }
};

export const getFunctionChangeInput = (
  type: string,
  setValue: (inputValue: string, key: string) => void,
  setError: (key: string) => void,
) => {
  const keys = getKeys(type);
  return (event: ChangeEvent<HTMLInputElement>, keyField: string) => {
    const inputValue = event.target.value;
    const isNationalId = 'NATIONAL_ID' in keys && keyField === keys.NATIONAL_ID;
    if (keyField === keys.PHONE || isNationalId) {
      if (REGEX_TEST_NUMBER.test(inputValue)) {
        setValue(inputValue, keyField);
      }
    } else {
      setValue(inputValue, keyField);
    }
    setError(keyField);
  };
};

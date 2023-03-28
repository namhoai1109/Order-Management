import { ChangeEvent, useState } from 'react';
import { keyRegisterCustomer } from './constants';
import { constantsSelect } from '@/constants/constants_select';

const defaultValues = {
  [keyRegisterCustomer.USERNAME]: '',
  [keyRegisterCustomer.PASSWORD]: '',
  [keyRegisterCustomer.CONFIRM_PASSWORD]: '',
  [keyRegisterCustomer.ADDRESS]: '',
  [keyRegisterCustomer.DISTRICT]: '',
  [keyRegisterCustomer.PHONE]: '',
  [keyRegisterCustomer.FULL_NAME]: '',
  [keyRegisterCustomer.PROVINCE]: '',
  [keyRegisterCustomer.EMAIL]: '',
};

const getProvinces = () => {
  return constantsSelect.DATA_PROVINCE.map((item) => {
    return {
      label: item.label,
      value: item.value,
    };
  });
};

const getDistricts = (province: string) => {
  const provinceSelected = constantsSelect.DATA_PROVINCE.find((item) => item.value === province);
  return provinceSelected?.district.map((item) => {
    return {
      label: item.label,
      value: item.value,
    };
  });
};

const useRegisterCustomer = () => {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: string }[]>([]);

  const checkEmptyField = () => {
    Object.values(keyRegisterCustomer).forEach((keyOfValues) => {
      if (values[keyOfValues] === '') {
        setError((prev) => ({
          ...prev,
          [keyOfValues]: 'error',
        }));
      }
    });
  };

  const setValueField = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const inputValue = event.target.value;
    if (key === keyRegisterCustomer.PHONE) {
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue)) {
        setValueField(key, inputValue);
      }
    } else {
      setValueField(key, inputValue);
    }
    setError({
      ...error,
      [key]: '',
    });
  };

  const handleChangeSelect = (value: string, key: string) => {
    setValueField(key, value);
    setError({
      ...error,
      [key]: '',
    });

    if (key === keyRegisterCustomer.PROVINCE) {
      setDistrictOptions(getDistricts(value) || []);
    }
  };

  const submitForm = () => {
    checkEmptyField();
  };

  return {
    values,
    handleChangeInput,
    handleChangeSelect,
    submitForm,
    getProvinces,
    districtOptions,
    error,
  };
};

export default useRegisterCustomer;

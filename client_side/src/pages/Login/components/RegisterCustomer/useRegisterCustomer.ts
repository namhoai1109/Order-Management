import { useState } from 'react';
import { keyRegisterCustomer } from './constants';
import { history } from '@umijs/max';
import { internalLink } from '@/constants/internal_link';
import {
  checkConfirmPassword,
  checkEmptyField,
  getDefaultValues,
  getFunctionChangeInput,
} from '@/utils/register_form';
import { roles } from '@/constants/roles';
import { useGetLocations } from '@/services/Location/services';
import { usePostSignUpCustomer } from '@/services/Login/services';
import { getDistricts, getDistrictsName, getProvinceName, getProvinces } from '@/utils/locations';

const useRegisterCustomer = () => {
  const responseAPI = useGetLocations();
  const locations = responseAPI.data?.result || [];

  const listProvinces = getProvinces(locations);

  const defaultValues = getDefaultValues(roles.CUSTOMER);
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [listDistrict, setListDistrict] = useState<OBJECT_TYPE.TDistrict[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const onOKModal = () => {
    history.replace(internalLink.LOGIN);
  };

  const setErrorField = (keyOfValues: string) => {
    setError((prev) => ({
      ...prev,
      [keyOfValues]: 'error',
    }));
  };

  const resetError = (key: string) => {
    setError({
      ...error,
      [key]: '',
    });
  };

  const setValueField = (value: string, key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeInput = getFunctionChangeInput(roles.CUSTOMER, setValueField, resetError);

  const handleChangeSelect = (value: string, key: string) => {
    setValueField(value, key);
    resetError(key);

    if (key === keyRegisterCustomer.PROVINCE) {
      setValueField('', keyRegisterCustomer.DISTRICT);
      setListDistrict(getDistricts(value, locations) || []);
    }
  };

  const submitFormSuccess = () => {
    setOpenModal(true);
  };
  const { mutate, isLoading } = usePostSignUpCustomer(submitFormSuccess);

  const submitForm = () => {
    if (checkEmptyField(roles.CUSTOMER, values, setErrorField)) {
      if (
        !checkConfirmPassword(
          values[keyRegisterCustomer.PASSWORD],
          values[keyRegisterCustomer.CONFIRM_PASSWORD],
        )
      ) {
        setErrorField(keyRegisterCustomer.CONFIRM_PASSWORD);
      } else {
        const provinceName = getProvinceName(locations, values[keyRegisterCustomer.PROVINCE]);
        const districtName = getDistrictsName(listDistrict, values[keyRegisterCustomer.DISTRICT]);
        const address = `${values[keyRegisterCustomer.ADDRESS]}, ${districtName}, ${provinceName}`;
        const formData: TFormSignUpCustomer = {
          email: values[keyRegisterCustomer.EMAIL],
          username: values[keyRegisterCustomer.USERNAME],
          password: values[keyRegisterCustomer.PASSWORD],
          phone: values[keyRegisterCustomer.PHONE],
          address: address,
          name: values[keyRegisterCustomer.FULL_NAME],
        };
        mutate(formData);
      }
    }
  };

  const cancelForm = () => {
    history.replace(internalLink.LOGIN);
  };

  return {
    values,
    handleChangeInput,
    handleChangeSelect,
    submitForm,
    listProvinces,
    listDistrict,
    cancelForm,
    error,
    openModal,
    onOKModal,
    isLoading,
  };
};

export default useRegisterCustomer;

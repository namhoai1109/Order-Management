import { useState } from 'react';
import { keyRegisterShipper } from './constants';
import { roles } from '@/constants/roles';
import {
  checkConfirmPassword,
  checkEmptyField,
  getDefaultValues,
  getFunctionChangeInput,
} from '@/utils/register_form';
import { history } from '@umijs/max';
import { internalLink } from '@/constants/internal_link';
import { useGetLocations } from '@/services/Location/services';
import { getDistricts, getDistrictsName, getProvinceName, getProvinces } from '@/utils/locations';
import { usePostSignUpShipper } from '@/services/Login/services';

const useRegisterShipper = () => {
  const responseAPI = useGetLocations();
  const locations = responseAPI.data?.result || [];
  const listProvince = getProvinces(locations);
  const [listDistrict, setListDistrict] = useState<OBJECT_TYPE.TDistrict[]>([]);

  const defaultValues = getDefaultValues(roles.SHIPPER);
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
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

  const handleChangeInput = getFunctionChangeInput(roles.SHIPPER, setValueField, resetError);

  const handleChangeSelect = (value: string, key: string) => {
    setValueField(value, key);
    resetError(key);

    if (key === keyRegisterShipper.PROVINCE) {
      setValueField('', keyRegisterShipper.DISTRICT);
      setListDistrict(getDistricts(value, locations) || []);
    }
  };
  const signUpShipperSuccess = () => {
    setOpenModal(true);
  };
  const { mutate, isLoading } = usePostSignUpShipper(signUpShipperSuccess);

  const submitForm = () => {
    if (checkEmptyField(roles.SHIPPER, values, setErrorField)) {
      const password = values[keyRegisterShipper.PASSWORD];
      const confirmPassword = values[keyRegisterShipper.CONFIRM_PASSWORD];
      if (!checkConfirmPassword(password, confirmPassword)) {
        setErrorField(keyRegisterShipper.CONFIRM_PASSWORD);
      } else {
        const provinceName = getProvinceName(locations, values[keyRegisterShipper.PROVINCE]);
        const districtName = getDistrictsName(listDistrict, values[keyRegisterShipper.DISTRICT]);
        const address = `${values[keyRegisterShipper.ADDRESS]}, ${districtName}, ${provinceName}`;
        const dataSubmit: TFormSignUpShipper = {
          name: values[keyRegisterShipper.FULL_NAME],
          username: values[keyRegisterShipper.USERNAME],
          password: values[keyRegisterShipper.PASSWORD],
          email: values[keyRegisterShipper.EMAIL],
          phone: values[keyRegisterShipper.PHONE],
          address,
          nationalId: values[keyRegisterShipper.NATIONAL_ID],
          licensePlate: values[keyRegisterShipper.LICENSE_PLATE],
          bankAccount: values[keyRegisterShipper.BANK_ACCOUNT],
          districtId: values[keyRegisterShipper.ACTIVE_AREA],
        };
        mutate(dataSubmit);
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
    cancelForm,
    error,
    listProvince,
    listDistrict,
    openModal,
    onOKModal,
    isLoading,
  };
};

export default useRegisterShipper;

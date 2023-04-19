import { roles } from '@/constants/roles';
import { useGetLocations } from '@/services/Location/services';
import { getDistricts, getProvinces } from '@/utils/locations';
import {
  checkConfirmPassword,
  checkEmptyField,
  getDefaultValues,
  getFunctionChangeInput,
} from '@/utils/register_form';
import { useState } from 'react';
import { keyRegisterPartner } from './constants';
import { usePostSignUpPartner } from '@/services/Login/services';
import { internalLink } from '@/constants/internal_link';
import { history } from '@umijs/max';

const defaultBranch: OBJECT_TYPE.TBranch = {
  address: '',
  districtId: -1,
};

const useRegisterPartner = () => {
  const responseAPI = useGetLocations();
  const locations = responseAPI.data?.result || [];
  const provinces = getProvinces(locations);

  const defaultValues = getDefaultValues(roles.PARTNER);
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [listDistrict, setListDistrict] = useState<OBJECT_TYPE.TDistrict[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [listBranches, setListBranches] = useState<OBJECT_TYPE.TBranch[]>([defaultBranch]);

  const deleteBranch = (indexBranch: number) => {
    const newListBranches = listBranches.filter((_, index) => index !== indexBranch);
    setListBranches(newListBranches);
  };

  const onChangeAddressBranch = (value: string, indexBranch: number) => {
    const changedBranch = listBranches[indexBranch];
    setIsSubmit(false);
    const newBranch = { ...changedBranch, address: value };
    const newListBranches = listBranches.map((branch, index) =>
      index === indexBranch ? newBranch : branch,
    );
    setListBranches(newListBranches);
  };

  const onChangeDistrictBranch = (value: number, indexBranch: number) => {
    setIsSubmit(false);
    const newListBranches = listBranches.map((branch, index) =>
      index === indexBranch ? { ...branch, districtId: value } : branch,
    );
    setListBranches(newListBranches);
  };

  const addBranch = () => {
    setListBranches([...listBranches, defaultBranch]);
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

  const handleChangeInput = getFunctionChangeInput(roles.PARTNER, setValueField, resetError);

  const handleChangeSelect = (value: string, key: string) => {
    setValueField(value, key);
    resetError(key);

    if (key === keyRegisterPartner.PROVINCE) {
      setListDistrict(getDistricts(value, locations) || []);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const onOKModal = () => {
    history.replace(internalLink.LOGIN);
  };

  const submitSuccess = () => {
    setOpenModal(true);
  };
  const { mutate, isLoading } = usePostSignUpPartner(submitSuccess);

  const onSubmit = () => {
    setIsSubmit(true);
    if (checkEmptyField(roles.PARTNER, values, setErrorField)) {
      const password = values[keyRegisterPartner.PASSWORD];
      const confirmPassword = values[keyRegisterPartner.CONFIRM_PASSWORD];
      if (!checkConfirmPassword(password, confirmPassword)) {
        setErrorField(keyRegisterPartner.CONFIRM_PASSWORD);
      } else {
        const dataSubmit: TFormSignUpPartner = {
          username: values[keyRegisterPartner.USERNAME],
          password: values[keyRegisterPartner.PASSWORD],
          email: values[keyRegisterPartner.EMAIL],
          phone: values[keyRegisterPartner.PHONE],
          representative: values[keyRegisterPartner.REPRESENTATIVE],
          brandName: values[keyRegisterPartner.BRAND_NAME],
          bankAccount: values[keyRegisterPartner.BANK_ACCOUNT],
          taxCode: values[keyRegisterPartner.TAX_CODE],
          culinaryStyle: values[keyRegisterPartner.CULINARY_STYLE],
          branches: listBranches,
        };
        mutate(dataSubmit);
      }
    }
  };

  return {
    provinces,
    values,
    error,
    listDistrict,
    listBranches,
    isSubmit,
    isLoading,
    openModal,
    onOKModal,
    deleteBranch,
    addBranch,
    onSubmit,
    onChangeAddressBranch,
    onChangeDistrictBranch,
    handleChangeInput,
    handleChangeSelect,
  };
};

export default useRegisterPartner;

import { usePostDish } from '@/services/Partner/services';
import { history } from '@umijs/max';
import { message, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import {
  DEFAULT_OPTION_VALUE,
  DEFAULT_PRICE_VALUE,
  DISH_DETAIL_FIELD,
  IMAGE_FIELD,
  keyAddDishPage,
} from './constants';

const DEFAULT_VALUE_FORM = {
  [keyAddDishPage.NAME]: '',
  [keyAddDishPage.DESCRIPTION]: '',
};

const useAddDishPage = () => {
  const [dataOptions, setDataOption] = useState<IOptionItem[]>([]);
  const [count, setCount] = useState(0);

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [values, setValues] = useState(DEFAULT_VALUE_FORM);
  const [error, setError] = useState(DEFAULT_VALUE_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ) => {
    if (type === keyAddDishPage.NAME) {
      setValues((prev) => ({ ...prev, name: e.target.value }));
      setError((prev) => ({ ...prev, name: '' }));
    } else if (type === keyAddDishPage.DESCRIPTION) {
      setValues((prev) => ({ ...prev, description: e.target.value }));
      setError((prev) => ({ ...prev, description: '' }));
    } else {
      setValues((prev) => prev);
    }
  };

  const propsDragger: UploadProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        setFileList(info.fileList);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataOptions.filter((item) => item.key !== key);
    setDataOption(newData);
  };

  const handleAdd = () => {
    const newData: IOptionItem = {
      key: count,
      option: DEFAULT_OPTION_VALUE,
      price: DEFAULT_PRICE_VALUE,
      quantity: 0,
    };
    setDataOption([...dataOptions, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: IOptionItem) => {
    const newData = [...dataOptions];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataOption(newData);
  };

  const handleBack = () => {
    history.back();
  };

  const [validateTable, setValidateTable] = useState(false);

  const resetValidationTable = () => {
    setValidateTable(false);
  };
  const validateForm = () => {
    let numFieldError = 0;
    setValidateTable(true);

    if (fileList.length === 0) {
      message.error('Please upload at least one image !');
      numFieldError++;
    }

    if (dataOptions.length === 0) {
      message.error('Please add at least one option !');
      numFieldError++;
    }
    if (numFieldError === 0) {
      return true;
    } else {
      return false;
    }
  };

  const getDataForm = () => {
    const formData = new FormData();
    formData.append(keyAddDishPage.NAME, values[keyAddDishPage.NAME]);
    formData.append(keyAddDishPage.DESCRIPTION, values[keyAddDishPage.DESCRIPTION]);
    const mapOption = dataOptions.map((item) => {
      return {
        name: item.option,
        price: Number(item.price),
        quantity: Number(item.quantity),
      };
    });
    formData.append(DISH_DETAIL_FIELD, JSON.stringify(mapOption));

    fileList.forEach((file) => {
      formData.append(IMAGE_FIELD, file.originFileObj as Blob);
    });

    return formData;
  };

  const { mutate, isLoading } = usePostDish();

  const handleSubmit = () => {
    if (validateForm()) {
      mutate(getDataForm());
    }
  };

  return {
    dataOptions,
    propsDragger,
    values,
    error,
    isLoading,
    handleSubmit,
    handleChange,
    handleDelete,
    handleBack,
    handleAdd,
    handleSave,
    validateTable,
    resetValidationTable,
  };
};

export default useAddDishPage;

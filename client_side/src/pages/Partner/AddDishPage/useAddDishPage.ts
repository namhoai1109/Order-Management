import { REGEX_TEST_NUMBER, getDefaultValues } from '@/utils/register_form';
import { history } from '@umijs/max';
import { UploadFile, UploadProps, message } from 'antd';
import { useState } from 'react';
import { DEFAULT_OPTION_VALUE, DEFAULT_PRICE_VALUE, keyAddDishPage } from './constants';

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

  const validateForm = () => {
    let numFieldError = 0;
    Object.values(keyAddDishPage).forEach((keyOfValues) => {
      if (values[keyOfValues] === '') {
        setError((prev) => ({ ...prev, [keyOfValues]: 'error' }));
        numFieldError++;
      }
    });

    if (fileList.length === 0) {
      message.error('Please upload at least one image !');
      numFieldError++;
    }

    if (dataOptions.length !== 0) {
      dataOptions.forEach((item) => {
        if (item.option === '' || item.option === DEFAULT_OPTION_VALUE) {
          message.error('Please fill in all options !');
          numFieldError++;
        }
        if (item.price === '' || item.price === DEFAULT_PRICE_VALUE) {
          message.error('Please fill in all prices !');
          numFieldError++;
        } else {
          if (REGEX_TEST_NUMBER.test(item.price) === false) {
            message.error('Please enter a valid price !');
            numFieldError++;
          }
        }
      });
    }
    if (numFieldError === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
    }
  };

  return {
    dataOptions,
    propsDragger,
    values,
    error,
    handleSubmit,
    handleChange,
    handleDelete,
    handleBack,
    handleAdd,
    handleSave,
  };
};

export default useAddDishPage;

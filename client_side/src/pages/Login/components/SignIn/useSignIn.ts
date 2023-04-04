import { componentStatus } from '@/constants/component_status';
import { usePostSignIn } from '@/services/Login/services';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { useState } from 'react';

type TValueValidate = {
  username: InputStatus;
  password: InputStatus;
};

const DEFAULT_VALUE_VALIDATE: TValueValidate = {
  username: '',
  password: '',
};

const useSignIn = () => {
  const [formSignIn, setFormSignIn] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<TValueValidate>(DEFAULT_VALUE_VALIDATE);

  const { mutate, isLoading } = usePostSignIn(formSignIn.username, formSignIn.password);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignIn({
      ...formSignIn,
      username: event.target.value,
    });
    setError({
      ...error,
      username: '',
    });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignIn({
      ...formSignIn,
      password: event.target.value,
    });
    setError({
      ...error,
      password: '',
    });
  };

  const handleSubmit = () => {
    const validate = { ...DEFAULT_VALUE_VALIDATE };
    if (!formSignIn.username) {
      validate.username = componentStatus.ERROR;
    }
    if (!formSignIn.password) {
      validate.password = componentStatus.ERROR;
    }

    setError(validate);
    if (formSignIn.username && formSignIn.password) {
      mutate();
    }
  };

  return { formSignIn, error, isLoading, handleChangeUsername, handleChangePassword, handleSubmit };
};

export default useSignIn;

import { Input, InputProps } from 'antd';
import './InputField.less';

interface IInputFieldProps extends InputProps {
  icon: React.ReactNode;
  type?: string;
}

const getInputField = (props: IInputFieldProps) => {
  const { type, ...restProps } = props;
  switch (type) {
    case 'password':
      return <Input.Password className="input-field" {...restProps} />;
    default:
      return <Input className="input-field" {...restProps} />;
  }
};

const InputField: React.FC<IInputFieldProps> = (props) => {
  return (
    <div className="wrap-input-field flex-center">
      <span className="icon">{props.icon}</span>
      {getInputField({ ...props })}
    </div>
  );
};

export default InputField;

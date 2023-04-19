import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { CoffeeOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputRef,
  Popconfirm,
  Row,
  Table,
  Upload,
} from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { createContext, useContext, useRef, useState } from 'react';
import './AddDishPage.less';
import {
  DEFAULT_OPTION_VALUE,
  DEFAULT_PRICE_VALUE,
  DEFAULT_QUANTITY_VALUE,
  keyAddDishPage,
  optionFields,
} from './constants';
import useAddDishPage from './useAddDishPage';

const EditableContext = createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<IEditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<IEditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  validateTable,
  resetValidationTable,
  ...restProps
}) => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const save = () => {
    handleSave({ ...record, [dataIndex]: value });
    resetValidationTable();
  };

  const form = useContext(EditableContext)!;
  if (validateTable) {
    form.validateFields();
  }

  let placeholder = '';
  switch (dataIndex) {
    case optionFields.OPTION:
      placeholder = DEFAULT_OPTION_VALUE;
      break;
    case optionFields.PRICE:
      placeholder = DEFAULT_PRICE_VALUE;
      break;
    case optionFields.QUANTITY:
      placeholder = DEFAULT_QUANTITY_VALUE;
      break;
    default:
      break;
  }

  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={save}
        />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

const getDefaultColumns = (
  lengthDataSource: number,
  onDelete: (key: React.Key) => void,
): (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[] => {
  return [
    {
      title: 'Option',
      dataIndex: 'option',
      editable: true,
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
      width: '30%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true,
      width: '30%',
    },
    {
      title: '',
      dataIndex: '',
      render: (_: any, record: { key: React.Key }) =>
        lengthDataSource >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.key)}>
            <Button type={componentType.LINK}>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];
};

const getColumns = (
  lengthDataSource: number,
  onDelete: (key: React.Key) => void,
  handleSave: (row: IOptionItem) => void,
  validateTable: boolean,
  resetValidationTable: TCallbackVoid,
) => {
  const defaultCols = getDefaultColumns(lengthDataSource, onDelete);
  return defaultCols.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IOptionItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        validateTable,
        resetValidationTable,
      }),
    };
  });
};

const AddDishPage: React.FC = () => {
  const {
    dataOptions,
    propsDragger,
    values,
    error,
    handleChange,
    handleDelete,
    handleAdd,
    handleSave,
    handleBack,
    handleSubmit,
    isLoading,
    validateTable,
    resetValidationTable,
  } = useAddDishPage();
  const columns = getColumns(
    dataOptions.length,
    handleDelete,
    handleSave,
    validateTable,
    resetValidationTable,
  );
  return (
    <div className="wrap-add-dish">
      <Form autoComplete="off">
        <Row gutter={dimensions.GUTTERS_16}>
          <Col span={dimensions.SPAN_12}>
            <Row justify={componentMode.START}>
              <Form.Item
                name="dishName"
                rules={[
                  {
                    required: true,
                    message: 'Dish name is required.',
                  },
                ]}
              >
                <InputField
                  placeholder="dish name"
                  value={values.name}
                  status={error[keyAddDishPage.NAME] as InputStatus}
                  onChange={(eventChange) => handleChange(eventChange, keyAddDishPage.NAME)}
                  icon={<CoffeeOutlined className="icon-dish-name-field" />}
                />
              </Form.Item>
            </Row>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Description is required.',
                },
              ]}
            >
              <Input.TextArea
                className="description-dish-field"
                placeholder="How is your dish ?"
                showCount
                allowClear
                status={error[keyAddDishPage.DESCRIPTION] as InputStatus}
                value={values.description}
                onChange={(eventChange) => handleChange(eventChange, keyAddDishPage.DESCRIPTION)}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Upload.Dragger {...propsDragger} className="dragger-image-dish">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data
                or other banned files.
              </p>
            </Upload.Dragger>
          </Col>
          <Col span={dimensions.SPAN_12}>
            <Button onClick={handleAdd} type="primary" className="new-size-price-field">
              new option
            </Button>
            <Table
              pagination={false}
              components={components}
              bordered
              dataSource={dataOptions}
              columns={columns as ColumnTypes}
            />
          </Col>
        </Row>
        <div className="wrap-buttons flex-center">
          <Popconfirm title="Sure to cancel?" onConfirm={handleBack}>
            <Button className="button">cancel</Button>
          </Popconfirm>
          <Form.Item>
            <Button
              loading={isLoading}
              className="button"
              type={componentType.PRIMARY}
              onClick={handleSubmit}
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddDishPage;

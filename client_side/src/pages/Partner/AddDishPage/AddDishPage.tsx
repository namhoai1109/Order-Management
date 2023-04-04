import InputField from '@/components/InputField/InputField';
import { componentMode } from '@/constants/component_mode';
import { componentType } from '@/constants/component_type';
import dimensions from '@/constants/dimensions';
import { CoffeeOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputRef,
  message,
  Popconfirm,
  Row,
  Table,
  Upload,
} from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import './AddDishPage.less';
import { keyAddDishPage } from './constants';
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
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: '' });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      message.error(('Save failed:' + errInfo) as string);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
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
      title: 'option',
      dataIndex: 'option',
      editable: true,
      width: '40%',
    },
    {
      title: 'price',
      dataIndex: 'price',
      editable: true,
      width: '40%',
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
  } = useAddDishPage();
  const columns = getColumns(dataOptions.length, handleDelete, handleSave);
  return (
    <div className="wrap-add-dish">
      <Card className="card-add-dish-page">
        <div className="wrap-buttons flex-center">
          <Popconfirm title="Sure to cancel?" onConfirm={handleBack}>
            <Button className="button">cancel</Button>
          </Popconfirm>
          <Button className="button" type={componentType.PRIMARY} onClick={handleSubmit}>
            Save
          </Button>
        </div>
        <Row gutter={dimensions.GUTTERS_16}>
          <Col span={dimensions.SPAN_12}>
            <Row justify={componentMode.START}>
              <InputField
                placeholder="dish name"
                value={values.name}
                status={error[keyAddDishPage.NAME] as InputStatus}
                onChange={(eventChange) => handleChange(eventChange, keyAddDishPage.NAME)}
                icon={<CoffeeOutlined className="icon-dish-name-field" />}
              />
            </Row>
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
      </Card>
    </div>
  );
};

export default AddDishPage;

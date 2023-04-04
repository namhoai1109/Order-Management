interface IOptionItem {
  key: React.Key;
  option: string;
  price: string;
}

interface IEditableRowProps {
  index: number;
}

interface IEditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IOptionItem;
  record: IOptionItem;
  handleSave: (record: IOptionItem) => void;
}

type IEditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<IEditableTableProps['columns'], undefined>;

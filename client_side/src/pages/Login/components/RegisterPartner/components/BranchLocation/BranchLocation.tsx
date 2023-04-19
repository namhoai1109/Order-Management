import { DeleteOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import './BranchLocation.less';

type TBranchLocationProps = {
  listDistrict: OBJECT_TYPE.TDistrict[];
  deleteBranch: (indexBranch: number) => void;
  onChangeAddressBranch: (value: string, indexBranch: number) => void;
  onChangeDistrictBranch: (value: number, indexBranch: number) => void;
  indexBranch: number;
  address: string;
  districtId: number;
  isSubmit: boolean;
};

const defaultValueSelect = undefined;

const BranchLocation: React.FC<TBranchLocationProps> = ({
  listDistrict,
  indexBranch,
  deleteBranch,
  onChangeDistrictBranch,
  onChangeAddressBranch,
  address,
  districtId,
  isSubmit,
}) => {
  const isFirstBranch = indexBranch === 0;
  const deleteFn = isFirstBranch ? () => {} : () => deleteBranch(indexBranch);
  return (
    <div className="wrap-branch-location flex-center">
      <span className="index-branch">{`branch ${indexBranch}`}</span>
      <Select
        className="select"
        placeholder="district"
        options={listDistrict}
        status={isSubmit && districtId < 0 ? 'error' : undefined}
        onChange={(value) => onChangeDistrictBranch(Number(value), indexBranch)}
      />
      <Input
        placeholder="branch address"
        className="input"
        value={address}
        status={isSubmit && address === '' ? 'error' : undefined}
        onChange={(event) => onChangeAddressBranch(event.target.value, indexBranch)}
      />
      <span className={`delete-btn ${isFirstBranch ? 'disable' : ''}`} onClick={deleteFn}>
        <DeleteOutlined />
      </span>
    </div>
  );
};

export default BranchLocation;

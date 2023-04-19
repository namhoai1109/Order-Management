import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './BackButton.less';

function BackButton() {
  return (
    <Button
      onClick={() => {
        history.back();
      }}
      className="back-btn"
    >
      <LeftOutlined />
    </Button>
  );
}

export default BackButton;

import { componentType } from '@/constants/component_type';
import { Button, Modal } from 'antd';

interface IModalSubmit {
  open: boolean;
  onOKModal: () => void;
  message: string;
}

const ModalSubmit: React.FC<IModalSubmit> = ({ open, onOKModal, message }) => {
  return (
    <Modal
      open={open}
      closable={false}
      footer={
        <Button onClick={onOKModal} type={componentType.PRIMARY}>
          OK
        </Button>
      }
    >
      {message}
    </Modal>
  );
};

export default ModalSubmit;

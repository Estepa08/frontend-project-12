import { Modal, Button, Typography } from 'antd';

const { Text } = Typography;

const RemoveChannelModal = ({ isOpen, onClose, onConfirm, isLoading }) => (
  <Modal title="Удалить канал" open={isOpen} onCancel={onClose} footer={null}>
    <Text>Вы уверены? Это действие необратимо.</Text>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
      <Button onClick={onClose} disabled={isLoading}>
        Отмена
      </Button>
      <Button danger type="primary" onClick={onConfirm} loading={isLoading}>
        Удалить
      </Button>
    </div>
  </Modal>
);

export default RemoveChannelModal;

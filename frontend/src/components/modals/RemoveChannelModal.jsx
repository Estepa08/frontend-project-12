import { Modal, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const RemoveChannelModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const { t } = useTranslation();

  return (
    <Modal title={t('channels.removeTitle')} open={isOpen} onCancel={onClose} footer={null}>
      <Text>{t('channels.removeConfirm')}</Text>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        <Button onClick={onClose} disabled={isLoading}>
          {t('channels.cancel')}
        </Button>
        <Button danger type="primary" onClick={onConfirm} loading={isLoading}>
          {t('channels.removeSubmit')}
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveChannelModal;

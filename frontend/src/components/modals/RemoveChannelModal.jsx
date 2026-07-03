// frontend/src/components/modals/RemoveChannelModal.jsx
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.removeTitle')}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p>{t('channels.removeConfirm')}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              {t('channels.cancel')}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {t('channels.removeSubmit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveChannelModal;
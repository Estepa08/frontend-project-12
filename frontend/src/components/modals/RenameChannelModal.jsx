// frontend/src/components/modals/RenameChannelModal.jsx
import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const RenameChannelModal = ({ isOpen, onClose, onSubmit, existingNames, currentName, isLoading }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('validation.channelNameLength'))
      .max(20, t('validation.channelNameLength'))
      .notOneOf(
        existingNames.filter((n) => n !== currentName),
        t('validation.channelNameUnique')
      )
      .required(t('validation.required')),
  });

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.renameTitle')}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <Formik
            initialValues={{ name: currentName || '' }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              await onSubmit(values.name.trim());
              setSubmitting(false);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="visually-hidden" htmlFor="channelRename">
                      {t('channels.newChannelName')}
                    </label>
                    <Field
                      id="channelRename"
                      name="name"
                      innerRef={inputRef}
                      className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                      disabled={isLoading || isSubmitting}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                    disabled={isLoading || isSubmitting}
                  >
                    {t('channels.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading || isSubmitting}
                  >
                    {t('channels.renameSubmit')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RenameChannelModal;
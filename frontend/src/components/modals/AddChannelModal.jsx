import { useEffect, useRef } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const AddChannelModal = ({ isOpen, onClose, onSubmit, existingNames, isLoading }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('validation.channelNameLength'))
      .max(20, t('validation.channelNameLength'))
      .notOneOf(existingNames, t('validation.channelNameUnique'))
      .required(t('validation.required')),
  });

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  return (
    <Modal
      title={t('channels.addTitle')}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values.name.trim());
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Form.Item
              validateStatus={errors.name && touched.name ? 'error' : ''}
              help={touched.name && errors.name}
              label={t('channels.channelName')}
            >
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    ref={inputRef}
                    placeholder={t('channels.channelPlaceholder')}
                    disabled={isLoading || isSubmitting}
                  />
                )}
              </Field>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button onClick={onClose} disabled={isLoading || isSubmitting}>
                {t('channels.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading || isSubmitting}>
                {t('channels.addSubmit')}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;

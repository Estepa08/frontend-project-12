import { useEffect, useRef } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = (existingNames) =>
  Yup.object({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(existingNames, 'Такой канал уже существует')
      .required('Обязательное поле'),
  });

const AddChannelModal = ({ isOpen, onClose, onSubmit, existingNames, isLoading }) => {
  const inputRef = useRef(null);

  // Автофокус при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <Modal title="Добавить канал" open={isOpen} onCancel={onClose} footer={null} destroyOnHidden>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema(existingNames)}
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
              label="Имя канала"
            >
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    ref={inputRef}
                    placeholder="Введите имя канала"
                    disabled={isLoading || isSubmitting}
                  />
                )}
              </Field>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button onClick={onClose} disabled={isLoading || isSubmitting}>
                Отмена
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading || isSubmitting}>
                Добавить
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;

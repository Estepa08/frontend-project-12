// frontend/src/components/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { Button, Layout, Typography, Card, Space } from 'antd';
import { MessageOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import styles from './HomePage.module.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        {/* Заголовок */}
        <div className={styles.header}>
          <MessageOutlined className={styles.icon} />
          <Title level={1} className={styles.title}>
            Добро пожаловать в чат!
          </Title>
          <Paragraph className={styles.subtitle}>Общайтесь с друзьями в реальном времени</Paragraph>
        </div>

        {/* Карточка */}
        <Card className={styles.card}>
          <Space direction="vertical" size="middle" className={styles.fullWidth}>
            <Link to="/login" className={styles.fullWidth}>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                block
                size="large"
                className={styles.button}
              >
                Войти в аккаунт
              </Button>
            </Link>

            <Link to="/signup" className={styles.fullWidth}>
              <Button icon={<UserAddOutlined />} block size="large" className={styles.button}>
                Регистрация
              </Button>
            </Link>

            <div className={styles.divider}>
              <Link to="/chat">
                <Button type="link" icon={<MessageOutlined />} className={styles.guestButton}>
                  Перейти в чат как гость
                </Button>
              </Link>
            </div>
          </Space>
        </Card>

        <Paragraph className={styles.footer}>
          Присоединяйтесь к сообществу и начинайте общаться прямо сейчас!
        </Paragraph>
      </Content>
    </Layout>
  );
};

export default HomePage;

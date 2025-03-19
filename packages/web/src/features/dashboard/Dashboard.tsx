import { Button, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const { Header, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      {/* Header */}
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img
            alt="Excel logo"
            loading="lazy"
            width="40"
            height="40"
            decoding="async"
            src="https://www.microsoft.com/en-us/microsoft-365/blog/wp-content/uploads/sites/2/2019/09/Excel_150x150.png"
          />
          <Typography.Title level={3} className={styles.headerTitle}>
            Microsoft Excel
          </Typography.Title>
        </div>
      </Header>
      
      {/* Content */}
      <Content className={styles.content}>
        <div className={styles.dashboardContainer}>
          <Typography.Title className={styles.mainTitle} level={2}>
            Welcome to Excel
          </Typography.Title>
          <Typography.Title className={styles.subTitle} level={4}>
            Create, edit, and manage your spreadsheets with ease.
          </Typography.Title>
          
          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <Button type="primary" className={styles.actionButton} onClick={() => navigate('/new-workbook')}>
              Create Workbook
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export { Dashboard };
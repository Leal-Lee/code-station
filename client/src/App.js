
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import { Layout, ConfigProvider, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Outlet } from 'react-router-dom'
import "./css/App.css";
import './global.less'
import LoginForm from './components/LoginForm';
import { useEffect, useState } from 'react';
import { getInfo,getUserById } from './api/user'
import { changeLoginStatus, initUserInfo } from './redux/userSlice';
import { useDispatch } from 'react-redux';
const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch=useDispatch()
  useEffect(() => {
    async function fetchData() {
      const result = await getInfo()
      if (result.data) {
        // 有效
       const  {data}= await getUserById(result.data._id)
        dispatch(initUserInfo(data))
        dispatch(changeLoginStatus(true))
      } else {
        message.warning(result.msg)
        localStorage.removeItem('userToken')
      }

    }

    if (localStorage.getItem('userToken')) {
      fetchData()
    }

  })
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ConfigProvider
      locale={zhCN}
    >
      <div className="App">

        <Layout>
          <Header>
            <NavHeader showModal={showModal} />
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer className='footer'>
            <PageFooter />
          </Footer>

          <LoginForm

            handleOk={handleOk}
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
          />
        </Layout>
      </div>
    </ConfigProvider >
  );
}

export default App;

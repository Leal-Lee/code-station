/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { NavLink } from 'react-router-dom'
import  LoginAvatar from '../LoginAvatar'
// import { CopyOutlined } from '@ant-design/icons';
import {

  Input,
  Select,
} from 'antd';

const { Option } = Select;
const { Search } = Input;
const selectBefore = (
  <Select defaultValue="issue" size='large' style={{ background: '#ffffff', borderRadius: '8px 0 0 8px' }} >
    <Option value="issue">问答</Option>
    <Option value="book">书籍</Option>
  </Select >)


export default function NavHeader(props) {
  function loginHandle(){
  props.showModal()

  }
  return (
    <div className='headerContainer'>
      {/* LOGO */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 导航 */}
      <nav className="navContainer">
        <NavLink to='/' className='navgation'>问答</NavLink>
        <NavLink to='/books' className='navgation'>书籍</NavLink>
        <NavLink to='/interviews' className='navgation'>面试题</NavLink>
        <a href='https://ke.qq.com/' className='navgation' target='_blank' >视频教程</a>

      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Input.Group compact >

          <Search placeholder="请输入要搜索的内容" allowClear  addonBefore={selectBefore} enterButton='搜索' size='large'  style={{ width:"100%" }} />
           
        </Input.Group>
      </div>
      {/* 登录 */}
    <div className="loginBtnContainer">
      <LoginAvatar type='primary' size='large' loginHandle={loginHandle }>注册/登录</LoginAvatar>
    </div>

    </div>

  )
}

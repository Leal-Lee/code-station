import React from 'react'
import {useSelector} from 'react-redux'
import {
    Avatar,
    Button, List, Popover,Image
  } from 'antd';
import stytle from '../../css/LoginAvatar.module.css'
import {clearUserInfo,changeLoginStatus} from '../../redux/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function LoginAvatar(props) {
    const {isLogin,userInfo} =useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navgiate=useNavigate();
    let loginStatus= null;
    function listClickHandle(item){
      if(item==='个人中心'){

      }else{
        localStorage.removeItem('userToken')
        dispatch(changeLoginStatus(false))
        dispatch(clearUserInfo())
        navgiate('/')
      }
     
    }
    const data = [
        '个人中心',
        '退出登录',

      ];
    if(isLogin){
      const  list=(

            <List
            dataSource={data}
            renderItem={(item) => (
                
              <List.Item style={{cursor:'pointer'}} onClick={()=>{
                listClickHandle(item)
              }}>
                {item}
              </List.Item>
            )}
          />
        )


        loginStatus=(
            <Popover content={list} placement="bottom" trigger="hover" >
                <div className={stytle.avatarContainer}>
                    <Avatar src={<Image preview={false} src={userInfo?.avatar}/>}    />
                </div>
            </Popover>
        )
    }else{
        // 未登录
        loginStatus=  (<Button 
            type='primary' 
            size='large' 
            onClick={props.loginHandle}
        
        >登录/注册</Button>)
    }
  

  return (
    <div>{loginStatus}</div>
  )
}

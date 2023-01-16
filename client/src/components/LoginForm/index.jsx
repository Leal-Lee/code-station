import React, { useState, useEffect,useRef } from 'react'
import { Modal, Radio, Button, Checkbox, Form, Input,Row,Col, message } from 'antd';
import styles from '../../css/LoginForm.module.css'
import {getCaptcha,userIsExist,addUser,loginUser,getUserById} from "../../api/user"
import { initUserInfo,changeLoginStatus } from '../../redux/userSlice';
import {useDispatch} from'react-redux'
export default function LoginForm(props) {

    // const onFinish = (values) => {
    //     console.log('Received values of form: ', values);
    // };
   
    const loginFormRef = useRef();
    const registerFormRef = useRef();
    const dispatch= useDispatch();
    // 登录表单的状态数据
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });
    // 注册表单的状态数据
    const [registerInfo, setRegisterInfo] = useState({
        loginId : "",
        nickname : "",
        captcha: "",
    })

    const [captcha, setCaptcha] = useState(null);

    const [value, setValue] = useState(null)

    useEffect( () => {
        
        captchaClickHandle()
      
    },[props.isModalOpen])


    // function handleOk() {
    //     console.log(2)
    //  }


    // 点击刷新验证码
    async function captchaClickHandle(){
        const result = await getCaptcha();
        setCaptcha(result);
    }
    // 验证登录账号是否存在
    async function checkLoginIdIsExist(){
        if(registerInfo.loginId){
            const data=  await userIsExist(registerInfo.loginId)
           
            if(data.data){
                return Promise.reject('该用账号已存在')
            }
        }

    }
    // 登录逻辑
 async   function loginHandle() {
        const result=await loginUser(loginInfo)
       
        if(result.data){
            // 验证码正确
            const data=result.data
            if(!data.data){
                // 账号密码不正确
                message.warning('账号密码不正确')
               
                captchaClickHandle()
            }else if(!data.data.enabled){
                // 账号被禁用
                message.warning('此账号被禁用,请联系管理员')
                captchaClickHandle()
            }else{
                // 账号密码正确
                // 存储token
        
                localStorage.userToken=data.token
        
                // 将用户信息存到仓库中
                const result =await getUserById(data.data._id)
              
                dispatch(initUserInfo(result.data))
                dispatch(changeLoginStatus(true))

                handleCancel()
            }

        }else{
            message.warning(result.msg)
            captchaClickHandle()
        }
     }
    // 关闭窗口，清空缓存
    function handleCancel(){
        setRegisterInfo({
            loginId :"",
            nickname :"",
            captcha: "",
        })
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false
        })
        console.log(registerInfo)
        props.handleOk()
    }
        //注册逻辑
   async function registerHandle(){
      const data=  await addUser(registerInfo)
      console.log(data)
     if(data.data){
        message.success('注册成功，默认密码为123456')
        dispatch(initUserInfo(data.data))
        dispatch(changeLoginStatus(true))
        handleCancel()
     }else{
        message.warning(data.msg)
     }
    }


    /**
     * @param {*} oldInfo 之前整体的状态
     * @param {*} newContent 用户输入的新的内容
     * @param {*} key 对应的键名
     * @param {*} setInfo 修改状态值的函数
     */
    function updateInfo(oldInfo, newContent, key, setInfo) {
        const obj = { ...oldInfo };
        obj[key] = newContent;
        setInfo(obj);
    }


    const login = (
        <div className={styles.container}>
            <Form
                name="basic1"
                autoComplete="off"
                onFinish={loginHandle}
                ref={loginFormRef}
                key={'login'}
            >
                <Form.Item
                    label="登录账号"
                    name="loginId"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号",
                        },
                    ]}
                >
                    <Input
                        placeholder="请输入你的登录账号"
                        value={loginInfo.loginId}
                        onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                    />
                </Form.Item>

                <Form.Item
                    label="登录密码"
                    name="loginPwd"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="请输入你的登录密码，新用户默认为123456"
                        value={loginInfo.loginPwd}
                        onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                    />
                </Form.Item>

                {/* 验证码 */}
                <Form.Item
                    name="logincaptcha"
                    label="验证码"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Row align="middle">
                        <Col span={16}>
                            <Input
                                placeholder="请输入验证码"
                                value={loginInfo.captcha}
                                onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                            />
                        </Col>
                        <Col span={6}>
                            <div
                                className={styles.captchaImg}
                                onClick={captchaClickHandle}
                                dangerouslySetInnerHTML={{ __html: captcha }}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="remember"
                    wrapperCol={{
                        offset: 5,
                        span: 16,
                    }}
                >
                    <Checkbox
                        onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                        checked={loginInfo.remember}
                    >记住我</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 20 }}
                    >
                        登录
                    </Button>
                    <Button type="primary" htmlType="submit">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    const register= (
        <div className={styles.container}>
        <Form
            name="basic2"
            autoComplete="off"
            ref={registerFormRef}
            onFinish={registerHandle}
            key={'register'}
        >
            <Form.Item
                label="登录账号"
                name="loginId"
                rules={[
                    {
                        required: true,
                        message: "请输入账号，仅此项为必填项",
                    },
                    // 验证用户是否已经存在
                    { validator: checkLoginIdIsExist },
                ]}
                validateTrigger='onBlur'
            >
                <Input
                    placeholder="请输入账号"
                    value={registerInfo.loginId}
                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                />
            </Form.Item>

            <Form.Item
                label="用户昵称"
                name="nickname"
            >
                <Input
                    placeholder="请输入昵称，不填写默认为新用户xxx"
                    value={registerInfo.nickname}
                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                />
            </Form.Item>

            <Form.Item
                name="registercaptcha"
                label="验证码"
                rules={[
                    {
                        required: true,
                        message: '请输入验证码',
                    },
                ]}
            >
                <Row align="middle">
                    <Col span={16}>
                        <Input
                            placeholder="请输入验证码"
                            value={registerInfo.captcha}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                        />
                    </Col>
                    <Col span={6}>
                        <div
                            className={styles.captchaImg}
                            onClick={captchaClickHandle}
                            dangerouslySetInnerHTML={{ __html: captcha }}
                        ></div>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 16,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 20 }}
                >
                    注册
                </Button>
                <Button type="primary" htmlType="submit">
                    重置
                </Button>
            </Form.Item>
        </Form>
    </div>
    );





// 处理切换
function handleChange(e){
     captchaClickHandle();
     setValue(e.target.value)

}

let container=null
if (value ==='register') {
   container=register
} else {
    container=login
} 


return (
    <div>
        <Modal title="登录/注册" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>


            <Radio.Group defaultValue="login" buttonStyle="solid" className={styles.radioGroup} onChange={handleChange}>
                <Radio.Button className={styles.radioButton} value='login'>登录</Radio.Button>
                <Radio.Button className={styles.radioButton} value='register'>注册</Radio.Button>
            </Radio.Group>

            { container }
            
        </Modal>
    </div>
)
}

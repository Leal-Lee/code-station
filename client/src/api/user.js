import request from './request'
// 验证码
export function getCaptcha(){
const result= request({
    url:"/res/captcha",
    method:'GET'
 })

 return  result
}

// 用户是否存在
export function userIsExist(loginId){
  return  request({
    url:`/api/user/userIsExist/${loginId}`,
    method:'GET'
 })}



// 注册
 export function addUser(userInfo){
  return  request({
    url:`/api/user/`,
    method:'POST',
    data:userInfo
 })}

// 登录

 export function loginUser(loginInfo){
  return  request({
    url:`/api/user/login`,
    method:'POST',
    data:loginInfo
 })}


//获取信息，验证
 export function getUserById(id){
  return  request({
    url:`/api/user/${id}`,
    method:'get',
    
 })}
 //whoImi

 export function getInfo(){
  return  request({
    url:`/api/user/whoami`,
    method:'get',
    
 })}
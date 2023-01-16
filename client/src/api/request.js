import axios from 'axios'

const service=axios.create({
    timeout:5000
})


service.interceptors.request.use((config)=>{
    // 获取token
    const token=localStorage.getItem('userToken')

    if(token){
        config.headers['Authorization']=`Bearer ${token}`
    }
return config
},(err)=>{
    console.log('请求拦截错误',err)	
    
})



service.interceptors.response.use((res)=>{

return res.data
},(err)=>{
    console.log('响应拦截错误',err)
})
export default service
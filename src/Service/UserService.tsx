
import axiosInstance from "../Interceptor/AxiosInterceptor"

const signupUser= async(user: any)=>{
    return axiosInstance.post('/user/signup', user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error;})
}

const signinUser= async(user: any)=>{
    return axiosInstance.post('/user/signin', user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error;})
}

export {signupUser, signinUser};
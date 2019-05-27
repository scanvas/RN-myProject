

import axios from 'axios'
import { Alert } from 'react-native'
//请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 添加响应头等等设置
    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6IntcImlkXCI6MzIsXCJjb21wYW55SWRcIjoxLFwidXNlcm5hbWVcIjpcIuiDoemcslwiLFwicGhvbmVcIjpcIjEzNDc2MTg5NjI2XCIsXCJjb2RlXCI6bnVsbCxcImNvbXBhbnlOYW1lXCI6bnVsbCxcInR5cGVcIjpudWxsLFwic2VydmljZUNvbXBhbnlOYW1lXCI6bnVsbH0iLCJjb2RlIjoyMDAsInVzZXJfbmFtZSI6IjEzNDc2MTg5NjI2Iiwic2NvcGUiOlsid2ViYXBwIl0sImV4cCI6MTU1ODcwMzkyOSwiYXV0aG9yaXRpZXMiOlsiMSJdLCJqdGkiOiIwYzc0ZDBhYy0wYjhmLTQ4MDktYWQ2Zi1hNWVmNjQ5Yjg0ZTAiLCJjbGllbnRfaWQiOiJ6aGFvbGFvYmFvIn0.fbZROeQlaaadv_3wajhm9cGWxtZBt1xmPBo58D2D52M'
    return config
  },
  function(error) {
    return Promise.reject(error) // 请求出错
  }
)

//返回拦截器
axios.interceptors.response.use(
  function(response) {
    if (!response.data) {
      // 服务端出现了一些问题的情况下
      Alert.alert('温馨提示:上传失败')
      // 等等按钮事件
      return Promise.reject('温馨提示:上传失败')
    } else {
      // 服务端一切正常 返回data数据
      return response.data
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)

const defaultData = {}
const defatltUrl = ''
function PostAxios(url = defatltUrl, data = defaultData) {
  return axios({
    method: 'POST',
    url,
    data
  })
}

function GetAxios(url = defatltUrl, data = defaultData) {
  return axios({
    method: 'GET',
    url,
    data
  })
}

//评论列表的axios实例
const otherAxios = axios.create({
  baseURL: 'http://47.110.80.65:8082/',
  timeout: 3000,
});
otherAxios.interceptors.request.use(
  function(config) {
    // 添加响应头等等设置
    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODUzMzMzNjY2Ni1bXSIsImV4cCI6MTU2MDEzMjgyOH0._10LU4w8-rkze1wirpKCsDw2zHjG620HF4yaHsNOqM5v2QGFjm9j3IPNlqnhY0yYCcSv4Z8zaOFz9_vxbkHB1A'
    return config
  },
  function(error) {
    return Promise.reject(error) // 请求出错
  }
)
otherAxios.interceptors.response.use(
  function(response) {
    if (!response.data) {
      // 服务端出现了一些问题的情况下
      Alert.alert('网络异常')
      // 等等按钮事件
      return Promise.reject('网络异常')
    } else {
      // 服务端一切正常 返回data数据
      return response.data
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)

const Http = (url,data,method)=>{
  return otherAxios({
    method: method,
    url,
    data
  })
}



export default {
  PostAxios,
  GetAxios,
  Http
}
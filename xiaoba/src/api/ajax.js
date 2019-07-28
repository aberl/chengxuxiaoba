import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET', config) {
  return new Promise(function (resolve, reject) {

    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if (type === 'POST') {
      // 发送post请求
      promise = axios.post(url, data,config)
    }
    else if (type === 'PUT') {
      // 发送post请求
      promise = axios.put(url, data)
    }
    else if (type === 'DELETE') {
      // 发送post请求
      promise = axios.delete(url, {data})
    }
    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}

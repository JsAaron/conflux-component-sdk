function service(options = {}, only = false) {
  return new Promise((resolved, rejected) => {
    //配置请求头
    options.header = {
      'content-type': 'application/x-www-form-urlencoded'
      //'content-type': 'application/json'
      // 'Authorization': `${token}` //Bearer
      //'Authorization': 'Bearer ' + token,
    }
    //成功
    options.success = res => {
      // //单独处理
      // if (res?.statusCode == 200) {
      // 	return resolved(res);
      // }

      //console.log(res)
      if (Number(res.data.code) == 0) {
        //请求成功
        resolved(res.data)
      } else {
        uni.showToast({
          icon: 'none',
          duration: 3000,
          title: `${res.data.msg}`
        })
        rejected(res.data) //错误
      }
    }
    options.fail = err => {
      rejected(err)
    }
    uni.request(options)
  })
}
export default service

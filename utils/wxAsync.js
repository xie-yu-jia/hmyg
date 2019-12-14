/* 
    获取微信的授权信息
*/
export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}

/* 
    获取收货地址
*/
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}

/* 
    打开微信设置页面
*/
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: () => {},
            complete: () => {}
        });
          
    })
}

/*
    执行登录
*/
export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
              resolve(result)  
            },
        });
          
    })
}

/*
    微信登录
*/
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
        });
          
    })
}
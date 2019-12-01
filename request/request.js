// 定义一个变量  记录同时发送请求的个数
let ajaxCount = 0;

function axios({url, ...params}) {

    ajaxCount++

    const baseURL = "https://api.zbztb.cn/api/public/v1/";
    return new Promise((resolve,reject)=>{
        // 显示加载中
        wx.showLoading({
            title: '加载中',
            mask: true
        });

        wx.request({
            url: baseURL + url,
            ...params,
            success: (result) => {
                resolve(result)
            },
            // 不管成功失败都会执行的函数
            complete(){
                ajaxCount--;
                if(ajaxCount === 0){
                    wx.hideLoading();
                }
            }
        });
          
    })
}

export default axios;
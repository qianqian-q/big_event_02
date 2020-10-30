// 请求根路径 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所有ajax请求
$.ajaxPrefilter(function(option){
    option.url = baseURL + option.url
    if(option.url.indexOf('/my/')!==-1) {
        option.headers={
            Authorization:localStorage.getItem("token")||""
        }
    }
    // 拦截所有相应,判断身份信息
    option.complete = function(res){
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message == '身份认证失败！'){
            // 清空本地token
            localStorage.removeItem("token")
            location.href='/login.html'
        }
    }
})

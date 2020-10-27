// 请求根路径 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所有ajax请求
$.ajaxPrefilter(function(option){
    option.url = baseURL + option.url
})

// 入口函数
$(function () {
    // 获取用户信息
    getUserInfo()

    // 退出
    var layer = layui.layer
    $('#btnlogout').on('click', function () {
        // 框架提供的询问框
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token")
            location.href = '/login.html'
            layer.close(index);
        });

    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem("token")||""
        // },
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 1.用户名
    var name = user.nickname || user.username
    $('#welcome').html("欢迎你&nbsp;&nbsp;" + name)
    // 2.用户头像
    if (user.user_pic !== null) {
        $('.user-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.user-avatar').show().html(first)
    }
}

$(function () {
    // 1.点击去注册账号
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()

    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // value：表单的值、item：表单的DOM对象
        repwd:function(value){
            var pwd = $('.reg-box input[name=password]').val()
            if(value!==pwd) {
                return '两次密码输入不一致！'
            }
        } 
    })
    var layer = layui.layer
    // 3.注册功能
    $('#form_reg ').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res) {
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 手动切换到登录表单
                $('#link_login').click()
                // 清空表单
                $('#form_reg ')[0].reset()
            }
        })
    })
    
    // 4.登录功能
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status!==0) return layer.msg(res.message);
                // 提示信息 ,保存token
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }   
        })
    })
})
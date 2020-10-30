$(function(){
    var form = layui.form
    // 密码表单校验
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   新旧密码不能一致
        sampass:function(value){
            if(value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        repass:function(value) {
            if(value!==$('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        }
    })

    // 2.密码表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) return layui.layer.msg(res.message);
                $('.layui-form')[0].reset()
            }
        })
    })
})
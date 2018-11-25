
var loginForm = document.getElementsByTagName('form')[0];
var input = document.getElementsByTagName('input');
var login = document.getElementById('login');
var register = document.getElementById('register');
var m = document.getElementById('a');
var loginBody = document.getElementsByTagName('body')[0];
var str = location.href;
var ary = str.split('=');
var user = '';
var flag=1;
for (var i = 2; i < 232; i++) {
    if (i % 2 == 0) {
        m.innerHTML += '<div></div>'
    } else {
        m.innerHTML += '<div style="background:rgba(0, 0, 0, 0.5)"></div>'
    }
}
if (input[0].value) {
    input[1].focus()
} else {
    input[0].focus()
}


$('form').animate({
    top: 0
}, 500)

$('#login').click([1], change);
$('#register').click([2], change);
function change(event) {
    if (event.target.nodeName == 'SPAN') {
        return false
    }
    var temp = $('#login').css('display');
    $('#login').css('display', $('#register').css('display'));
    $('#register').css('display', temp);
    $('#title_text').css('display', 'none');
    input[1].value = '';  
    if (event.data[0] == 1) {
        user = input[0].value;
        input[0].value = ''; 
        input[0].placeholder = "请设置用户名";
        input[1].placeholder = "请设置密码";
        $('#titel_2').text('按住下拉,即可注册');
        loginForm.action = "./index.php?c=user&a=reg"
    } else {
        flag =1;
        input[0].value = user;
        input[0].placeholder = "请输入用户名";
        input[1].placeholder = "请输入密码";
        $('#titel_2').text('按住下拉,即可登录');
        loginForm.action = "./index.php?c=user&a=login"
    }
}

input[0].onfocus = function () {
    this.className = 'focus';
    $('#title_text').css('display', 'none');
}
input[0].onblur = function () {
    this.className = '';
    if( $('#register').css('display')=='inline-block'){
        console.log('aaaa');
        var name = $("#name").val();
        $.post("./index.php",{a:"sle",name:name},function(msg){ 
                if(msg==1){
                    $('#title_text').text('该用户名已存在,请重新输入!');
                    $('#title_text').css('display', 'block');
                    flag =0;
                }else{
                    $('#title_text').text(' ');
                    flag =1;
                }  

            }
        );
    }
}
input[1].onfocus = function () {  
    this.className = 'focus';
    document.onkeydown = function (event) {
        event = window.event || event;
        console.log(event.keyCode);
        if (event.keyCode == '13') {
            if(flag==0){

            }else if (input[0].value == '' || input[1].value == '') {
                $('#title_text').css('display', 'block');
                $('#title_text').text('请将信息填写完整！！！');
            } else {
                up();
            }
        }
    }
}
input[1].onblur = function () {
    this.className = ''
}
loginForm.onmousedown = function (event) {
    event = window.event || event;
    var targt = event.targt || event.srcElement;
    if (targt.nodeName != 'INPUT' && targt.nodeName != 'H3') {
        loginForm.style.cursor = "url('./View/img/b2.ico'),pointer"
        loginBody.style.cursor = "url('./View/img/b2.ico'),pointer";
        $('#titel_3').css('display', 'block');
        $('#titel_2').css('display', 'none');
        var startY = event.clientY;
        if (event.button === 0) {
            document.onmousemove = function (event) {
                event = event || window.event;
                if (event.clientY > startY && (event.clientY - startY) < 210) {
                    $('form').css('top', event.clientY - startY + 'px')
                    if ((event.clientY - startY) >= 50) {
                        if (input[0].value == '' || input[1].value == ''||flag==0) {
                            document.onmousemove = null;
                            document.onmouseup = null;
                            back();
                            $('#title_text').css('display', 'block');
                            if(flag==1){
                                $('#title_text').text('请将信息填写完整！！！');
                            }else{
                                $('#title_text').text('用户已存在,请重新设置！!！'); 
                            }
                        }
                    }
                } else if ((event.clientY - startY) >= 210) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    up();
                }
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            if (parseInt($('form').css('top')) >= 120) {
                up()
            } else {
                back()
            }
        }
    }
}
function up() {
    var name=$('#name').val();
    var pass=$('#pass').val();
    $('form').animate({
        top: -415
    }, 250);
    setTimeout(function () {
        if( $('#login').css('display')=="inline-block"){
            $.post("./index.php",{a:'login',username:name,password:pass},function(msg){ 
                if(msg==1){
                    location.reload() 
                }else{
                    $('#title_text').css('display', 'block');
                    $('form').animate({
                        top: 0
                    }, 250);
                }  
            });
        }else{           
            $.post("./index.php",{a:'reg',username:name,password:pass},function(msg){ 
                if(msg==1){
                    location.reload()
                }else{
                    alert('出错了!请重试!')
                    $('#title_text').css('display', 'block');
                    $('form').animate({
                        top: 0
                    }, 250);
                }

                }      
            );               
             
        }     
    }, 250)
}
function back() {
    loginForm.style.cursor = "url('./View/img/a2.ico'),pointer";
    loginBody.style.cursor = "default";
    $('#titel_3').css('display', 'none');
    $('#titel_2').css('display', 'block');
    $('form').delay(0).animate({
        top: 0
    }, 150);
}

$('#visitor').click(visitorFn);
function visitorFn() {
    $('form').animate({
        top: -415
    }, 250);
    setTimeout(function () {
        location.replace('http://www.ajaxpad.com?visit') ;      
    }, 270)
}
var deleteUser = document.getElementById('deleteUser'),outUser = document.getElementById('outUser'), clear = document.getElementById('clear'), back = document.getElementById('back'), del = document.getElementById('delete'), transparent = document.getElementById('transparent'), bgColor1 = document.getElementById('bgColor1'), borderColor = document.getElementById('borderColor'), Sketchpad = document.getElementById('Sketchpad'), uls = document.getElementsByTagName('ul'), boxStyle = document.getElementById('style'), styleL = document.getElementById('styleL'), borderW = document.getElementById('borderW'), borderC = document.getElementById('borderC'), bgColor = document.getElementById('bgColor'), borderWs = borderW.getElementsByClassName('borderW'), save = document.getElementById('save'), ary = [], all = 0, allHtml = '', a = 0, b = 0, c = 0;
var Obj = {
    radius: '0',
    bWidth: '2px',
    bColor: 'black',
    bgc: 'none'
}
if (Sketchpad.innerHTML != '') {
    del.disabled = 0;
    clear.disabled = 0;
    del.style.color = 'black';
    clear.style.color = 'black';
} else {
    del.disabled = 1;
    clear.disabled = 1;
    del.style.color = 'grey';
    clear.style.color = 'grey';
}
for (var i = 0; i < uls.length; i++) {
    uls[i].onmouseover = function (event) {
        event = window.event || event;
        if (event.which !== 1 && event.which !== 2 && event.which !== 3) {
            this.style.height = 'auto'
        }
    };
    uls[i].addEventListener('mouseout', display);
}
function display() { this.style.height = '35px'; }
boxStyle.onmouseout = function () {
    if (styleL.checked === true) {
        Obj.radius = '50%'
    } else { Obj.radius = '0' }
};
borderW.onmouseout = function () {
    for (var i = 0; i < borderWs.length; i++) {
        if (borderWs[i].checked === true) {
            Obj.bWidth = borderWs[i].value;
        }
    }
};
borderC.onmouseout = function () {
    Obj.bColor = borderColor.value;
};
bgColor.onmouseout = function () {
    if (transparent.checked === false) {
        Obj.bgc = bgColor1.value;
    } else {
        Obj.bgc = 'none';
    }
};
bgColor1.onclick = function () {
    transparent.checked = false
};

document.oncontextmenu = function () {
    return false;
};

Sketchpad.onmousedown = function (event) {
    if (Obj.bWidth === '0') {
        if (Obj.bgc === 'none') {
            alert('背景与边框都为“无”，请修改其中一项，使目标可见！');
            return
        }
        if (Obj.bgc === '#ffffff') {
            if (a === 0) {
                var res1 = confirm('白色无边框目标可能不可见！\n确定要继续?\n(如果您选择确定此信息将不再提示)');
                if (res1 === true) {
                    a++;
                    return
                } else { return }
            }
        }
    }
    else if (Obj.bWidth !== '0') {
        if (Obj.bColor === '#ffffff' && Obj.bgc === '#ffffff') {
            if (b === 0) {
                var res2 = confirm('您将绘制一个白色的目标，可能不可见！\n确定要继续?\n(如果您选择确定此信息将不再提示)');
                if (res2 === true) {
                    b++;
                    return
                } else { return }
            }
        }
        if (Obj.bColor === '#ffffff' && Obj.bgc === 'none') {
            if (c === 0) {
                var res3 = confirm('您将绘制一个白色边框无背景的目标，可能不可见！\n确定要继续?\n(如果您选择确定此信息将不再提示)');
                if (res3 === true) {
                    c++;
                    return
                } else { return }
            }
        }
    }
    save.disabled = 0;
    save.style.color = 'black';
    del.disabled = 0;
    clear.disabled = 0;
    back.disabled = 1;
    del.style.color = 'black';
    clear.style.color = 'black';
    back.style.color = 'grey';
    ary = [];
    all = 0;


    event = window.event || event;
    var oX = event.pageX;
    var oY = event.pageY;
    var dixX = event.pageX - this.offsetLeft;
    var dixY = event.pageY - this.offsetTop;

    var newDiv = document.createElement('div');
    newDiv.style.borderWidth = Obj.bWidth;
    newDiv.style.borderColor = Obj.bColor;
    newDiv.style.borderRadius = Obj.radius;
    newDiv.style.backgroundColor = Obj.bgc;
    newDiv.style.position = 'absolute';
    newDiv.style.boxSizing = 'border-box';
    newDiv.style.top = dixY + 'px';
    newDiv.style.left = dixX + 'px';
    newDiv.style.opacity ='1';
    Sketchpad.appendChild(newDiv);

    if (event.button === 0) {
        document.onmousemove = function (event) {
            event = window.event || event;
            if (event.pageX >= oX) {
                newDiv.style.left = dixX + 'px';
                if (event.pageX < Sketchpad.offsetLeft + Sketchpad.offsetWidth) {
                    newDiv.style.width = event.pageX - oX + 'px';
                } else {
                    newDiv.style.width = Sketchpad.offsetLeft + Sketchpad.offsetWidth - oX + 'px';
                }
            } else {
                if (event.pageX > Sketchpad.offsetLeft) {
                    newDiv.style.left = dixX - (oX - event.pageX) + 'px';
                    newDiv.style.width = oX - event.pageX + 'px';
                } else {
                    newDiv.style.left = '0';
                    newDiv.style.width = dixX + 'px';
                }
            }
            if (event.pageY >= oY) {
                newDiv.style.top = dixY + 'px';
                if (event.pageY < Sketchpad.offsetTop + Sketchpad.offsetHeight) {
                    newDiv.style.height = event.pageY - oY + 'px';
                } else { newDiv.style.height = Sketchpad.offsetTop + Sketchpad.offsetHeight - oY + 'px' }
            } else {
                if (event.pageY > Sketchpad.offsetTop) {
                    newDiv.style.top = dixY - (oY - event.pageY) + 'px';
                    newDiv.style.height = oY - event.pageY + 'px';
                } else {
                    newDiv.style.top = '0';
                    newDiv.style.height = dixY + 'px';
                }
            }
        };
    }
    else if (event.button === 2) {
        document.onmousemove = function (event) {
            event = window.event || event;
            if (Math.abs(event.pageX - oX) >= Math.abs(event.pageY - oY)) {
                newDiv.style.width = Math.abs(event.pageX - oX) + 'px';
                newDiv.style.height = Math.abs(event.pageX - oX) + 'px';
            }
            else {
                newDiv.style.width = Math.abs(event.pageY - oY) + 'px';
                newDiv.style.height = Math.abs(event.pageY - oY) + 'px';
            }
            if (event.pageY >= oY) {
                newDiv.style.top = dixY + 'px'
            } else {
                newDiv.style.top = dixY - parseInt(newDiv.style.height) + 'px'
            }
            if (event.pageX >= oX) {
                newDiv.style.left = dixX + 'px'
            } else {
                newDiv.style.left = dixX - parseInt(newDiv.style.width) + 'px'
            }
        }
    }

    document.onmouseup = function () {
        document.onmousemove = null;
    }
};
back.onclick = backFunction;
del.onclick = delFunction;
clear.onclick = clearFunction;
save.onclick = saveFn;
document.onkeydown = function (event) {
    event = window.event || event;
    if (event.key === "Delete" || event.keyCode === 8) {
        delFunction()
    }
    if (event.key === "Delete" && event.ctrlKey) {
        clearFunction()
    }
    if (event.key === "b") {
        backFunction()
    }
    if (event.key === "s" && event.ctrlKey) {
        if(save.disabled == 0){
            saveFn()
        }
        //console.log('11');
        return false
    }
};

function clearFunction() {
    save.disabled = 0;
    save.style.color = 'black';
    back.disabled = 0;
    all++;
    allHtml = Sketchpad.innerHTML;
    Sketchpad.innerHTML = null;
    del.disabled = 1;
    clear.disabled = 1;
    del.style.color = 'grey';
    clear.style.color = 'grey';
    back.style.color = 'black';
}
function delFunction() {
    save.disabled = 0;
    save.style.color = 'black';
    ary.push(lastElement(Sketchpad));
    Sketchpad.removeChild(lastElement(Sketchpad));
    back.disabled = 0;
    if (lastElement(Sketchpad) === null) {
        del.disabled = 1;
        clear.disabled = 1;
        del.style.color = 'grey';
        clear.style.color = 'grey';
    }
    back.style.color = 'black';
}
function backFunction() {
    save.disabled = 0;
    save.style.color = 'black';
    del.disabled = 0;
    clear.disabled = 0;
    del.style.color = 'black';
    clear.style.color = 'black';
    if (all === 0) {
        Sketchpad.appendChild(ary.pop());
    } else {
        Sketchpad.innerHTML = allHtml;
        all--
    }
    if (ary.length === 0) {
        back.disabled = 1;
        back.style.color = 'grey';
    }
}
deleteUser.onclick = function () {
    var res = prompt('确定要删除当前用户的全部数据?\n请输入密码以确认');
    if (res) {
        $.post("./index.php",{a:"del",pass:res},
        function(data){
                // alert(data);
                if(data==1){
                    alert('用户已删除!');
                    $('body *').animate({
                        opacity:0
                   }, 150);
                   setTimeout(function () {
                        location.reload()
                    },150)
                }else{
                    alert('删除失败,请重试!');
                }  
        })
       
    }
}
outUser.onclick = function () {
    var res = confirm('未保存的数据将丢失!\n确定退出?');
    if (res) {
        $.post("./index.php",{a:"out"},
        function(data){
                if(data == 1){
                    $('body *').animate({
                        opacity:0
                   }, 150);
                   setTimeout(function () {
                        location.reload()
                    },150)
                }else{
                    alert('错误')
                } 
        })
    }
}

function saveFn() {
        var data = $("#Sketchpad").html();
        $.post("./index.php",{c:'user',a:'save',data:data},
            function(time){
                // alert(time) ;
                    if(time){
                        alert('保存成功!')  
                        save.disabled = 1;
                        save.style.color = 'grey';
                        $('#time').text('上次保存时间:'+time)
                    }  else{
                        alert('保存失败,请重试!')  
                    }  
            })   
    }

//运动函数
//obj 代表需要运动的元素
// attr 代表改变的属性 'left'
// target 是运动的目标值   number
// speed 代表运动的速度 数值   number
// callback 回调函数：在函数内部调用通过参数传进来的函数  function
function move(obj,attr,target,speed,callback) {//callback 回调函数：在函数内部调用通过参数传进来的函数

    clearInterval(obj.timer);//每次调用动画，先清除之前的动画
    var cur = parseInt(getCss(obj,attr));
    //把定时器存在运动的对象身上
    obj.timer = setInterval(function () {
        if(cur > target){
            cur -= speed;
        }else if(cur < target){
            cur += speed;
        }
        if(Math.abs(cur-target)<speed){
            cur = target;
            clearInterval(obj.timer);
            //执行回调函数
            if( typeof callback === "function"){
                callback();
            }
        }
        obj.style[attr] = cur + 'px';
    },30);
}
//获取元素的样式
function getCss(ele,attr) {//ele代表需要获取样式的那个标签， attr获取的样式属性
    // 0 '' null undefined NaN
    if(window.getComputedStyle){//如果存在getComputedStyle方法，就说明是标准浏览器，就获取
        return window.getComputedStyle(ele)[attr];
    }else{//反之就是ie浏览器，就通过currentStyle属性获取
        return ele.currentStyle[attr];
    }
}
//通过id获取元素
function getById(id) {
    return document.getElementById(id);
}
//获取n-m之间的随机整数
function getRandom(n,m) {

    return Math.round(Math.random()*(m-n)+n);
}
//补0方法
function addZero(a) {
    return a<10 ? '0'+a : a;
}
//类数组转数组
function toArray(ary) {
    var newArray = [];
    for (var i = 0; i < ary.length; i++){
        newArray.push(ary[i]);
    }
    return newArray;
}
//通过类名获取元素
function getByClass(ele,cls) {
    var ary = ele.getElementsByTagName('*');
    var ary1 = [];
    for (var i = 0; i < ary.length; i++){
        //ary[i].className   "red div1"  "redbox"
        var clsAry = ary[i].className.split(' ');//['red','div1']  ['redbox']
        for(var j = 0; j<clsAry.length;j++){
            if(cls===clsAry[j]){
                ary1.push(ary[i]);
            }
        }
    }
    return ary1;
}

//查找元素
//上一个
function prevElement(ele) {
    var prev = ele.previousSibling;
    while(prev&&prev.nodeType !== 1){//节点类型不等于1的时候继续往上查找
        prev =  prev.previousSibling;
    }
    return prev;
}
//下一个
function nextElement(ele) {
    var prev = ele.nextSibling;
    while(prev&&prev.nodeType !== 1){//节点类型不等于1的时候继续往下查找
        prev =  prev.nextSibling;
    }
    return prev;
}
//第一个子元素
function firstElement(ele) {
    var prev = ele.firstChild;
    while(prev&&prev.nodeType !== 1){//节点类型不等于1的时候继续往下查找
        prev =  prev.nextSibling;
    }
    return prev;
}
//最后一个子元素
function lastElement(ele) {
    var prev = ele.lastChild;
    while(prev&&prev.nodeType !== 1){//节点类型不等于1的时候继续往上查找
        prev =  prev.previousSibling;
    }
    return prev;
}
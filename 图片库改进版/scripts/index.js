
//切换被点击的图片和文字
function showPic(whichpic){
    var source = whichpic.getAttribute("href");//当前被点击的图片的href
    
    if(!document.getElementById("placeholder")) return false;//检查是否存在
    var placeholder = document.getElementById("placeholder");//获取单独展示图片的img标签的id
    if(placeholder.nodeName !="IMG") return false;//nodeName返回的都是大写字母得值
    placeholder.setAttribute("src",source);//把图片的href赋给src
    
    //如果存在才切换文字
    if(document.getElementById("description")){
        var description = document.getElementById("description");//获取描述图片的段落id
        //方法一
        // if(whichpic.getAttribute("title")){
        //     var text = whichpic.getAttribute("title");//获取被点击图片的title
        // }else{
        //     var text = "";
        // }
        //方法二：三元法   检验title是否有值
        var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"): text = "";
        if(description.firstChild == 3){//文本节点的nodeType属性值为3
            description.firstChild.nodeValue = text;//把被点击图片的title赋给单独描述图片的段落
        }
        
    }
    return true;
}

//处理图片的点击事件
function prepare(){
    var imageFa = document.getElementById("imageFa");//获取图片库的父级id，便于后面遍历取得所有图片链接
    //判断如果当前浏览器无法识别，就直接退出
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!imageFa) return false;
    var links = imageFa.getElementsByTagName("a");//获取所有图片链接的a标签
    //遍历links数组的每个元素,初始值为0，长度小于links的长度也就是links.length ，处理一个元素就增加1 也就是i++
    for(var i = 0 ;i<links.length ;i++){
        //匿名函数，第i个links里的a标签也就是links[i]来表示，当这个元素被点击onclick的时候就执行后面的函数
        links[i].onclick = function(){//避免placeholder的元素被删除不能平稳退化，所有对show()函数返回的值做一个处理，如果返回false,表明图片没有更新，于是取反返回true允许默认行为打开图片链接，而不是什么都不做
          return  !showPic(this);//调用点击即显示当前图片和标题的方法
            
        }
    }

}

//页面加载完成的时候执行的函数,这将把那些在页面加载完毕时执行的函数创建一个队列，这里这个函数有些大材小用，不过如果以后遇到的代码越来越复杂，这个函数可以直接拿来用
function addLoadEvent(fun){
    var oldonload = window.onload;
    //如果在这个处理函数上还没有绑定任何函数，就把新函数添加给它
    if(typeof window.onload != "function"){
        window.onload = fun;
    }else{//如果在这个处理函数上已经绑定了其他函数，就把新函数追加到现有指令的末尾
        window.onload = function(){
            oldonload();
            fun();
            console.log("end   ")
        }
    }
}

addLoadEvent(prepare)//页面加载完成的时候把处理图片的点击事件添加进去
function showPic(whichpic){
    var source = whichpic.getAttribute("href");//当前被点击的图片的href
    var placeholder = document.getElementById("placeholder");//获取单独展示图片的img标签的id
    placeholder.setAttribute("src",source);//把图片的href赋给src
    var text = whichpic.getAttribute("title");//获取被点击图片的title
    var description = document.getElementById("description");//获取描述图片的段落id
    description.firstChild.nodeValue = text;//把被点击图片的title赋给单独描述图片的段落
}
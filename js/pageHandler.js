//数据结构
/*
 * [
 * 	{create_date:'',title:'',brief:'',url:''},{},{},{},{}... //countsPerPage个
 * ]
 */
var pageObj = [];//用于存储单页的数据

var onShowPageNumQueue = [];//当前显示的页脚，定义为一个队列，元素个数是不变的
var curPoint = 0;//队列中当前的指针位置(当前显示的页面)
var allCounts = 0;//共有数据量


function init(){
	allCounts = 56
	initPage(curPoint)
	//初始化分页显示部分
	initPageShow()
}

function initPage(page){

	//先尝试命中缓存
	if(!queue[curPoint]){//没有命中
		console.log('这里请求数据')//page为参数
	}else{
		forEachHtml(queue[curPoint])
	}
	
}

//遍历当前页面需要显示的所有数据
function forEachHtml(results){
	var list = $("#list");
	list.children('li').remove();
	for(var i = 0;i < results.length;i++){
		var create_date = !!results[i].create_date?results[i].create_date.split(' ')[0]:'';
		var day = !!create_date?create_date.split('-')[2]:'';
		var year_month = !!create_date?create_date.substring(0,7):'';
		var html = '<li url='+results[i].url+'><div class="date"><strong>'+day+'</strong><span>'+year_month+'</span></div>'
			+'<div class="cont"><h5>'+results[i].title+'</h5><p>'+results[i].brief+'</p></div></li>';
		list.append(html)
		var p = {
			url : results[i].url,
			create_date : results[i].create_date,
			title : results[i].title,
			brief : results[i].brief
		};
		creatPageObj(p)
	}
	list.find("li").each(function(){
		$(this).on('click',function(){
			console.log('这里可以绑定事件')
		});
	});
}

function initPageShow(){
	var allPageNum = Math.floor(allCounts/countsPerPage); //共有的页数
	$("#total").text(allPageNum+1);
	var html = '<a class="home" href="javascript:void(0);">首页</a><a class="prev" href="javascript:void(0);">&lt;</a>';
	for(var i = 0;i < allPageNum+1;i++){
		if(i < countsPerPage){
			//加入队列
			onShowPageNumQueue.push(i)
			html += '<a num='+i+' href="javascript:void(0);">'+(i+1)+'</a>';
		}else{//大于5个的先隐藏
			html += '<a style="display:none;" num='+i+' href="javascript:void(0);">'+(i+1)+'</a>';
		}
	}
	html += '<a class="next" href="javascript:void(0);">&gt;</a><a class="back" href="javascript:void(0);">尾页</a>';
	$("#link").html(html);
	$("#link").find('a').each(function(){
		$(this).on('click',function(){
			var pageBtnType = $(this).attr("class");
			if(pageBtnType == 'home'){//首页
				curPoint = 0
			}else if(pageBtnType == 'back'){//尾页
				curPoint = allPageNum
			}else if(pageBtnType == 'prev'){//前页
				curPoint--
			}else if(pageBtnType == 'next'){//后页
				curPoint++
			}else{
				curPoint = $(this).attr("num")
			}
			if(curPoint < 0 || curPoint > allPageNum){
				return
			}else{
				initPage(curPoint)
				initHighPageNum();
				pageNumHandler(curPoint,pageBtnType)
			}
		})
	})
	initHighPageNum();
}

//处理高亮页码
function initHighPageNum(){
	$("#link").find('a[num='+curPoint+']').addClass('on')
	$("#link").find('a:not([num='+curPoint+'])').removeClass('on')
}

function creatPageObj(p){
	if(pageObj.length == countsPerPage-1){//里面有countsPerPage个对象，停止push，将pageObj添加至队列
		pageObj.push(p)
		if(!queue[curPoint])
			queue[curPoint] = deepClone(pageObj)
		pageObj.length = 0;//清空数组
		return;
	}
	pageObj.push(p);
	//处理尾页数据不足countsPerPage的情况
	var allPageNum = Math.floor(allCounts/countsPerPage); //共有的页数-1
	//判断是处在最后一页，而且是最后一条数据，则添加到缓存对象
	if(allPageNum == curPoint && pageObj.length == allCounts%countsPerPage){
		if(!queue[curPoint])
			queue[curPoint] = deepClone(pageObj)
		pageObj.length = 0;//清空数组
	}
	
}

//切换page后处理下方页脚显示
function pageNumHandler(cur,type){
	var allPages = Math.floor(allCounts/countsPerPage)+1
	cur = parseInt(cur)
	//不足5页，什么都不做
	if(allPages <= countsPerPage){
		return;
	}else{//大于5页
		if(type == 'prev'){
			if(cur < Math.floor(countsPerPage/2)){//0,1,2
				return
			}else if(cur >= (allPages - Math.floor(countsPerPage/2) - 1)){//最后三个
				return
			}else{//5 6 7 8 9
				onShowPageNumQueue.pop(onShowPageNumQueue[countsPerPage-1])//最后一个元素出列
				onShowPageNumQueue.unshift(parseInt(onShowPageNumQueue[0])-1)//前一个元素入列
			}
		}else if(type == 'next'){
			if(cur <= Math.floor(countsPerPage/2)){//0,1,2
				return
			}else if(cur >= allPages - Math.floor(countsPerPage/2)){//最后三个
				return
			}else{
				onShowPageNumQueue.push(onShowPageNumQueue[countsPerPage-1]+1)//后一个元素入列
				onShowPageNumQueue.shift(onShowPageNumQueue[0])//第一个元素出列
			}
		}else if(type == 'home'){//首页
			onShowPageNumQueue.length = 0
			for(var i = 0;i < countsPerPage;i++){
				onShowPageNumQueue.push(i)
			}
		}else if(type == 'back'){//尾页
			onShowPageNumQueue.length = 0
			for(var i = allPages-5;i < allPages;i++){
				onShowPageNumQueue.push(i)
			}
		}else{//直接访问某个page
			//检测边界
			if(cur <= Math.floor(countsPerPage/2)){//0,1,2
				pageNumHandler('','home')
			}else if(cur >= allPages - Math.floor(countsPerPage/2)){//最后三个
				pageNumHandler('','back')
			}else{
				onShowPageNumQueue.length = 0
				for(var i = cur - Math.floor(countsPerPage/2);i <= cur + Math.floor(countsPerPage/2);i++){
					onShowPageNumQueue.push(i)
				}
			}
		}
					
	}
	//控制需要显示的5个页脚
	$("#link").find('a').each(function(){
		var num = $(this).attr("num");
		var arrTemp = deepClone(onShowPageNumQueue)
		if(!!num){
			$(this).hide()
			for(var i = 0;i < arrTemp.length;i++){
				if(parseInt(num) == arrTemp[i]){
					$(this).show();
					arrTemp.pop(arrTemp[i])
					break;
				}
			}
		}
	})
	
}

//实现一个深度克隆函数
function deepClone(obj){
	var result = obj instanceof Array?[]:{};
	if(typeof(obj) !== 'object'){
		return obj;
	}else{
		if(obj === null){
			result = obj;
		}else{
			for(var i in obj){
				//过滤掉原型上的属性
				if(obj.hasOwnProperty(i))
					result[i] = deepClone(obj[i])
			}
		}
	}
	return result;
}

//绑定输入页面号显示指定页面内容
$("#goToPage").on('click',function(){
	var num = $("#inputPageNum").val().trim();
	num = !!num?parseInt(num):0
	if(num < 1 || num > Math.floor(allCounts/countsPerPage)+1){
		warn.alert(_title,'请输入正确的页码');
	}else{
		curPoint = num-1
		initPage(curPoint)
		initHighPageNum();
		pageNumHandler(curPoint)
	}
})
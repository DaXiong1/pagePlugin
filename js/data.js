//数据结构,key值为当前页脚
/*
 * {
 * 	pageObj,pageObj,pageObj...
 *     ^  
 *     |
 *  curPoint
 * }
 */
//用来缓存所有数据。由pageObj组成
var queue = {
			   '0':[
				   {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"11",brief:"I am 11"},
				   {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"12",brief:"I am 11"},
				   {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"13",brief:"I am 11"},
				   {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"14",brief:"I am 11"},
				   {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"15",brief:"I am 11"}
			   ],
			   '1':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"16",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"17",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"18",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"19",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"20",brief:"I am 11"}
			   ],
			   '2':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"21",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"22",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"23",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"24",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"25",brief:"I am 11"}
			   ],
			   '3':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"26",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"27",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"28",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"29",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"30",brief:"I am 11"}
			   ],
			   '4':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"31",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"32",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"33",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"34",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"35",brief:"I am 11"}
			   ],
			   '5':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"37",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"38",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"39",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"40",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"41",brief:"I am 11"}
			   ],
			   '6':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"42",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"43",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"44",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"45",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"46",brief:"I am 11"}
				],
				'7':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"42",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"43",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"44",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"45",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"46",brief:"I am 11"}
				],
				'8':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"42",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"43",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"44",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"45",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"46",brief:"I am 11"}
				],
				'9':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"42",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"43",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"44",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"45",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"46",brief:"I am 11"}
				],
				'10':[
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"42",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"43",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"44",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"45",brief:"I am 11"},
					{create_date:'2017-09-09 11:11:11',url:"/a.html",title:"46",brief:"I am 11"}
				],
				'11':[
					  {create_date:'2017-09-09 11:11:11',url:"/a.html",title:"47",brief:"I am 11"}
				]
			   
}
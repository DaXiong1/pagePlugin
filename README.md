# pagePlugin
	实现了一个基于PC端的内容分页显示插件
	
	介绍及使用方法：
	1.使用时首先确定countsPerPage的值（最小为1），表示每个页脚页展示的数据量;countsPageOnShow表示当前显示的页脚个数
	2.本例对服务端逻辑的要求是："每页一查"，每次进入一个新的页脚页，会传入页脚请求服务器拿数据，
	  服务端返回当前页面数据（单个页脚页数据量和countsPerPage保持一致）。除此之外，服务器还需返回总数据条数allCounts
	3.单个页脚页的数据结构为pageObj所示：
		//数据结构
		/*
		 * [
		 * 	{create_date:'',title:'',brief:'',url:''},{},{},{},{}... //countsPerPage个
		 * ]
		 */
	  全部数据缓存在queue中，数据结构如下：
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
		本例demo中使用了静态数据填充queue，用户使用时需按照数据结构自己填充queue，注意和countsPerPage值的关联性
	4.目前底部一共显示countsPageOnShow个页码。
	5.代码基于jquery来实现dom操作
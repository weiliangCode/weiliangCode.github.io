var app = angular.module("iappfree",['ionic']);


app.config(['$stateProvider', '$urlRouterProvider','globalProvider', function($stateProvider, $urlRouterProvider,globalProvider){
	
	$stateProvider
	.state('tabs', {//路由配置项名字
		url: '/tabs',//路由地址
		templateUrl: 'views/tabs.html',
		controller:'commonCtrl'

	})
	.state('tabs.home', {//路由配置项名字
		url: '/home',//路由地址
		views:{
			'tab-home': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/home/home.html',
				controller: 'homeCtrl'
			}
		}
	})
	.state('tabs.discount', {//路由配置项名字
		url: '/discount',//路由地址
		views:{
			'tab-discount': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/discount/discount.html',
				controller: 'discountCtrl'
			}
		}
	})
	.state('tabs.gratis', {//路由配置项名字
		url: '/gratis',//路由地址
		views:{
			'tab-gratis': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/gratis/gratis.html',
				controller:'gratisCtrl'
			}
		}
	})
	.state('tabs.special', {//路由配置项名字
		url: '/special',//路由地址
		views:{
			'tab-special': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/special/special.html'
			}
		}
	})
	.state('tabs.hotList', {//路由配置项名字
		url: '/hotList',//路由地址
		views:{
			'tab-hotList': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/hotList/hotList.html'
			}
		}
	})
	//应用详情
	.state('tabs.appInfo', {//配置项名
		url: '/appInfo/:id',//路径
		views:{
			'tab-home': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/common/appInfo.html', //模板页面
				controller:'infoCtrl'
			}
		}
	})
	//应用详情
	.state('tabs.appInfoD', {//配置项名
		url: '/appInfoD/:id',//路径
		views:{
			'tab-discount': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/common/appInfo.html', //模板页面
				controller:'infoCtrl'
			}
		}
	})
	//设置详情
	.state('tabs.set', {//配置项名
		url: '/set',
		views:{
			'tab-home': {//在tabs中有多个ion-nav-view，这个应该放在哪个之中
				templateUrl: 'views/common/set.html' //模板页面
			}
		}
	})

	$urlRouterProvider.otherwise('tabs/home');
	
		//配置全局请求路径
	globalProvider.globalPath = '/iappfreePro/data';
//	globalProvider.globalPath = '/data';
	
}])


app.controller('commonCtrl', ['$scope','homeDataService', 'commonService',
	function($scope,homeDataService,commonService){
	$scope.selectIndex=0;

	homeDataService.getTabsData(function(data){
		$scope.tabs = data;
	},commonService.alertInfo);
	
	$scope.tabsAction = function(index){
		$scope.selectIndex = index;
		
	}
	
	
}])

app.service('commonService', ['$ionicPopup', function($ionicPopup){
	
	this.alertInfo = function(info, code){
		var str = '';
		if(info){
			str = info;
		}
		else if(code){
			switch (code){
				case 404:
					str = '找不到文件';
					break;
				case 405:
					str = '本地错误';
					break;
				case 500:
				case 505:
					str = '服务器错误';
					break;
				default:
					str = '未知错误';
					break;
			}
		}
		else{
			str = '未知错误';
		}
		
		$ionicPopup.alert({
			
			title: '提示',
			cssClass: 'my-alert',
			template: '<div class="alert-info">'+str+'</div>',
			okText: '知道了',
			okType: 'button-red'
			
		});
		
	}
	
	
}])
app.provider('global', function(){
	this.globalPath = '';
//	console.log('global');
	//这个方法返回服务对象
	this.$get = function(){
//		console.log('global $get');
		var obj = {};
		var that = this;
		obj.getPath = function(){
			return that.globalPath;
		}
		return obj;
	}
	
})















app.controller('discountCtrl', ['$scope', 'homeDataService','commonService','$location',
		function($scope,homeDataService,commonService,$location){
	homeDataService.gethomeData({"group":"discount","page":1},function(data){
		$scope.listData = data;
		console.log(data);
	},commonService.alertInfo);
	
	
	$scope.showinfo = function(index){
		var id = $scope.listData[index].applicationId;
		$location.path('/tabs/appInfoD/'+id);
	}
	
	
}])
	 
app.controller('gratisCtrl', ['$scope', 'homeDataService','commonService', function($scope,homeDataService,commonService){
	
	homeDataService.gethomeData({"group":"gratis","page":1},function(data){
		$scope.listData = data;
		console.log(data);
	},commonService.alertInfo);
	
	
	
}])
	 
app.controller('infoCtrl', ['$scope', 'infoDataService','commonService', '$location',
function($scope,infoDataService,commonService,$location){
	infoDataService.getappinfoData(function(data){
		$scope.infoData = data;
		console.log(data);
		
	},commonService.alertInfo);
	
	
	
}])
	 
//自定义的服务
//处理数据结构的
app.service('infoDataService', ['$http', 'global', function($http, global){
	
	//请求应用详情数据
	this.getappinfoData = function(successCallBack, errorCallBack){
		
		$http.get(global.getPath()+'/appinfo&id=455680974.json')
		.success(function(data){
			successCallBack(data);
		})
		.error(function(error, code){
			console.log(error,code)
			console.log('请求失败');
			/*
			 200+ 请求成功
			 300+ 重定向
			 400+ 本地代码错误，请求错误,找不到文件
			 500+ 服务器错误
			 * 
			 * */
			errorCallBack('', code)
		})
	}
	
	
	
	
}])
app.controller('homeCtrl', ['$scope', 'homeDataService','commonService', '$location',
function($scope,homeDataService,commonService,$location){
	
	$scope.page = 1;
	$scope.ifshowLoadMore = true;
	homeDataService.gethomeData({"group":"home","page":$scope.page},function(data){
		$scope.listData = data;
	},commonService.alertInfo);
	
	
	$scope.showinfo = function(index){
		var id = $scope.listData[index].applicationId;
		$location.path('/tabs/appInfo/'+id);
	}

	
	$scope.setBtn = function(){
		$location.path('/tabs/set');
	}
	
	//加载更多的事件
	$scope.loadMoreData = function(){
		$scope.page += 1;
		if( $scope.page >3)
		{
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.ifshowLoadMore = false;
			return;
		}
		homeDataService.gethomeData({"group":"home","page":$scope.page},function(data){
			$scope.listData = $scope.listData.concat(data);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		
		},
		function(){
			$scope.$broadcast('scroll.infiniteScrollComplete');
			commonService.alertInfo();
		}
		);

	}
	
		//下拉刷新
	$scope.refresh = function(){
		
		$scope.page = 1;
		$scope.ifshowLoadMore = true;
		homeDataService.gethomeData({"group":"home","page":$scope.page},function(data){
			$scope.listData = data;
			$scope.$broadcast('scroll.refreshComplete');
			
		},
		function(){
			commonService.alertInfo();
			$scope.$broadcast('scroll.refreshComplete');
		});
		
	}
	
			
	
	
	
}])
	 
//自定义的服务
//处理数据结构的
app.service('homeDataService', ['$http', 'global', function($http, global){
	
	//主页面栏目切换的数据
	this.gethomeData = function(obj,successCallBack, errorCallBack){
		
		$http.get(global.getPath()+'/'+ obj.group +'Data&page=' + obj.page + '.json')
		.success(function(data){
			successCallBack(data.applications);
		})
		.error(function(error, code){
			console.log(error,code)
			console.log('请求失败');
			/*
			 200+ 请求成功
			 300+ 重定向
			 400+ 本地代码错误，请求错误,找不到文件
			 500+ 服务器错误
			 * 
			 * */
			errorCallBack('', code)
		})
	}
	
	
	//请求底部导航栏数据
	this.getTabsData = function(successCallBack, errorCallBack){
		
		$http.get(global.getPath()+'/tabsData.json')
		.success(function(data){
			successCallBack(data);
		})
		.error(function(error, code){
			console.log(error,code)
			console.log('请求失败');
			errorCallBack('', code)
		})
	}
	
}])


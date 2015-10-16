var app = angular.module("product_app", ['ngRoute','angularUtils.directives.dirPagination']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/',
	{
		templateUrl : 'templates/product_form.html',
		controller : 'product_form_controller'
	})
	.when('/add_product',
	{
		templateUrl : 'templates/product_form.html',
		controller : 'product_form_controller'
	})
	.when('/product_listing',
	{
		templateUrl : 'templates/product_listing.html',
		controller : 'product_listing_controller'
	})
	.when('/edit_product/:id',
	{
		templateUrl : 'templates/product_edit.html',
		controller : 'product_edit_controller'
	})
}]);
app.controller("product_form_controller",function($scope, $http)
{
	$scope.stepsModel = [];
	   $scope.path1 = [];

		$scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
    	console.log(files);
		 	
  $scope.file = [];
angular.forEach(files ,function(value, key){

	$scope.file.push(value.name);
	}, $scope.file);
		 
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
			  
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 var path=reader.readAsDataURL(file);
				  
         }
		
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
			$scope.path1.push(e.target.result);
			
        });
    }
	$scope.url='api/submit.php';
	$scope.formsubmit = function(isValid) {
		if (isValid) {
			$http.post($scope.url,{
			"pname": $scope.pname, 
			"pdiscription":$scope.pdiscription,
			"price":$scope.price,
			"file":$scope.file,
			"path":$scope.path1
			}).success(function(data,status){
				console.log(data);
				$scope.data=data;
				$scope.status=status;
				location.href="#/product_listing";
			});
		}
	}
});
 app.controller('product_listing_controller', function($scope, $http,$location, $filter) {
    $http.get("http://172.16.10.22/~ssipolya/Angular Js/Product App/api/getListing.php")
    .success(function(response) {$scope.lists = response;});

	 $scope.url = 'api/product_delete.php';
	$scope.prod_delete = function(index) {  
	var x= confirm("Are you sure to delete it?");
	if(x){
      $http.post($scope.url,
            {
                'prod_index'     : index
            }
        )      
		.success(function (data, status, headers, config) {           	$location.path('/#/product_listing');
			$route.reload();   
		})

        .error(function(data, status, headers, config){
           
        });
}
	}	
  });
app.controller("product_edit_controller", function($scope,$http, $routeParams){
	$scope.Editurl="api/edit_product.php";
	$http.get($scope.Editurl + "?prod_index=" + $routeParams.id)
		.success(function(response){
			$scope.list = response;
			//console.log(response.price);
			$scope.pname = $scope.list.pname;
			$scope.pdiscription = $scope.list.pdiscription;
			$scope.price =console.log(response.price);
			$scope.file = response.file;
		});
	 
	$scope.stepsModel = [];
	$scope.path1 = [];
	$scope.imageUpload = function(event){
		var files = event.target.files; //FileList object
		console.log(files);
		$scope.file = [];
		angular.forEach(files ,function(value, key){
			$scope.file.push(value.name);
			}, $scope.file);
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var reader = new FileReader();
				reader.onload = $scope.imageIsLoaded; 
				var path=reader.readAsDataURL(file);
			}
	
	}

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
			$scope.path1.push(e.target.result);
		});
    }
	$scope.url='api/update_product.php';
	$scope.formUpdate = function(isValid) {
		if (isValid) {
		
			$http.post($scope.url,{
			"id" :$routeParams.id,
			"pname": $scope.pname, 
			"pdiscription":$scope.pdiscription,
			"price":$scope.price,
			"file":$scope.file,
			"path":$scope.path1
			})
			.success(function(data,status){
				//console.log(data);
				$scope.data=data;
				$scope.status=status;
				$location.path('/#/product_listing');
			$route.reload(); 
			});
		}
	}


});	

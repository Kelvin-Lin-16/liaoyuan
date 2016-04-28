/**
 * Created by KelvinLin on 4/27/16.
 */
var app = angular.module('ShortenURLDemo',[]);

app.run(function($rootScope){});

app.controller('urlController', function($scope, $http){

    $scope.load = function(){
        $http.get('/api/url').success(function(data, status) {
            $scope.urls = data;
        }).error(function(data, status) {
            alert(status);
        });
    }

    $scope.shorten = function(){
        var originalURL = $scope.originalURL;
        $http.post("/api/url/", {'originalURL':originalURL}).success(function(data, status) {
            $scope.load();
            $scope.newURL = data;
        }).error(function(data, status) {
            alert(status);
        });
    }
});
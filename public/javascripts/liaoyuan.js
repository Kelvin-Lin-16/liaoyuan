/**
 * Created by KelvinLin on 4/27/16.
 */

angular.module('liaoyuan',[]).controller('urlController', function($scope, $http){

    $scope.load = function(){
        $http.get('/api/url').success(function(data, status) {
            console.log(data);
            $scope.urls = data;
        }).error(function(data, status) {
            console.log(status,data);
        });
    }

    $scope.shorten = function(){
        var originalURL = $scope.originalURL;
        $http.post("/api/url", {'originalURL':originalURL}).success(function(data, status) {
            $scope.load();
            $scope.newURL = data;
        }).error(function(data, status) {
            console.log(status,data);
        });
    }
});
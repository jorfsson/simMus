angular.module('app')
.service('itemsService', function($http) {
  this.getAll = function(callback, query) {
    $http({
      method: 'POST',
      url: '/search',
      params: {
        body: query
      }
    })
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  this.getInfo = function(callback, query) {
    $http({
      method: 'POST',
      url: '/details',
      params: {
        body: query
      }
    })
    .then(function({data}) {
      if(callback) {
        console.log(data)
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
});

angular.module('app')
.component('search', {
  bindings: {
    items: '<',
    search: '<'
  },
  controller: function() {
  },
  templateUrl: '/templates/search.html',
});

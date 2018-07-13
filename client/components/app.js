angular.module('app')
.controller('AppCtrl', function(itemsService) {
  itemsService.getAll((data) => {
    this.items = data;
  });;
  this.searchedTerm = null;
  this.search =  function(value) {
    this.searchedTerm = value
    console.log('hello', this.searchedTerm)
  }
  this.search = this.search.bind(this);
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});

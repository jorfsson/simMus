angular.module('app')
.controller('AppCtrl', function(itemsService) {
  // itemsService.getAll((data) => {
  //   console.log(data)
  // }, this.searchedTerm);

  this.searchedTerm = 'Cher';
  this.search =  function(value) {
    this.searchedTerm = value
    console.log(this.searchedTerm)
    itemsService.getAll((data) => {
      console.log(data)
    }, this.searchedTerm);
  };
  this.search = this.search.bind(this);
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});

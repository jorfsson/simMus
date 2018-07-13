angular.module('app')
.component('search', {
  bindings: {
    items: '<',
    search: '<'
  },
  controller: function() {
    // this.data = null;
    // this.search = function(){
    //   this.data = this.value;
    //   console.log('hello', this.data)
    // }
  },
  templateUrl: '/templates/search.html',
});

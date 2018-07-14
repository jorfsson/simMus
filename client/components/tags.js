angular.module('app')
.component('tag', {
  bindings: {
    tag: '<',
  },
  controller: function() {
    console.log(this)
  },
  templateUrl: '/templates/tags.html',
});

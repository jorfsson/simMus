angular.module('app')
.controller('AppCtrl', function(itemsService) {
  // itemsService.getAll((data) => {
  //   console.log(data)
  // }, this.searchedTerm);
  this.similarArtists = [];
  this.searchedTerm = 'Cher';
  this.search =  function(value) {
    this.searchedTerm = value
    itemsService.getAll((data)=>{
      this.similarArtists = data.similarartists.artist
    }, this.searchedTerm);
    // this.similarArtists.forEach((artist)=>{
    //   itemsService.getInfo((data) => {console.log(data)}, artist.name)
    // });
  };
  this.search = this.search.bind(this);
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});

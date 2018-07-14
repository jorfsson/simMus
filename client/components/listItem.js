angular.module('app')
.component('listItem', {
  bindings: {
    item: '<',
  },
  controller: function(itemsService) {
    // this.artist = null;
    this.getDetails = function() {
      itemsService.getInfo((data) => {
        this.artist = data.artist;
        this.tags = data.artist.tags.tag;
      }, this.item.name)
    }
  },
  templateUrl: '/templates/list-item.html'
});

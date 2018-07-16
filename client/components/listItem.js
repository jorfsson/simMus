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
        this.bio = data.artist.bio.summary.split('. ')
        this.bio.pop();
        this.bio = this.bio.join('. ')
      }, this.item.name)
    }
  },
  templateUrl: '/templates/list-item.html'
});

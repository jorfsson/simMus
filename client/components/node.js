angular.module('app')
.component('node', {
  bindings: {
    data: '<',
  },
  controller: function(itemsService) {
    // this.artist = null;
  },
  templateUrl: '/templates/node.html'
})
.directive('ghVisualizer', function(){

  // var width = 640,
  //     height = 480;
  // var nodes = [
  //     { x:   width/3, y: height/2 },
  //     { x: 2*width/3, y: height/2 }
  // ];
  // var links = [
  //   { source: 0, target: 1 }
  // ];
  return {
    restrict: 'E',

    link: function (scope, element, attrs) {

      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);

      function createNodes(){

      var force = d3.layout.force()
      .size([width, height])
      .nodes(nodes)
      .links(links);



      force.linkDistance(width/2);

      var link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');

      var node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node');

      force.on('end', function() {


      node.attr('r', width/25)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

      link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });


      });
      force.start();
      }
      createNodes()
    }
  }
})

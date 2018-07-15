const D3Node = require('d3-node')
const d3n = new D3Node()      // initializes D3 with container element
 d3n.createSVG(10,20).append('g') // create SVG w/ 'g' tag and width/height
 d3n.svgString()

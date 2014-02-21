getRandomInt = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
   }

addRandomNode = function(){
   idNum = cy.nodes().size(),
   setID = idNum.toString(),
   cy.add([{group: "nodes",
            data: {"id": setID,
                   "name": "added",
                   "resources": [],
                   "properties": []
                   },
             position: {
                x: getRandomInt(100,800),
                y: getRandomInt(100,500),
                },
             }]); // cy.add
   }; // addRandomNode


addRandomEdge = function(){
   nodeCount = cy.nodes().size()
   edgeCount = cy.edges().size()
   idNum = edgeCount
   setID = idNum.toString(),
   sourceNode = getRandomInt(0, nodeCount-1)
   targetNode = getRandomInt(0, nodeCount-1)
   cy.add([{group: "edges",
            data: {"id": "e" + setID,
                   "source": sourceNode,
                   "target": targetNode
                   }
             }]); // cy.add
  }; // addRandomEdge

fitGraph = function() {
  cy.fit();
  cy.forceRender()
  } // fitGraph


freshLayout = function(){

   coseOptions = {
       name: 'cose',
       ready               : function() {},
       stop                : function() {},
       refresh             : 0,
       fit                 : true, 
       padding             : 30, 
       randomize           : true,
       debug               : false,
       nodeRepulsion       : 10000,
       nodeOverlap         : 10,
       idealEdgeLength     : 10,
       edgeElasticity      : 100,
       nestingFactor       : 5, 
       gravity             : 250, 
       numIter             : 100,
       initialTemp         : 200,
       coolingFactor       : 0.95, 
       minTemp             : 1
       };

   cy.layout(coseOptions);
   cy.fit()
   } // freshLayout


$(document).ready(function() {
   $('#addRandomNodeButton').click(addRandomNode);
   $('#addRandomEdgeButton').click(addRandomEdge);
   $('#layoutButton').click(freshLayout);
   $('#fitButton').click(fitGraph)

      // simulate a json network string obtained from a server: 2 nodes, no edges

   var JSONnetworkString = '{"nodes":[{"data":{"id" : "0"}},{"data" :{"id" : "1"}}]}'
   var network = jQuery.parseJSON(JSONnetworkString)
   var simpleStyle =  cytoscape.stylesheet().selector('node').css({
           'content': 'data(id)',
           'text-valign': 'center',
           'color': 'white',
           'text-outline-width': 2,
           'text-outline-color': '#888'
       }).selector('edge').css({
           'target-arrow-shape': 'triangle',
           'content': 'data(type)',
           'text-outline-color': '#FFFFFF',
           'text-outline-opacity': '1',
           'text-outline-width': 2,
           'text-valign': 'center',
           'color': '#777777',
           'width': '2px'
       }).selector(':selected').css({
           'background-color': 'black',
           'line-color': 'black',
           'target-arrow-color': 'black',
           'source-arrow-color': 'black',
           'color': 'black'
       })
   var $cy = $("#cy");
   $cy.cytoscape({
       elements: network,
       style: simpleStyle,
       showOverlay: false,
       minZoom: 0.1,
       maxZoom: 4.0,
       layout: {fit: true},
       ready: function() {
          cy = this;
            // catch mouse tap events, draw nodes at those spots
          cy.on('tap', function(e) {
              if(e.cyTarget === cy) {
                 var nextNodeID = cy.nodes().size().toString()
                 offset = $cy.offset();
                  position = {
                     x: e.originalEvent.pageX - offset.left,
                     y: e.originalEvent.pageY - offset.top
                     };
                  cy.add([{group: "nodes",
                            data: {"id":  "" + nextNodeID,
                                   "resources": [],
                                   "properties": []
                                   },
                          renderedPosition: {x: position.x,
                                             y: position.y
                                             },
                          }]); // cy.add
                  } // cyTarget === cy
              }); // cy.on

          } // ready
       }); // cy initializer: cytoscape

   })  // document ready

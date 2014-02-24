$(document).ready(function() {
   console.log("document ready");
   var $cy = $("#cy");
   $cy.cytoscape({
       elements: network.elements,
       style: vizmap[0].style,  // the first style is the one we want
       showOverlay: false,
       minZoom: 0.1,
       maxZoom: 4.0,
       layout: {
         name: 'preset',
         fit: true
         },
    ready: function() {
        console.log("cy ready");
        cy = this;
        cy.on('tap', function(e) {
            if(e.cyTarget === cy) {
               var idNum = cy.nodes().size();
               setID = idNum.toString();
               offset = $cy.offset();
                position = {
                   x: e.originalEvent.pageX - offset.left,
                   y: e.originalEvent.pageY - offset.top
                   };
                cy.add([{group: "nodes",
                          data: {"id": "n" + setID,
                                 "resources": [],
                                 "properties": []
                                 },
                        renderedPosition: {x: position.x,
                                           y: position.y
                                           },
                        }]); // cy.add
                } // cyTarget === cy
            }); // cy.on
        } // cy ready
   }); // cy initializer: cytoscape
})  // document ready

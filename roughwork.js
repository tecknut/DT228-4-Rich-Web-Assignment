//if (Meteor.isClient) {
//
//    Meteor.startup(function(){
//
//    this.draw = function(x,y,radius,numOfSides) {
//
//        var points = 6;
//        var width = x;
//        var height = y;
//        var angle = ((2 * Math.PI) / points);
//        var hexagon = [];
//        context.strokeStyle = '#0000FF';
//        context.lineWidth = 2;
//
//        for (i = 0; i < points; i++) {
//            hexagon.push({
//                'x': radius * Math.cos(angle * i) + x,
//                'y': radius * Math.sin(angle * i) + y
//            })
//        }
//        $(hexagon).each(function(index,hex){
//            if (index < 6 ){
//                context.moveTo(hexagon[(index + 1) % 6].x, hexagon[(index + 1) % 6].y);
//                context.lineTo(hex.x, hex.y);
//                console.log(hex.x + ' '+ hex.y);
//                context.stroke();
//            }
//        });
//
//    };
//
//    this.deg2rad = function (ang) {
//        return ang * (Math.PI/180.0);
//    };
//
//    // Get the canvas 2d drawing context
//    var canvas = document.getElementById('canvas');
//    var context = canvas.getContext('2d');
//
//    // Calling drawPolygon to draw a hexagon
//    this.draw(0,0,40,3);
//    this.draw(60,35,40,3);
//    this.draw(120,70,40,3);
//    this.draw(180,105,40,3);
//    });
//
//}
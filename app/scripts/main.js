//inspired by http://product.voxmedia.com/post/68085482982/polygon-feature-design-svg-animations-for-fun-and



//If you want to add SVG to the DOM, jQuery won't do
//http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html

function SVG(tag) {
    'use strict';

    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}



function replaceRectsWithPaths() {

    'use strict';

    //REPLACE RECTS WITH PATHS SO WE CAN ANIMATE THEM

    //get all the rects!
    var rects = $('rect');

    $.each(rects, function() {

        var rectX = $(this).attr('x');
        var rectY = $(this).attr('y');

        var rectX2 = parseFloat(rectX) + parseFloat($(this).attr('width'));
        var rectY2 = parseFloat(rectY) + parseFloat($(this).attr('height'));

        var convertedPath = 'M' + rectX + ',' + rectY + ' ' + rectX2 + ',' + rectY + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX + ',' + rectY2 + ' ' + rectX + ',' + rectY;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .insertAfter(this);

    });

    //remove the original rects
    $(rects).remove();

}




function replaceCirclesWithPaths() {

    'use strict';

    //REPLACE CIRCLES WITH PATHS SO WE CAN ANIMATE THEM

    //get all the circles!
    var circles = $('circle');

    $.each(circles, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var r = $(this).attr('r');
        var r2 = parseFloat(r * 2);

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-r) + ', 0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + r2 + ',0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + (-r2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .insertAfter(this);

    });

    //remove the original rects
    $(circles).remove();
}




function replaceEllipsesWithPaths() {

    'use strict';

    //REPLACE ELLIPSES WITH PATHS SO WE CAN ANIMATE THEM

    //get all the circles!
    var ellipses = $('ellipse');

    $.each(ellipses, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var rX = $(this).attr('rx');
        var rY = $(this).attr('ry');

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-rX) + ', 0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + rX*2 + ',0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + (-rX*2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .insertAfter(this);

    });

    //remove the original ellipses
    $(ellipses).remove();
}




function replacePolygonsWithPaths() {

    'use strict';

    //REPLACE POLYGONS WITH PATHS SO WE CAN ANIMATE THEM
    //get all the circles!

    var polygons = $('polygon');

    $.each(polygons, function() {

        var points = $(this).attr('points');
        var polyPoints = points.split(/[ ,]+/);
        var endPoint = polyPoints[0] + ', ' + polyPoints[1];

        $(SVG('path'))
        .attr('d', 'M' + points + ' ' + endPoint)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .insertAfter(this);

    });

    //remove the original polygons
    $(polygons).remove();
}




function replacePolylinesWithPaths() {

    'use strict';

    //REPLACE POLYLINES WITH PATHS SO WE CAN ANIMATE THEM
    //get all the circles!

    var polylines = $('polyline');

    $.each(polylines, function() {

        var points = $(this).attr('points');

        $(SVG('path'))
        .attr('d', 'M' + points)
        .attr('fill', 'none')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .insertAfter(this);

    });

    //remove the original polylines
    $(polylines).remove();
}



function drawSVGPaths() {

    'use strict';

    //grab all PATHs from an SVG-Element
    var paths = $('path');

    //for each PATH..
    $.each( paths, function() {

        //get the total length
        var totalLength = this.getTotalLength();

        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
            //,'stroke-width': 100
        });

        //animate
        $(this).animate({
            'stroke-dashoffset': 0
            //,'stroke-width': 1
        }, {
            duration: 2000 //$(this).data('speed')
            //,easing: $(this).data('easing')
        });
    });
}


replaceRectsWithPaths();
replaceEllipsesWithPaths();
replaceCirclesWithPaths();
replacePolygonsWithPaths();
replacePolylinesWithPaths();
drawSVGPaths();

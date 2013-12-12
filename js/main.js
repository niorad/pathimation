//inspired by http://product.voxmedia.com/post/68085482982/polygon-feature-design-svg-animations-for-fun-and



//If you want to add SVG to the DOM, jQuery won't do
//http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html

function SVG(tag) {
    'use strict';
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}



function replaceRectsWithPaths() {

    'use strict';

    var rects = $('rect');

    $.each(rects, function() {

        var rectX = $(this).attr('x');
        var rectY = $(this).attr('y');

        var rectX2 = parseFloat(rectX) + parseFloat($(this).attr('width'));
        var rectY2 = parseFloat(rectY) + parseFloat($(this).attr('height'));

        var convertedPath = 'M' + rectX + ',' + rectY + ' ' + rectX2 + ',' + rectY + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX + ',' + rectY2 + ' ' + rectX + ',' + rectY;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(rects).remove();
}




function replaceCirclesWithPaths() {

    'use strict';

    var circles = $('circle');

    $.each(circles, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var r = $(this).attr('r');
        var r2 = parseFloat(r * 2);

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-r) + ', 0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + r2 + ',0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + (-r2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(circles).remove();
}




function replaceEllipsesWithPaths() {

    'use strict';

    var ellipses = $('ellipse');

    $.each(ellipses, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var rX = $(this).attr('rx');
        var rY = $(this).attr('ry');

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-rX) + ', 0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + rX*2 + ',0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + (-rX*2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(ellipses).remove();
}




function replacePolygonsWithPaths() {

    'use strict';

    var polygons = $('polygon');

    $.each(polygons, function() {

        var points = $(this).attr('points');
        var polyPoints = points.split(/[ ,]+/);
        var endPoint = polyPoints[0] + ', ' + polyPoints[1];

        $(SVG('path'))
        .attr('d', 'M' + points + ' ' + endPoint)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(polygons).remove();
}




function replacePolylinesWithPaths() {

    'use strict';

    var polylines = $('polyline');

    $.each(polylines, function() {

        var points = $(this).attr('points');

        $(SVG('path'))
        .attr('d', 'M' + points)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(polylines).remove();
}



function drawSVGPaths() {

    'use strict';

    var paths = $('path');

    //for each PATH..
    $.each( paths, function() {

        //get the total length
        var totalLength = this.getTotalLength();


        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });

        //animate
        $(this).animate({
            'stroke-dashoffset': 0
        }, {
            duration: 6000 //$(this).data('speed')
            ,easing: 'easeOutCirc'
        });
    });
}


replaceRectsWithPaths();
replaceEllipsesWithPaths();
replaceCirclesWithPaths();
replacePolygonsWithPaths();
replacePolylinesWithPaths();
drawSVGPaths();

//форматирование чисел (для диаграмм)
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

var underline = function(ctx, text, x, y, size, color, thickness, offset) {
    var width = ctx.measureText(text).width;

    switch (ctx.textAlign) {
        case "center":
            x -= (width / 2);
            break;
        case "right":
            x -= width;
            break;
    }

    y += size + offset;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();

    return {
        x: x + width,
        y: y
    };
}

Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chartInstance.chart.ctx;

        chartInstance.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.getDatasetMeta(i);
            if (!meta.hidden) {
                var lastEl= dataset.data.length - 1;
                meta.data.forEach(function(element, index) {
                    ctx.fillStyle = element._model.borderColor;

                    var fontSize = 19;
                    var fontStyle = 'normal';
                    var fontFamily = 'BrutalBold';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    // Just naively convert to string for now

                    var dataString = "";


                    var padding = 20;
                    var position = element.tooltipPosition();
                    var thickness = 1;
                    position.x -= 10;
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';

                    if ((index != 0) && (index != lastEl)) {
                        dataString = number_format(dataset.data[index].toString(), 0, ',', ' ');

                        // draw text
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

                        // underline text
                        var underlinePoint = underline(ctx, dataString, position.x, position.y - (fontSize / 2) - padding, fontSize, element._model.borderColor, thickness, -5);

                        // draw line connecting text underline with point
                        ctx.beginPath();
                        ctx.strokeStyle = element._model.borderColor;
                        ctx.lineWidth = thickness;
                        ctx.moveTo(element._model.x, element._model.y);
                        ctx.lineTo(underlinePoint.x, underlinePoint.y);
                        ctx.stroke();
                    }


                });
            }
        });
    }
});
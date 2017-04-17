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
                meta.data.forEach(function(element, index) {
                    ctx.fillStyle = element._model.borderColor;

                    var fontSize = 19;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    // Just naively convert to string for now

                    var dataString = "";


                    var padding = 20;
                    var position = element.tooltipPosition();
                    var thickness = 1;
                    position.x -= 10;
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';

                    if ((index != 0) && (index != 4)) {
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
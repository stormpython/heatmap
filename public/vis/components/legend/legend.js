var d3 = require('d3');
var gGenerator = require('plugins/heatmap/vis/components/elements/g');
var rectGenerator = require('plugins/heatmap/vis/components/elements/rect');

function legend() {
  var cssClass = 'legend';
  var transform = 'translate(0,0)';
  var rectWidth = 20;
  var rectHeight = 20;
  var fill = function (d) { return d.color; };
  var fillOpacity = 1;
  var stroke = '#ffffff';
  var strokeWidth = 1;
  var strokeOpacity = 1;
  var textPadding = 5;
  var textAnchor = 'start';
  var legTitle = 'Legend';
  var scale = d3.scale.quantize();
  var g = gGenerator();
  var block = gGenerator();
  var legendTitle = gGenerator();
  var rect = rectGenerator();

  function generator(selection) {
    selection.each(function (datum) {
      g.cssClass(cssClass).transform(transform);

      d3.select(this)
        .datum([datum])
        .call(g)
        .selectAll('g.' + cssClass)
        .each(function (data) {
          var unit = d3.select(this);

          block.cssClass('block')
            .transform(function (d, i) {
              return 'translate(0,' + (rectHeight * i) + ')';
            });

          legendTitle.cssClass('legend-title')
            .transform('translate(0, -10)');

          unit
            .datum([{}])
            .call(legendTitle);

          var title = unit.selectAll('g.legend-title').selectAll('text')
            .data([data]);

          title.exit().remove();
          title.enter().append('text');
          title.text(legTitle);

          unit
            .datum(data)
            .call(block)
            .selectAll('g.block')
            .each(function (d, i) {
              rect
                .class('legend-cell')
                .x(0)
                .y(0)
                .rx(0)
                .ry(0)
                .width(rectWidth)
                .height(rectHeight)
                .fill(function (d, i) {
                  return scale(d);
                })
                .fillOpacity(fillOpacity)
                .stroke(stroke)
                .strokeWidth(strokeWidth)
                .strokeOpacity(strokeOpacity);

              var unit = d3.select(this)
                .datum([d])
                .call(rect);

              var ex = unit.selectAll('text.legend-text')
                .data([d]);

              ex.exit().remove();
              ex.enter().append('text').attr('class', 'legend-text');

              ex
                .attr('x', function () { return rectWidth + textPadding; })
                .attr('y', function () { return rectHeight / 2; })
                .attr('dx', '')
                .attr('dy', '.32em')
                .style('text-anchor', textAnchor)
                .text(function () {
                  return (i === data.length - 1) ? Math.round(d) : Math.round(d) + ' - ' + Math.round(data[i + 1]);
                });
            });
        });
    });
  }

  // Public API
  generator.class = function (v) {
    if (!arguments.length) { return cssClass; }
    cssClass = v;
    return generator;
  };

  generator.transform = function (v) {
    if (!arguments.length) { return transform; }
    transform = v;
    return generator;
  };

  generator.rectWidth = function (v) {
    if (!arguments.length) { return rectWidth; }
    rectWidth = v;
    return generator;
  };

  generator.rectHeight = function (v) {
    if (!arguments.length) { return rectHeight; }
    rectHeight = v;
    return generator;
  };

  generator.fill = function (v) {
    if (!arguments.length) { return fill; }
    fill = v;
    return generator;
  };

  generator.fillOpacity = function (v) {
    if (!arguments.length) { return fillOpacity; }
    fillOpacity = v;
    return generator;
  };

  generator.stroke = function (v) {
    if (!arguments.length) { return stroke; }
    stroke = v;
    return generator;
  };

  generator.strokeWidth = function (v) {
    if (!arguments.length) { return strokeWidth; }
    strokeWidth = v;
    return generator;
  };

  generator.strokeOpacity = function (v) {
    if (!arguments.length) { return strokeOpacity; }
    strokeOpacity = v;
    return generator;
  };

  generator.text = function (v) {
    if (!arguments.length) { return text; }
    text = v;
    return generator;
  };

  generator.textPadding = function (v) {
    if (!arguments.length) { return textPadding; }
    textPadding = v;
    return generator;
  };

  generator.textAnchor = function (v) {
    if (!arguments.length) { return textAnchor; }
    textAnchor = v;
    return generator;
  };

  generator.title = function (v) {
    if (!arguments.length) { return legTitle; }
    legTitle = v;
    return generator;
  };

  generator.scale = function (v) {
    if (!arguments.length) { return scale; }
    scale = v;
    return generator;
  };

  return generator;
}

module.exports = legend;

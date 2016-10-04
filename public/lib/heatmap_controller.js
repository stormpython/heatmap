var _ = require('lodash');
var module = require('ui/modules').get('heatmap');

module.controller('HeatmapController', function ($scope, Private) {
  var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

  function getLabel(agg, name) {
    return agg.bySchemaName[name] ? agg.bySchemaName[name][0].makeLabel() : '';
  }

  function processTableGroups(tableGroups, $scope) {
    var columnAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['columns'], 'id'));
    var rowAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['rows'], 'id'));
    var metricsAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['metric'], 'id'));
    var dataLabels = { [columnAggId]: 'col', [rowAggId]: 'row', [metricsAggId]: 'value' };

    var cells = [];

    tableGroups.tables.forEach(function (table) {
      table.rows.forEach(function (row) {
        var cell = {};

        table.columns.forEach(function (column, i) {
          var fieldFormatter = table.aggConfig(column).fieldFormatter();
          // Median metric aggs use the parentId and not the id field
          var key = column.aggConfig.parentId ? dataLabels[column.aggConfig.parentId] : dataLabels[column.aggConfig.id];

          if (key) {
            cell[key] = key !== 'value' ? fieldFormatter(row[i]) : row[i];
          }
        });

        // if no columns or rows, then return '_all'
        if (!cell.col && !cell.row) {
          cell['col'] = '_all';
        }

        cells.push(cell);
      });
    });

    return cells;
  };

  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.data = null;
      return;
    }
	
    // Add row, column, and metric titles as vis parameters
    _.merge($scope.vis.params, {
      rowAxis: { title: getLabel($scope.vis.aggs, 'rows') },
      columnAxis: { title: getLabel($scope.vis.aggs, 'columns') },
      legendTitle: getLabel($scope.vis.aggs, 'metric')
    });

    $scope.data = [{
      cells: processTableGroups(tabifyAggResponse($scope.vis, resp), $scope)
    }];
	
	  $scope.eventListeners = {
      mouseover: [ mouseover ],
      mouseout: [ mouseout ],
      mousemove: [ mousemove ]
    };	

  	function mouseover(event) {
      mousemove(event);
    };

    function mousemove(event){
      var target = d3.select(event.target);
      var isHeatmapCell = (target.attr("class") === "cell");

      if (isHeatmapCell) {
        // get data bound to heatmap cell
        var d = _.first(target.data());
        // Custom code for tooltip functionality goes here
        $scope.$apply(function () {   
          var params = $scope.vis.params; 

          $scope.tooltipItems = Object.keys(d)
            .filter(function (key) { return key !== "data"; })
            .map(function (key) {

              var title = d3.selectAll('text.title');
              var value = d[key];
              
              if (key.toUpperCase() === 'ROW'){                          
                key = params.columnAxis.title || 'ROW';
              }

              if (key.toUpperCase() === 'COL'){
                key = params.rowAxis.title || 'COL';
              }

              return {
                key: key.toUpperCase(),
                value: value
              };
            });

            var svgParent = $(".parent"); 
            var tooltip = $('.heatmap-tooltip');
            var width = event.clientX + tooltip.width();
            var height = event.clientY + tooltip.height();
            var top = event.pageY - svgParent.offset().top;
            var left = event.pageX - svgParent.offset().left;

            if ($(window).width() < width){
              $scope.left = left - tooltip.width() / 2;
            }else{
              $scope.left = left;
            }

            if ($(window).height() < height){
              $scope.top = top - tooltip.height();
            }else{
              $scope.top = top;
            } 
        });
      }
    };

    function mouseout(event){
      $scope.$apply(function () {
        $scope.tooltipItems = [];
        $scope.top = 0;
        $scope.left = 0;
      });
    }
  });
});

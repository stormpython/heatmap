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
      mouseout: [ mouseout ]
    };	

  	function mouseover(event) {
      var target = d3.select(event.target);
      var isHeatmapCell = (target.attr("class") === "cell");
      var OFFSET = 50;

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
              if (key.toUpperCase() === 'ROW') {                            
                key = params.columnAxis.title || 'ROW';
              }
              if (key.toUpperCase() === 'COL') {
                key = params.rowAxis.title || 'COL';
              }
              return {
                key: key.toUpperCase(),
                value: value
              };
            });
          
          $scope.top = d.data.row + parseInt(params.margin.top) + OFFSET;
          $scope.left = d.data.col + parseInt(params.margin.left) + OFFSET;
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

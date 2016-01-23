var _ = require('lodash');

var module = require('ui/modules').get('heatmap');

module.controller('HeatmapController', function ($scope) {
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.data = null;
      return;
    }

    var rowAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['row'], 'id'));
    var columnAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['column'], 'id'));
    var metricsAgg = _.first($scope.vis.aggs.bySchemaName['metric']);

    var rows = resp.aggregations[rowAggId].buckets;
    var columns = resp.aggregations[columnAggId] ? resp.aggregations[columnAggId].buckets || [];

    var cells = rows.map(function (bucket) {
      return columns.map(function (subBucket) {
        var metricVal = subBucket || bucket;

        return {
          row: bucket.key,
          column: subBucket ? subBucket.key : undefined,
          value: metricsAgg.getValue(metricVal)
        };
      });
    });

    $scope.data = [{ cells: cells}];
  });
});

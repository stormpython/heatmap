var _ = require('lodash');

var module = require('ui/modules').get('heatmap');

module.controller('HeatmapController', function ($scope) {
  $scope.$watch('esResponse', function (resp) {
    if (!resp) {
      $scope.data = null;
      return;
    }

    var columnAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['column'], 'id'));
    var rowAggId = _.first(_.pluck($scope.vis.aggs.bySchemaName['row'], 'id'));
    var metricsAgg = _.first($scope.vis.aggs.bySchemaName['metric']);

    var columns = resp.aggregations[columnAggId].buckets;

    var cells = columns.map(function (bucket) {
      var key = bucket.key;
      var rows = bucket[rowAggId] ? bucket[rowAggId].buckets : undefined;

      if (rows) {
        return rows.map(function (subBucket) {
          return {
            col: key,
            row: subBucket.key,
            value: metricsAgg.getValue(subBucket)
          };
        });
      }

      return {
        col: key,
        row: undefined,
        value: metricsAgg.getValue(bucket)
      }
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);

    $scope.data = [{ cells: cells }];
  });
});

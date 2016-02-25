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

    function aggregate(resp, columnAggId, rowAggId) {
      var columns = resp.aggregations[columnAggId];
      var rows = resp.aggregations[rowAggId];
      var first = columns ? columns.buckets : rows.buckets;

      return first.map(function (bucket) {
        var key = bucket.key;
        var second;

        if (columns && bucket[rowAggId]) {
          second = bucket[rowAggId].buckets;
        } else if (rows && bucket[columnAggId]) {
          second = bucket[columnAggId].buckets;
        }

        if (second) {
          return second.map(function (subBucket) {
            return {
              col: columns ? key : subBucket.key,
              row: rows ? key : subBucket.key,
              value: metricsAgg.getValue(subBucket)
            };
          });
        }

        return {
          col: columns ? key : undefined,
          row: rows ? key : undefined,
          value: metricsAgg.getValue(bucket)
        };
      });
    }

    var cells = resp.aggregations ? aggregate(resp, columnAggId, rowAggId)
      .reduce(function (a, b) {
        return a.concat(b);
      }, []) : [{
        col: '_all',
        row: undefined,
        value: resp.total
      }];

    $scope.data = [{ cells: cells }];
  });
});

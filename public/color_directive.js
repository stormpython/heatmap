var _ = require('lodash');
var colorbrewer = require('plugins/heatmap/vis/components/colorbrewer/colorbrewer');

var module = require('ui/modules').get('heatmap');

module.directive('colorMap', function () {
  function link (scope, element, attrs) {
    angular.element(document).ready(function () {
      scope.colorScale = colorbrewer[scope.name];
      scope.colors = scope.colorScale[scope.value];
      scope.min = _.first(Object.keys(scope.colorScale));
      scope.max = _.last(Object.keys(scope.colorScale));
      console.log(scope.min, scope.max);

      scope.$watch('name', function (newVal, oldVal) {
        scope.colorScale = colorbrewer[newVal];
        scope.colors = scope.colorScale[scope.value];
        scope.min = _.first(Object.keys(scope.colorScale));
        scope.max = _.last(Object.keys(scope.colorScale));
      });

      scope.$watch('value', function (newVal, oldVal) {
        scope.value = newVal;
        scope.colors = scope.colorScale[newVal];
      });
    });
  }

  return {
    restrict: 'E',
    scope: {
      name: '=',
      value: '='
    },
    template: require('plugins/heatmap/colors.html'),
    link: link
  };
});

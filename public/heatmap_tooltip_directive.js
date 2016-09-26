var d3 = require("d3");
var _ = require("lodash");
var module = require('ui/modules').get('heatmap');

module.directive('tooltip', function () {

  function controller($scope) {
    $scope.isShown = false;
     /*
      * Make sure that the items array is populated before tooltip is shown.
      * The items variable is an array of objects, e.g.
      *  [ 
      *    { key: "Column", value: "Tuesday" },
      *    { key: "Row", value: "12pm" }, 
      *    { key: "Count", value: 12 } 
      *  ]
      */
    this.showOnHover = function () {
      $scope.isShown = !!($scope.items && _.isArray($scope.items) && $scope.items.length);
    };

    this.hideOnOut = function(){
      $scope.isShown = false;
    };
  }

  function link(scope, element, attrs, ctrl) {
    function render($scope) {
      d3.select(_.first(element))
        .style("top", $scope.top + "px")
        .style("left", $scope.left + "px");

      ctrl.showOnHover();
    }

    scope.$watchGroup(["top", "left", "items"], function (newVal, oldVal, scope) {
      render(scope);
    }, 250);

    scope.$watch("ngShow", function (newVal) {
      ctrl.hideOnOut();
    });
  };

  return {
    restrict: "E",
    scope: {
      top: "=",
      left: "=",
      items: "=",
      ngShow: "="
    },
    replace: true,
    controller: controller,
    link: link,
    template: require("plugins/heatmap/heatmap_tooltip.html")
  };
});
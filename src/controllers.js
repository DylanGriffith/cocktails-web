var cocktails = angular.module('cocktails', []);

cocktails.controller('IngredientsController', function($scope, $http) {
  $http.get("/api/ingredients").success(function(data) {
      $scope.selected = [];
      $scope.ingredients = data.data;
    }).error(function() {
      alert("Something went wrong");
    });

  $scope.clickedIngredient = function(ingredientId) {
    if($scope.isSelected(ingredientId)) {
      $scope.unSelect(ingredientId);
    }else {
      $scope.select(ingredientId);
    }
  };

  $scope.isSelected = function(ingredientId) {
    return $scope.selected.indexOf(ingredientId) != -1;
  }

  $scope.unSelect = function(ingredientId) {
    var index = $scope.selected.indexOf(ingredientId);
    $scope.selected.splice(index, 1);
  }

  $scope.select = function(ingredientId) {
    $scope.selected.push(ingredientId);
  }
});

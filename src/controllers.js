var cocktails = angular.module('cocktails');

cocktails.controller('IngredientsController', function($scope, $http, SelectedIngredients) {
  $http.get("/api/ingredients").success(function(data) {
      $scope.selected = SelectedIngredients;
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

cocktails.controller('CocktailsController', function($scope, $http, SelectedIngredients) {
  $scope.cocktails = [];
  $scope.suggestClicked = function() {
    var thing = {
      url: "/api/cocktails",
      method: "GET",
      params: {"ingredient_ids[]": SelectedIngredients}
    };
    $http(thing).success(function(data) {
      $scope.expanded = [];
      $scope.cocktails = data.data;
    }).error(function() {
      alert("Something went wrong");
    });
  }

  $scope.ingredientsString = function(cocktail) {
    var names = _.map(cocktail.ingredients, function(ingredient) {
      return ingredient.name;
    });
    return names.join(", ");
  }

  $scope.clickedCocktail = function(cocktailId) {
    if($scope.isExpanded(cocktailId)) {
      $scope.unExpand(cocktailId);
    }else {
      $scope.expand(cocktailId);
    }
  }

  $scope.isExpanded = function(cocktailId) {
    return $scope.expanded.indexOf(cocktailId) != -1;
  }

  $scope.unExpand = function(cocktailId) {
    var index = $scope.expanded.indexOf(cocktailId);
    $scope.expanded.splice(index, 1);
  }

  $scope.expand = function(cocktailId) {
    $scope.expanded.push(cocktailId);
  }
});

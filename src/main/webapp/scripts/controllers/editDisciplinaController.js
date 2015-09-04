

angular.module('trabjava').controller('EditDisciplinaController', function($scope, $routeParams, $location, DisciplinaResource , CursoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.disciplina = new DisciplinaResource(self.original);
            CursoResource.queryAll(function(items) {
                $scope.cusroSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.disciplina.cusro && item.id == $scope.disciplina.cusro.id) {
                        $scope.cusroSelection = labelObject;
                        $scope.disciplina.cusro = wrappedObject;
                        self.original.cusro = $scope.disciplina.cusro;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Disciplinas");
        };
        DisciplinaResource.get({DisciplinaId:$routeParams.DisciplinaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.disciplina);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.disciplina.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Disciplinas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Disciplinas");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.disciplina.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("cusroSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.disciplina.cusro = {};
            $scope.disciplina.cusro.id = selection.value;
        }
    });
    
    $scope.get();
});
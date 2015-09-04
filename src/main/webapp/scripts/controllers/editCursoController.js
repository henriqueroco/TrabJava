

angular.module('trabjava').controller('EditCursoController', function($scope, $routeParams, $location, CursoResource , DisciplinaResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.curso = new CursoResource(self.original);
            DisciplinaResource.queryAll(function(items) {
                $scope.disciplinasSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.curso.disciplinas){
                        $.each($scope.curso.disciplinas, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.disciplinasSelection.push(labelObject);
                                $scope.curso.disciplinas.push(wrappedObject);
                            }
                        });
                        self.original.disciplinas = $scope.curso.disciplinas;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Cursos");
        };
        CursoResource.get({CursoId:$routeParams.CursoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.curso);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.curso.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Cursos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Cursos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.curso.$remove(successCallback, errorCallback);
    };
    
    $scope.disciplinasSelection = $scope.disciplinasSelection || [];
    $scope.$watch("disciplinasSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.curso) {
            $scope.curso.disciplinas = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.curso.disciplinas.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});
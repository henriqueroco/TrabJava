
angular.module('trabjava').controller('NewCursoController', function ($scope, $location, locationParser, CursoResource , DisciplinaResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.curso = $scope.curso || {};
    
    $scope.disciplinasList = DisciplinaResource.queryAll(function(items){
        $scope.disciplinasSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("disciplinasSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.curso.disciplinas = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.curso.disciplinas.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Cursos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CursoResource.save($scope.curso, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Cursos");
    };
});
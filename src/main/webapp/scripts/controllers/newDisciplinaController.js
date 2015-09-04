
angular.module('trabjava').controller('NewDisciplinaController', function ($scope, $location, locationParser, DisciplinaResource , CursoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.disciplina = $scope.disciplina || {};
    
    $scope.cusroList = CursoResource.queryAll(function(items){
        $scope.cusroSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("cusroSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.disciplina.cusro = {};
            $scope.disciplina.cusro.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Disciplinas/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        DisciplinaResource.save($scope.disciplina, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Disciplinas");
    };
});
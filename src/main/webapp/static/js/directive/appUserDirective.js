/**
 * Created by massimo_buonocore on 10/05/17.
 */

//-------------------------- AppUser Directives ------------------------------
/**
 * Directive fileModel is used for reading files
 */
appUser.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
//-------------------------- End AppUser Directives ------------------------------
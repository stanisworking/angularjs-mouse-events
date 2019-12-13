(function (app) {

    app
        .factory('mouseEvent', function () {
            var _event = null;
            var api = {
                set: function (event) { _event = event; },
                get: function () { return _event; },
                getType: function () { return _event.type; },
                getTarget: function () { return _event.target; }
            };

            return (api);
        });

    app
        .directive('mouseCapture', function ($document, mouseEvent) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {

                    function handle(event) {
                        event.preventDefault();
                        event.stopPropagation();

                        $scope.$apply(function () {
                            mouseEvent.set(event);
                        });
                    }

                    $document.on('contextmenu', handle);
                    $document.on('click', handle);

                    $scope.$on('$destroy', function (event) {
                        $document.off('contextmenu', handle);
                        $document.off('click', handle);
                    });
                }
            };
        });

})(angular.module('library'));
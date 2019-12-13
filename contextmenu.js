(function (app) {

    app.directive('contextMenu', function (mouseEvent) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                var menu = angular.element(document.getElementById($attrs.contextMenu));
                var show = false;

                function toggle(show) {
                    if (show) menu.addClass('show')
                    else menu.removeClass('show');
                }

                function setPosition(x, y) {
                    menu.css({
                        position: "fixed",
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    });
                }

                $scope.$watch(function () {
                    return mouseEvent.get();
                }, function (newVal, oldVal) {
                    if (newVal) {
                        var event = newVal;
                        var type = mouseEvent.getType();
                        var target = mouseEvent.getTarget();

                        if (type === 'contextmenu' && angular.equals(angular.element(target), $element)) {
                            toggle(true);
                            setPosition(event.pageX, event.pageY);
                        } else {
                            toggle(false);
                        }
                    }
                });

            }
        };
    });

})(angular.module('library'));
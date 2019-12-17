(function (app) {

    app
        .factory('contextMenuElement',
            function () {
                var _element = '';
                var _previousElement = '';

                var api = {
                    set: function (element) {
                        if (_element) _previousElement = _element;
                        _element = element;
                    },
                    get: function () { return _element; },
                    getPrevious: function () { return _previousElement; }
                };

                return (api);
            });

    app
        .directive('customContextmenu', function ($document, contextMenuElement) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {

                    function toggle(menu, state) {
                        if (state) menu.addClass('show');
                        else menu.removeClass('show');
                    }

                    function setPosition(menu, x, y) {
                        menu.css({
                            position: "fixed",
                            left: x + 'px',
                            top: y + 'px'
                        });
                    }

                    function handle(event) {
                        event.stopPropagation();
                        event.preventDefault();

                        var prevCtxMenu = angular.element(document.getElementById(contextMenuElement.getPrevious()));
                        var ctxMenu = angular.element(document.getElementById(contextMenuElement.get()));

                        toggle(prevCtxMenu, false);
                        toggle(ctxMenu, true);
                        setPosition(ctxMenu, event.pageX, event.pageY);

                    }

                    function cancel(event) {
                        var ctxMenu = angular.element(document.getElementById(contextMenuElement.get()));
                        toggle(ctxMenu, false);
                    }

                    var aElement = angular.element($element);
                    aElement.on('contextmenu', handle);
                    $document.on('click', cancel);

                    $scope.$on('$destroy', function (event) {
                        aElement.off('contextmenu', handle);
                        $document.off('click', cancel);
                    });
                }
            };
        });

})(angular.module('library'));
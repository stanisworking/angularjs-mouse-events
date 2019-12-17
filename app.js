(function (app) {

    app
        .controller('AppController', ['contextMenuElement', function (contextMenuElement) {
            var model = this;

            model.itemsForList = [];

            model.onItemClicked = function (event) {
                event.stopPropagation();

                if (event.button === 2) {
                    console.log('onItemClicked');
                    contextMenuElement.set('context2');
                }
            }

            model.onClicked = function (event) {
                event.stopPropagation();

                if (event.button === 2) {
                    console.log('onClicked');
                    contextMenuElement.set('context1');
                }
            }

            function onInit() {
                for (var i = 0; i < 3; i++) {
                    model.itemsForList.push('List #' + (i + 1));
                }
            }

            onInit();
        }]);

    app
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total);

                for (var i = 0; i < total; i++) {
                    input.push(i);
                }

                return input;
            };
        });

})(angular.module('library', []));
(function (app) {

    app.component('list', {
        bindings: {
            items: '<',
            onItemClicked: '&',
            onClicked: '&'
        },
        template:
            '<div class="p-5" ng-mousedown="model.onClicked({event: $event})">' +
            '<ul class="list-group">' +
            '<li class="list-group-item list-group-item-action" ng-repeat="item in model.items" ng-mousedown="model.onItemClicked({event: $event})">' +
            '<list-item label="{{item}}"></list-item>' +
            '</li>' +
            '</ul>' +
            '</div>',
        controller: function () {
            var model = this;
        },
        controllerAs: 'model'
    })

    app.component('listItem', {
        bindings: {
            label: '@'
        },
        template:
            '<span>{{ model.label }}</span>',
        controller: function () {

        },
        controllerAs: 'model'
    });

})(angular.module('library'));
(function (app) {

    app
        .factory('mouseEvent', function () {
            var _event = null;
            var api = {
                set: function (event) { _event = event; },
                get: function () { return _event; },
                getType: function () { return _event.type; },
                getTarget: function () { return _event.target; },
            };

            return (api);
        });

})(angular.module('library'));
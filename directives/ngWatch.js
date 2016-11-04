(function (angular) {
    'use strict';

    var app = angular.module('ngWatch');

    /**
     * Eases up the use watching elements and executing certain code upon firing change.
     * This proves particularly useful when tying multiple parts together
     * @param $parse
     * @example
        div(ngWatch="myCollection", on-change="displayPopup()", deep="true")
     */
    var ngWatch = function ($parse) {
        return {
            restrict: 'A',
            scope: true,
            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                        if (!attrs.ngWatch) {
                            throw 'ngWatch directive needs to receive a valid variable, an empty string received';
                        }

                        if (!attrs.onChange) {
                            throw 'ngWatch directive requires the use of on-change attribute!';
                        }

                        scope.$watch(function () {
                            return $parse(attrs.ngWatch, null, true)(scope);
                        }, function () {
                            $parse(attrs.onChange, null, true)(scope);
                        }, attrs.collection === 'true');
                    }
                };
            }
        };
    };

    /**
     * ngWatch directive Registered
     */
    app.directive('ngWatch', ngWatch);
}(angular));
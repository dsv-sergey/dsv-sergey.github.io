"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function HashRouter() {
    this.handleUrl(getHash());
    window.addEventListener("hashchange", function () {
        this.handleUrl(getHash());
    }.bind(this));
}

HashRouter.prototype = {
    handleUrl: function handleUrl(url) {
        var routes = this.routes || [];
        console.log(routes);
        var result = findRoute(routes, url);
        var route = result[0];
        var params = result[1];
        if (!route) {
            return;
        }

        Promise.resolve().then(function () {
            if (route.onBeforeEnter) {
                return route.onBeforeEnter.call(route, params);
            }
        }).then(function () {
            if (route.onEnter) {
                return route.onEnter.call(route, params);
            }
        }).then(function () {
            if (route.onLeave) {
                route.onLeave.call(route, params);
            }
        });
    }
};

function getHash() {
    return decodeURI(window.location.hash).slice(1);
};

function findRoute(routeList, url) {
    var result = [null, null];
    routeList.forEach(function (route) {
        if (result[0]) {
            return;
        } // если роут уже нашли - остальное не проверяем
        if (route.match === url) {
            result = [route, url];
        } else if (RegExp(route.match).test(url)) {
            result = [route, url.match(route.match)];
        } else if (typeof route.match === "function" && route.match.call(this, url)) {
            result = [route, route.match.call(this, url)];
            console.log(result);
        }
    });
    return result;
}

exports.default = HashRouter;
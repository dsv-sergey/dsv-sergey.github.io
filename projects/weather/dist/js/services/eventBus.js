"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function EventBus() {
    this.listeners = {};
}
EventBus.prototype.on = function (event, hendler) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(hendler);
};
EventBus.prototype.off = function (event, hendler) {
    if (this.listeners[event].includes(hendler)) {
        var habArr = this.listeners[event].filter(function (el, i, arr) {
            return el != hendler;
        });
        this.listeners[event] = habArr;
    }
};
EventBus.prototype.trigger = function (event, data) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].forEach(function (hendler) {
        hendler(data);
    });
};
EventBus.prototype.once = function (event, hendler) {
    var wrapper = function (arg) {
        hendler(arg);
        this.off(event, wrapper);
    }.bind(this);
    this.on(event, wrapper);
};

exports.default = EventBus;
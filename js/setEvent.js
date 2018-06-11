/**
 * @function
 * @param {string} classEl 
 * @param {string} event 
 * @param {function} fn 
 */
function setEvent(classEl, event, fn) {
    var elements = document.querySelectorAll(classEl);
    [].forEach.call(elements, function(el) {
        el.addEventListener(event, fn);
    });
}
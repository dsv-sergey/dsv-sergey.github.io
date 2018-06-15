/**
 * @function
 * @param {string} idEl 
 */
function createCalendar(idEl) {
    var htmlEl = document.getElementById(idEl),
        elCalendar = document.getElementById("calendar"),
        elAbout = document.getElementById("about");
    if (!elCalendar.hasAttribute("class")) {
        elCalendar.setAttribute("class", "hidden");
        elCalendar.innerHTML = "";
    }
    if (!elAbout.hasAttribute("class")) {
        elAbout.setAttribute("class", "hidden");
    }
    htmlEl.removeAttribute("class", "hidden");
    htmlEl.setAttribute("class", "createWrap");
	year = ((JSON.parse(localStorage.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(localStorage.getItem("name"))).date[0] : setDate("year"));
    month = ((JSON.parse(localStorage.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(localStorage.getItem("name"))).date[1] : setDate("month"));
    
    drawInteractiveCalendar("preShowCalendar", year, month);
}
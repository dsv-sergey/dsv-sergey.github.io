window.onhashchange = goLink;
setEvent('nav', 'click', goLink);
function goLink() {
    if (location.hash == "#calendar") {
        showCalendar({el : "calendar",
        showMonth : true,
        allowChange : true,
        allowAdd : true,
        allowRemove : true,
        date : [2018, 12],
        });
    }
    if (location.hash == "#create") {
        createCalendar("create");
    }
    if (location.hash == "#about") {
        goToAbout("about");
    }
}

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

function goToAbout(idEl) {
    var htmlEl = document.getElementById(idEl),
        elCalendar = document.getElementById("calendar"),
        elCreate = document.getElementById("create");
        elCreate.removeAttribute("class", "createWrap");
    if (!elCalendar.hasAttribute("class")) {
        elCalendar.setAttribute("class", "hidden");
        elCalendar.innerHTML = "";
    }
    if (!elCreate.hasAttribute("class")) {
        elCreate.setAttribute("class", "hidden");
    }
    htmlEl.removeAttribute("class", "hidden");
}

function drawInteractiveCalendar(idEl, year, month) {
    var htmlEl = document.getElementById(idEl)
    
    drawCalendar(year, month, htmlEl);
    addHtmlElements(year, month, htmlEl);
}
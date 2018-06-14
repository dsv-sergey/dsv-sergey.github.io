window.onhashchange = goLink;
setEvent('nav', 'click', goLink);
function goLink() {
    if (location.hash == "#calendar") {
        showCalendar("calendar");
    }
    if (location.hash == "#create") {
        createCalendar("create");
    }
    if (location.hash == "#about") {
        goToAbout("about");
    }
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
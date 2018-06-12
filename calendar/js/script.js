var list = localStorage;
window.onload = authorization;
/**
 * 
 */
function authorization() {
    if (!list.length) {
        var name,
            random1 = Math.floor(Math.random() * 1000),
            random2 = Math.floor(Math.random() * 1000);
        name = JSON.stringify({
            id: random1 + random2 + ": " + new Date()
        });
        list.setItem("name", name);
    } else {
        var author = JSON.parse(list.getItem("name")['id']);
    }
}
/**
 * 
 * @param {number} year 
 * @param {number} month 
 */
function setStorageItem(year, month) {
	var param = JSON.parse(list.getItem("name"));
	param.date = [year, month];
	list.setItem("name", JSON.stringify(param));
}
/**
 * 
 * @param {string} x 
 */
function setDate(x) {
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1;
    if (x == "year") {
        return year;
    } else {
        return month;
    }
}

window.onhashchange = goLink;
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

function showCalendar(idEl) {
    var htmlEl = document.getElementById(idEl),
        elCreate = document.getElementById("create"),
        elAbout = document.getElementById("about");
        elCreate.removeAttribute("class", "createWrap");
    if (!elCreate.hasAttribute("class")) {
        elCreate.setAttribute("class", "hidden");      
        preShowCalendar.innerHTML = "";
    }
    if (!elAbout.hasAttribute("class")) {
        elAbout.setAttribute("class", "hidden");
    }
	htmlEl.removeAttribute("class", "hidden");
	year = ((JSON.parse(list.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(list.getItem("name"))).date[0] : setDate("year"));
	month = ((JSON.parse(list.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(list.getItem("name"))).date[1] : setDate("month"));
    drawInteractiveCalendar(idEl, year, month);
}

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
	year = ((JSON.parse(list.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(list.getItem("name"))).date[0] : setDate("year"));
    month = ((JSON.parse(list.getItem("name")).hasOwnProperty('date')) ? (JSON.parse(list.getItem("name"))).date[1] : setDate("month"));
    
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

function addHtmlElements(year, month, htmlEl) {
    var caption = document.createElement("caption"),
        captionText = "",
        table = document.getElementById("myCalendar"),
        selectItem = document.querySelectorAll(".day"),
        monthRU = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ];

    captionText =
        "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
        "<button id='earlyMonth' style='width: auto; min-width: 50px; background: #adff2f'><</button><h3 id='captionDate' style='width: auto'> --- " +
        monthRU[month - 1] +
        "  " +
        year +
        " --- </h3><button id='nextMonth' style='width: auto; min-width: 50px; background: #adff2f'>></button></div>";

    caption.innerHTML = captionText;
    table.insertBefore(caption, table.firstChild);

    earlyMonth.onclick = function() {
        if (month == 1) {
            drawCalendar(year - 1, 12, htmlEl);
            addHtmlElements(year - 1, 12, htmlEl);
        } else {
            drawCalendar(year, month - 1, htmlEl);
            addHtmlElements(year, month - 1, htmlEl);
        }
        initNote(month, year);
    };

    nextMonth.onclick = function() {
        if (month == 12) {
            drawCalendar(year + 1, 1, htmlEl);
            addHtmlElements(year + 1, 1, htmlEl);
        } else {
            drawCalendar(year, month + 1, htmlEl);
            addHtmlElements(year, month + 1, htmlEl);
        }
        initNote(month, year);
    };

    [].forEach.call(selectItem, function(el) {
        el.addEventListener("click", addNote);
    }); 
}

function drawCalendar(year, month, htmlEl) {
    var date = new Date(year, month - 1),
        today = date.getDate(),
        storage = JSON.parse(list.getItem('name')),
        // noteYear = [].forEach.call(storage, function(el) {
        //     el.parse;
        // }),
        noteMonth = storage,
        noteDay = storage,
        firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
        firstDay = firstDayMonth === 0 ? 7 : firstDayMonth, // Определения дня недели 1-го числа
        dayRU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        calendar =
            "<table id='myCalendar'>" +
            "<tr bgcolor='#7fff00'><th>" +
            dayRU[1] +
            "</th><th>" +
            dayRU[2] +
            "</th><th>" +
            dayRU[3] +
            "</th><th>" +
            dayRU[4] +
            "</th><th>" +
            dayRU[5] +
            "</th><th>" +
            dayRU[6] +
            "</th><th>" +
            dayRU[0] +
            "</th></tr>",
        dayInMonth =
            33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate(), // Определение количества дней в месяце, с 32 в Сафари баг
		countDay = 1;
    setStorageItem(year,month);
    
    for (var i = 1; i <= 6; i++) {
        // Цикл по неделям
        calendar = calendar + "<tr>";
        for (var k = 1; k <= 7; k++) {
            // Цикл по дням недели
            if (i === 1 && k !== firstDay && countDay === 1) {
                calendar = calendar + "<td class='empty'></td>";
            } else {
                if (countDay <= dayInMonth) {
                    calendar =
                        calendar +
                        "<td id=" + countDay + " class='day' style='cursor: pointer'>" +
                        countDay +
                        "</td>"; // Запись числа в день недели
                    countDay++; // Глобальный счетчик
                } else calendar = calendar + "<td class='empty'></td>";
            }
        }
        calendar = calendar + "</tr>";
    }
    calendar = calendar + "</table>";
    htmlEl.innerHTML = calendar;
}
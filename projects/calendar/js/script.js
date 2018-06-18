
window.onload = initCalendar;
/**
 * @function 
 * init calendar
 */
function initCalendar() {
    authorization();
    new Promise(resolve => {
        setTimeout(() => {
            hiddenPreloader("preloader");
            resolve();
        }, 5000);
    });
    showCalendar({el : "calendar",
        showMonth : true,
        allowChange : true,
        allowAdd : true,
        allowRemove : true,
        date : [setDate('year'), setDate('month')],
    }); 
}
/**
 * @function
 * authorization new user and id old user
 */
function authorization() {
    if (!localStorage.length) {
        var name,
            random1 = Math.floor(Math.random() * 1000),
            random2 = Math.floor(Math.random() * 1000);
        name = JSON.stringify({
            id: random1 + random2 + ": " + new Date()
        });
        localStorage.setItem("name", name);
    } else {
        var author = JSON.parse(localStorage.getItem("name"))['id'];
    }
}
/**
 * @function
 * @param {string} id 
 * unmount preloader
 */
function hiddenPreloader(id) {
    document.getElementById(id).setAttribute('class', 'hidden');
}
/**
 * @function
 * @param {string} classEl 
 * @param {string} event 
 * @param {function} fn 
 * add listener
 */
function setEvent(classEl, event, fn) {
    var elements = document.querySelectorAll(classEl);
    [].forEach.call(elements, function(el) {
        el.addEventListener(event, fn);
    });
}
/**
 * @function
 * @param {number} year 
 * @param {number} month 
 * saving the date used
 */
// function setStorageItem(year, month) {
//     date = [month, year];
//     localStorage.setItem('date', JSON.stringify(date));
// }
/**
 * @function
 * @param {string} x 
 * define today's date on request
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
/**
 * @function
 * @param {object} obj
 * show calendar with settings
 */
function showCalendar(obj, setting) {
    var htmlEl = document.getElementById(obj.el),
        elCreate = document.getElementById("create"),
        elAbout = document.getElementById("about");
        elCreate.removeAttribute("class", "createWrap");
    if (!elCreate.hasAttribute("class")) {
        elCreate.setAttribute("class", "hidden");      
        preShowCalendar.innerHTML = "";
    }
    obj;
    if (!elAbout.hasAttribute("class")) {
        elAbout.setAttribute("class", "hidden");
    }
	htmlEl.removeAttribute("class", "hidden");
	year = ((localStorage.date != null) ? (JSON.parse(localStorage.getItem("date")))[1] : obj.date[0]);
	month = ((localStorage.date != null) ? (JSON.parse(localStorage.getItem("date")))[0] : obj.date[1]);
    drawInteractiveCalendar(obj.el, year, month, obj);
}
/**
 * @function
 * @param {object} ev 
 * show messajes 
 */
function showMessages(ev) {
    var target = ev.target,
        idMessages = target.id,
        storage = JSON.parse(localStorage.getItem('name')),
        messages = storage.note[idMessages],
        htmlEl = document.getElementById('modalWindow'),
        notes = '';
    notes += "<h1>" + idMessages + "<span class='closeModalWindow'>          \u274C</span></h1><ul>";
    [].forEach.call(messages, function(el) {
        notes += "<li class=" + idMessages + "><span class='remove'>\u274C   </span>" + el + "</li>"
    });
    notes += "</ul>";
    htmlEl.innerHTML = notes;
    htmlEl.removeAttribute("class", "hidden");
    htmlEl.setAttribute("class", "modalWindowShow");
    setEvent('.closeModalWindow', 'click', closeMessages);
    setEvent('.remove', 'click', removeNote);
}
/**
 * @funktion
 * @param {object} ev
 * close modal.window; 
 */
function closeMessages(ev) {
    var target = ev.target;
    html = document.getElementsByClassName('modalWindowShow');
    html[0].setAttribute("class", "hidden");
    html[0].removeAttribute("class", "modalWindowShow");
}
/**
 * @function
 * @param {number} year 
 * @param {number} month 
 * @param {object} htmlEl 
 * adding functionality to the calendar
 */
function addHtmlElements(year, month, htmlEl, options) {
    var caption = document.createElement("caption"),
        captionText = "",
        table = document.getElementById("myCalendar"),
        selectItem = document.querySelectorAll(".day"),
        options = options;
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
/**
 * 
 * @param {*} idEl 
 * @param {*} year 
 * @param {*} month 
 */
function drawInteractiveCalendar(idEl, year, month, setting) {
    var htmlEl = document.getElementById(idEl)
    
    drawCalendar(year, month, htmlEl);
    addHtmlElements(year, month, htmlEl);
}
/**
 * 
 * @param {number} year 
 * @param {number} month 
 * @param {object} htmlEl 
 */
function drawCalendar(year, month, htmlEl) {
    var date = new Date(year, month - 1),
        today = date.getDate(),
        storage = JSON.parse(localStorage.getItem('name')),
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
            "<tr bgcolor='rgb(187, 252, 135)'><th>" +
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
/**
 * @function
 * @param {object} event 
 * adding notes in storage and modal window
 */
function addNote(event) {
    if (event.target.className != 'day') {
        return;
    }
    var target = event.target,
        parse = JSON.parse(localStorage.getItem("name")),
        clickOutput,
        note = prompt("Введите заметку:") || [],
        noteText,
        dayClick = target.id,
        key =
            ((dayClick < 10 ? "0" + dayClick : dayClick) +
            "." +
            (month < 10 ? "0" + month : month) +
            "." +
            year) || [],
        stringKey;
    if (note == "") {
        note = "Нет заметок";
    }
    if (!parse.hasOwnProperty('note')) {
        noteText = parse;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        localStorage.setItem('name', JSON.stringify(noteText));
    } else {
        noteText = parse;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        localStorage.setItem('name', JSON.stringify(noteText));
    }
    clickOutput = document.createElement("span");
    clickOutput.id = key;
    clickOutput.className = "message";
    clickOutput.innerHTML = '\u2611';
    target.innerHTML += clickOutput.outerHTML;
    setEvent('.message', 'click', showMessages);
    // var block = document.getElementsByClassName("messages");
    // block[0].appendChild(clickOutput);
}
/**
 * @function
 * @param {object} ev 
 */
function removeNote(ev) {
    var target = ev.target,
        htmlEl = target.parentElement,
        storage = JSON.parse(localStorage.getItem('name'));
    storage['note'][htmlEl.className].splice(storage['note'][htmlEl.className].indexOf(htmlEl.innerText.slice(2)),1);
    localStorage.setItem('name', JSON.stringify(storage));
    htmlEl.remove();
}
/**
 * @function
 * @param {number} month 
 * @param {number} year 
 */
function initNote(month , year) {
    var note = (JSON.parse(localStorage.getItem('name')))['note'] || [],
        days = document.getElementsByClassName('day') || [],
        month = month - 1,
        clickOutput;
        [].forEach.call(days, function(dat) {
            var day = dat.id;
            var key = ((day < 10 ? "0" + day : day) +
            "." +
            (month < 10 ? "0" + month : month) +
            "." +
            year);
            [].forEach.call(note, function(i) {
                if (note[i] == key) {
                    var output = note[i];
                    clickOutput = document.createElement("span");
                    clickOutput.id = key;
                    clickOutput.className = "message";
                    clickOutput.innerHTML = '\u2611';
                    day.innerHTML += clickOutput.outerHTML;
                    setEvent('.message', 'click', showMessages);
            }
        })
    })
}


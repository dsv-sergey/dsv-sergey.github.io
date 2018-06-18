
var form = document.getElementsByName("reg")[0];
setEvent('reg', 'change', displayCreate);

function displayCreate(ev) {
    var arrMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        allowChange = document.getElementById("changeMonth").checked,
        allowAdd = document.getElementById("addTasks").checked,
        allowRemove = document.getElementById("removeTasks").checked,
        showMonth = document.getElementById("showDate").checked,
        date = [arrMonth.indexOf(document.getElementById("monthSel").value) + 1, document.getElementById("yearSel").value],
        el = document.querySelector("input#tagId").value || "calendar";
	var showCode = document.getElementById("code");
    showCode.value = "<script href='https://dsv-sergey.github.io/calendar/js/script.js'></script>\n" +
        "<script>\n" +
            "showCalendar({\n" +
                "    allowChange: " + allowChange + ",\n" +
                "    allowAdd: " + allowAdd +",\n" +
                "    allowRemove: " + allowRemove + ",\n" +
                "    showMonth: " + showMonth + ",\n" +
                "    date: [" + date +  "],\n" +
                "    el: " + el +
            "})\n" +
        "</script>";
    var setting = {
        allowChange: allowChange,
        allowAdd: allowAdd,
        allowRemove: allowRemove,
        showMonth: showMonth,
        date: date,
        el: el
    };
    drawInteractiveCalendar("preShowCalendar", setting.date[1], setting.date[0], setting);
}
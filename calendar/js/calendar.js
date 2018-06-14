function Calendar() {

}
Calendar.prototype = {
    authorization: function() {

    },
    drawCalendar: function(year, month, htmlEl) {
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
};
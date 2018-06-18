var xEl = document.querySelector("#x"); //>= 2 ? document.querySelector('#x').value : alert("Введите число больше 2");
var yEl = document.querySelector("#y"); //>= 2 ? document.querySelector('#y').value : alert("Введите число больше 2");

var el = document.querySelector("#field");
var btn = document.querySelector("button");
var field;

btn.addEventListener("click", function() {
    x = xEl.value;
    y = yEl.value;
    field = createField(x, y);
    renderField(field, el);
});

el.addEventListener("click", function(event) {
    var y = event.target.className.split(";")[0];
    var x = event.target.className.split(";")[1];
    field = swap(x, y, field);
    renderField(field, el);
});

function renderField(field, el) {
    var tb = "";
    for (var i = 0; i < y; i++) {
        tb += "<tr>";
        for (var j = 0; j < x; j++) {
            if (field[i][j] == 0) {
                tb += '<td class="empty">' + "" + "</td>";
            } else {
                tb += '<td class="' + i + ";" + j + '">' + field[i][j] + "</td>";
            }
        }
        tb += "</tr>";
    }
    el.innerHTML = tb;
}

function createField(x, y) {
    var numbers = [];
    for (var i = 0; i < x * y; i++) {
        numbers[i] = i;
    }
    numbers.sort(_ => Math.random() > 0.5);
    var field = [];
    for (var i = 0; i < y; i++) {
        field[i] = [];
        for (var j = 0; j < x; j++) {
            field[i][j] = numbers.pop();
        }
    }
    return field;
}

function swap(x, y, field) {
    var newField = field;
    var emptyCoords = findEmpty(newField);
    var dx = Math.abs(x - emptyCoords[1]);
    var dy = Math.abs(y - emptyCoords[0]);
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        newField[emptyCoords[0]][emptyCoords[1]] = newField[y][x];
        newField[y][x] = 0;
    }
    return newField;
}

function findEmpty(field) {
    var result;
    field.forEach(function(line, index) {
        if (!result) {
            result =
                line.indexOf(0) > -1 ? [index, line.indexOf(0)] : undefined;
        }
    });
    return result;
}
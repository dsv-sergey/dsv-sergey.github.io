function addNote(event) {
    if (event.target.className != 'day') {
        return;
    }
    var target = event.target,
        parseList = JSON.parse(list.getItem("name")),
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
    if (!parseList.hasOwnProperty('note')) {
        noteText = parseList;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        list.setItem('name', JSON.stringify(noteText));
    } else {
        noteText = parseList;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        list.setItem('name', JSON.stringify(noteText));
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
function removeNote(ev) {
    var target = ev.target,
        htmlEl = target.parentElement,
        storage = JSON.parse(list.getItem('name'));
    storage['note'][htmlEl.className].splice(storage['note'][htmlEl.className].indexOf(htmlEl.innerText.slice(2)),1);
    list.setItem('name', JSON.stringify(storage));
    htmlEl.remove();
}
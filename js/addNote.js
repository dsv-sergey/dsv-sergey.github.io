function addNote(event) {
    var target = event.target,
        parseList = JSON.parse(list.getItem("name")),
        clickOutput,
        note = prompt("Введите заметку:") || [],
        noteText,
        dayClick = target.innerText,
        key =
            ((dayClick < 10 ? "0" + dayClick : dayClick) +
            "." +
            (month < 10 ? "0" + month : month) +
            "." +
            year) || [],
        stringKey;
    if (target !== 'td.day') {
        return;
    }
    if (note == "") {
        note = "Нет заметок";
    }
    if (!parseList.hasOwnProperty('note')) {
        // parseList['note'] = [];
        // parseList['note'].push(key);
        // parseList['note'][key] = [];
        noteText = parseList;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        // noteText['note'] = {
        //     [key]: note
        // };
        // parseList['note'][key].push(note);
        list.setItem('name', JSON.stringify(noteText));
    } else {
        noteText = parseList;
        noteText['note'] = noteText['note'] || {};
        noteText['note'][key] = noteText['note'][key] || [];
        noteText['note'][key].push(note);
        list.setItem('name', JSON.stringify(noteText));
    }
    clickOutput = document.createElement("span");
    clickOutput.className = "message";
    clickOutput.innerHTML = '\u2611';
    target.innerHTML += clickOutput.outerHTML;
    // var block = document.getElementsByClassName("messages");
    // block[0].appendChild(clickOutput);
}
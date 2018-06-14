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
function closeMessages(ev) {
    var target = ev.target;
    html = document.getElementsByClassName('modalWindowShow');
    html[0].setAttribute("class", "hidden");
    html[0].removeAttribute("class", "modalWindowShow");
}
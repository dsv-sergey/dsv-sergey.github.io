var textarea = document.querySelector("#textarea");
var btn = document.querySelector("#button");
var oldText = "";

btn.addEventListener("click", function(e) {
    let note = textarea.value;
    sendMessage(note);
    textarea.value = "";
});

function showNote(note, idHtml) {
	var html = document.querySelector(idHtml);
	var messageObj = note || [];
	if (note['name']) {
		if (!html.querySelector("ul")) {
			var newElem = document.createElement("ul");
		} else {
			var newElem = document.querySelector("ul");
		}
		
		newElem.innerHTML +=
			'<li class="item"><p class="itemText" contenteditable="false">' +
			note['message'] +
			'    </p><select><option selected disabled>Выбери цвет</option><option value="red">красный</option><option value="green">зеленый</option><option value="blue">синий</option></select><button class="del">x</button></li>';
		html.appendChild(newElem);
	} else {
		for (var id in note) {
			if (!html.querySelector("ul")) {
				var newElem = document.createElement("ul");
			} else {
				var newElem = document.querySelector("ul");
			}
			
			newElem.innerHTML +=
				'<li class="item"><p class="itemText" contenteditable="false">' +
				note[id]['message'] +
				'    </p><select><option selected disabled>Выбери цвет</option><option value="red">красный</option><option value="green">зеленый</option><option value="blue">синий</option></select><button class="del">x</button></li>';
			html.appendChild(newElem);
		}
	}
    setEvent(".itemText", "click", editText);
    setEvent(".item", "change", setColorBorder);
    setEvent(".del", "click", deleteNote);
}

function setEvent(classEl, event, fn) {
    document.querySelectorAll(classEl).forEach(function(el) {
        el.addEventListener(event, fn);
    });
}

function editText(ev) {
    var text = ev.target;
    if (text.matches("p")) {
        text.setAttribute("contenteditable", "true");
    }
}

function setColorBorder(ev) {
    var color = ev.target;
    if (color.matches("select")) {
        var parLi = color.parentNode;
        parLi.style.borderColor = color.value;
    }
}

function deleteNote(ev) {
    var btn = ev.target;
	var parEl = btn.parentNode;
	var id = parEl.id;
    parEl.remove();
    fetch(
        "https://rest-examples-6cb6b.firebaseio.com/group3/" + id + ".json",
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
    )
    .then(function(response) {
        return response.json();
    })
    .then(console.log);
}

function sendMessage(note) {
    this.note = note;
    fetch("https://rest-examples-6cb6b.firebaseio.com/" + "group3.json", {
        method: "POST",
        body: JSON.stringify({
            message: note,
            name: "group3",
            date: new Date()
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
}
function readLostNote(text) {
	if (text == "") {
		return;
	}
	console.log(text);
    var regExp = new RegExp('"data":(.+)}'); //сделать регулярное выражение для извлечения сообщений
    var newText = text.replace(oldText, '').match(regExp)[1] || text.replace(oldText, '').match(regExp)[0];
    var newMessage = JSON.parse(newText);
	if (newMessage == '') {
		return;
	} else {
		oldText = text;
	}
	showNote(newMessage, '.notes');
	// showNote(newTx, '.notes');
}
var xhttp = new XMLHttpRequest();
var targetUrl = "https://rest-examples-6cb6b.firebaseio.com/group3.json";
xhttp.open("GET", targetUrl, true);
xhttp.onreadystatechange = function() {
    console.log("Arguments", arguments);
    if (this.readyState == 4 && this.status == 200) {
        console.log("done:", this.responseText);
    } else if (this.readyState == 3 && this.status) {
        readLostNote(this.responseText);
        console.log("Progress:", this.status, this.responseText);
    } else {
        console.log("onreadystatechange", arguments);
    }
};

xhttp.onloadend = function() {
    console.log("{LOADEND}");
};
// https://firebase.google.com/docs/reference/rest/database/#section-streaming
xhttp.setRequestHeader("Accept", "text/event-stream");
xhttp.send();

console.log(xhttp);

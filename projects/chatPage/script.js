var textarea = document.querySelector('#textarea');
var btn = document.querySelector('#button');

btn.addEventListener('click', function(e) {
  let note = textarea.value;
  console.log(note);
  showNote(note, '.notes');
  
  textarea.value = '';
});
function showNote(note, idHtml) {
  var html = document.querySelector(idHtml);
  if (!html.querySelector('ul')) {
      var newElem = document.createElement('ul');
  } else {
   var newElem = document.querySelector('ul'); 
  }
  newElem.innerHTML += '<li class="item"><p class="itemText" contenteditable="false">' + note + '    </p><select><option selected disabled>Выбери цвет</option><option value="red">красный</option><option value="green">зеленый</option><option value="blue">синий</option></select><button class="del">x</button></li>';
  html.appendChild(newElem);
  setEvent(".itemText", "click", editText);
  setEvent(".item", "change", setColorBorder);
  setEvent(".del", "click", deleteNote);
  sendMessage(note);
}

function setEvent(classEl, event, fn) {
    var elements = document.querySelectorAll(classEl);
    [].forEach.call(elements, function(el) {
        el.addEventListener(event, fn);
    });
}
function editText(ev) {
  var text = ev.target;
  if (text.matches('p')) {
    text.setAttribute('contenteditable', 'true');
  }
}
function setColorBorder(ev) {
  var color = ev.target;
  if (color.matches('select')) {
    
    var parLi = color.parentNode;
    parLi.style.borderColor = color.value;
    //parLi.setAttribute('border-color', color.value);
  }
}

function deleteNote(ev) {
  var btn = ev.target;
  var parEl = btn.parentNode;
  parEl.remove();
}

function sendMessage(note) {
  this.note = note;
  fetch('https://rest-examples-6cb6b.firebaseio.com/' + 'group3.json', {
  method: 'PUT',
  body: JSON.stringify(
    {
      message: note,
      name: 'group3',
      date: new Date,
    },
  ),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
}
function readLostNote(text){
  console.log(text);
  var regExp = new RegExp("data: {/w/d/s}", "g");//сделать регулярное выражение для извлечения сообщений
  var newText = text.match(regExp);
  var oldText;
  var newMessage = newText - oldText;
  
  oldText = text;
  return function(){
    showNote(newMessage, '.notes');
    oldText = text;
    return this;
  }
}
////
// event: put
// data: {"path":"/","data":{"date":"2018-06-23T18:13:22.637Z","message":"hhghhh","name":"group3"}}
//////////////////////////////////////////

var xhttp = new XMLHttpRequest();
var targetUrl = 'https://rest-examples-6cb6b.firebaseio.com/group3.json';
xhttp.open("GET", targetUrl, true);
xhttp.onreadystatechange = function() {
  console.log('Arguments', arguments);
  if (this.readyState == 4 && this.status == 200) {
    readLostNote(this.responseText);
    console.log('done:', this.responseText);
  }else if (this.status){
    readLostNote(this.responseText);
    console.log('Progress:', this.status, this.responseText)
  }else{
    readLostNote(this.responseText);
    console.log('onreadystatechange', arguments);
    
  }
};

xhttp.onloadend = function() {
  console.log('{LOADEND}');
}

// https://firebase.google.com/docs/reference/rest/database/#section-streaming
xhttp.setRequestHeader('Accept', 'text/event-stream');
xhttp.send();

console.log(xhttp);




// //
// fetch(config.databaseURL + '/messages.json', {
//   method: 'PUT',
//   body: JSON.stringify(
//     {
//       message: text,
//       name: name,
//       date: date,
//     },
//   ),
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(console.log);
// //
// Добавление записи в список Firebase

// fetch(config.databaseURL + '/messages.json', {
//   method: 'POST',
//   body: JSON.stringify([
//     {
//       user: from,
//       message: text,
//       date: date,
//       title: counter++ + 'message',
//     },
//   ]),
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(console.log);
// //
// Чтение записи / списка

// fetch(config.databaseURL + '/messages.json', {
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(console.log);
// Чтение всей структуры базы

// fetch(config.databaseURL + '/.json', {
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(console.log);
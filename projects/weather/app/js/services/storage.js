var storage = (function(){
    var databaseURL = 'https://dsv-sergey.firebaseio.com/progects/weather';

    return {
        set: function(type, text, methodSend) {
            if (methodSend == 'XHR') {

            } else if (methodSend == 'fetch') {
                fetch(config.databaseURL + '/messages.json', {
                    method: 'PUT',
                    body: JSON.stringify([
                      {
                        user: from,
                        message: text,
                        date: date,
                        title: counter++ + 'message',
                      },
                    ]),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(function(response) {
                      return response.json();
                    })
                    .then(console.log);
            }
        },
        getNote: function(type, id, methodSend) {
            if (methodSend == 'XHR') {

            } else if (methodSend == 'fetch') {
                fetch(config.databaseURL + '/messages.json', {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(function(response) {
                      return response.json();
                    })
                    .then(console.log);
            }
        },
        getAllNotes: function(type, id, methodSend) {
            fetch(config.databaseURL + '/.json', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
                .then(function(response) {
                  return response.json();
                })
                .then(console.log);
        },

        delete: function(type, id, method) {
            if (method == 'XHR') {

            } else if (method == 'fetch') {
                
            }
        },
    };
})();
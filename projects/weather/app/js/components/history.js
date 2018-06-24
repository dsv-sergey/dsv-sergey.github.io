var history = (function() {
    var htmlHistory = document.querySelector("history");
    return {
        setNote: function(note) {
            fetch('https://dsv-sergey.firebaseio.com/progects/weather/' + 'history.json', {
                method: 'PUT',
                body: JSON.stringify(
                  {
                    message: note,
                    name: 'history',
                    date: new Date,
                  },
                ),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
            });
        },
        getNote: function(id) {

        },
        deleteNote: function(id) {
            
        }
    };
})();
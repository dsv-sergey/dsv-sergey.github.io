var storage = (function() {
    var databaseURL = "https://dsv-sergey.firebaseio.com/progects/weather/";

    return {
        addNote: function(typeData, text, methodSend) {
            if (methodSend == "XHR") {
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", databaseURL + typeData + ".json", true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send({ text });
                xhttp.onreadystatechange = function() {
                    console.log("Arguments", arguments);
                    if (this.readyState == 4 && this.status == 200) {
                        console.log("done:", this.responseText);
                    } else if (this.status) {
                        console.log(
                            "Progress:",
                            this.status,
                            this.responseText
                        );
                    } else {
                        console.log("onreadystatechange", arguments);
                    }
                };
                xhttp.onloadend = function() {
                    console.log("{LOADEND}");
                };
                console.log(xhttp);
            } else if (methodSend == "fetch") {
                fetch(databaseURL + typeData + ".json", {
                    method: "POST",
                    body: JSON.stringify({ text }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(console.log);
            }
        },
        overwritingMessages: function(typeData, text, methodSend) {
            if (methodSend == "XHR") {
                var xhttp = new XMLHttpRequest();
                xhttp.open("PUT", databaseURL + typeData + ".json", true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(text);
                xhttp.onreadystatechange = function() {
                    console.log("Arguments", arguments);
                    if (this.readyState == 4 && this.status == 200) {
                        console.log("done:", this.responseText);
                    } else if (this.status) {
                        console.log(
                            "Progress:",
                            this.status,
                            this.responseText
                        );
                    } else {
                        console.log("onreadystatechange", arguments);
                    }
                };
                xhttp.onloadend = function() {
                    console.log("{LOADEND}");
                };
                console.log(xhttp);
            } else if (methodSend == "fetch") {
                fetch(databaseURL + typeData + ".json", {
                    method: "PUT",
                    body: JSON.stringify({ text }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(console.log);
            }
        },
        getNote: function(typeData, id, methodSend) {
            if (methodSend == "XHR") {
                var xhttp = new XMLHttpRequest();
                var targetUrl =
                    "https://rest-examples-6cb6b.firebaseio.com/group3.json";
                xhttp.open("GET", targetUrl, true);
                xhttp.onreadystatechange = function() {
                    console.log("Arguments", arguments);
                    if (this.readyState == 4 && this.status == 200) {
                        readLostNote(this.responseText);
                        console.log("done:", this.responseText);
                    } else if (this.status) {
                        readLostNote(this.responseText);
                        console.log(
                            "Progress:",
                            this.status,
                            this.responseText
                        );
                    } else {
                        readLostNote(this.responseText);
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
            } else if (methodSend == "fetch") {
                fetch(databaseURL + typeData + id + ".json", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        return data;
                    });
            }
        },
        getAllNotes: function(typeData, id, methodSend) {
            if (methodSend == "XHR") {
            } else if (methodSend == "fetch") {
                fetch(databaseURL + "/.json", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(console.log);
            }
        },

        delete: function(type, id, method) {
            if (method == "XHR") {
            } else if (method == "fetch") {
                fetch(databaseURL + "/.json", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(console.log);
            }
        }
    };
})();

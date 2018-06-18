//https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB
var matrNow = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	matrX = matrNow[0].length,
    matrY = matrNow.length,
    matrMemory = new Array(matrY),
	matrFuture = new Array(matrY),
	htmlEl = document.querySelector("pre"),
	start = document.getElementById("start"),
	pause = document.getElementById("pause"),
	ms = 10;
	option = false;
	htmlEl.innerHTML = matrNow.map(row => row.map(cell => (cell == 1 ? "x" : " ")).join("")).join("\n");
	htmlEl.addEventListener("click", setValueArray);
	start.addEventListener("click", playGame);
	pause.addEventListener("click", playGame);

for (var i = 0; i < matrMemory.length; i++) {
    matrMemory[i] = new Array(matrX);
}
for (var i = 0; i < matrFuture.length; i++) {
    matrFuture[i] = new Array(matrX);
}
function playGame(ev) {
	if (ev.currentTarget.id == "start") {
		option = true;
		paintMatr(matrNow, option);
	} else if (ev.currentTarget.id == "pause") {
			option = false;
			createMatr(matrNow, matrX, matrY);
		}
}

function paintMatr(matrNow, option) {
	htmlEl.innerHTML = matrNow.map(row => row.map(cell => (cell == 1 ? "x" : " ")).join("")).join("\n");
	
	if (option) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
			   resolve();
			}, 1000);
		  });
		// var promise = new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		resolve(createMatr(matrNow, matrX, matrY));
		// 	}, 1000);
		// });
		// new Promise(resolve => {
		// 	setTimeout(() => {
		// 		hiddenPreloader("preloader");
		// 		resolve();
		// 	}, 5000);
        // });
        var a = [1, 2, 3, 4, 5, 6, 7];
var asyncProcess = function(i, cb) {
  console.log('start of processing ' + i);
  setTimeout(function() {
    console.log('end of processing ' + i);
    cb();
  }, 10000);
};

var i = 0;
var step = function() {
  if (i === a.length) {
    return alert('done');
  }
  asyncProcess(a[i], step);
  i++;
};

step();
	}
}
function createMatr(matrNow, matrX, matrY) {
    for (var x = 0; x < matrX; x++) {
        for (var y = 0; y < matrY; y++) {
            var live = 0;
            for (var j = x - 1; j <= x + 1; j++) {
                if (j in matrNow) {
                    for (var g = y - 1; g <= y + 1; g++) {
                        if (g in matrNow[j]) {
                            if (matrNow[j][g] == 1 && !(j == x && g == y)) {
                                live = live + 1;
                            }
                        }
                    }
                }
            }
            if (matrNow[x][y] == 0) {
                live == 3 ? (matrFuture[x][y] = 1) : (matrFuture[x][y] = 0);
            } else {
                if (matrNow[x][y] == 1) {
                    live == 2 || live == 3
                        ? (matrFuture[x][y] = 1)
                        : (matrFuture[x][y] = 0);
                }
            }
        }
    }
    matrMemory = matrNow;
	matrNow = matrFuture;
	return new Promise((resolve, reject) => {
		paintMatr(matrNow, option)
		setTimeout(() => {
		   resolve();
		}, 1000);
	});
    
}

htmlEl.addEventListener("click", setValueArray);

function setValueArray(ev) {
    // определяет какой элемент в поле нужно инвертировать
    var charWidth = htmlEl.clientWidth / matrNow[0].length;
    var charHeight = htmlEl.clientHeight / matrNow.length;
    var x = Math.floor(ev.offsetX / charWidth),
        y = Math.floor(ev.offsetY / charHeight);
    setInversion(x, y);
}

function setInversion(x, y) {
    //инвертирует значение
    if (matrNow[y][x] == 0) {
        matrNow[y][x] = 1;
    } else if (matrNow[y][x] == 1) {
        matrNow[y][x] = 0;
    }
    paintMatr(matrNow, option);
}

// function sleep(ms) {
// 	ms += new Date().getTime();
// 	while (new Date() < ms){}
// 	} 
//+ block play/ pause + game Live

//https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB
var matrX = 10,
    matrY = 10,
    matrMemory = new Array(matrX),
    matrNow = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
               [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
               [0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
               [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
               [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    matrFuture = new Array(matrX);
for(var i = 0; i < matrMemory.length; i++) {
	matrMemory[i] = new Array(10);
};
for(var i = 0; i < matrFuture.length; i++) {
	matrFuture[i] = new Array(10);
};
function paintMatr(matrNow){
  var teg = document.getElementById("matr"),
      paint = '';
  for (var i = 0; i < matrX; i++){
    for (var k = 0; k < matrY; k++) {
      paint += matrNow[i][k] + ' ';
    }
    paint += '</br>'
  }
  teg.innerHTML = paint;
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve(createMatr(matrNow, matrX, matrY));
    }, 1000);
  });
};
function createMatr(matrNow, matrX, matrY) {
  for (var x = 0; x < matrX; x++){
    for (var y = 0; y < matrY; y++){
      var live = 0;
      for (var j = x - 1; j <= x + 1; j++){
        if (j in matrNow) {
          for (var g = y - 1; g <= y + 1; g++){
            if (g in matrNow[j]) {
              if (matrNow[j][g] == 1 && !(j == x && g == y)) {
                live = live + 1;
              }
            }
          }
        }
      }
      if (matrNow[x][y] == 0) {
        (live == 3) ? matrFuture[x][y] = 1 : matrFuture[x][y] = 0;
      } else {
        if (matrNow[x][y] == 1) {
          (live == 2 || live == 3) ? matrFuture[x][y] = 1 : matrFuture[x][y] = 0;
        } 
      }
    }
  }
  matrMemory = matrNow;
  matrNow = matrFuture;
  setTimeout(paintMatr(matrNow),3000);
};
createMatr(matrNow, matrX, matrY);
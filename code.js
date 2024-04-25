//startup
if(localStorage.getItem("level") == undefined){
  localStorage.setItem("level",0);
  localStorage.setItem("glow","078")
}
setScreen("splashScreen");
showElement("fin");
showElement("titleScreenB");
showElement("restartButton");
const usp = window.location.search.substring(1);
if (usp){
  showElement("InstructionsDysplay");
  showElement("leftbutton");
  showElement("upButton");
  showElement("rightButton");
  showElement("goButton");
  hideElement("titleScreenB");
  for (var i = 1; i < 50; i++) {
    showElement("box"+i);
  }
  setTimeout(function( ) {
    importer(mapToBase64(usp));
  }, 10);
}else if (localStorage.getItem("boss") && !localStorage.getItem("end")){
  startingAnimation(0);
  setTimeout(function() {
    theTrueTutoral(196500);
  }, 1000);
}else{
  setTimeout(function() {
    startingAnimation(250);
  }, 3000);
}
//make varibles
var redBoxXs = [];
var redBoxYs = [];
var redBoxLocs = [];
var startBoxX;
var startBoxY;
var startBoxPos;
var goalBoxX;
var goalBoxY;
var goalBoxPos;
var instructions = [];
var startDirection;
var switchX = [];
var switchY = [];
var Switch=[];
var yellow = [];
var purp = [];
var onOrOff;
var onBlocks = [];
var doorXY = [];
var door = [];
var keyX = [];
var keyY = [];
var key = [];
var keyUsed = false;
var textdisply0;
var textdisply1;
var textdisply2;
var levelSelect;
var t = 11;
var T = 12;
var e = 13;
var E = 14;
var b = 15;
var teleportX = [];
var teleportY = [];
var teleportType = [];
var teleportPos=[];
var boxX = [];
var boxY = [];
var boxNum = [];
var boxi;
var plate = [];
var plateCon = [];
var Continue;
var newBoxX = [];
var newBoxY = [];
var newBoxNum = [];
var levelEditor;
var fog = [false,false];
//map input
var map = [];
var basicPresetMaps = ["u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,2,1,1,1,
1,1,1,3,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"l",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,2,1,1,1,
1,1,1,3,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,2,0,1,1,1,
1,1,1,3,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,0,0,0,1,1,
1,1,2,1,0,1,1,
1,1,1,0,0,1,1,
1,1,1,3,1,1,1,
1,1,1,1,1,1,1,
"u",
1,2,0,1,1,1,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,1,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,1,0,3,0,1,1,
"d",
3,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
1,0,0,0,0,0,2,
"u",
0,0,0,0,0,0,0,
0,1,1,1,1,1,0,
0,1,1,1,1,1,0,
0,1,1,1,1,1,0,
0,1,1,1,1,1,0,
0,1,1,1,1,1,0,
2,1,1,1,1,1,3,
"u",
1,1,1,1,1,2,1,
1,1,1,1,1,0,1,
1,0,0,0,0,0,1,
1,0,1,1,1,1,1,
1,0,0,0,0,0,1,
1,1,1,1,1,0,1,
1,1,1,1,1,3,1,
"u",
1,2,1,1,1,1,1,
1,0,0,0,0,0,0,
1,1,1,1,1,1,0,
1,0,0,0,0,0,0,
1,0,1,1,1,1,1,
1,0,1,0,0,0,1,
1,0,0,0,1,3,1,
"d",
1,0,0,0,0,1,0,
0,0,1,1,0,2,1,
0,1,1,1,1,1,0,
0,0,1,0,0,0,0,
1,0,1,3,0,1,0,
1,0,1,1,1,1,0,
1,0,0,0,0,0,0,
"d",
0,0,0,0,1,0,1,
0,1,1,0,0,0,0,
0,3,1,1,1,1,0,
1,1,0,0,0,1,0,
1,0,0,1,0,0,0,
0,0,1,1,1,1,1,
1,0,0,0,0,0,2,
"d",
0,0,0,0,0,0,0,
0,1,0,1,1,1,2,
0,0,1,0,0,0,1,
1,0,1,3,1,0,0,
0,0,1,1,0,1,0,
0,1,0,0,0,1,0,
0,0,0,1,0,0,0,
"d",
1,0,0,0,1,0,1,
0,0,1,0,0,1,3,
2,1,0,0,1,0,0,
1,0,0,1,0,0,1,
0,0,1,0,0,1,0,
0,1,0,0,1,0,0,
0,0,0,1,0,0,1,
"l",
0,0,0,1,0,0,0,
0,1,0,0,0,1,0,
0,0,1,1,1,0,0,
0,1,0,0,0,1,2,
0,0,0,1,0,0,1,
1,0,1,3,1,0,1,
0,1,0,0,0,0,0,
"r",
3,0,0,1,0,0,0,
0,1,1,0,0,1,0,
0,0,1,0,1,0,0,
1,0,0,0,1,0,1,
2,1,1,1,1,0,0,
0,1,0,0,0,1,0,
0,0,0,1,0,0,0,
"d",
3,0,0,1,0,0,0,
0,1,1,0,0,1,0,
0,0,1,0,1,0,0,
1,0,0,0,1,0,1,
2,1,1,1,1,0,0,
0,1,0,0,0,1,0,
0,0,0,1,0,0,0,
"END"];
var keysPresetMaps = ["u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,2,1,1,1,
1,1,1,5,1,1,1,
1,1,1,3,4,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
0,0,0,2,0,0,1,
5,5,5,5,5,5,1,
0,0,0,0,0,0,1,
0,0,0,0,1,0,4,
0,0,0,1,0,0,1,
0,0,0,0,0,1,1,
1,1,0,3,1,1,1,
"l",
0,0,0,0,0,0,0,
0,1,1,1,1,1,0,
0,1,0,0,0,1,0,
0,1,0,1,0,1,0,
0,1,3,1,4,1,0,
0,1,5,0,1,1,0,
0,2,1,0,0,0,0,
"l",
5,5,0,0,0,0,0,
0,0,0,5,5,5,4,
0,5,5,0,0,0,5,
0,0,0,0,5,0,0,
0,5,5,0,5,5,0,
5,3,0,5,0,0,0,
2,5,0,0,0,5,0,
"d",
2,5,0,0,0,5,4,
5,3,0,5,0,5,0,
0,5,5,0,0,5,0,
0,0,0,0,5,0,0,
0,5,5,5,0,0,5,
0,0,0,0,0,5,0,
0,5,5,5,5,0,0,
"l",
0,0,0,1,0,0,0,
0,1,0,0,0,1,0,
0,0,1,1,1,2,5,
1,0,0,3,0,1,1,
0,1,1,1,0,0,0,
1,0,0,0,1,1,0,
4,0,1,0,0,0,0,
"l",
1,1,0,0,0,1,0,
5,0,0,1,0,0,1,
0,1,1,3,1,0,0,
0,0,0,0,0,1,2,
0,1,1,1,0,0,1,
1,0,0,0,1,0,0,
4,0,1,0,0,0,1,
"l",
0,0,0,0,0,0,1,
0,1,1,1,1,0,0,
0,0,0,0,0,1,4,
0,1,1,1,0,0,1,
1,0,0,0,1,0,0,
0,0,1,0,0,1,0,
3,5,2,1,0,0,0,
"d",
1,0,1,0,0,0,1,
0,1,0,0,1,0,0,
1,0,1,0,0,1,0,
0,0,0,1,0,1,4,
0,1,0,0,0,1,1,
0,0,1,1,1,5,5,
1,0,0,0,3,5,2,
"l",
0,0,0,1,0,0,0,
0,1,0,0,0,1,0,
0,0,1,1,1,4,0,
0,1,0,0,0,1,0,
0,0,0,1,0,0,1,
1,1,1,3,1,0,1,
2,5,0,0,0,0,0,
"d",
1,0,0,0,1,0,1,
0,0,1,0,0,1,3,
4,1,0,0,1,0,0,
1,0,0,1,0,0,5,
0,0,1,0,0,1,0,
0,1,0,0,1,0,0,
0,0,0,1,2,0,1,
"r",
3,5,2,1,0,0,0,
0,1,1,0,0,1,0,
0,0,1,0,1,0,0,
1,0,0,0,1,0,1,
4,1,1,1,1,0,0,
0,1,0,0,0,1,0,
0,0,0,1,0,0,0,
"END"];
var switchPresetMaps = ["u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,7,6,1,1,1,
1,1,3,8,2,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
0,0,0,0,0,0,2,
8,8,8,8,8,8,0,
0,0,0,0,6,8,0,
7,7,7,7,0,8,0,
0,0,0,7,0,8,0,
0,0,0,7,0,8,0,
3,0,0,7,0,8,0,
"u",
8,6,7,8,8,8,1,
8,7,0,0,7,0,1,
8,0,0,7,0,0,1,
1,0,7,8,0,7,1,
1,7,0,0,7,0,1,
1,0,0,7,0,0,8,
1,1,0,3,0,1,2,
"r",
3,8,0,0,0,8,2,
0,7,7,1,7,0,8,
8,0,8,0,8,7,7,
7,1,7,0,0,8,0,
0,0,0,8,7,7,7,
0,1,1,0,8,8,8,
0,0,0,0,0,7,6,
"l",
1,0,0,0,7,0,1,
0,0,1,0,8,0,0,
0,1,0,1,2,1,7,
0,0,1,3,1,8,6,
1,0,8,7,0,0,1,
0,7,0,8,8,7,0,
0,1,7,7,7,0,1,
"l",
0,0,0,7,0,0,0,
0,1,8,8,8,1,6,
0,0,7,0,7,0,1,
1,8,8,1,8,0,0,
0,7,0,1,2,1,0,
0,1,0,0,1,0,0,
0,3,1,0,0,0,1,
"r",
0,0,0,1,0,0,0,
0,1,3,8,7,1,0,
0,0,1,0,0,1,0,
1,0,0,7,8,0,7,
6,1,8,8,7,0,8,
0,0,7,0,0,1,0,
1,8,8,8,1,0,2,
"r",
3,8,2,1,0,0,0,
0,1,1,7,7,1,0,
0,0,8,0,8,7,0,
1,0,0,7,8,0,1,
6,1,1,1,1,0,7,
0,8,0,7,0,8,7,
0,7,0,8,0,7,0,
"u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,7,6,1,2,1,1,
1,3,8,0,7,1,1,
1,1,1,6,1,1,1,
1,1,1,1,1,1,1,
"u",
1,1,1,7,0,0,2,
7,7,7,6,7,7,7,
8,8,8,8,8,8,8,
0,0,0,0,0,6,0,
7,7,7,1,7,7,7,
0,0,0,0,0,0,0,
1,1,0,3,0,1,1,
"r",
2,7,0,0,0,7,6,
1,1,8,1,8,1,0,
0,0,6,1,0,7,0,
8,1,1,1,0,1,1,
0,0,0,1,0,8,0,
7,1,0,1,7,1,0,
3,8,6,1,0,0,6,
"r",
3,1,0,6,7,6,0,
6,7,1,7,1,1,7,
7,1,0,6,1,0,6,
6,0,1,7,1,7,1,
7,1,0,6,1,6,0,
6,0,1,7,1,1,7,
1,7,6,0,1,2,0,
"r",
6,6,7,1,7,6,8,
6,1,0,0,0,1,2,
1,0,0,1,8,8,1,
0,0,1,0,0,7,6,
6,1,0,0,1,1,8,
1,0,0,1,0,7,0,
6,0,1,6,0,8,3,
"d",
6,7,0,0,1,0,0,
0,0,1,0,0,1,0,
1,0,0,1,0,0,1,
3,1,0,0,1,0,0,
0,0,1,0,1,0,1,
1,0,0,8,7,0,0,
0,1,6,1,2,1,6,
"r",
6,1,7,6,6,8,2,
8,6,6,1,6,6,1,
6,1,6,6,1,6,6,
6,6,1,6,6,1,6,
1,6,0,1,6,1,6,
3,1,6,1,6,1,6,
6,6,8,1,0,1,0,
"END"];
var boxPresetMaps = ["d",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,3,1,1,1,1,1,
1,b,b,b,0,0,1,
1,0,1,2,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
0,1,1,2,1,1,0,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
0,1,1,b,1,1,0,
1,0,0,0,0,0,1,
1,0,0,0,0,0,1,
0,1,0,3,0,1,0,
"u",
0,0,0,b,b,0,0,
0,0,b,0,1,0,0,
b,2,b,0,1,0,0,
1,1,1,1,1,b,1,
0,b,b,b,b,0,0,
0,1,0,0,0,0,0,
3,1,0,0,0,0,0,
"d",
2,1,0,b,b,0,0,
0,0,1,b,b,b,b,
1,0,0,b,b,b,b,
0,0,0,b,b,b,b,
1,1,0,b,b,b,b,
0,3,1,0,0,0,0,
0,b,b,b,0,0,0,
"u",
0,0,b,b,0,0,0,
0,b,1,b,1,0,0,
1,3,1,b,1,2,0,
0,1,0,b,1,0,0,
0,0,b,0,1,1,b,
0,0,0,0,0,0,0,
0,0,0,0,1,0,0,
"u",
0,0,0,b,b,b,3,
0,2,1,b,1,1,1,
0,0,1,b,1,0,0,
0,1,1,b,b,0,0,
b,0,1,0,0,1,0,
0,0,1,0,1,0,0,
0,0,0,0,0,0,0,
"u",
1,0,0,0,0,0,1,
0,b,b,b,b,b,3,
0,b,1,1,1,1,1,
0,b,1,0,0,0,0,
0,b,b,b,0,0,0,
0,0,1,0,0,1,2,
0,0,1,0,0,1,0,
"u",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,1,0,2,1,1,1,
1,1,8,7,1,1,1,
1,1,3,b,9,1,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
0,0,0,2,0,0,0,
0,0,0,0,0,0,0,
1,8,8,8,8,8,8,
9,7,0,0,0,0,0,
0,7,0,0,0,0,0,
b,0,0,0,0,0,0,
0,0,0,3,0,0,0,
"u",
0,0,0,1,0,1,0,
0,1,0,0,1,0,0,
0,0,1,0,0,0,0,
1,8,1,1,1,1,0,
1,3,b,b,b,b,9,
2,1,1,0,0,0,0,
8,0,0,0,1,0,0,
"u",
0,0,0,1,0,0,0,
0,1,0,0,0,1,0,
0,1,1,1,1,1,8,
9,b,7,b,b,b,3,
0,0,1,0,1,1,1,
0,0,1,0,0,0,1,
0,0,0,0,1,8,2,
"r",
0,1,3,1,0,0,0,
0,7,b,b,b,b,9,
0,1,b,1,b,0,0,
0,0,b,1,b,0,7,
1,0,b,8,0,1,0,
0,0,b,1,1,0,0,
0,0,9,2,7,0,1,
"u",
0,0,0,0,9,1,9,
0,8,0,8,b,1,0,
0,1,0,0,b,7,0,
0,0,1,0,b,7,0,
8,0,0,1,b,1,8,
8,b,0,0,b,1,2,
0,0,b,b,b,3,1,
"u",
9,0,b,b,b,b,3,
b,0,0,1,0,0,1,
7,0,1,0,0,1,2,
b,1,0,7,1,8,0,
0,0,0,7,0,0,1,
0,1,1,0,b,7,0,
0,0,0,0,1,0,0,
"END"];
var teleportersPresetMaps =["r",
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
1,3,t,1,1,1,1,
1,1,1,1,1,1,1,
1,1,1,1,2,t,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"u",
1,2,0,1,1,1,1,
1,0,0,0,0,0,1,
0,1,1,t,1,1,0,
1,0,0,1,0,0,1,
0,1,1,t,1,1,0,
1,0,0,0,0,0,1,
1,1,0,3,0,1,1,
"r",
1,1,1,1,1,1,1,
1,T,t,1,1,T,1,
1,1,1,1,1,e,1,
1,1,1,1,1,1,1,
1,e,2,1,3,t,1,
1,1,1,1,1,1,1,
1,1,1,1,1,1,1,
"d",
1,1,1,T,1,1,1,
3,1,1,2,1,1,1,
T,1,1,1,1,0,1,
1,1,T,T,1,T,1,
1,1,1,1,1,1,1,
1,1,1,T,1,0,1,
1,1,1,T,1,T,1,
"u",
e,1,1,1,1,1,1,
E,1,1,1,2,E,1,
1,1,1,t,1,1,1,
1,T,1,3,1,1,1,
1,t,1,1,e,1,1,
1,1,1,1,T,1,1,
1,1,1,1,1,1,1,
"u",
e,1,1,1,1,1,1,
E,1,1,1,2,E,1,
1,1,1,t,1,1,1,
1,T,1,3,1,1,t,
1,t,1,1,e,1,0,
1,1,1,1,T,1,1,
1,1,0,e,1,1,1,
"u",
e,1,0,1,1,1,1,
E,1,E,1,2,E,1,
1,1,1,t,1,1,1,
1,T,1,3,1,1,t,
1,t,1,1,e,1,0,
T,1,1,1,T,1,1,
0,1,0,e,1,0,e,
"u",
3,0,1,E,1,0,1,
0,t,1,0,1,t,0,
1,1,t,0,0,1,1,
T,1,1,1,1,E,1,
2,1,0,0,1,0,0,
1,0,0,0,0,1,T,
T,0,1,1,0,T,1,
"r",
t,T,T,T,T,T,1,
1,1,1,1,1,1,1,
T,e,e,e,e,e,e,
1,1,1,1,1,1,e,
1,1,1,1,1,1,2,
t,t,t,t,t,t,1,
3,1,1,1,1,t,1,
"r",
T,e,1,E,0,1,1,
1,1,T,1,0,1,T,
2,T,1,0,0,1,0,
1,1,T,1,0,1,0,
1,1,t,1,0,1,0,
1,3,1,0,0,1,0,
t,0,1,e,1,E,0,
"l",
t,E,1,1,e,0,T,
1,1,e,E,1,1,1,
1,1,1,1,1,0,T,
t,0,0,0,1,2,1,
1,1,1,0,0,1,t,
0,0,0,1,0,1,1,
3,1,t,1,0,0,t,
"l",
1,t,e,e,e,e,1,
e,1,1,1,1,e,1,
0,1,E,1,1,2,1,
0,0,1,0,0,E,1,
1,0,0,1,0,0,0,
t,1,0,E,1,1,0,
3,1,0,0,0,0,0,
"l",
t,e,1,e,1,0,t,
1,1,e,0,1,3,0,
e,0,1,1,e,1,1,
1,1,E,E,E,E,E,
0,T,1,1,1,1,E,
0,1,0,0,0,1,E,
0,0,0,1,2,1,T,
"u",
0,1,1,1,1,0,e,
3,t,t,t,t,t,1,
1,1,1,1,1,1,1,
e,E,E,E,E,E,E,
1,1,1,1,1,1,E,
1,1,1,1,1,1,T,
T,T,T,T,T,T,2,
"END"];
var theTrueCampainPresetMaps = ["d",
0,0,0,0,0,0,1,
0,1,1,1,1,0,0,
0,0,0,0,0,1,0,
0,1,1,1,0,1,0,
1,2,8,4,0,1,0,
6,1,1,1,1,3,0,
5,0,0,0,0,0,1,
"l",
0,9,1,0,7,6,1,
0,b,1,0,1,3,1,
0,b,1,0,0,1,9,
b,0,0,1,0,0,b,
8,1,0,0,1,0,0,
0,0,1,0,0,1,8,
0,0,2,1,0,6,0,
"r",
3,1,6,0,5,2,1,
b,0,1,0,0,1,t,
9,0,0,0,1,1,0,
1,1,7,1,1,0,0,
0,0,0,1,6,0,1,
0,1,1,6,7,1,t,
0,0,6,6,1,4,6,
"l",
7,b,3,0,0,1,0,
2,1,1,1,0,0,0,
1,0,0,E,1,0,1,
6,1,0,1,0,0,1,
0,1,0,1,0,1,E,
0,1,0,1,0,1,0,
0,0,0,1,0,0,0,
"l",
0,0,0,1,e,0,1,
E,1,0,0,1,b,8,
1,0,1,4,1,9,0,
9,b,0,1,e,1,2,
1,3,0,1,7,6,1,
E,0,5,8,1,6,0,
1,1,1,6,6,6,1,
"d",
2,1,0,0,e,1,e,
5,0,0,1,1,0,0,
0,0,1,0,0,0,1,
0,1,1,0,0,1,6,
0,0,1,b,1,3,0,
8,8,1,0,0,1,0,
4,7,b,b,b,b,0,
"u",
e,1,t,3,1,e,e,
6,t,1,1,e,e,1,
1,1,7,7,7,1,2,
0,0,b,1,1,9,8,
0,1,b,0,1,b,0,
0,0,0,7,0,0,1,
0,1,9,0,1,0,6,
"r",
9,b,3,1,0,0,0,
6,8,1,0,0,1,0,
0,1,0,0,1,t,0,
8,0,0,1,t,1,1,
1,1,1,T,0,T,t,
8,6,6,1,1,1,6,
2,1,6,6,6,6,6,
"d",
E,7,0,8,0,1,e,
1,0,0,1,0,6,1,
4,8,0,7,0,1,1,
1,1,1,1,1,E,8,
0,b,b,b,8,1,b,
0,1,1,1,0,b,8,
6,3,5,2,1,e,0,
"d",
6,7,0,1,6,0,6,
6,1,0,0,1,0,1,
6,3,1,0,1,0,0,
5,1,0,6,1,1,0,
2,1,6,1,1,0,0,
1,0,0,1,0,0,1,
t,6,1,t,7,8,4,
"u",
e,6,1,6,6,7,6,
1,6,6,1,3,1,6,
2,5,6,0,1,6,6,
1,e,1,6,6,6,1,
6,6,1,1,1,1,4,
6,1,0,9,b,0,8,
7,0,b,9,0,0,8,
"r",
t,7,T,T,7,6,3,
0,5,b,1,1,6,1,
1,2,1,4,9,1,T,
e,1,E,8,b,1,6,
6,6,1,b,7,e,1,
b,6,6,1,1,1,t,
E,b,6,6,6,6,6,
"u",
4,b,0,0,0,1,0,
0,1,b,1,0,0,0,
0,0,b,1,b,1,b,
1,1,7,1,1,1,t,
0,t,1,0,0,0,1,
0,1,0,0,1,0,6,
0,0,0,1,2,5,3,
"r",
0,t,0,1,t,1,2,
3,1,0,1,6,1,e,
1,0,0,1,1,e,e,
0,0,1,T,e,e,1,
0,1,5,1,1,1,1,
0,b,b,b,b,T,7,
1,0,0,0,0,5,4,
"d",
1,8,2,1,0,0,0,
0,4,1,0,0,1,0,
0,1,0,0,1,0,0,
0,1,0,1,1,0,1,
0,1,0,0,1,0,3,
0,8,1,0,b,1,5,
7,0,0,0,9,1,6,
"r",
0,t,0,1,t,1,2,
3,1,0,1,6,1,e,
1,0,0,1,1,e,e,
0,0,1,T,e,e,1,
0,1,5,1,1,1,1,
0,b,b,b,b,T,7,
1,0,0,0,0,5,4,
"l",
2,8,0,7,0,0,1,
1,1,0,0,1,0,0,
E,0,1,0,0,1,4,
1,0,0,1,0,0,1,
6,1,0,0,1,0,0,
5,3,1,0,1,1,0,
E,0,1,0,0,0,0,
"l",
1,0,0,0,1,E,8,
0,0,1,0,0,1,b,
0,1,2,1,E,1,b,
4,1,5,3,1,1,b,
1,1,1,0,0,1,b,
t,0,9,b,0,0,b,
t,t,0,0,1,0,0,
"l",
t,b,T,1,e,e,e,
1,e,1,E,1,1,E,
1,1,1,0,0,1,1,
0,0,0,1,0,0,1,
0,1,0,0,1,4,1,
0,0,1,0,1,T,0,
1,3,1,0,t,5,2,
"r",
t,3,1,1,0,0,0,
t,1,1,4,1,0,0,
t,b,b,b,b,9,7,
1,0,1,1,1,0,b,
1,e,0,0,T,0,T,
7,1,1,1,1,1,1,
e,8,1,t,7,5,2,
"d",
e,T,1,6,5,3,E,
e,1,0,1,1,E,t,
e,0,0,0,0,1,t,
1,1,0,1,0,1,t,
2,8,1,0,0,1,t,
1,4,0,1,0,1,t,
E,1,0,0,0,1,T,
"d",
9,b,E,1,0,0,0,
1,1,1,0,0,1,0,
6,T,1,3,1,0,0,
1,1,2,5,1,0,1,
e,7,1,0,1,0,0,
8,1,t,1,t,1,0,
1,4,8,1,e,E,T,
"d",
E,E,0,b,b,b,7,
b,0,0,1,1,1,2,
b,0,1,0,0,0,1,
0,1,0,0,1,0,0,
0,1,0,1,3,1,0,
0,1,0,1,6,1,0,
e,1,0,0,0,1,e,
"d",
t,7,6,1,t,6,1,
t,1,3,1,1,1,6,
7,T,1,6,6,1,T,
1,T,6,6,6,6,1,
2,1,1,1,1,6,6,
7,1,6,6,6,1,6,
6,6,6,1,6,6,6,
"u",
6,E,0,0,0,E,1,
0,0,0,1,e,0,e,
4,1,1,T,1,b,1,
1,T,1,5,1,0,0,
2,8,1,3,1,1,7,
1,1,1,6,1,0,0,
9,b,t,7,t,b,9,
"d",
9,3,0,9,1,7,t,
b,b,5,0,0,1,8,
8,1,2,1,0,9,1,
E,4,1,9,0,1,T,
E,1,e,e,1,8,8,
b,b,e,1,0,0,7,
0,T,t,9,b,0,0,
"l",
4,1,0,0,0,b,b,
E,1,0,1,0,0,b,
E,1,0,E,1,0,0,
E,1,0,b,1,6,b,
E,1,0,1,2,5,1,
E,1,0,0,1,1,1,
E,3,0,1,E,8,E,
"u",
0,0,2,1,0,0,0,
0,0,1,0,0,1,0,
0,1,1,0,1,1,4,
b,0,0,3,e,t,1,
0,1,1,b,1,e,t,
8,9,5,7,0,1,T,
0,0,0,1,E,T,E,
"r",
T,T,T,1,6,7,1,
1,1,8,1,8,3,0,
0,0,0,t,1,1,T,
0,1,1,1,0,4,1,
0,b,b,b,7,1,6,
1,1,1,1,1,0,0,
2,5,t,0,0,0,1,
"r",
1,0,8,0,1,6,t,
0,0,7,8,0,0,1,
0,1,7,0,0,1,2,
0,3,1,1,1,t,5,
0,1,0,0,0,1,T,
0,0,0,1,0,0,1,
1,0,1,T,1,8,4,
"l",
2,8,0,0,0,0,b,
b,b,0,1,1,0,t,
b,b,0,0,3,1,1,
b,t,b,b,1,0,0,
0,b,1,b,b,0,0,
0,b,b,b,0,0,0,
0,0,1,0,0,0,9,
"r",
E,0,1,4,1,0,e,
0,e,1,0,1,3,0,
1,1,7,0,7,1,1,
6,0,0,1,0,0,6,
1,1,8,t,8,1,1,
0,E,1,6,1,T,0,
T,0,1,5,2,1,t,
"u",
1,E,5,e,1,T,e,
e,1,2,1,e,1,1,
4,E,1,E,1,1,t,
T,1,e,3,T,1,T,
1,e,1,t,1,t,1,
1,1,e,1,1,e,1,
e,t,1,e,1,0,t,
"l",
t,6,1,0,T,7,t,
0,b,T,b,b,1,b,
1,b,0,e,1,t,1,
t,b,1,b,t,1,E,
8,1,t,1,E,1,3,
e,1,7,b,1,2,1,
b,e,1,7,t,E,E,
"l",
t,1,t,1,e,0,1,
b,6,1,e,1,0,0,
b,1,E,1,t,1,e,
b,1,0,E,0,1,1,
b,1,e,1,1,7,t,
b,e,1,T,3,1,1,
7,1,t,T,1,T,2,
"r",
3,0,T,T,T,T,1,
0,b,5,T,1,1,T,
1,2,1,0,1,e,0,
e,1,E,b,E,1,1,
0,E,1,t,1,E,1,
1,1,t,e,t,1,t,
e,1,E,1,1,1,4,
"u",
2,8,5,0,t,t,1,
1,1,1,0,1,1,T,
e,6,1,0,1,1,t,
0,1,e,3,t,4,1,
t,T,1,E,1,1,T,
1,0,1,T,1,1,E,
e,e,e,t,1,1,1,
"d",
7,b,b,b,b,7,2,
b,b,b,b,b,1,5,
7,b,b,b,b,b,E,
1,b,1,1,b,1,1,
3,1,T,e,1,t,e,
T,6,1,b,t,1,E,
b,b,E,1,E,4,b,
"r",
7,b,7,1,7,b,7,
b,1,0,1,0,b,b,
b,1,t,1,2,b,T,
0,7,1,T,1,1,1,
1,b,1,7,b,b,7,
6,0,b,1,1,1,b,
3,1,t,b,b,b,7,
"r",
7,b,b,b,b,6,3,
b,1,1,1,1,1,1,
7,b,b,b,b,b,7,
1,1,1,1,1,1,b,
7,b,b,b,b,b,7,
b,1,1,1,1,1,1,
7,b,b,b,b,7,2,
"END"];
//draw level
function updateScreen() {
  redBoxXs = [];
  redBoxYs = [];
  redBoxLocs = [];
  switchX = [];
  switchY = [];
  Switch=[];
  onBlocks = [];
  yellow =[];
  purp = [];
  doorXY = [];
  door = [];
  keyX = [];
  keyY = [];
  key = [];
  teleportX = [];
  teleportY = [];
  teleportType = [];
  teleportPos = [];
  boxX = [];
  boxY = [];
  boxNum = [];
  plate = [];
  levelEditor = false;
  hasLost = false;
  for (var i = 1; i < 50; i++) {
    if (map[1]==0) {
      setProperty("box"+i, "image", "assets/White-square.jpg");
    } else if (map[1]==1) {
      setProperty("box"+i, "image", "assets/red-square.png");
      appendItem(redBoxXs, locateX(i));
      appendItem(redBoxYs, locateY(i));
      appendItem(redBoxLocs,i);
    }else if (map[1]==2) {
      setProperty("box"+i, "image", "assets/green-square.jpg");
      goalBoxX = locateX(i);
      goalBoxY = locateY(i);
      goalBoxPos = i;
    } else if (map[1]==3) {
      setProperty("box"+i, "image", "assets/blue-square.jpg");
      startBoxX = locateX(i);
      startBoxY = locateY(i);
      startBoxPos = i;
    } else if ((map[1]==4)) {
      setProperty("box" + i, "image", "assets/key-square.png");
      appendItem(keyX, locateX(i));
      appendItem(keyY, locateY(i));
      appendItem(key, i);
    } else if ((map[1]==5)){
      setProperty("box" + i, "image", "assets/lock-square.png");
      appendItem(redBoxXs, locateX(i));
      appendItem(redBoxYs, locateY(i));
      appendItem(doorXY, redBoxXs.length-1);
      appendItem(door, i);
    } else if ((map[1]==6)) {
      setProperty("box"+i, "image", "assets/switch-purple-off.png");
      appendItem(Switch, i);
      appendItem(switchX, locateX(i));
      appendItem(switchY, locateY(i));
    } else if ((map[1]==7)) {
      setProperty("box"+i, "image", "assets/purple-outline.png");
      appendItem(purp, i);
    } else if ((map[1]==8)) {
      setProperty("box"+i, "image", "assets/yellow-square.png");
      appendItem(redBoxXs, locateX(i));
      appendItem(redBoxYs, locateY(i));
      appendItem(onBlocks, redBoxXs.length - 1);
      appendItem(yellow, i);
    } else if ((map[1]==9)) {
      setProperty("box"+i, "image", "assets/plate-box.png");
      appendItem(plate, i);
    } else if (map[1] >= t && (map[1]) <= E) {
    appendItem(teleportX, locateX(i));
    appendItem(teleportY, locateY(i));
    appendItem(teleportType, map[1]);
    appendItem(teleportPos, i);
    teleportDraw(map[1], i);
    }else if (map[1] == b) {
    appendItem(boxX, locateX(i));
    appendItem(boxY, locateY(i));
    appendItem(boxNum, i);
    setProperty("box"+i, "image", "assets/box-box.png");
    }
    appendItem(map, map[1]);
    removeItem(map, 1);
  }
  for (var o = 0; o < 7; o++) {
    appendItem(redBoxXs, -20);
  }
  for (var j = 0; j < 7; j++) {
    appendItem(redBoxXs, 340);
  }
  for (var k = 1; k <= 14; k++) {
    appendItem(redBoxXs, locateX(k));
  }
  for (var p = 0; p < 2; p++) {
    for (var l = 1; l <= 7; l++) {
      appendItem(redBoxYs, locateY(l*7));
    }
  }
  for (var m = 0; m < 7; m++) {
    appendItem(redBoxYs, 113);
  }
  for (var n = 0; n < 7; n++) {
    appendItem(redBoxYs, 473);
  }
  startDirection = map[0];
  insertItem(map, map.length-49, map[0]);
  removeItem(map, 0);
  textdisply1++;
  specialDesplay();
  if (!levelEditor) {
    penColor("white");
    drawPlayer();
  }
  specialDesplay();
  makeFog(fog[1]);
}
//find aproprite coordinates for blocks
var leftButtonOn = true;
function locateX(number) {
  if (number%7==1) {
    return 25;
  } else if ((number%7==2)) {
    return 70;
  } else if ((number%7==3)) {
    return 115;
  }else if ((number%7==4)) {
    return 160;
  }else if ((number%7==5)) {
    return 205;
  }else if ((number%7==6)) {
    return 250;
  }else if ((number%7==0)) {
    return 295;
  }
}
function locateY(number) {
  if (number <=7) {
    return 158;
  } else if ((number<=14)) {
    return 203;
  } else if ((number<=21)) {
    return 248;
  }else if ((number<=28)) {
    return 293;
  }else if ((number<=35)) {
    return 338;
  }else if ((number<=42)) {
    return 383;
  }else if ((number<=49)) {
    return 428;
  }
}
function locateLoc(x,y){
  var playerPos;
  var xs = [25,70,115,160,205,250,295];
  var ys = [158,203,248,293,338,383,428];
  for (var i = 0; i < 7; i++){
    if (Math.round(x) == xs[i]){
      playerPos = i+1;
    }
  }
  for (var j = 0; j < 7; j++){
    if (Math.round(y) == ys[j]){
      playerPos += j*7;
    }
  }
  return(playerPos);
}
//draws special level items (mainly for tutorals)
var tutorialsInARow;
var resetBoss = 0;
function specialDesplay() {
  setText("skull","💀")
  pressed = 0;
  hideElement("SkipTutorialButton"); 
  hideElement("ranWinCount");
  hideElement("randTypeDisplay");
  if (textdisply0 == "levelEditor") {
      levelEditor = true;
      hideElement("leftbutton");
      hideElement("rightButton");
      hideElement("upButton");
      hideElement("goButton");
      showElement("startDirDropdown");
      showElement("exportButton");
      showElement("backroundButton");
  }else if ((textdisply0 == "rand")) {
    showElement("exportButton");
    showElement("ranWinCount");
    showElement("randTypeDisplay");
    hideElement("goButton");
  }else if ((textdisply0 == "basicMovmentCampaign")  ||  (textdisply0 =="basicMovment")) {
    if (textdisply1 == 1) {
      if (textdisply0 == "basicMovmentCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/basic-tutoral-1.gif");
      showElement("hand1");
      showElement("hand4");
      showElement("goButtonClear");
      showElement("upButtonClear");
      hideElement("leftbutton");
      hideElement("rightButton");
      hideElement("homeGame");
      leftButtonOn = false;
      for (var i = 1; i < 50; i++) {
       if (i == 25  ||  i == 32){
          i++;
       }
       hideElement("box"+i);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 7000);
      tutorialsInARow = 4;
    } else if (textdisply1 == 2) {
      if (textdisply0 == "basicMovmentCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/basic-tutoral-2.gif");
      showElement("hand1");
      showElement("hand3");
      showElement("hand4");
      showElement("goButtonClear");
      showElement("upButtonClear");
      showElement("rightButtonClear");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = false;
      for (var j = 1; j < 50; j++) {
       if (j == 25  ||  j == 32){
          j++;
       }
       hideElement("box"+j);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 8000);
      tutorialsInARow = 3;
    } else if (textdisply1 == 3) {
      if (textdisply0 == "basicMovmentCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/basic-tutoral-3.gif");
      showElement("hand1");
      showElement("hand2");
      showElement("hand4");
      showElement("goButtonClear");
      showElement("upButtonClear");
      showElement("leftbuttonClear");
      hideElement("leftbutton");
      hideElement("rightButton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var k = 1; k < 50; k++) {
       if (k == 25  ||  k == 32){
          k++;
       }
       hideElement("box"+k);
      }
      showElement("box24");
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 9000);
      tutorialsInARow = 2;
    } else if (textdisply1 == 4) {
      if (textdisply0 == "basicMovmentCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/basic-tutoral-4.gif");
      hideElement("homeGame");
      hideElement("leftbutton");
      showElement("box17");
      showElement("box18");
      showElement("box19");
      showElement("box26");
      showElement("box33");
      showElement("box39");
      leftButtonOn = true;
      for (var m = 1; m < 50; m++) {
       if (m == 17  ||  m == 24){
          m = m + 3;
       } else if (m == 32){
         m = m + 2;
       }else if (m == 39){
         m++;
       }
       hideElement("box"+m);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 6000);
      tutorialsInARow = 1;
    } else if (textdisply1 == 5) {
      for (var l = 1; l < 50; l++) {
       showElement("box"+l);
      }
    }
  }else if ((textdisply0 == "keysCampaign")  ||  (textdisply0 =="keys")) {
    if (textdisply1 == 1) {
      if (textdisply0 == "keysCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/key-tutorial-1.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var n = 1; n < 50; n++) {
       while (n == 18  ||  n == 25 || n == 32 || n == 33){
          n++;
       }
       hideElement("box"+n);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 10000);
      tutorialsInARow = 1;
    } else if (textdisply1 == 2) {
      for (var o = 1; o < 50; o++) {
       showElement("box"+o);
      }
    }
  }else if (textdisply0 == "switchesCampaign"  || textdisply0 == "switch") {
    if (textdisply1 == 1) {
      if (textdisply0 == "switchesCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/switch-tutoral-1.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var p = 1; p < 50; p++) {
       while (p == 24  ||  p == 25 || p == 31 || p == 32 || p == 33){
          p++;
       }
       hideElement("box"+p);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 11000);
      tutorialsInARow = 1;
    } else if (textdisply1 == 2 && textdisply0 == "switchesCampaign") {
      for (var q = 1; q < 50; q++) {
       showElement("box"+q);
      }
    } else if (textdisply1 == 9 || textdisply0 == "switch") {
      if (textdisply0 == "switchesCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/switch-tutoral-2.gif");
      showElement("box23");
      showElement("box26");
      showElement("box30");
      showElement("box39");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var r = 1; r < 50; r++) {
       while (r == 23  || r == 24  ||  r == 26 || r == 30 || r == 31 || r == 32 || r == 33 || r == 39){
          r++;
       }
       hideElement("box"+r);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 11400);
      tutorialsInARow = 1;
    } else if (textdisply1 == 10) {
      for (var s = 1; s < 50; s++) {
       showElement("box"+s);
      }
    }
  } else if (textdisply0 == "BoxesCampaign"  || textdisply0 == "box") {
     if (textdisply1 == 1) {
       if (textdisply0 == "BoxesCampaign"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/box-tutorial-1.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var t = 1; t < 50; t++) {
       while (t == 16  ||  (t >= 23 && t <= 27) || t == 30 || t == 32){
          t++;
       }
       hideElement("box"+t);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 5000);
       tutorialsInARow = 1;
      } else if (textdisply1 == 2  || textdisply1 == 9) {
        for (var u = 1; u < 50; u++) {
          showElement("box"+u);
        }
      }
     if (textdisply1 == 8 || (textdisply0 == "box" && textdisply1 == 2)){
       if (textdisply0 == "BoxesCampaign"){
       showElement("SkipTutorialButton"); 
      }
       showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/box-tutorial-2.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var z = 1; z < 50; z++) {
       while (z == 17  || z == 18 || z == 24 || z == 25 || z == 31 || z == 32 || z == 33){
       z++;
       }
       hideElement("box"+z);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 7000);
       tutorialsInARow = 1;
     }
  } else if (textdisply0 == "teleportersCampagn"  || textdisply0 == "teleportTutoral") {
    if (textdisply1 == 1) {
      if (textdisply0 == "teleportersCampagn"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/teleport-tutoral-1.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var v = 1; v < 50; v++) {
       while (v == 16  || v == 17 || v == 33 || v == 34){
          v++;
       }
       hideElement("box"+v);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 3000);
      tutorialsInARow = 1;
    } else if (textdisply1 >= 2 && textdisply1 <= 6) {
        for (var w = 1; w < 50; w++) {
          showElement("box"+w);
        }
    }
    if ((textdisply1 == 3 && textdisply0 == "teleportersCampagn") || (textdisply1 == 2 && textdisply0 == "teleportTutoral")) {
      if (textdisply0 == "teleportersCampagn"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/teleport-tutoral-2.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var x = 1; x < 50; x++) {
       while (x == 9  || x == 10 || x == 13 || x == 20 || x == 30 || x == 31 || x == 33 || x == 34){
          x++;
       }
       hideElement("box"+x);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 3000);
      tutorialsInARow = 2;
    } else if ((textdisply1 == 4) || textdisply1 == 3) {
      if (textdisply0 == "teleportersCampagn"){
       showElement("SkipTutorialButton"); 
      }
      showElement("tutoralImage");
      setProperty("tutoralImage","image","assets/teleport-tutoral-3.gif");
      hideElement("leftbutton");
      hideElement("homeGame");
      leftButtonOn = true;
      for (var y = 1; y < 50; y++) {
       while (y == 4  || y == 8 || y == 11 || y == 15 || y == 20 || y == 24 || y == 25 || y == 27 || y == 39 || y == 41 || y == 46 || y == 48){
          y++;
       }
       hideElement("box"+y);
      }
      hide();
      setTimeout(function() {
        tutoralEndButtonShow();
      }, 15000);
      tutorialsInARow = 1;
    }
  }else if (textdisply0 == "theTrueTutoral") {
    hideElement("homeGame");
    if (textdisply1 != 1){
      if (!hasLost){
        hide();
        showElement("bossHandMiddle");
        for (var C = 1; C < 50; C++) {
           hideElement("box"+C);
        }
        setTimeout(function() {
          show();
          if (textdisply1 != 1){
            for (var C = 1; C < 50; C++) {
              showElement("box"+C);
            }
            setTimeout(function() {
              hideElement("bossHandMiddle");
            }, 250);
          }
        }, 500);
      }
    } else {
      for (var C = 1; C < 50; C++) {
          showElement("box"+C);
      }
      for (var f = 1; f < 50; f++) {
        if (f == 15){
          f += 4;
        } else if (f == 23){
          f += 3;
        }else if (f == 31){
          f += 2;
        }else if (f == 39){
          f++;
        }
        hideElement("box"+f);
      }  
      hideElement("bossHandMiddle");
    }
    if ((textdisply1-1)%4 == 1 && textdisply1 != 26){
      setTimeout(function() {
        if (textdisply1 != 1){
          showElement("skull");
        }
        setTimeout(function() {
          if (textdisply1 != 1){
            hideElement("skull");
            showElement("bossSkull");
            setText("skull","");
          }
        }, 500);
      }, 1000);
      fog = [true,false];
      if (resetBoss == 2){
        theTrueTutoral(0);
      }else{
        resetBoss++;
      }
    }else{
      hideElement("bossSkull");
      fog = [false,true];
      resetBoss = 0;
    }
  }
}
 var Skip = false;
 var pressed = 0;
onEvent("SkipTutorialButton", "click", function( ) {
  var toBeSkiped = tutorialsInARow;
  Skip = 2 * (tutorialsInARow - pressed);
  for (var i = 0; i < toBeSkiped; i++) {
    updateScreen();
  }
  hideElement("tutoralImage");
  hideElement("hand1");
  hideElement("hand2");
  hideElement("hand3");
  hideElement("hand4");
  hideElement("tutoralEndButton");
  showElement("leftbutton");
  showElement("upButton");
  showElement("rightButton");
  showElement("goButton");
  showElement("homeGame");
});
onEvent("tutoralEndButton", "click", function( ) {
  pressed = 1;
  hideElement("tutoralEndButton");
  hideElement("tutoralImage");
  showElement("homeGame");
  show();
  if (leftButtonOn){
    showElement("leftbutton");
  }
});
function tutoralEndButtonShow(){
  if (!Skip){
    showElement("tutoralEndButton");
  }else{
    Skip--;
  }
}
//Make instructions
onEvent("leftbutton", "click", function( ) {
  left()
});
onEvent("leftbuttonClear", "click", function( ) {
  hideElement("leftbuttonClear");
  left()
});
onEvent("upButton", "click", function( ) {
  up();
});
onEvent("upButtonClear", "click", function( ) {
  hideElement("upButtonClear");
  up();
});
onEvent("rightButton", "click", function( ) {
  right();
});
onEvent("rightButtonClear", "click", function( ) {
  hideElement("rightButtonClear");
  right();
});
onEvent("goButton", "click", function( ) {
 go();
});
onEvent("goButtonClear", "click", function( ) {
  hideElement("goButtonClear");
 go();
});

function left(){
  appendItem(instructions, "⤺");
  updateDisplay();
  hideElement("homeGame");
  hideElement("exportButton");
  showElement("goButton");
  hideElement("hand2");
  hideElement("teleportTutoralText");
}
function up(){
  appendItem(instructions, "↑");
  updateDisplay();
  hideElement("hand1");
  hideElement("homeGame");
  hideElement("exportButton");
  showElement("goButton");
  hideElement("teleportTutoralText");
}
function right(){
  appendItem(instructions, "↷");
  updateDisplay();
  hideElement("homeGame");
  hideElement("exportButton");
  showElement("goButton");
  hideElement("hand3");
  hideElement("teleportTutoralText");
}
function go(){
 makeFog(fog[0]);
 keyUsed = false;
 newBoxX = [];
 newBoxY = [];
 newBoxNum = [];
 plateCon = [];
 for (var a = 0; a < plate.length; a++) {
   appendItem(plateCon, false);
 }
 for (var i = 0; i < boxX.length; i++) {
   appendItem(newBoxX, boxX[i]);
   appendItem(newBoxY, boxY[i]);
   appendItem(newBoxNum, boxNum[i]);
 }
 hideElement("hand4");
 hideElement("goButton");
 hideElement("leftbutton");
 hideElement("upButton");
 hideElement("rightButton");
 onOrOff = "off";
 var last;
 Continue = true;
timedLoop(250, function() {
  if (Continue) {
    if (instructions[0] == "⤺" ) {
      turnLeft(90);
    } else if (instructions[0] == "↑" ) {
      moveForward(45);
      if (redChecker(Math.round(getX()), Math.round(getY()))) {
      lose();
      } else if ((switchChecker(Math.round(getX()), Math.round(getY())))) {
        SwitchF();
      } else if ((boxChecker(Math.round(getX()), Math.round(getY())))) {
        var loop = true;
        var loop2 = true;
        var times=0;
        while (loop) {
          if (getDirection() == 0) {
            loop2 = box(-45, -7, 0, times);
          } else if ((getDirection() == 90)) {
            loop2 = box(0, 1, 45, times);
          } else if ((getDirection() == 180)) {
            loop2 = box(45, 7, 0, times);
          } else if ((getDirection() == 270)) {
            loop2 = box(0, -1, -45, times);
          }
          times++;
          for (var num = 0; num < newBoxNum.length; num++) {
            if (newBoxNum[boxi]==newBoxNum[num] && boxi != num && loop2) {
              loop = true;
              num = newBoxNum.length;
            } else {
              loop = false;
            }
          }
        }
        for (var w = 0; w < plate.length; w++) {
          var counter = 0;
          for (var u = 0; u < newBoxNum.length; u++) {
            if (plate[w] == newBoxNum[u] && !plateCon[w]) {
              removeItem(plateCon, w);
              insertItem(plateCon, w, true);
              SwitchF();
            } else if (plate[w] != newBoxNum[u] && plateCon[w]) {
              counter++;
            }
          }
          if (counter == newBoxNum.length) {
            removeItem(plateCon, w);
            insertItem(plateCon, w, false);
            SwitchF();
          }
        }
      }
      if (keyChecker(Math.round(getX()), Math.round(getY()))) {
        for (var z = doorXY.length-1; z > -1; z--) {
          setProperty("box" + door[z], "image", "assets/White-square.jpg");
          removeItem(redBoxXs, doorXY[z]);
          removeItem(redBoxYs, doorXY[z]);
        }
        for (var x = 0; x < doorXY.length; x++) {
          removeItem(doorXY, x);
        }
        keyUsed = true;
      }
        teleportChecker(Math.round(getX()), Math.round(getY()));
      makeFog(fog[0] || fog[1]);
      } else if (instructions[0] == "↷" ) {
        turnRight(90);
      }
      last = instructions[0];
      if (instructions.length !=0) {
      removeItem(instructions, 0);
      }
      updateDisplay();
      if (instructions.length == 0) {
       setTimeout(function() {
         endOfStage(true);
       }, 400);
       stopTimedLoop();
      }
    } else {
      Continue = true;
    }
  });
}
function makeFog(doseFog,quick){
  if (doseFog){
    var keep = pos(goalBoxPos,true).concat(pos(locateLoc(getX(),getY()),true),goalBoxPos,locateLoc(getX(),getY()));
    keep = keep.filter((item,index) => keep.indexOf(item) === index);
    for (var i = 1; i <= 49; i++){
      setProperty("box"+i, "image", "assets/fog-square.png");
    }
    for (var j = 0; j < keep.length; j++){
      boxReset(keep[j],true);
    }
  }
}
function keyChecker(X, Y) {
  for (var i = 0; i < keyX.length; i++) {
    if ((X == keyX[i]) && (Y == keyY[i])) {
      setProperty("box" + key[i], "image", "assets/White-square.jpg");
      return true;
    }
  }
}
function redChecker(X, Y) {
  for (var i = 0; i < redBoxXs.length; i++) {
    if ((X == redBoxXs[i]) && (Y == redBoxYs[i])) {
      return true;
    }
  }
}
function switchChecker(X, Y) {
  for (var i = 0; i < switchX.length; i++) {
    if ((X == switchX[i]) && (Y == switchY[i])) {
      return true;
    }
  }
}
function SwitchF() {
  for (var j = 0; j < (Switch.length); j++) {
    if (onOrOff == "off") {
      setProperty("box" + Switch[j], "image", "assets/switch-yellow.off.png");
    } else {
      setProperty("box" + Switch[j], "image", "assets/switch-purple-off.png");
    }
  }
  if (onOrOff == "off") {
    for (var k = onBlocks.length-1; k >= 0; k--) {
      removeItem(redBoxXs, onBlocks[k]);
      removeItem(redBoxYs, onBlocks[k]);
      setProperty("box" + yellow[k], "image", "assets/yellow-outline.png");
    }
    onBlocks = [];
    for (var l = 0; l < purp.length; l++) {
      appendItem(redBoxXs, locateX(purp[l]));
      appendItem(redBoxYs, locateY(purp[l]));
      appendItem(onBlocks, redBoxXs.length -1);
      setProperty("box" + purp[l], "image", "assets/purple-square.png");
    }
    onOrOff = "on";
  } else {
    off();
  }
  var length = yellow.length;
  if (yellow.length<purp.length) {
    length = purp.length;
  }
  for (var Q = newBoxNum.length-1; Q >= 0; Q--) {
    for (var q = 0; q < length; q++) {
      if ((purp[q] == newBoxNum[Q] || yellow[q] == newBoxNum[Q]) && newBoxNum[Q] != null) {
        removeItem(newBoxX, Q);
        removeItem(newBoxY, Q);
        removeItem(newBoxNum, Q);
      }
    }
  }
  for (var i = 0; i < newBoxNum.length; i++) {
    setProperty("box" + newBoxNum[i], "image", "assets/box-box.png");
  }
  if (redChecker(Math.round(getX()), Math.round(getY()))) {
      lose();
  }
}
function box(math1, math2, math3, first) {
  if (redChecker(Math.round(getX())+(math3*(first+1)), (Math.round(getY())+(math1*(first+1))))) {
      lose();
      return false;
      } else {
      if (!first) {
        boxReset(newBoxNum[boxi]);
      }
      appendItem(newBoxX, (newBoxX[boxi]+math3));
      appendItem(newBoxY, newBoxY[boxi]+ math1);
      appendItem(newBoxNum, (newBoxNum[boxi]+ math2));
      removeItem(newBoxNum, boxi);
      removeItem(newBoxX, boxi);
      removeItem(newBoxY, boxi);
      boxi = newBoxNum.length-1;
      if (newBoxNum[boxi]>=1 && newBoxNum[boxi]<=49) {
        setProperty("box" + newBoxNum[boxi], "image", "assets/box-box.png");
      }
    }
  return true;
  }
function boxReset(j,showBox) {
  var large = 1;
  large = findLarge(large,yellow);
  large = findLarge(large,purp);
  large = findLarge(large,Switch);
  large = findLarge(large,teleportPos);
  large = findLarge(large,plate);
  large = findLarge(large,redBoxLocs);
  for (var i = 0; i < large; i++) {
    if (yellow[i]==j) {
      setProperty("box" + j, "image", "assets/yellow-outline.png");
      i = 49;
    } else if (purp[i]==j) {
      setProperty("box" + j, "image", "assets/purple-outline.png");
      i = 49;
    } else if (Switch[i]==j) {
      if (onOrOff == "off") {
        setProperty("box" + j, "image", "assets/switch-purple-off.png");
      } else if (onOrOff == "on") {
        setProperty("box" + j, "image", "assets/switch-yellow.off.png");
      }
      i = 49;
    } else if (teleportPos[i] == j) {
      teleportDraw(teleportType[i], j);
      i = 49;
    } else if (startBoxPos == j) {
      setProperty("box" + j, "image", "assets/blue-square.jpg");
      i = 49;
    }else if ((goalBoxPos == j)) {
      setProperty("box" + j, "image", "assets/green-square.jpg");
      i = 49;
    }else if ((plate[i] == j)) {
      setProperty("box" + j, "image", "assets/plate-box.png");
      i = 49;
    } else if (door[i] == j) {
      setProperty("box" + j, "image", "assets/key-square.png");
      i = 49;
    } else if (redBoxLocs[i] == j) {
      setProperty("box" + j, "image", "assets/red-square.png");
      i = 49;
    } else {
      setProperty("box" + j, "image", "assets/White-square.jpg");
    }
    for (var k = 0; k < newBoxNum.length;k++){
      if (newBoxNum[k] == j && showBox) {
        setProperty("box" + j, "image", "assets/box-box.png");
        k = newBoxNum.length;
      }
    }
  }
}
function findLarge(large, compare) {
  if (compare.length > large) {
    return compare.length;
  } else {
    return large;
  }
}
function teleportDraw(loc, pos) {
  if (loc==t) {
    setProperty("box"+pos, "image", "assets/teleport-blue.png");
  } else if ((loc==T)) {
    setProperty("box"+pos, "image", "assets/teleport-green.png");
  } else if ((loc==e)) {
    setProperty("box"+pos, "image", "assets/teleport-yellow.png");
  } else if ((loc==E)) {
    setProperty("box"+pos, "image", "assets/teleport-red.png");
  }
}
var hasLost=false;
function lose() {
  hasLost=true;
  playSound("assets/category_explosion/8bit_explosion.mp3");
  insertItem(instructions, 0, last);
  updateDisplay();
  showElement("skull");
  setTimeout(function() {
     hideElement("skull");
     endOfStage(false);
   }, 1000);
  stopTimedLoop();
}
function boxChecker(X, Y) {
  for (var i = 0; i < boxX.length; i++) {
    if (X == newBoxX[i] && Y == newBoxY[i]) {
      boxi = i;
      return true;
    }
  }
}
function teleportChecker(X, Y) {
  var color;
  var count = 0;
  var i1;
  for (var i = 0; i < teleportX.length; i++) {
    if ((X == teleportX[i]) && (Y == teleportY[i])) {
      color = teleportType[i];
      i1=i;
      Continue = false;
    }
  }
  if (!Continue) {
    setTimeout(function() {
      for (var j = i1 + 1; j < teleportType.length+1; j++) {
        if (j >= teleportType.length && count == 0) {
          j = -1;
          count = 1;
        }
        if (color == teleportType[j] ) {
          moveTo(teleportX[j], teleportY[j]);
          for (var q = 0; q < newBoxX.length; q++) {
            if (teleportX[j] == newBoxX[q] && teleportY[j] == newBoxY[q]) {
              lose();
            }
          }
          j = teleportType.length+1;
        }
      }
    }, 250);
  }
}
function off() {
  if (onOrOff == "on") {
    for (var n = onBlocks.length -1; n >= 0; n--) {
      removeItem(redBoxXs, onBlocks[n]);
      removeItem(redBoxYs, onBlocks[n]);
      setProperty("box" + purp[n], "image", "assets/purple-outline.png");
    }
    onBlocks = [];
    for (var m = 0; m < yellow.length; m++) {
      appendItem(redBoxXs, locateX(yellow[m]));
      appendItem(redBoxYs, locateY(yellow[m]));
      appendItem(onBlocks, redBoxXs.length -1);
      setProperty("box" + yellow[m], "image", "assets/yellow-square.png");
    }
    onOrOff = "off";
  }
}
function drawPlayer() {
  moveTo(startBoxX, startBoxY);
  show();
  if (startDirection=="u") {
    turnTo(0);
  } else if (startDirection=="r") {
    turnTo(90);
  } else if (startDirection=="d") {
    turnTo(180);
  } else if (startDirection=="l") {
    turnTo(270);
  }
}
function endOfStage(canWin) {
if (!usp)
  showElement("homeGame");
if (keyUsed) {
  for (var q = 0; q < door.length; q++) {
    setProperty("box"+door[q], "image", "assets/lock-square.png");
    appendItem(redBoxXs, locateX(door[q]));
    appendItem(redBoxYs, locateY(door[q]));
    appendItem(doorXY, redBoxXs.length-1);
  }
}
for (var i = 0; i < newBoxNum.length; i++) {
    if (newBoxNum[i]>=1 && newBoxNum[i] <=49) {
      boxReset(newBoxNum[i]);
    }
  }
for (var j = 0; j < boxNum.length; j++) {
    setProperty("box"+boxNum[j], "image", "assets/box-box.png");
  }
for (var u = 0; u < key.length; u++) {
  setProperty("box"+key[u], "image", "assets/key-square.png");
}
off();
for (var k = 0; k < (Switch.length); k++) {
     setProperty("box" + Switch[k], "image", "assets/switch-purple-off.png");
   }
showElement("goButton");
showElement("leftbutton");
showElement("upButton");
showElement("rightButton");
instructions = [];
updateDisplay();
hide();
if ((Math.round(getX())) == goalBoxX && Math.round(getY())== goalBoxY && canWin) { 
    if (map[0] == "END") {
      appendItem(map, map[0]);
      removeItem(map, 0);
      setScreen("endGame");
      setText("ranWinCount", textdisply1);
      var randTypeList = [["Basic random",10],["Keys random",10],["Switch random",10],["Teleporter random",10],["Boxes random",5],["The true random",40]];
      for(var g = 0; g < 6; g++){
        if (textdisply2 == g){
          if (localStorage.getItem("level") >= 500){
            if(textdisply1 == randTypeList[g][1]){
              localStorage.setItem(randTypeList[g][0],true);
              canRemoveRan(g+10);
            }
            if (!localStorage.getItem(randTypeList[g][0])){
              setText("ranWinCount", textdisply1+"/"+randTypeList[g][1]);
            }
          }
          setText("randTypeDisplay", randTypeList[g][0]);
        }
      }
      textdisply1--;
      if(localStorage.getItem("level") < campaignChooser()+100){
        localStorage.setItem("level",campaignChooser()+100);
        if (campaignChooser() != 500){
          addToGlow((campaignChooser()/100)+10);
          addToGlow(9);
        }
        if (campaignChooser() == 400){
          for (var A = 0; A < 4; A++){
            addToGlow(A);
          } 
        }
        if (localStorage.getItem("level") != 600){
          addToGlow(localStorage.getItem("level")/100);
          addToGlow(7);
          addToGlow(8);
        }
        if (localStorage.getItem("level") == 100){
          addToGlow(6);
        } 
        if (localStorage.getItem("level") == 600){
          canRemoveGlow(5);
        }
      }
    }else if (localStorage.getItem("level") < textdisply1 + campaignChooser()){
      localStorage.setItem("level",textdisply1 + campaignChooser()); 
    }
    if (textdisply0 == "theTrueTutoral" && textdisply1 == 0){
      setScreen("videoScreen2");
      document.getElementById("endVideo").play();
      setTimeout(function() {
        setScreen("uploadCompleteScreen");
        localStorage.setItem("end",true);
      }, 16500);
    }
    updateScreen();
  } else {
    drawPlayer();
    hasLost=true;
    specialDesplay();
  }
  if (fog[0]){
    for (var i = 1; i <= 49; i++){
      boxReset(i,true);
    }
  }
  makeFog(fog[1]);
}
function updateDisplay() {
  var tempInsructions = [];
  for (var i = 0; i < instructions.length; i++) {
    appendItem(tempInsructions, instructions[i]);
  }
  while ((tempInsructions.length > 80)) {
    removeItem(tempInsructions, 0);
  }
  setText("InstructionsDysplay", tempInsructions.join(""));
}
onEvent("restartButton", "click", function( ) {
  if (textdisply2 == 0) {
    randomBasic();
    updateScreen()
  } else if  (textdisply2 == 1) {
    randomKey();
    updateScreen()
  } else if  (textdisply2 == 2) {
     randomSwitch();
    updateScreen()
  } else if  (textdisply2 == 3) {
    randomTeleport();
    updateScreen()
  } else if  (textdisply2 == 4) {
    randomBox();
    updateScreen()
  } else if  (textdisply2 == 5) {
    trueRandom();
    updateScreen()
  } else{
    textdisply1 = 0;
  }
  setScreen("gameScreen");
});
function campaignChooser(){
  var campaigns = ["basicMovmentCampaign", "keysCampaign","switchesCampaign","BoxesCampaign","teleportersCampagn","theTrueCampagn"];
  for (var i = 0; i < 6; i++){
      if (campaigns[i] == textdisply0){
        return(i*100);
      }
    }
}

onEvent("start", "click", function( ) {
  levelSelect = false;
    if(localStorage.getItem("level") >= 100){
      showElement("levelEditorButton");
    }else{
      hideElement("levelEditorButton");
    }
  setText("levelEditorButton", "level editor");
  CampainShower(["campaignKeys","campaignSwitches","campaignBoxes","campaignTeleporters","theTrueCampaign"]);
  setScreen("campaignPickScreen");
});
onEvent("levelSelectB", "click", function( ) {
  levelSelect= true;
  showElement("levelEditorButton");
  setText("levelEditorButton", "level import");
  CampainShower(["campaignKeys","campaignSwitches","campaignBoxes","campaignTeleporters","theTrueCampaign"]);
  if (localStorage.getItem("glow").includes(6)){
    glowRemove(6);
    setScreen("campaignPickScreen");
    addToGlow(6);
  }else{
    setScreen("campaignPickScreen");
  }
});
function CampainShower(campaigns) {
  for(var i = 100; i <= 500; i += 100)
    if(localStorage.getItem("level") >= i){
      showElement(campaigns[(i/100)-1]);
    }
}
onEvent("randGen", "click", function( ) {
  CampainShower(["randBasic","randKeys","randSwitch","randBox","randTeleport"]);
  setScreen("randomScreen");
});
onEvent("titleScreenB", "click", function( ) {
  startingAnimation(250);
});
onEvent("homeGame", "click", function( ) {
  startingAnimation(250);
});
onEvent("campaignHome", "click", function( ) {
  startingAnimation(250);
});
onEvent("tutorialHome", "click", function( ) {
  startingAnimation(250);
});
function campaign() {
  if (levelSelect) {
    setProperty("levelPicker", "max", 0);
    if (localStorage.getItem("level")-(localStorage.getItem("level")%100) > campaignChooser()){
      setProperty("levelPicker", "max", (map.length/50)-1);
    } else if (localStorage.getItem("level")-(localStorage.getItem("level")%100) == campaignChooser()){
      setProperty("levelPicker", "max", localStorage.getItem("level")%100);
    }
      setScreen("levelSelect");
  } else if (!levelSelect) {
    if (localStorage.getItem("level")-(localStorage.getItem("level")%100) > campaignChooser()){
      gotoLevel(0);
    } else if (localStorage.getItem("level")-(localStorage.getItem("level")%100) == campaignChooser()){
      gotoLevel(localStorage.getItem("level")%100);
    }
  }
}
onEvent("campaignBasicMovment", "click", function( ) {
  textdisply0 = "basicMovmentCampaign";
  map = [];
  for (var i = 0; i < basicPresetMaps.length; i++) {
    appendItem(map, basicPresetMaps[i]);
  }
  campaign();
  canRemoveGlow(0);
});
onEvent("campaignKeys", "click", function( ) {
  textdisply0 = "keysCampaign";
  map = [];
  for (var i = 0; i < keysPresetMaps.length; i++) {
    appendItem(map, keysPresetMaps[i]);
  }
  canRemoveGlow(1);
  campaign();
});
onEvent("campaignSwitches", "click", function( ) {
  textdisply0 = "switchesCampaign";
  map = [];
  for (var i = 0; i <  switchPresetMaps.length; i++) {
    appendItem(map, switchPresetMaps[i]);
  }
  canRemoveGlow(2);
  campaign();
});
onEvent("campaignBoxes", "click", function( ) {
  textdisply0 = "BoxesCampaign";
  map = [];
  for (var i = 0; i <  boxPresetMaps.length; i++) {
    appendItem(map, boxPresetMaps[i]);
  }
  canRemoveGlow(3);
  campaign();
});
onEvent("campaignTeleporters", "click", function( ) {
  textdisply0 = "teleportersCampagn";
  map = [];
  for (var i = 0; i <  teleportersPresetMaps.length; i++) {
    appendItem(map, teleportersPresetMaps[i]);
  }
  canRemoveGlow(4);
  campaign();
});
onEvent("theTrueCampaign", "click", function( ) {
  textdisply0 = "theTrueCampagn";
  map = [];
  for (var i = 0; i <  theTrueCampainPresetMaps.length; i++) {
    appendItem(map, theTrueCampainPresetMaps[i]);
  }
  campaign();
});
function canRemoveGlow(toRemove){
  glowRemove(toRemove);
  if (!(localStorage.getItem("glow").includes(0) || localStorage.getItem("glow").includes(1) || localStorage.getItem("glow").includes(2) || localStorage.getItem("glow").includes(3) || localStorage.getItem("glow").includes(4) || localStorage.getItem("glow").includes(5))){
    glowRemove(8);
  }
  if (!(localStorage.getItem("glow").includes(0) || localStorage.getItem("glow").includes(1) || localStorage.getItem("glow").includes(2) || localStorage.getItem("glow").includes(3) || localStorage.getItem("glow").includes(4) || localStorage.getItem("glow").includes(5) || localStorage.getItem("glow").includes(6))){
    glowRemove(7);
  }
}
//tutoral buttons
onEvent("basicMovment", "click", function( ) {
  textdisply0 = "basicMovment";
  map = [];
  for (var i = 0; i <  200; i++) {
    appendItem(map, basicPresetMaps[i]);
  }
  appendItem(map, "END");
  gotoLevel(0)
});
onEvent("keysTutoralButon", "click", function( ) {
  textdisply0 = "keys";
  map = [];
  for (var i = 0; i <  50; i++) {
    appendItem(map, keysPresetMaps[i]);
  }
  appendItem(map, "END");
  gotoLevel(0)
});
onEvent("switchesTutoralButon", "click", function( ) {
  textdisply0 = "switch";
  map = [];
  for (var i = 0; i <  450; i++) {
    if (i == 50){
      i = 400;
    }
    appendItem(map, switchPresetMaps[i]);
  }
  appendItem(map, "END");
  gotoLevel(0)
});
onEvent("boxesTutoralButon", "click", function( ) {
  textdisply0 = "box";
  map = [];
  for (var i = 0; i <  400; i++) {
    if (i == 50){
      i = 350;
    }
    appendItem(map, boxPresetMaps[i]);
  }
  appendItem(map, "END");
  gotoLevel(0)
});
onEvent("teleportersTutoralButon", "click", function( ) {
  textdisply0 = "teleportTutoral";
  map = [];
  for (var i = 0; i <  200; i++) {
    if (i == 50){
      i = 100;
    }
    appendItem(map, teleportersPresetMaps[i]);
  }
  appendItem(map, "END");
  gotoLevel(0)
});
//
onEvent("levelPicker", "mousemove", function( ) {
  changeLevelSelectText();
});
onEvent("levelPicker", "change", function( ) {
  changeLevelSelectText();
});
onEvent("tutoralB", "click", function( ) {
  setScreen("tutoralScreen");
  levelSelect= false;
});
onEvent("label2", "click", function( ) {
  setScreen("titlescreen");
});
function changeLevelSelectText() {
  setProperty("levelSelect#", "font-size", 170);
  setText("levelSelect#", getNumber("levelPicker"));
}
onEvent("select", "click", function( ) {
  gotoLevel(getNumber("levelPicker"));
});
function gotoLevel(level){
  for (var i = 0; i < (level*50); i++) {
    appendItem(map, map[0]);
    removeItem(map, 0);
  }
  textdisply1 = level;
  updateScreen();
  setScreen("gameScreen");
}
var button = ["campaignBasicMovment","campaignKeys","campaignSwitches","campaignBoxes","campaignTeleporters","theTrueCampaign","levelEditorButton","start","levelSelectB","randGen","randBasic","randKeys","randSwitch","randBox","randTeleport","trueRandom","tutoralB","theTrueTutoral"];
var buttonSettings = [1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,0];
function glow(){
  for (var i = 0; i < localStorage.getItem("glow").length; i++){
    setProperty(button[parseInt(localStorage.getItem("glow")[i],18)], "border-color", rgb(222, 222, 115, 0.7));
    setProperty(button[parseInt(localStorage.getItem("glow")[i],18)], "border-width", 10); 
    setProperty(button[parseInt(localStorage.getItem("glow")[i],18)], "font-size", 7);
     if (parseInt(localStorage.getItem("glow")[i],18) == 5 || parseInt(localStorage.getItem("glow")[i],18) == 15 || parseInt(localStorage.getItem("glow")[i],18) == 17){
       setProperty(button[parseInt(localStorage.getItem("glow")[i],18)], "image", "assets/randow-slim.png");
       setProperty(button[parseInt(localStorage.getItem("glow")[i],18)], "border-color", rgb(187, 187, 112, 1));
     }
  }
}
function addToGlow(item){
  item = item.toString(18);
  if(localStorage.getItem("glow")==null){
    localStorage.setItem("glow",item);
  }else{
    localStorage.setItem("glow",localStorage.getItem("glow").replace(item.toString(18),""));
    localStorage.setItem("glow",(localStorage.getItem("glow")+item));
  }
}
function glowRemove(toRemove){
  localStorage.setItem("glow",localStorage.getItem("glow").replace(toRemove.toString(18),""));
  setProperty(button[toRemove], "border-color", rgb(77, 87, 95,1));
  setProperty(button[toRemove], "border-width", buttonSettings[toRemove]);
  setProperty(button[toRemove], "font-size", 15);
  if (toRemove ==  5 || toRemove ==  15 || toRemove ==  17){
      setProperty(button[toRemove], "image", "assets/rainbow.png");
  }
}
//starting animation
function startingAnimation(time) {
  if (localStorage.getItem("Basic random") && localStorage.getItem("Keys random") && localStorage.getItem("Switch random") && localStorage.getItem("Teleporter random") &&  localStorage.getItem("Boxes random")){
    showElement("trueRandom");
    if (localStorage.getItem("The true random")){
      showElement("theTrueTutoral");
      if (!localStorage.getItem("end")){
        addToGlow(16);
        addToGlow(17);
      }
    }else{
      addToGlow(9);
      addToGlow(15);
    }
  }
  glow();
  hideElement("backroundButton");
  hideElement("teleportTutoralText");
  hideElement("exportButton");
  hideElement("startDirDropdown");
  hideElement("levelSelectB");
  hideElement( "tutoralB");
  hideElement("homeGame");
  for (var l = 1; l < 5; l++) {
    hideElement("hand"+l);
  }
  hideElement("start");
  hideElement("randGen");
  hideElement("leftbutton");
  hideElement("upButton");
  hideElement("rightButton");
  hideElement("goButton");
  hideElement("InstructionsDysplay");
  for (var i = 1; i < 50; i++) {
    hideElement("box"+i);
  }
  setScreen("gameScreen");
  penColor("black");
  penUp();
  moveTo(68, 118);
  turnTo(0);
  penDown();
  var j = 0;
  timedLoop(time, function() {
    turnRight(90);
    moveForward(69);
    j++;
    if (j==4) {
      stopTimedLoop();
    }
  });
  setTimeout(function() {
    penUp();
    moveTo(146, 158);
    penDown();
    setTimeout(function() {
      turnRight(90);
      setTimeout(function() {
        moveForward(51);
        setTimeout(function() {
          turnLeft(135);
          setTimeout(function() {
            moveForward(10);
            setTimeout(function() {
              turnRight(180);
              setTimeout(function() {
                moveForward(10);
                setTimeout(function() {
                  turnRight(90);
                  setTimeout(function() {
                    moveForward(10);
                    setTimeout(function() {
                      penUp();
                      moveTo(220, 170);
                      penDown();
                      turnTo(315 );
                      setTimeout(function() {
                        moveForward(10);
                        setTimeout(function() {
                          turnRight(45);
                          setTimeout(function() {
                            moveForward(20);
                            setTimeout(function() {
                              arcRight(180, 11);
                              setTimeout(function() {
                                moveForward(20);
                                setTimeout(function() {
                                  turnRight(45);
                                  setTimeout(function() {
                                    moveForward(10);
                                    setTimeout(function() {
                                      turnRight(45);
                                      setTimeout(function() {
                                        moveForward(4);
                                        setTimeout(function() {
                                          turnRight(90);
                                          setTimeout(function() {
                                            moveForward(2);
                                            setTimeout(function() {
                                              turnRight(180);
                                              setTimeout(function() {
                                                moveForward(2);
                                                setTimeout(function() {
                                                  turnRight(90);
                                                  setTimeout(function() {
                                                    moveForward(4);
                                                    hide();
                                                    setTimeout(function() {
                                                      penColor("white");
                                                      showElement("InstructionsDysplay");
                                                      showElement("leftbutton");
                                                      showElement("upButton");
                                                      showElement("rightButton");
                                                      showElement("goButton");
                                                      showElement("homeGame");
                                                      penWidth(10000);
                                                      moveTo(160, 225);
                                                      penWidth(1);
                                                      for (var i = 1; i < 50; i++) {
                                                        showElement("box"+i);
                                                      }
                                                      if (localStorage.getItem("end")){
                                                        setScreen("uploadCompleteScreen");
                                                      }else {
                                                        setScreen("titlescreen");
                                                        playSound("assets/if-touch-box-then-dead-good.mp3", false);
                                                      }
                                                      setTimeout(function() {
                                                        showElement("start");
                                                        showElement( "levelSelectB");
                                                        setTimeout(function() {
                                                           showElement("randGen");
                                                          setTimeout(function() {
                                                            showElement("tutoralB");
                                                          }, time );
                                                        }, time );
                                                      }, 12 * time );
                                                    }, time);
                                                  }, time);
                                                }, time);
                                              }, time);
                                            }, time);
                                          }, time);
                                        }, time);
                                      }, time);
                                    }, time);
                                  }, time);
                                }, time);
                              }, time);
                            }, time);
                          }, time);
                        }, time);
                      }, time);
                    }, time);
                  }, time);
                }, time);
              }, time);
            }, time);
          }, time);
        }, time);
      }, time);
    }, time);
  }, time * 5);
}
//level editor
onEvent("levelEditorButton", "click", function( ) {
  if (levelSelect) {
    textdisply0 = "levelImporter";
    setScreen("ImportScreen");
  } else if (!levelSelect) {
    textdisply0 = "levelEditor";
    setScreen("gameScreen");
    map = ["u",
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0];
    canRemoveGlow(6);
    updateScreen();
  }
});
var pick;
onEvent("box1", "click", function( ) {
  changeBox(1);
});
onEvent("box2", "click", function( ) {
  changeBox(2);
});
onEvent("box3", "click", function( ) {
  changeBox(3);
});
onEvent("box4", "click", function( ) {
  changeBox(4);
});
onEvent("box5", "click", function( ) {
  changeBox(5);
});
onEvent("box6", "click", function( ) {
  changeBox(6);
});
onEvent("box7", "click", function( ) {
  changeBox(7);
});
onEvent("box8", "click", function( ) {
  changeBox(8);
});
onEvent("box9", "click", function( ) {
  changeBox(9);
});
onEvent("box10", "click", function( ) {
  changeBox(10);
});
onEvent("box11", "click", function( ) {
  changeBox(11);
});
onEvent("box12", "click", function( ) {
  changeBox(12);
});
onEvent("box13", "click", function( ) {
  changeBox(13);
});
onEvent("box14", "click", function( ) {
  changeBox(14);
});
onEvent("box15", "click", function( ) {
  changeBox(15);
});
onEvent("box16", "click", function( ) {
  changeBox(16);
});
onEvent("box17", "click", function( ) {
  changeBox(17);
});
onEvent("box18", "click", function( ) {
  changeBox(18);
});
onEvent("box19", "click", function( ) {
  changeBox(19);
});
onEvent("box20", "click", function( ) {
  changeBox(20);
});
onEvent("box21", "click", function( ) {
  changeBox(21);
});
onEvent("box22", "click", function( ) {
  changeBox(22);
});
onEvent("box23", "click", function( ) {
  changeBox(23);
});
onEvent("box24", "click", function( ) {
  changeBox(24);
});
onEvent("box25", "click", function( ) {
  changeBox(25);
});
onEvent("box26", "click", function( ) {
  changeBox(26);
});
onEvent("box27", "click", function( ) {
  changeBox(27);
});
onEvent("box28", "click", function( ) {
  changeBox(28);
});
onEvent("box29", "click", function( ) {
  changeBox(29);
});
onEvent("box30", "click", function( ) {
  changeBox(30);
});
onEvent("box31", "click", function( ) {
  changeBox(31);
});
onEvent("box32", "click", function( ) {
  changeBox(32);
});
onEvent("box33", "click", function( ) {
  changeBox(33);
});
onEvent("box34", "click", function( ) {
  changeBox(34);
});
onEvent("box35", "click", function( ) {
  changeBox(35);
});
onEvent("box36", "click", function( ) {
  changeBox(36);
});
onEvent("box37", "click", function( ) {
  changeBox(37);
});
onEvent("box38", "click", function( ) {
  changeBox(38);
});
onEvent("box39", "click", function( ) {
  changeBox(39);
});
onEvent("box40", "click", function( ) {
  changeBox(40);
});
onEvent("box41", "click", function( ) {
  changeBox(41);
});
onEvent("box42", "click", function( ) {
  changeBox(42);
});
onEvent("box43", "click", function( ) {
  changeBox(43);
});
onEvent("box44", "click", function( ) {
  changeBox(44);
});
onEvent("box45", "click", function( ) {
  changeBox(45);
});
onEvent("box46", "click", function( ) {
  changeBox(46);
});
onEvent("box47", "click", function( ) {
  changeBox(47);
});
onEvent("box48", "click", function( ) {
  changeBox(48);
});
onEvent("box49", "click", function( ) {
  changeBox(49);
});
onEvent("backroundButton", "click", function( ) {
  changeBox(50);
});
function changeBox(num) {
  if (levelEditor) {
    setScreen("pick");
    pick = num;
  }
}

onEvent("BlocksDropdown", "change", function( ) {
  var dropDown = getText("BlocksDropdown");
  if (dropDown == "white") {
    mapAdd(0);
  } else if ((dropDown == "red")) {
    mapAdd(1);
  } else if (dropDown == "blue") {
    mapAdd(3);
  } else if (dropDown == "green") {
    mapAdd(2);
  } else if (dropDown == "key") {
    mapAdd(4);
  } else if (dropDown == "door") {
    mapAdd(5);
  } else if (dropDown == "switch") {
    mapAdd(6);
  } else if ((dropDown == "purple")) {
    mapAdd(7);
  } else if ((dropDown == "yellow")) {
    mapAdd(8);
  } else if ((dropDown == "box")) {
    mapAdd(b);
  } else if ((dropDown == "pressure plate")) {
    mapAdd(9);
  } else if ((dropDown == "teleporter blue")) {
    mapAdd(t);
  } else if ((dropDown == "teleporter green")) {
    mapAdd(T);
  } else if ((dropDown == "teleporter yellow")) {
    mapAdd(e);
  } else if ((dropDown == "teleporter red")) {
    mapAdd(E);
  }
  setText("BlocksDropdown", "pick");
  setScreen("gameScreen");
  updateScreen();
});
function mapAdd(type) {
  if (pick != 50) {
    removeItem(map, pick);
    insertItem(map, pick, type);
  } else {
    map = [map[0]];
    for (var i = 0; i < 49; i++) {
      appendItem(map, type);
    }
  }
}
onEvent("startDirDropdown", "change", function( ) {
  removeItem(map, 0);
  if (getText("startDirDropdown") == "↑") {
    insertItem(map, 0, "u");
  } else if (getText("startDirDropdown") == "→") {
    insertItem(map, 0, "r");
  } else if (getText("startDirDropdown") == "↓") {
    insertItem(map, 0, "d");
  } else if (getText("startDirDropdown") == "←") {
    insertItem(map, 0, "l");
  }
});
var isExpanded;
var exportedText;
onEvent("exportExpander", "click", function( ) {
  isExpanded++;
  if (isExpanded == 1) {
    exportedText = map[0] + levelFormer(1).join("") + levelFormer(2).join("") + levelFormer(3).join("") + levelFormer(4).join("") + levelFormer(5).join("") + levelFormer(6).join("") + levelFormer(7).join("");
    setText("exportText", exportedText);
  } else if (isExpanded == 2) {
    exportedText = "\"" + map[0] + "\",\n" + levelFormer(1).join(",") + ",\n" + levelFormer(2).join(",") + ",\n" + levelFormer(3).join(",") + ",\n" + levelFormer(4).join(",") + ",\n" + levelFormer(5).join(",") + ",\n" + levelFormer(6).join(",") + ",\n" + levelFormer(7).join(",") + ",";
    setText("exportText", exportedText);
    setText("exportExpander", "←");
  }else if (isExpanded == 3) {
    exportedText = map[0] + levelFormer(1).join("") + levelFormer(2).join("") + levelFormer(3).join("") + levelFormer(4).join("") + levelFormer(5).join("") + levelFormer(6).join("") + levelFormer(7).join("");
    setText("exportText", exportedText);
  }else if (isExpanded == 4) {
    startingLink();
  }
});
onEvent("exportButton", "click", function( ) {
  if (textdisply0 == "rand"){
    removeItem(map,0);
  }
  setScreen("exportScreen");
  startingLink();
});
function startingLink(){
  isExpanded = 0
  exportedText = "https://if-touch-box-then-dead.glitch.me/?"
  exportedText += mapToBase64(map[0] + levelFormer(1).join("") + levelFormer(2).join("") + levelFormer(3).join("") + levelFormer(4).join("") + levelFormer(5).join("") + levelFormer(6).join("") + levelFormer(7).join(""),true);
  console.log(exportedText);
  setText("exportText", exportedText);
  setText("exportExpander", "→");
}
onEvent("shareButton", "click", function( ) {
  if (navigator.canShare) {
        navigator.share({
            title: 'If touch box then dead custom level code',
            text: exportedText,
        })}
});
function mapToBase64(n,toBase64) {
  return toBase64 ? baseChanger(compresser(mapToBase15(n,true),true),true) : mapToBase15("00000000000000000000000000000000000000000000000000".substring(compresser(baseChanger(n)).length) + compresser(baseChanger(n)));
  function mapToBase15(num,toBase15){
    return to15(num.substring(0,1),toBase15,[["0","u"],["1","r"],["2","d"],["3","l"]]) + to15(num.substring(1),toBase15,[["a","t"],["b","T"],["c","e"],["d","E"],["e","b"]]);
    function to15(num,toBase15,changes){
      for (var i = 0; i < num.length;i++){
        for (var j = 0; j < changes.length;j++){
        if (num[i] == changes[j][toBase15 ? 1 : 0]){
          num = num.substring(0,i) + changes[j][toBase15 ? 0 : 1] + num.substring(i + 1);
          j = changes.length;
        }
       }
     }
   return num;
   }
  }
  function baseChanger(num,is16To64){
    var base = is16To64 ? 64 : 16;
    var orignalBase = is16To64 ? 16 : 64;
    var remainder = 0;
    var answer = "";
    for(var i = 0; i < num.length; i++){
        var digit = baseConverter(num[i]);
        answer += baseConverter(Math.floor((digit + (remainder * orignalBase))/base));
        remainder = ((digit + (remainder * orignalBase))%base);
    }
    if (answer != 0)
      return baseChanger(answer,is16To64) + baseConverter(remainder);
    else
      return baseConverter(remainder);
  }
  function baseConverter(num){
    var base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
    if (typeof num == "number")
      return base[num];
    return base.indexOf(num);
  }
  function compresser(m,compress){
    return compress ? mapCompresser(m) : decompresser(m);
    function mapCompresser(theMap){
      var length = 1;
      var smallMap = "";
      for (var i = 1; i<theMap.length;i++){
        if (theMap[i] == theMap[i-1])
          length++;
        else
          add(1)
        if (i == theMap.length-1)
          add(0)
      }
      return smallMap;
      function add(pos){
        if (length > 14 && length%15 > 3)
          smallMap += (smallMap.length == 0 ? "" : "f") + "f" + length.toString(15) + theMap[i-pos];
        else if (length > 3)
          smallMap += length.toString(15) + "f" + theMap[i-pos];
        else
          for (var j = 0; j<length; j++)
            smallMap += theMap[i-pos];
          length = 1;
      }
    }
    function decompresser(theMap){
      var newMap = "";
      for (var i = 0; i < theMap.length;i++){
        if (theMap[i] == "f"){
          var length;
          if (theMap[i+1] == "f" || i == 0){
            i += i == 0 ? 2 : 3;
            length = parseInt(theMap.substring(i-1,i+1), 15);
          }else if(parseInt(theMap[i-1],10) < 4){
            length = parseInt(theMap.substring(i-2,i), 15);
            newMap = newMap.substring(0,newMap.length-2)
          }else{
            length = parseInt(theMap.substring(i-1,i), 15);
            newMap = newMap.substring(0,newMap.length-1)
          }
          i++;
          for (var j = 0; j<length;j++)
            newMap+=theMap[i];
        }else
          newMap += theMap[i];
      }
      return newMap;
    }
  }
}
function levelFormer(num) {
  var mapPart = [];
  for (var i = ((7*(num-1))+1); i < (num*7)+1; i++) {
    if (map[i] == t) {
      appendItem(mapPart, "t");
    } else if ((map[i] == T)) {
      appendItem(mapPart, "T");
    }else if ((map[i] == e)) {
      appendItem(mapPart, "e");
    }else if ((map[i] == E)) {
      appendItem(mapPart, "E");
    }else if ((map[i] == b)) {
      appendItem(mapPart, "b");
    } else {
      appendItem(mapPart, map[i]);
    }
  }
  return mapPart;
}
onEvent("exportBackButton", "click", function( ) {
  setScreen("gameScreen");
});
onEvent("exportHome", "click", function( ) {
  startingAnimation(250);
});
onEvent("backButton", "click", function( ) {
  setScreen("gameScreen");
});
//import levels
onEvent("importStart", "click", function( ) {
  importer  (getText("importer"));
  setText("importer","");
});
function importer (tempMap){
  map = [];
  for (var i = 0; i < tempMap.length; i++) {
    if (tempMap[i] == "0") {
      appendItem(map, 0);
    } else if (tempMap[i] == "1") {
      appendItem(map, 1);
    } else if (tempMap[i] == "2") {
      appendItem(map, 2);
    } else if (tempMap[i] == "3") {
      appendItem(map, 3);
    }else if (tempMap[i] == "4") {
      appendItem(map, 4);
    }else if (tempMap[i] == "5") {
      appendItem(map, 5);
    }else if (tempMap[i] == "6") {
      appendItem(map, 6);
    }else if (tempMap[i] == "7") {
      appendItem(map, 7);
    }else if (tempMap[i] == "8") {
      appendItem(map, 8);
    }else if (tempMap[i] == "9") {
      appendItem(map, 9);
    }else if (tempMap[i] == "t") {
      appendItem(map, t);
    }else if (tempMap[i] == "T") {
      appendItem(map, T);
    }else if (tempMap[i] == "e") {
      appendItem(map, e);
    }else if (tempMap[i] == "E") {
      appendItem(map, E);
    }else if (tempMap[i] == "b") {
      appendItem(map, b);
    }else if (tempMap[i] != "\"" && tempMap[i] != " " && tempMap[i] != ",") {
      appendItem(map, tempMap[i]);
    }
  }
  appendItem(map, "END");
  setScreen("gameScreen");
  updateScreen();
}
onEvent("importBackButton", "click", function( ) {
  setScreen("campaignPickScreen");
});
onEvent("importHome", "click", function( ) {
  startingAnimation(250);
  setText("importer","");
});
//random gen (buttons)
onEvent("randBasic", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 0;
  randomBasic();
  updateAndSetScreen();
  ifCanRemoveRan(10);
});
onEvent("randKeys", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 1;
  randomKey();
  updateAndSetScreen();
  ifCanRemoveRan(11);
});
onEvent("randSwitch", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 2;
  randomSwitch();
  updateAndSetScreen();
  ifCanRemoveRan(12);
});
onEvent("randBox", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 3;
  randomBox();
  updateAndSetScreen();
  ifCanRemoveRan(13);
});
onEvent("randTeleport", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 4;
  randomTeleport();
  updateAndSetScreen();
});
onEvent("trueRandom", "click", function( ) {
  textdisply0 = "rand";
  textdisply1 = 0;
  textdisply2 = 5;
  trueRandom();
  updateAndSetScreen();
});
function ifCanRemoveRan(num){
  if (localStorage.getItem("level") < 500){
    canRemoveRan(num);
  }
}
function canRemoveRan(num){
  glowRemove(num);
  if (!(localStorage.getItem("glow").includes("a") || localStorage.getItem("glow").includes("b") || localStorage.getItem("glow").includes("c") ||localStorage.getItem("glow").includes("d") || localStorage.getItem("glow").includes("e") || localStorage.getItem("glow").includes("f"))){
    glowRemove(9);
  }
}
//random gen (basic movment levels)
var end;
var last;
var posible;
var used = [];
var white = [];
var key;
var door;
var curent;
var start;
var pur = [];
var yell = [];
var swit;
var teleBlue = [];
var teleGreen = [];
var teleYellow = [];
var teleRed = [];
var Box = [];
var x;
function randomBasic(){
  randomStarter();
  random();
  if (randomNumber(0,3)){
    startExtender([]);
  }
  randomMaker();
}
function updateAndSetScreen(){
  updateScreen();
  setScreen("gameScreen");
}
function randomStarter(){
  map = [(randomDir(randomNumber(0, 3)))];
  start = randomNumber(1,49);
}
function random(startUsed) {
  curent = start;
  white = [];
  used = [curent];
  posible = null;
  x = true;
  end = null;
  last = null;
  key = null;
  door = null;
  swit = null;
  pur = [];
  yell = [];
  teleBlue = [];
  teleGreen = [];
  teleYellow = [];
  teleRed = [];
  Box = [];
  if (startUsed != null) {
    while ((startUsed.length)) {
      appendItem(used, startUsed[startUsed.length-1]);
      removeItem(startUsed, startUsed.length-1);
    }
  }
  while (x) {
    posible = pos(curent);
    setVars();
  }
}
function pos(imput,corner) {
  if (imput == 1 ) {
    var cornerOutput = [2,8];
    if (corner){
      appendItem(cornerOutput,9);
    }
    return cornerOutput
  } else if ((imput == 7)) {
    var cornerOutput = [6,14];
    if (corner){
      appendItem(cornerOutput,13);
    }
    return cornerOutput
  } else if ((imput == 43)) {
    var cornerOutput = [36,44];
    if (corner){
      appendItem(cornerOutput,37);
    }
    return cornerOutput
  } else if ((imput == 49)) {
    var cornerOutput = [42,48];
    if (corner){
      appendItem(cornerOutput,41);
    }
    return cornerOutput
  } else if ((imput >=2  &&  imput <= 6)) {
    return posiblesCall(imput, 1, corner);
  } else if ((imput >= 44  &&  imput <= 48)) {
    return posiblesCall(imput, 2, corner);
  } else if (imput%7==1) {
    return posiblesCall(imput, 3, corner);
  } else if ((imput%7==0)) {
    return posiblesCall(imput, 4, corner);
  } else {
    return posiblesCall(imput, 0, corner);
  }
}
function randomMaker() {
  white = usedRemove(pur,white);
  white = usedRemove(yell,white);
  white = usedRemove([swit,end],white);
  white = usedRemove(Box,white);
  var largest = white.length;
  if (largest < pur.length){
    largest = pur.length;
  }
  if (largest < yell.length){
    largest = yell.length;
  }
  if (largest < Box.length){
    largest = Box.length;
  }
  for (var j = 1; j < 50; j++) {
  var done = true;
  var k = 0;
  while (done) {
    if (white[k] == j) {
      appendItem(map, 0);
      done = false;
    } else if (Box[k] == j) {
      appendItem(map, b);
      done = false;
    } else if (teleBlue[k] == j) {
      appendItem(map, t);
      done = false;
    } else if (teleGreen[k] == j) {
      appendItem(map, T);
      done = false;
    } else if (teleYellow[k] == j) {
      appendItem(map, e);
      done = false;
    } else if (teleRed[k] == j) {
      appendItem(map, E);
      done = false;
    } else if (pur[k] == j) {
      appendItem(map, 7);
      done = false;
    } else if (yell[k] == j) {
      appendItem(map, 8);
      done = false;
    } else if (start == j)  {
      appendItem(map, 3);
      done = false;
    } else if (end==j) {
      appendItem(map, 2);
      done = false;
    } else if (key == j) {
      appendItem(map, 4);
      done = false;
    } else if (door == j) {
      appendItem(map, 5);
      done = false;
    } else if (swit == j) {
      appendItem(map, 6);
      done = false;
    } else if ((largest == k)) {
      appendItem(map, 1);
      done = false;
    }
    k++;
  }
  }
  appendItem(map, "END");
}
function setVars() {
  curent = newCurent(posiblity(posible, used));
  if (!curent) {x = false;end = last;} else {
        for (var i = 0; i < posible.length; i++) {
          appendItem(used, posible[i]);
        }
        appendItem(white, curent);
      }
  last = curent;
}
function posiblity(posiblitys, used) {
  for (var i = posiblitys.length-1; i > -1; i--) {
    for (var j = 0; j < used.length; j++) {
      if (posiblitys[i] == used[j]) {
        removeItem(posiblitys, i);
      }
    }
  }
  return posiblitys;
}
function newCurent(posiblitys) {
  if (posiblitys.length == 0) {
    return false;
  } else {
    return (posiblitys[(randomNumber(0, posiblitys.length-1))]);
  }
}
function posiblesCall(curent, side, corners) {
  var posibleNumbers = [];
  var relation = [-7,7,-1,1,[-8,-6],[8,6],[-8,6],[-6,8]];
  if (corners){
    appendItem(posibleNumbers, curent + relation[4][0]);
    appendItem(posibleNumbers, curent + relation[4][1]);
    appendItem(posibleNumbers, curent + relation[5][0]);
    appendItem(posibleNumbers, curent + relation[5][1]);
  }
  for (var i = 0; i < 4;i++){
    if (side != i+1) {
      appendItem(posibleNumbers, curent + relation[i]);
    }else{
      if (corners){
        for (var j = 0; j < posibleNumbers.length;j++){
          if (posibleNumbers[j] == curent + relation[i+4][0] || posibleNumbers[j] == curent + relation[i+4][1]){
            removeItem(posibleNumbers, j);
            j--;
          }
        }
      }
    }
  }
  return posibleNumbers;
}
function randomDir(randNum) {
  if (randNum == 0) {
    return "u";
  } else if ((randNum == 1)) {
    return "l";
  } else if ((randNum == 2)) {
    return "d";
  } else {
    return "r";
  }
}
function startExtender(extraUsed) {
  var firstWhites = [];
  var firstEnd = end;
  appendItem(white,end);
  for (var i = 0; i < white.length ; i++) {
    appendItem(firstWhites, white[i]);
  }
  used = extraUsed;
  usedFromWhites();
  random(used);
  appendItem(white, start);
  if (white.length != 1){
    start = end;
    for (var j = 0; j < firstWhites.length; j++) {
      appendItem(white, firstWhites[j]);
    }
  } else {
    white = firstWhites;
  }
  end = firstEnd;
  usedRemove([start,end],white);
}
function usedFromWhites() {
  for (var q = 0; q < white.length; q++) {
        posible = pos(white[q]);
        for (var r = 0; r < posible.length; r++) {
          appendItem(used, posible[r]);
          for (var s = 0; s < used.length-1; s++) {
            if (used[s] == posible[r]) {
              removeItem(used, used.length-1);
            }
          }
        }
      }
}

onEvent("randhome", "click", function( ) {
  startingAnimation(250);
});
//random gen (key levels)
function randomKey(){
  randomStarter();
  random();
  while (white.length == 2) {
    random();
  }
  var KeyAndDoor = randomKeys();
  key = KeyAndDoor[0];
  door = KeyAndDoor[1];
  appendItem(white,door);
  appendItem(white,key);
  randomMaker();
}
function randomKeys() {
  var keyDoor = [white[white.length-1]];
  removeItem(white,white.length-1);
  end = start;
  appendItem(keyDoor,white[0]);
  removeItem(white,0);
  start = white[0];
  removeItem(white, 0);
  return(keyDoor);
}
//random gen (switch levels)
function randomSwitch(){
  randomStarter();
  while (start == 9 || start == 13 || start == 37  || start == 41) {
    randomStarter();
  }
  random();
  var oldWhites = [];
  var oldUsed = [];
  for (var i = 0; i < white.length; i++) {
    appendItem(oldWhites,white[i]);
  }
  for (var k = 0; k < used.length; k++) {
    appendItem(oldUsed,used[k]);
  }
  var oldStart = start;
  if (used.length < 49) {
    start = end;
    for (var j = 0; j < 5; j++) {
      posible = pos(oldStart);
      random(posible);
      var change = 0;
      for (var l = 0; l < oldUsed.length; l++) {
        if (end != oldUsed[l]) {
          change = change + 1;
        }
      }
      if (change == oldUsed.length) {
        j = 6;
      }
    }
    if (j < 6) {
      var ends = usedRemove(oldUsed, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);
      end = ends[randomNumber(0,ends.length-1)];
      var column = (Math.round(end/7 + (1 - ((end/7)%1))));
      var row = end%7;
      if (!row){
        column = column-1;
        row = 7;
      }
      var columnDistance =[Math.round(start/7 + (1-((start/7)%1)))];
      var rowDistance = start%7;
      if (!rowDistance){
        columnDistance = columnDistance-1;
        rowDistance = 7;
      }
      columnDistance =[column-columnDistance];
      rowDistance = [row-rowDistance];
      for (var m = 0; m < white.length; m++) {
        var whiteColumn = (Math.round(white[m]/7 + (1 - ((white[m]/7)%1))));
        var whiteRow = white[m]%7;
        if(!whiteRow){
          whiteRow = 7;
          whiteColumn = whiteColumn-1;
        }
        appendItem(columnDistance, column - whiteColumn);
        appendItem(rowDistance, row-whiteRow);
      }
      var big = [0,Math.abs(columnDistance[0]) + Math.abs(rowDistance[0])];
      for (var n = 1; n < columnDistance.length; n++) {
        if (big[1] > Math.abs(columnDistance[n]) + Math.abs(rowDistance[n])){
          big[0] = n;
          big[1] = Math.abs(columnDistance[n]) + Math.abs(rowDistance[n]);
        }
      }
      var startPos;
      if (big[0] == 0){
        white = [];
        startPos = start;
      }else{
        startPos = white[(big[0]-1)];
        while (white[white.length-1] !== startPos) {
          removeItem(white,white.length-1);
        }
      }
      var startPos2 = startPos+(7*columnDistance[big[0]]);
      while ( 0 != columnDistance[big[0]]) {
          appendItem(white,startPos+(7*columnDistance[big[0]]));
          if (columnDistance[big[0]] > 0) {
            columnDistance[big[0]] = columnDistance[big[0]]-1;
          } else if (columnDistance[big[0]] < 0) {
            columnDistance[big[0]] = columnDistance[big[0]]+1;
          }
        }
      while ( 0 != rowDistance[big[0]]) {
          appendItem(white,startPos2+(rowDistance[big[0]]));
          if (rowDistance[big[0]] > 0) {
            rowDistance[big[0]] = rowDistance[big[0]]-1;
          } else if (rowDistance[big[0]] < 0) {
            rowDistance[big[0]] = rowDistance[big[0]]+1;
          }
        }
      posible = pos(start);
      used = [posible[0]];
      for (var b = 1; b < posible.length; b++) {
        appendItem(used, posible[b]);
      }
      usedFromWhites();
    }
    var reds = usedRemove(white,used);
    var oldReds = usedRemove(oldWhites,oldUsed);
    for (var w = 0; w < oldWhites.length; w++) {
      if(oldWhites[w] == start){
        removeItem(oldWhites,w);
      }
    }
    for (var v = 0; v < white.length; v++) {
      if (white[v] == end){
        removeItem(white, v);
      }
    }
    insertItem(reds, 0, "");
    insertItem(oldReds, 0, "");
    insertItem(white, 0, "");
    insertItem(oldWhites, 0, "");
    appendItem(reds, "");
    appendItem(oldReds, "");
    appendItem(white, "");
    appendItem(oldWhites, "");
    for (var o = 1; o < 50; o++) {
      var numbJoin =["",o,""];
      if (white.join("-").includes(numbJoin.join("-")) && (oldReds.join("-").includes(numbJoin.join("-")))) {
        appendItem(yell,o);
      } else if ((reds.join("-").includes(numbJoin.join("-"))) && oldWhites.join("-").includes(numbJoin.join("-"))) {
        appendItem(pur,o);
      }
    }
    removeItem(white,0);
    removeItem(oldWhites,0);
    removeItem(white,white.length-1);
    removeItem(oldWhites,oldWhites.length-1);
    swit = start;
    start = oldStart;
  } else {
    var switAndYell = randomKeys();
    swit = switAndYell[0];
    yell = [switAndYell[1]];
  }
  oldWhites = usedRemove(white,oldWhites);
  for (var a = 0; a < oldWhites.length; a++) {
    appendItem(white,oldWhites[a]);
  }
  randomMaker();
}
function usedRemove(toBeRemoved, theUsed) {
  var theUses = [];
  for (var k = 0; k < theUsed.length; k++) {
    appendItem(theUses,theUsed[k]);
  }
  for (var i = theUses.length-1; i > -1; i--) {
    for (var j = 0; j < toBeRemoved.length; j++) {
      if (theUses[i] == toBeRemoved[j]) {
        removeItem(theUses, i);
      }
    }
  }
  return(theUses);
}
//random gen (teleporter levels)
function randomTeleport(){
  map = [(randomDir(randomNumber(0, 3)))];
  if (randomNumber(1,2) === 1) {
    start = randomStater3xX([[1,3],[8,10],[15,17]],randomNumber(0,1));
    random([4,11,18,22,23,24,26,27,28,32,39,46]);
    var white1of4 = [];
    var start1of4 = start;
    var end1of4 = end;
    for (var i = 0; i < white.length; i++) {
      appendItem(white1of4, white[i]);
    }
    start = randomStater3xX([[5,7],[12,14],[19,21]],randomNumber(0,1));
    random([4,11,18,22,23,24,26,27,28,32,39,46]);
    var white2of4 = [];
    var start2of4 = start;
    var end2of4 = end;
    for (var j = 0; j < white.length; j++) {
      appendItem(white2of4, white[j]);
    }
    start = randomStater3xX([[29,31],[36,38],[43,45]],randomNumber(0,1));
    random([4,11,18,22,23,24,26,27,28,32,39,46]);
    var white3of4 = [];
    var start3of4 = start;
    var end3of4 = end;
    for (var k = 0; k < white.length; k++) {
      appendItem(white3of4, white[k]);
    }
    start = randomStater3xX([[33,35],[40,42],[47,49]],randomNumber(0,1));
    random([4,11,18,22,23,24,26,27,28,32,39,46]);
    var white4of4 = [];
    for (var l = 0; l < white.length; l++) {
      appendItem(white4of4, white[l]);
    }
    var colors = ["blue","green","yellow","red"];
    var colorsOrder = [];
    for (var u = 0; u < 3; u++) {
     var ranColor = randomNumber(0, colors.length-1);
     appendItem(colorsOrder, colors[ranColor]);
     removeItem(colors, ranColor);
    }
    if (randomNumber(0, 1)) {
      if (colorsOrder[0] === "blue") {
        appendItem(teleBlue,end1of4 );
        appendItem(teleBlue, start2of4);
      } else if (colorsOrder[0] === "green") {
        appendItem(teleGreen,end1of4 );
        appendItem(teleGreen, start2of4);
      } else if (colorsOrder[0] === "yellow") {
        appendItem(teleYellow,end1of4 );
        appendItem(teleYellow, start2of4);
      } else if (colorsOrder[0] === "red") {
        appendItem(teleRed,end1of4 );
        appendItem(teleRed, start2of4);
      }
      if (colorsOrder[1] === "blue") {
        appendItem(teleBlue,end2of4 );
        appendItem(teleBlue, start3of4);
      } else if (colorsOrder[1] === "green") {
        appendItem(teleGreen,end2of4 );
        appendItem(teleGreen, start3of4);
      } else if (colorsOrder[1] === "yellow") {
        appendItem(teleYellow,end2of4 );
        appendItem(teleYellow, start3of4);
      } else if (colorsOrder[1] === "red") {
        appendItem(teleRed,end2of4 );
        appendItem(teleRed, start3of4);
      }
      if (colorsOrder[2] === "blue") {
          appendItem(teleBlue,end3of4 );
          appendItem(teleBlue, start);
        } else if (colorsOrder[2] === "green") {
          appendItem(teleGreen,end3of4 );
          appendItem(teleGreen, start);
        } else if (colorsOrder[2] === "yellow") {
          appendItem(teleYellow,end3of4 );
          appendItem(teleYellow, start);
        } else if (colorsOrder[2] === "red") {
          appendItem(teleRed,end3of4 );
          appendItem(teleRed, start);
        }
    } else {
      if (colorsOrder[0] === "blue") {
        appendItem(teleBlue,end1of4 );
        appendItem(teleBlue, start3of4);
      } else if (colorsOrder[0] === "green") {
        appendItem(teleGreen,end1of4 );
        appendItem(teleGreen, start3of4);
      } else if (colorsOrder[0] === "yellow") {
        appendItem(teleYellow,end1of4 );
        appendItem(teleYellow, start3of4);
      } else if (colorsOrder[0] === "red") {
        appendItem(teleRed,end1of4 );
        appendItem(teleRed, start3of4);
      }
      if (colorsOrder[1] === "blue") {
        appendItem(teleBlue,end3of4 );
        appendItem(teleBlue, start2of4);
      } else if (colorsOrder[1] === "green") {
        appendItem(teleGreen,end3of4 );
        appendItem(teleGreen, start2of4);
      } else if (colorsOrder[1] === "yellow") {
        appendItem(teleYellow,end3of4 );
        appendItem(teleYellow, start2of4);
      } else if (colorsOrder[1] === "red") {
        appendItem(teleRed,end3of4 );
        appendItem(teleRed, start2of4);
      }
      if (colorsOrder[2] === "blue") {
        appendItem(teleBlue,end2of4 );
        appendItem(teleBlue, start);
      } else if (colorsOrder[2] === "green") {
        appendItem(teleGreen,end2of4 );
        appendItem(teleGreen, start);
      } else if (colorsOrder[2] === "yellow") {
        appendItem(teleYellow,end2of4 );
        appendItem(teleYellow, start);
       } else if (colorsOrder[2] === "red") {
        appendItem(teleRed,end2of4 );
        appendItem(teleRed, start);
      }
    }
    start = start1of4;
    white = [];
    if (!(randomNumber(0, 4))) {
     white = [25]; 
    }
    for (var m = 0; m < 7; m++) {
      appendItem(white, white1of4[m]);
      appendItem(white, white2of4[m]);
      appendItem(white, white3of4[m]);
      appendItem(white, white4of4[m]);
    }
  } else {
    start = randomStater3xX([[1,21],[1,21],[1,21]],true);
    random([22,23,24,25,26,27,28]);
    if (randomNumber(0,99)){
    startExtender([22,23,24,25,26,27,28]);
    }
    var white1of2 = [];
    var start1of2 = start;
    var end1of2 = end;
    for (var o = 0; o < white.length; o++) {
      appendItem(white1of2, white[o]);
    }
    start = randomStater3xX([[29,49],[29,49],[29,49]],true);
    random([22,23,24,25,26,27,28]);
    if (randomNumber(0,24)){
      startExtender([22,23,24,25,26,27,28]);
    }
    for (var p = 0; p < white1of2.length; p++) {
      appendItem(white, white1of2[p]);
    }
    var rands = randomNumber(1, 4);
    if (rands === 1) {
      appendItem(teleBlue, end1of2);
      appendItem(teleBlue, start);
    } else if (rands === 2) {
      appendItem(teleGreen, end1of2);
      appendItem(teleGreen, start);
    } else if (rands === 3) {
      appendItem(teleYellow, end1of2);
      appendItem(teleYellow, start);
    } else if (rands === 4) {
      appendItem(teleRed, end1of2);
      appendItem(teleRed, start);
    }
    start = start1of2; 
  }
  if (randomNumber(0,1)) {
    var temp = start;
    start = end;
    end = temp;
  }
  for (var n = 0; n < white.length; n++) {
    if (white[n] == end) {
      removeItem(white, n);
    }
  }
  white = usedRemove(teleBlue, white);
  white = usedRemove(teleGreen, white);
  white = usedRemove(teleYellow, white);
  white = usedRemove(teleRed, white);
  randomMaker();
}
function randomStater3xX(location,chance) {
  var ran = randomNumber(1,3);
  if (ran == 1) {
    return(randomNumber(location[0][0], location[0][1]));
  } else if (ran == 2){
    if (chance) {
     return(randomNumber(location[1][0], location[1][1])); 
    } else {
      if (randomNumber(0,1)) {
        return(location[1][0]);
      } else {
        return(location[1][1]);
      }
    }
  } else{
    return(randomNumber(location[2][0], location[2][1]));
  }
}
//random gen (Box levels(I'm sorry in advance))
function randomBox(){
  Box = [];
  while (!Box.length) {
    randomStarter();
    random();
    while (white.length == 2) {
      randomStarter();
      random();
    }
    var color = randomNumber(0,1);
    swit = white[0];
    var lastWasBox = false;
    for (var i = 1; i < white.length-1 ; i++) {
      if (white[i-1] - white[i] == white[i] - white[i+1]){
        appendItem(Box, white[i]);
        lastWasBox = true;
      }else if (lastWasBox){
        addColor(color,i);
        lastWasBox = false;
      }
    }
    if (lastWasBox){
      addColor(color,white.length-2);
    }
  }
  randomMaker();
}
function addColor(color,pos){
  if (color){
        appendItem(pur, white[pos]);
      }else{
        appendItem(yell, white[pos]);
      }
}
//random gen (true random)
function trueRandom(){
  var rand = randomNumber(0,20);
  if (!rand){
    randomBox();
  }else if (rand <= 5){
    randomBasic();
  }else if (rand <= 10) {
    randomKey();
  }else if (rand <= 15) {
    randomSwitch();
  }else if (rand <= 20) {
   randomTeleport();
  }
}
//The true tutoral
onEvent("theTrueTutoral", "click", function( ) {
  theTrueTutoral(196500);
  glowRemove(16);
  glowRemove(17);
  localStorage.setItem("boss",true);
});
function theTrueTutoral(time){
  textdisply0 = "theTrueTutoral";
  textdisply1 = 0;
  var newMap = ["u",
  1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,
  2,0,0,0,1,1,1,
  1,0,1,0,1,1,1,
  1,1,0,0,1,1,1,
  1,1,1,3,1,1,1,
  1,1,1,1,1,1,1,
  "u",
  3,1,0,0,0,1,1,
  0,0,0,1,0,0,1,
  1,1,1,2,1,0,0,
  0,0,0,0,1,1,0,
  0,1,1,1,1,0,0,
  0,0,0,0,1,0,1,
  1,1,1,0,0,0,1]
  newMap = addFromMap(newMap,makeRanAmount(0,3));
  newMap = addFromMap(newMap,["r",0,3,0,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,2,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0]);
  newMap = addFromMap(newMap,makeRanAmount(1,3));
  newMap = addFromMap(newMap,["r",3,5,2,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,4,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0]);
  newMap = addFromMap(newMap,makeRanAmount(2,3));
  newMap = addFromMap(newMap,["r",3,1,0,6,7,6,0,6,7,1,7,1,1,7,7,1,0,6,1,0,6,6,0,1,7,1,7,1,7,1,0,6,1,6,0,6,0,1,7,1,1,7,1,7,6,0,1,2,0]);
  newMap = addFromMap(newMap,makeRanAmount(3,3));
  newMap = addFromMap(newMap,["u",9,0,b,b,b,b,3,b,0,0,1,0,0,1,7,0,1,0,0,1,2,b,1,0,7,1,8,0,0,0,0,7,0,0,1,0,1,1,0,b,7,0,0,0,0,0,1,0,0]);
  newMap = addFromMap(newMap,makeRanAmount(4,3));
  newMap = addFromMap(newMap,["u",1,E,5,e,1,T,e,e,1,2,1,e,1,1,4,E,1,E,1,1,t,T,1,e,3,T,1,T,1,e,1,t,1,t,1,1,1,e,1,1,e,1,e,t,1,e,1,0,t]);
  newMap = addFromMap(newMap,makeRanAmount(5,7));
  newMap = addFromMap(newMap,["l",t,6,1,0,T,7,t,0,b,T,b,b,1,b,1,b,0,e,1,t,1,t,b,1,b,t,1,E,8,1,t,1,E,1,3,e,1,7,b,1,2,1,b,e,1,7,t,E,E]);
  map = [];
  for (var j = 0; j < newMap.length; j++){
    appendItem(map, newMap[j]);
  }
  fog = [false,true];
  gotoLevel(0);
  hideElement("exportButton");
  setScreen("videoScreen");
  document.getElementById("tutoralVideo").play();
  setTimeout(function() {
        setScreen("gameScreen");
        if (time){
          playSound("assets/music/mortal-danger-1.wav");
          setTimeout(function() {
            playSound("assets/music/mortal-danger-2.wav", true);
          }, 28000);
        }
    }, time);
}
function addFromMap(newMap,ogMap){
  for (var i = 0; i < ogMap.length; i++){
    appendItem(newMap, ogMap[i]);
  }
  return newMap;
}
function makeRanAmount(type,amount){
  var newMap = [];
  for (var i = 0; i < amount; i++){
    if (type==0){
      randomBasic();
    } else if (type==1) {
      randomKey();
    }else if (type==2) {
      randomSwitch();
    }else if (type==3) {
      randomBox();
    }else if (type==4) {
      randomTeleport();
    }else if (type==5) {
      trueRandom();
    }
    removeItem(map, 50);
    newMap = addFromMap(newMap,map);
  }
  return newMap;
}
//
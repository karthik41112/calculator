// clear
//screen
var screenTop = document.querySelector(".screenTop");
var screenBot = document.querySelector(".screenBot");

function screeClear(v = false) {
  screenTop.innerHTML = "";
  screenBot.innerHTML = "";
}

document.querySelector(".ac").addEventListener("click", screeClear);
document.querySelector(".clr").addEventListener("click", () => {
  v = screenBot.innerHTML;
  screenBot.innerHTML = v.slice(0, v.length - 1);
});

//opration

const keyboard = document.querySelector(".keyboard");

//Number adding
var eqed = false;
function numberAdd(v) {
  if (eqed) {
    screeClear();
  }
  screenBot.innerHTML += v;
  eqed = false;
}

//calculating
var lastNum = null;
var sign = null;
function equals() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != b && t != "") {
    let l = t.slice(t.length - 1);
    function fun() {
      ch = ["+", "-", "%", "*", "/"];
      for (let i in ch) {
        if (ch[i] == l) {
          return true;
        }
      }
      return false;
    }
    let s;
    let ans;
    if (fun()) {
      s = t + b;
      if (b == "") {
        s = t.slice(0, t.length - 1);
      }
      ans = eval(s);
      lastNum = b;
    } else {
      s = b + sign + lastNum;
      ans = eval(s);
    }
    eqed = true;
    screenBot.innerHTML = ans;
    screenTop.innerHTML = s;
  }
}

//adding
function add() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    if (t.slice(t.length - 1) == "+" && b != "") {
      screenTop.innerHTML += b + "+";
    } else if (b != "" && !eqed) {
      screenTop.innerHTML += "+" + b + "+";
    } else if (eqed) {
      screenTop.innerHTML = b + "+";
    }
    screenBot.innerHTML = "";
  } else if (b != "") {
    screenTop.innerHTML = b + "+";
    screenBot.innerHTML = "";
  }
  sign = "+";
  eqed = false;
}
function sub() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    let sy = t.slice(t.length - 1);
    if (sy == "-" && b != "") {
      screenTop.innerHTML += b + "-";
    } else if (sy >= "0" && sy <= "9") {
      screenTop.innerHTML += "+" + b + "+";
    } else if (b != "" && !eqed) {
    } else if (eqed) {
      screenTop.innerHTML = b + "+";
    }
    screenBot.innerHTML = "";
  } else if (b != "") {
    screenTop.innerHTML = b + "+";
    screenBot.innerHTML = "";
  }
  sign = "+";
  eqed = false;
}
function multiply() {}
function divied() {}

document.addEventListener("keydown", (e) => {
  let text = "19";
  console.log(e.keyCode);
  if (e.keyCode >= text.charCodeAt(0) && e.keyCode <= text.charCodeAt(1)) {
    numberAdd(e.key);
  } else if (e.keyCode == 13 || e.keyCode == 187) {
    equals();
  } else if (e.keyCode == 107) {
    add();
  } else if (e.keyCode == 106) {
    //*
  } else if (e.keyCode == 109) {
    //-
  } else if (e.keyCode == 111) {
    ///
  }
});

const Nodes = keyboard.children;

for (let i in Nodes) {
  Nodes[i].addEventListener("click", () => {
    let v = Nodes[i].getAttribute("value");

    if (v >= 0 && v <= 9) {
      numberAdd(v);
    } else if (v == "=") {
      equals();
    } else if (v == "+") {
      add();
    } else if (v == "-") {
      sub();
    }
  });
}

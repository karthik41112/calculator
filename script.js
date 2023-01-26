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

function opration(t, b, opr) {
  let sy = t.slice(t.length - 1);
  if (sy == opr && b != "") {
    screenTop.innerHTML += b + opr;
  } else if (sy >= "0" && sy <= "9" && !eqed) {
    screenTop.innerHTML += opr + b + opr;
  } else if (eqed) {
    screenTop.innerHTML = b + opr;
  } else if (b != "") {
    screenTop.innerHTML += b + opr;
  } else {
    screenTop.innerHTML = t.slice(0, t.length - 1) + opr;
  }
}

//adding
function add() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    opration(t, b, "+");
  } else if (b != "") {
    screenTop.innerHTML = b + "+";
  }
  screenBot.innerHTML = "";
  sign = "+";
  eqed = false;
}
function sub() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    opration(t, b, "-");
  } else if (b != "") {
    screenTop.innerHTML = b + "-";
  }
  screenBot.innerHTML = "";
  sign = "-";
  eqed = false;
}
function multiply() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    opration(t, b, "*");
  } else if (b != "") {
    screenTop.innerHTML = b + "*";
  }
  screenBot.innerHTML = "";
  sign = "*";
  eqed = false;
}
function divied() {
  let t = screenTop.innerHTML;
  let b = screenBot.innerHTML;
  if (t != "") {
    opration(t, b, "/");
  } else if (b != "") {
    screenTop.innerHTML = b + "/";
  }
  screenBot.innerHTML = "";
  sign = "/";
  eqed = false;
}

document.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.key >= 1 && e.key <= 9) {
    // numberAdd(String.fromCharCode(v));
    numberAdd(e.key);
  } else if (e.key == "=" || e.key == "Enter") {
    equals();
  } else if (e.key == "+") {
    add();
  } else if (e.key == "-") {
    sub();
  } else if (e.key == "*") {
    multiply();
  } else if (e.key == "/") {
    divied();
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
    } else if (v == "*") {
      multiply();
    } else if (v == "/") {
      divied();
    }
  });
}

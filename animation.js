let main = document.querySelector(".main");
let inner = document.getElementsByClassName("inner")[0];
var pos = 0;
var isreverse = false;

function myMove() {
  console.log("fun executed!");
  // let id = null;
  let elem = document.getElementById("animate");

  // clearInterval(id);
  let id = setInterval(frame, 5);
  function frame() {
    if (!isreverse && pos == 450) {
      clearInterval(id);
      isreverse = !isreverse;
    } else if (isreverse && pos == 0) {
      clearInterval(id);
      isreverse = !isreverse;
    } else {
      isreverse ? pos-- : pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}
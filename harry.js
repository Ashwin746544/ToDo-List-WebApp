console.log('This is my tutorial 42');

// Button with id myBtn
let myBtn = document.getElementById("myBtn");

// div with id content 

let content = document.getElementById("content");
console.log("before getData");
myBtn.onclick = myfun;
function myfun() {
  const a = 200;
  a = 100;
  alert("value is" + a);
}
async function getData() {
  // setTimeout(() => { console.log("settimeout") }, 5000);
  // console.log("Started getData");
  // url = "index.txt";
  // await fetch(url).then((response) => {
  //   console.log("Inside first then");
  //   return response.text();
  // })
  //   .then((data) => {
  //     console.log("Inside second then");
  //     console.log(data);
  //   })
  // console.log("getData function end");
  let a = 10;
  fun();
}
// getData();
function fun() {
  const f = 20;
  fun2();
  let chance = Math.random();
  if (chance > 0.5) {
    throw new Error("error occured");
  }
}
function fun2() {
  console.log("hfjf");
}
console.log("after getData");
// function getData() {
//   console.log("Started getData")
//   url = "https://api.github.com/users";
//   fetch(url).then((response) => {
//     console.log("Inside first then")
//     return response.json();
//   }).then((data) => {
//     console.log("Inside second then")
//     console.log(data);
//   })
// }


// function postData() {
//   url = "http://dummy.restapiexample.com/api/v1/create";
//   data = '{"name":"harglry347485945","salary":"123","age":"23"}'
//   params = {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: data
//   }
//   fetch(url, params).then(response => response.json())
//     .then(data => console.log(data)
//     )
// }

// console.log("Before running getData")
// getData()
// console.log("After running getData")
// postData()
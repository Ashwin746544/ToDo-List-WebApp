// let i;
async function printNumber() {
  for (let i = 1; i <= 10; i++) {
    let ans = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, i * 1000);
    });
    console.log(ans);
  }
}
printNumber();

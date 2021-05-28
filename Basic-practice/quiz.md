<!-- 1.由於setTimeout為非同步事件，javascript執行到此函式時會將任務拋給webapis，事件觸發後再過渡到queue，event loop判斷stack堆疊內是否還有物件，清空後拋回stack，以導致setTimeout內的console.log函式為最後執行 -->
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");

<!-- 2.如第一題所述，無論setTimeout的間隔為幾秒延遲，此函式本身就為非同步事件，event loop會等到同步事件於stack內執行完畢再拋回stack執行，以導致setTimeout內的函式為輸出結果的最後 -->
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");

<!-- 3.程式從頭開始執行至foo()時才會呼叫函式內的console.log()，依序印出: foo、bar、baz -->
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();

<!-- 4.大致承上題，foo()時才進行呼叫，函式內的setTimeout為非同步事件，執行至此時JS拋給webApis，事件觸發後才將callback給到queue，stack內的其餘任務清空後，event loop才將其拋回stack，以導致bar的輸出結果為最後 -->
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();
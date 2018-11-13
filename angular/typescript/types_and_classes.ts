var myNum: number = 7;

var myString: string = "Hello Universe";

var myArr: number[1,2,3,4]

var myObj = {
    name: 'Bill'
}

var anythingVariable: any = "Hey";

anythingVariable = 25;

var arrayOne: boolean[true, false, true, true];

var arrayTwo: any[1, 'abc', true, 2];

myObj = {
    x: 5, y: 10
}

class MyNode {
    val: number;
    constructor(val: number){
        this.val = 0;
        this.val = val;
    }
    doSomething(){
        console.log("This is FUN!");
    }
}

let myNodeInstance = new MyNode(1);
console.log(myNodeInstance.val);

function myFunction(): void{
    console.log("Hellow World");
    return;
}

function sendingErrors(): never{
    throw new Error(message);
}

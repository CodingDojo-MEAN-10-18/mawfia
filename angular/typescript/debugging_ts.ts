var increment = x => x + 1;
// This works great:
//console.log(increment(3));

var square = x => x * x;
// This is not showing me what I want:
//console.log(square(4));

var multiply = (x,y) => (x * y);
// Nor is this working:
var math = (x, y) => {
    let sum = x + y;
    let product = x * y;
    let difference = Math.abs(x - y);
    return [sum, product, difference];
}

//console.log(multiply(2,4));
//console.log(math(4,5));

class Elephant {
   constructor(public age: number){}
   birthday = ()=> age++;
}
const babar = new Elephant(8);

setTimeout(babar.birthday, 1000)

setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 2000)
// Why didn't babar's age change? Fix this by using an arrow function in the Elephant class.
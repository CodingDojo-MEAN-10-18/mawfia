class Bike {
   miles: number
    constructor(public price: number, public max_speed: string) {
        this.miles = 0;
    }

    displayInfo() {
        console.log(`Price: ${this.price}, Max Speed: ${this.max_speed}, Miles: ${this.miles}`);
        return this;
    }

    ride() {
        this.miles += 10;
        console.log("Riding");
        return this;
    }

    reverse() {
        this.miles = this.miles-5 <= 0 ? 0 : this.miles -= 5;
        console.log("Reversing");
        return this;
   }
}
const bike1 = new Bike(8, "5mph");
const bike2 = new Bike(10, "10mph");
const bike3 = new Bike(20, "40mph");

bike1.ride().ride().ride().reverse().displayInfo();
bike2.ride().ride().reverse().reverse().displayInfo();
bike3.reverse().reverse().reverse().displayInfo();
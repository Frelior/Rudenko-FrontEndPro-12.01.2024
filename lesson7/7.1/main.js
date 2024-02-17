class Human {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    info(){
        console.log(this);;
    }
}

class Car {
    constructor(brand, model, year, numberplate){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.numberplate = numberplate;
    }
    setOwner(owner){
        if(owner.age > 18){
            this.owner = owner;
            this.owner.car = this;
        } else {
            console.log(`${owner.name} is ${owner.age} - too young`);
        }
    }
    info(){
        console.log(this);
        this.owner?.info();
    }
}

const person1 = new Human('John', 24);
const person2 = new Human('Alex', 17);
const person3 = new Human('Rob', 20);
const car1 = new Car('Toyota', 'Corolla', 2020, '111111');
const car2 = new Car('BMW', 'X5', 2022, '222222');
const car3 = new Car('Mercedes', 'C-class', 2021, '3333');

car1.setOwner(person1);
car1.info();

console.log(`\n\n`);
car2.setOwner(person2);
car2.info();

console.log(`\n\n`);
car3.setOwner(person3);
car3.info();

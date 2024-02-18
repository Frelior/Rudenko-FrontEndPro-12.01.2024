class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}
class apartment {
    residents = [];
    addResident(...resident) {
        this.residents.push(...resident);
    }
}
class House {
    constructor(maxApartments) {
        this.maxApartments = maxApartments;
    }
    apartments = [];
    addApartment(...apartment){
        if(this.apartments.length + arguments.length <= this.maxApartments){
            this.apartments.push(...apartment);
        } else {
            console.log('Too many apartments');
        }
    }
}

const person1 = new Human('John', 'male');
const person2 = new Human('Sam', 'female');
const person3 = new Human('Rob', 'male');
const person4 = new Human('Alex', 'female');
const apartment1 = new apartment();
const apartment2 = new apartment();
const house1 = new House(2);

apartment1.addResident(person1, person2);
apartment2.addResident(person3, person4);
house1.addApartment(apartment1, apartment2);

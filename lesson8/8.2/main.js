class Student {
    constructor(name, surName, birthYear){
        this.name = name;
        this.surName = surName;
        this.birthYear = birthYear;
        this.grades = [];
        this.attendance = new Array(25).fill(undefined);
    }
    addGrade(...number){ // The task did not specify where to get the grades, so I created a method to add them
        this.grades.push(...number);
    }
    getAverageGrade(){
        return Math.ceil(this.grades.reduce((sum, current) => sum + current, 0) / this.grades.length);
    }
    getAge(){
        return new Date().getFullYear() - this.birthYear;
    }
    #updateAttendance(boolean){
        const firstEmptyElement = this.attendance.indexOf(undefined);
        if(firstEmptyElement !== -1){
            this.attendance[firstEmptyElement] = boolean;
        }
    }
    present(times = 1){
        for (let i = 0; i < times; i++) {
            this.#updateAttendance(true);
        }
    }
    absent(times = 1){
        for (let i = 0; i < times; i++) {
            this.#updateAttendance(false);
        }
    }
    summary(){
        const averageAttendance = this.attendance.filter(item => item === true).length / this.attendance.length;
        const averageGrade = this.getAverageGrade();
        switch(true){
            case averageGrade > 90 && averageAttendance > 0.9:
                console.log(this.name + ", молодець!");
                break;
            case averageGrade < 90 && averageAttendance < 0.9:
                console.log(this.name + ", редиска!");
                break;
            default:
                console.log(this.name + ", добре, але можна краще");
        }   
    
    }
}

const student1 = new Student("Ivan", "Ivanov", 1990);
student1.addGrade(100,100,100,100,100);
student1.present(23); //fill out the array of visits
student1.absent(10); // checking that the array does not become larger than 25 and does not overwrite existing values
console.log(`${student1.name} ${student1.surName}
Вік: ${student1.getAge()}
Середня оцінка: ${student1.getAverageGrade()}
`);
student1.summary();


const student2 = new Student("Petro", "Petrov", 1995);
student2.addGrade(60,100,80,20,90,70);
student2.absent(25);
console.log(`${student2.name} ${student2.surName}
Вік: ${student2.getAge()}
Середня оцінка: ${student2.getAverageGrade()}
`);
student2.summary();


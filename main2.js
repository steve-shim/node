// Prototype

function Person(name) {
  this.name = name
}

Person.prototype.greet = function greet() {
  return `Hi, ${this.name}!`
}

function Student(name) {
  this.__proto__.constructor(name)
}

Student.prototype.study = function study() {
  return `${this.name} is studying`
}

Object.setPrototypeOf(Student.prototype, Person.prototype)

const me = new Student('SSH')
console.log(me.greet())
console.log(me.study())

const anotherme = new Person('FOO')
console.log(anotherme instanceof Student)
console.log(anotherme instanceof Person)
console.log([] instanceof Array, [] instanceof Object)

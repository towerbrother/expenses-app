//
// Object destructuring
//

const person = {
  name: "Giorgio",
  age: 30,
  location: {
    city: "London",
    temp: 18,
  },
};

const { name = "Anonymous", age } = person;
const { city, temp: temperature } = person.location;

console.log("name", name);
console.log("age", age);
console.log("city", city);
console.log("temperature", temperature);

//
// Array destructuring
//

const address = ["194756 Oxford Street", "London", "UK", "E3 S56"];

const [street, city, country, zip] = address;

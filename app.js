"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      seachResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    findFamilyMembersOfPerson(person, people)
    break;
    case "descendants":
    var allDecendants = findDescendants(person, people);
    displayDescendants(allDecendants);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function searchByTraits(people){
    let searchArray =[];
    let displayOption = prompt("Please enter: 'gender', 'eye color', 'dob', 'height' or 'weight'? Type the option you want or 'restart' or 'quit'");

    switch(displayOption){
        case "gender":
        let genderChoice = prompt("enter 'male' or 'female")
        let gender ="gender";
       searchArray = searchBySingleTrait(genderChoice, people, gender);
        break;
        case "eye color":
        let eyeColorChoice = prompt("enter eye color")
        let eyeColor = "eyeColor";
        searchArray = searchBySingleTrait(eyeColorChoice, people, eyeColor);
        break;
        case "dob":
        let dobChoice = prompt("enter dob as 00/00/0000")
        let dob = "dob";
        searchArray = searchBySingleTrait(dobChoice, people, dob);
        break;
        case "height":
        let heightChoice = prompt("enter height in inches")
        let height = "height";
        searchArray = searchByMathTrait(heightChoice, people, height);
        break;
        case "weight":
        let weightChoice = prompt("enter weight in LBS")
        let weight = "weight";
        searchArray = searchByMathTrait(weightChoice, people, weight);
        default:
          return searchByTraits(searchArray);
    }
    displayPeopleWithTraits(searchArray);
    return searchBySingleTrait(searchArray);
}

function searchBySingleTrait(displayOption, people, singleTrait){
  let foundTraits = people.filter(function(person){
    if(person[`${singleTrait}`] === displayOption) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundTraits; 
}

function searchByMathTrait(displayOption, people, singleTrait){
  let foundTraits = people.filter(function(person){
    if(person[`${singleTrait}`] === parseInt(displayOption)) {
      return true;
    }
    else {
      return false;
    }
  })
  
  return foundTraits; 
}

function displayPeopleWithTraits(people) {
  alert(people.map(function(person) {
    return person.firstName + "\n" +
    person.lastName + "\n" +
    person.gender + "\n" +
    person.eyeColor + "\n" +
    person.dob + "\n" +
    person.height + "\n" +
    person.weight + "\n" +
    person.occupation + "\n";
  }).join("\n"));
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  

  
  alert(personInfo);
  app(people);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function findFamilyMembersOfPerson(person, people) {
  let parents = findParentsOfPerson(person, people);
  let spouse = findSpouseOfPerson(person, people);
  let siblings = findSiblingsOfPerson(person,people);
  displayFamily(spouse, parents, siblings);
}

function findParentsOfPerson(person, people) {
  let parents = people.filter(function (element) {
    if(person.parents[0] == element.id) {
      return true;
    }
    else{
      return false;
    }
  });
  return parents; 

}

function findSpouseOfPerson(person, people) {
  let spouse = people.filter(function (element) {
    if(person.currentSpouse == element.id) {
      return true;
    }
    else {
      return false;
    }
  }); 
  return spouse[0]; 
}

function findSiblingsOfPerson(person, people) {
  let siblings = [];

  if(parents.length == 0) {
    return siblings;
  }
  else if(parents.length >=1) {
    siblings = people.filter(function (element) {

      if(element.parents.length == 0) {
        return false;
      }
      else if(element.parents.length == 1 && parents.length == 1) {
        if(element.parents[0] === parents[0].id) {
          return true;
        }
        else{
          return false;
        }
      }

    })
  }
}

function displayFamily(spouse, parents, siblings, person) {
  if(spouse.gender == "male") {
    alert(`${person.firstName} ${person.lastName} husband is ${spouse.firstName} ${spouse.lastName}`)
  }
  else{
    alert(`${person.firstName} ${person.lastName} wife is ${spouse.firstName} ${spouse.lastName}`)
  }
  parents.forEach(element => {
    if(element.gender === "male") {
      alert(`${element.firstName} ${element.lastName} is ${person.firstName} ${person.lastName} father`)
    }
    else{
      alert(`${element.firstName} ${element.lastName} is ${person.firstName} ${person.lastName} mother`)
    }
})
siblings.forEach(element => {
  if(element.gender === "male") {
    alert(`${element.firstName} ${element.lastName} is ${person.firstName} ${person.lastName} brother`)
  }
  else{
    alert(`${element.firstName} ${element.lastName} is ${person.firstName} ${person.lastName} sister`)
  }
})
}


function findDescendants(person, people) {
   
    let descendants = [];
    descendants = people.filter(function (element) {

        if(element.parents.length === 0) {
            return false; 

        }
        else if(element.parents.includes(person.id)){    
            return true;
        }  
    });

    for(let i = 0; i <descendants.length; i++) {
     
       let grandKids = findDescendants(descendants[i], people);
        descendants = descendants.concat(grandKids); 

    } 
    return descendants;   
}

function displayDescendants(allDecendants){

  alert(allDecendants.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
    
}




      
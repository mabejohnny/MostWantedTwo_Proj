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
    // TODO: get person's family
    break;
    case "descendants":
    findDescendants(person, people)
    displayDescendants();
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
        let gender = prompt("enter 'male' or 'female")
       searchArray = searchByTrait(people, eyeColor, eyeColorChoice)
        break;
        case "eye color":
        let eyeColor = prompt("enter eye color")
        break;
        case "dob":
        let dob = prompt("enter dob as 00/00/0000")
        break;
        case "height":
        let height = prompt("enter height in inches")
        break;
        case "weight":
        let weight = prompt("enter weight in LBS")
        default:
        return mainMenu(person, people); //ask agin
    }
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

  
  alert(personInfo);
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
      let peopleToReturn = [];
      peopleToReturn += descendants[i].firstName + " " + descendants[i].lastName + " ";
        if(peopleToReturn > 0) {
          findDescendants(peopleToReturn[i], peopleToReturn)
        }
        else if(peopleToReturn === 0) {
           break;

         }

    }
   
}

function displayDescendants(peopleToReturn){
     if(peopleToReturn === 0) {
            alert("There are no descendants for " + person);
            app(people);
        }
    else{
        alert(peopleToReturn);
    }
}




      
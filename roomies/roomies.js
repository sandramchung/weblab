// Treat this as two separate problems: rooming girls, and rooming boys.

// Create empty arrays for the girl and boy data

var girlsdata = [];
var boysdata = [];
var boyorgirl = null;

// Populates the array with girls and boys' names via direct user input

function inputNames () { 
    while (condition goes here) {
        var firstName = prompt("Enter first name");
        var lastName = prompt("Enter last name");
        
        // create object with child's name and bestie
        var child = (first: firstName, last: lastName, bestie1: null, bestie2: null, bestie3: null, bestie4: null, room: null); 
        
        // append object to array
        if boyorgirl == "girl" {
            girlsdata.push(child); 
        }
        else {
            boysdata.push(child);
        }
        // add name to list displayed on app page
        var nextName = document.getElementById(girls); //gets element corresponding to list of names
        nextName+= "<tr><td>" + firstName + "</td><td>" + lastName + "</td><td><span class="button">Edit name</span></td><td><span class="button">Add besties</td>";
        // asks if any additional names need to be inputted
    }
// Option to populate array of girls by uploading a spreadsheet (develop this later)

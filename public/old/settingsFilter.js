//adding a new club to your club list -> this is run when the add club button is clicked
function addClub() {
   
    //save new club to a variable
    var newClub = document.getElementById("listClub").value;
    
     //initialize club array with "All" so everyone is a part of "All" labelled clubs
    var clubs = ["All"]; 
    
    //check if the club list in local storage is empty, if not then import the  club list from local storage
    if (JSON.parse(localStorage.getItem("clubs")) != null) {
        clubs = JSON.parse(localStorage.getItem("clubs"));
    }
    
    //if the club list doesn't already have the new club, add the new club
    if (!clubs.includes(newClub)) {
        clubs.push(newClub);
        
        //save the new club list for the the "showClub()" function
        localStorage.setItem("clubs", JSON.stringify(clubs));
        //now show the clubs
        showClub();
        }   
    
    //if you are already part of that club, alert the user of the following
    else {
        alert("You are already a part of that club.");
    }
}
    
//delete a club from your club list -> this is run when the del club button is clicked
function delClub() {
   
    //save the club to be deleted to a variable
    var oldClub = document.getElementById("listClub").value;
    
     //initialize club array
    var clubs = ["All"]; 
    
    //check if the club list in local storage is empty, if not then import the  club list from local storage
    if (JSON.parse(localStorage.getItem("clubs")) != null) {
        clubs = JSON.parse(localStorage.getItem("clubs"));
    }
    
    //if the club list has the club to be deleted, remove it from the club list
    if (clubs.includes(oldClub)) {
        //find the index of that club in the list
        var pos = clubs.indexOf(oldClub);
        //delete the index of that array by 1 element
        clubs.splice(pos, 1);
        
        //save the new club list for the the "showClub()" function
        localStorage.setItem("clubs", JSON.stringify(clubs));
        //show the club
        showClub();
        }   
    
    //if you club you want to delete is not in your club list, tell the user the following
    else {
        alert("You are not a part of that club.");
    }
}
    


//Function to show the club list
function showClub() {
    //initialize a new variable which will replace the .innerHTML of the settingsPage.HTML list element
    var userClubList = "";
    
     //initialize club array
    var clubs = ["All"]; 
    
    //check if the local storage has a club list, if so then import the old club list
    if (JSON.parse(localStorage.getItem("clubs")) != null) {
        clubs = JSON.parse(localStorage.getItem("clubs"));
    }
    
    //Visually list clubs
    if (clubs.length != 0) {
        for (var i = 1; i < clubs.length; i++) {
            userClubList += "<li>" + clubs[i] + "</li>";
            document.getElementById("clubList").innerHTML = userClubList;
        }
    }
    
    // if the club you want to delete isnt a part of your club list
    else {
        document.getElementById("clubList").innerHTML = "<ul> You are not a part of any clubs yet. </ul>";
    }
    
    //load the user preferences for the rest of the settings (i.e checkboxes)
    loadFilterSettings()
}

//save the settings the user entered -> run when the save changes button is clicked.
function filterSettingsSave () {
    
    
    //checks the status of all the checkboxes 
    var grade9Check = document.getElementById("grade9");
    var grade10Check = document.getElementById("grade10");
    var grade11Check = document.getElementById("grade11");
    var grade12Check = document.getElementById("grade12");
    
    //saves the gender preferences
    if (document.getElementById("genderCheckSetting").value == "Girl")
        //if the user picks girl, the gender check saves as boy. This means the program hide all the announcements containing the tag boy because the user is a girl
        var genderCheck = "Boy"
    else if (document.getElementById("genderCheckSetting").value == "Boy")
        var genderCheck = "Girl"
    else
        var genderCheck = "Unspecified"
    
    //save the status of the checkboxes to local storage
    localStorage.setItem("storeGrade9", grade9Check.checked);
    localStorage.setItem("storeGrade10", grade10Check.checked);
    localStorage.setItem("storeGrade11", grade11Check.checked);
    localStorage.setItem("storeGrade12", grade12Check.checked);
    localStorage.setItem("storeGenderFilterSetting", JSON.stringify(genderCheck));

}
 //load the user preferences for the rest of the settings (i.e checkboxes)
function loadFilterSettings() {
    
    
     //check if the array to store filter settings is not empty, if so then import the old club list
    if (JSON.parse(localStorage.getItem("storeGenderFilterSetting")) != null) {
        
        //Check if the box is checked in local storage
        var checked9 = JSON.parse(localStorage.getItem("storeGrade9"));
        //the default setting is a checked box, but if the local storage comes back false (unchecked) then uncheck the pre-checked box
        if (checked9 != true) 
            document.getElementById("grade9").checked = false;
        
        var checked10 = JSON.parse(localStorage.getItem("storeGrade10"));
        if (checked10 != true) 
            document.getElementById("grade10").checked = false;
        
        var checked11 = JSON.parse(localStorage.getItem("storeGrade11"));
        if (checked11 != true) 
            document.getElementById("grade11").checked = false;
        
        var checked12 = JSON.parse(localStorage.getItem("storeGrade12"));
        if (checked12 != true) 
            document.getElementById("grade12").checked = false;
    }
}
//save all the input when creating an announcement
function saveInput() {
    //initialize variables to be stored in the local storage
    var createName = [];
    var createRoom = [];
    var createClub = [];
    var createGrade = [];
    var createGender = [];
    var createAnnouncement = [];
    
    
    //check to see if there are existing announcements in the local storage by simply checking one of the arrays (only one array needs to be checked because if one array contains information, the rest of the arrays will also have information)
    if (JSON.parse(localStorage.getItem("storeName")) != null) {
    
        // if the local storage isnt empty, assign old values from local storage to arrays
        createName = JSON.parse(localStorage.getItem("storeName"));
        createRoom = JSON.parse(localStorage.getItem("storeRoom"));
        createClub = JSON.parse(localStorage.getItem("storeClub"));
        createGrade = JSON.parse(localStorage.getItem("storeGrade"));
        createGender = JSON.parse(localStorage.getItem("storeGender"));
        createAnnouncement = JSON.parse(localStorage.getItem("storeAnnouncement"));
    }
    
    
    
    //create new variables to store new data to later be put into the arrays
    var newName = document.getElementById("pickName").value;
    var newRoom = document.getElementById("pickRoom").value;
    var newClub = document.getElementById("pickClub").value;
    var newGrade = document.getElementById("pickGrade").value;
    var newGender = document.getElementById("pickGender").value;
    var newAnnouncement = document.getElementById("pickAnnouncement").value;
    
    
    //to ensure the announcement can only be submitted if all fields are filled out, check each field is filled out
    if (newName == "" || newRoom == "" || newClub == "" || newGrade == "" || newGender == "" || newAnnouncement == "")
        alert("Please fill out all fields before submitting.");
    
    //if all fields are filled out, add the new data to the existing array
    else {
        createName.push(newName);
        createRoom.push(newRoom);
        createClub.push(newClub);
        createGrade.push(newGrade);
        createGender.push(newGender);
        createAnnouncement.push(newAnnouncement);
    
    
        //save variable to local storage
        localStorage.setItem("storeName", JSON.stringify(createName));
        localStorage.setItem("storeRoom", JSON.stringify(createRoom));
        localStorage.setItem("storeClub", JSON.stringify(createClub));
        localStorage.setItem("storeGrade", JSON.stringify(createGrade));
        localStorage.setItem("storeGender", JSON.stringify(createGender));
        localStorage.setItem("storeAnnouncement", JSON.stringify(createAnnouncement));

        //switch windows
        window.location.href = "./mainPage.html";
    }

}

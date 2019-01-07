// this function that shows the announcements is run every time the main page is loaded
function loadAnnouncement() {

    //initialize variables to be hold local storage information as strings
    var loadName = "";
    var loadRoom = "";
    var loadClub = "";
    var loadGrade = "";
    var loadGender = "";
    var loadAnnouncement = "";
    
    
    //intialize varibles to hold local storage information as an array
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
        createClubs =  JSON.parse(localStorage.getItem("clubs"));
    }
    
    
    //concat arrays so that one is a read only while the other is editable
    var createNameEditable = createName.concat();
    var createRoomEditable = createRoom.concat();
    var createClubEditable = createClub.concat();
    var createGradeEditable = createGrade.concat();
    var createGenderEditable = createGender.concat();
    var createAnnouncementEditable = createAnnouncement.concat();
  
    
    //function to filter gender based on user preference in the settings page, this function is made inside another function to reduce cpu usage
    function genderFilter() {
        //bring in the gender keyword from the local storage
        genderFilterKeyword = JSON.parse(localStorage.getItem("storeGenderFilterSetting"))
        //in order to filter gender, check if the gender section of the announcement contains the gender keyword
        for (var i = 0; i < createGenderEditable.length; i++) {

            //if the genderkeyword is found in the announcement, delete it across all arrays. This deletion occurs in the editable array which gets reset every time the filter changes -> this allows the filter to be changed around without deleting the original announcement entirely.
            if (createGenderEditable[i] == (genderFilterKeyword)) {
                createNameEditable.splice(i, 1);
                createRoomEditable.splice(i, 1);
                createClubEditable.splice(i, 1);
                createGradeEditable.splice(i, 1);
                createGenderEditable.splice(i, 1);
                createAnnouncementEditable.splice(i, 1);
                genderFilter();
            }
        }
    }
    
    //function to filter by clubs
    function clubFilter() {
        //bring in the gender keyword from the local storage
        clubFilterKeyword = JSON.parse(localStorage.getItem("clubs"))
        
        //cycle through each announcement's club
        for (var i = 0; i < createClubEditable.length; i++) {
            
            //initially set a variable which determines if we delete the announcement to false
            var spliceArray = false;
            
            //if there is any array element from the filter that is found in the announcement then set splceArray to true, meaning the announcement won't get deleted. This function essentially allows us to compare the elements of 2 arrays to each other 
            for (var z = 0; z < clubFilterKeyword.length; z++) {
                if (clubFilterKeyword[z] == createClubEditable[i]) 
                    var spliceArray = true;
            }
            //if the variable did not change, splice all the arrays which will delete that announcement
            if (!spliceArray){
                createNameEditable.splice(i, 1);    
                createRoomEditable.splice(i, 1);
                createClubEditable.splice(i, 1);
                createGradeEditable.splice(i, 1);
                createGenderEditable.splice(i, 1);
                createAnnouncementEditable.splice(i, 1);
                clubFilter();
                }
        
        }
    }
    
    //run the gender filter
    genderFilter();
    
    //run the club filter
    clubFilter();
    
    
    //make a new variable which will later change the .innerHTML of the main page
    var viewContents ="";
    
    //if there are viewable announcements after the gender filter has run,
    if (createAnnouncementEditable.length != 0) {
        
        //save the edited arrays on the local storage for the delete (function)
        localStorage.setItem("storeNameEditable", JSON.stringify(createNameEditable));
        localStorage.setItem("storeRoomEditable", JSON.stringify(createRoomEditable));
        localStorage.setItem("storeClubEditable", JSON.stringify(createClubEditable));
        localStorage.setItem("storeGradeEditable", JSON.stringify(createGradeEditable));
        localStorage.setItem("storeGenderEditable", JSON.stringify(createGenderEditable));
        localStorage.setItem("storeAnnouncementEditable", JSON.stringify(createAnnouncementEditable));
        
        //display them in chronological order
        for (var x = createAnnouncementEditable.length - 1; x >= 0; x--) {
            loadName = createNameEditable[x];
            loadRoom = createRoomEditable[x];
            loadClub = createClubEditable[x];
            loadGrade = createGradeEditable[x];
            loadGender = createGenderEditable[x];
            loadAnnouncement = createAnnouncementEditable[x];

            //All the components of the announcement comes together here for the number of announcements there are
            viewContents += "<li id=\"announcementCss\"> <div id=\"title\">" + loadName + "<\/div> <div id=\"title2\"> Room: " + loadRoom + "<\/div> <div id=\"announcementTag\">" + loadAnnouncement + "<\/div> <button href=\"./Trash_Can-512.png\" id=\"buttonId\" onclick=\"delAnnouncement(" + x + ")\"><\/button> <div id=\"tags\"> <ul id=\"inline\"> <li class=\"tag\" id=\"clubTag\">" + loadClub + "<\/li> <li class=\"tag\" id=\"genderTag\">" + loadGender + "<\/li> <li class=\"tag\" id=\"gradeTag\">" + loadGrade + "<\/li> <\/ul> <\/div> <\/li>"
            document.getElementById("announcementBlock").innerHTML = viewContents;
        }
    }
    //if there are no announcements left, tell the user
    else {
          document.getElementById("announcementBlock").innerHTML = "<li> There are no new announcements. </li>";
    }
}

//to delete an announcement
function delAnnouncement(x) {
    //bring in local storage read only variables
    var createName = JSON.parse(localStorage.getItem("storeName"));
    var createRoom = JSON.parse(localStorage.getItem("storeRoom"));
    var createClub = JSON.parse(localStorage.getItem("storeClub"));
    var createGrade = JSON.parse(localStorage.getItem("storeGrade"));
    var createGender = JSON.parse(localStorage.getItem("storeGender"));
    var createAnnouncement = JSON.parse(localStorage.getItem("storeAnnouncement"));
    
    //bring in local storage editable list to compare and delete in the read only list
    var createNameEditable = JSON.parse(localStorage.getItem("storeNameEditable"));
    var createRoomEditable = JSON.parse(localStorage.getItem("storeRoomEditable"));
    var createClubEditable = JSON.parse(localStorage.getItem("storeClubEditable"));
    var createGradeEditable = JSON.parse(localStorage.getItem("storeGradeEditable"));
    var createGenderEditable = JSON.parse(localStorage.getItem("storeGenderEditable"));
    var createAnnouncementEditable = JSON.parse(localStorage.getItem("storeAnnouncementEditable"));
    
    
    //find the index of the announcement you want to delete in the read only array
    var del_1 = createName.indexOf(createNameEditable[x]);
    //delete that announcement from the read-only array
    createName.splice(del_1, 1);
    
    var del_2 = createRoom.indexOf(createRoomEditable[x]);
    createRoom.splice(del_2, 1);
    
    var del_3 = createClub.indexOf(createClubEditable[x]);
    createClub.splice(del_3, 1);
    
    var del_4 = createGrade.indexOf(createGradeEditable[x]);
    createGrade.splice(del_4, 1);
    
    var del_5 = createGender.indexOf(createGenderEditable[x]);
    createGender.splice(del_5, 1);
    
    var del_6 = createAnnouncement.indexOf(createAnnouncementEditable[x]);
    createAnnouncement.splice(del_6, 1);
    
    //save the read only announcements after the edit has been made
    localStorage.setItem("storeName", JSON.stringify(createName));
    localStorage.setItem("storeRoom", JSON.stringify(createRoom));
    localStorage.setItem("storeClub", JSON.stringify(createClub));
    localStorage.setItem("storeGrade", JSON.stringify(createGrade));
    localStorage.setItem("storeGender", JSON.stringify(createGender));
    localStorage.setItem("storeAnnouncement", JSON.stringify(createAnnouncement));
    
    //load announcements again so the user can see the update 
    loadAnnouncement();
}



     


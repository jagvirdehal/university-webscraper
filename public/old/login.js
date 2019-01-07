function login() {
    // create variables
    var userKey = "abc";
    var passKey = "123";
    var usernameInput = document.getElementById("usernameInput").value;
    var passwordInput = document.getElementById("passwordInput").value;
    
    // testing
    
    alert(usernameInput);
    alert(passwordInput);
    
    
    if (usernameInput == userKey && passwordInput == passKey) {
        location.replace("mainPage.html");
        alert("it should work");
        
    } 
    else {
        alert("try again");
    
    }
    
}
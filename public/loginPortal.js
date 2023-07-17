var newuserBtn = document.getElementById("new-user");
var returninguserBtn = document.getElementById("returning-user");
var formToFill = document.getElementById("formToFill");
var portal = document.getElementById("window");
var signupBtn = document.getElementById("signup-btn");
var signinBtn = document.getElementById("signin-btn");
var backBtn = document.getElementById("back");
var showPass = document.getElementById("showPass");
var nameLabel = document.getElementById("name-label");
var fullname = document.getElementById("fullname");
var username = document.getElementById("username");
var password = document.getElementById("password");
var title = document.getElementById("greeting");

var isSigningup = false;

newuserBtn.onclick = function() {
    title.innerHTML = "Create Account";
    hideTypeOfUser();
    signinBtn.style.display = "none";
    fullname.style.display = "inline";
    nameLabel.style.display = "inline";
    isSigningup = true;
}

returninguserBtn.onclick = function() {
    title.innerHTML = "Welcome Back";
    hideTypeOfUser();
    signupBtn.style.display = "none";
    fullname.style.display = "none";
    nameLabel.style.display = "none";
}

backBtn.onclick = function() {
    title.innerHTML = "Welcome!";
    formToFill.style.display = "none";
    newuserBtn.style.display = "inline";
    returninguserBtn.style.display = "inline";
    isSigningup = false;
}

function hideTypeOfUser() {
    newuserBtn.style.display = "none";
    returninguserBtn.style.display = "none";
    formToFill.style.display = 'inline';
}

signupBtn.addEventListener("click", () => {
    var obj = {
        username: username.value,
        password: password.value,
        name: fullname.value
    };

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj),
        redirect: 'follow'
    }).then(response => {
        if (response.status === 200) {
            window.location.replace('../main.html');
        }
        if (response.status === 409) {
            title.innerHTML = "Username already </br> existed, try again";
        }
    }).catch(error => {
        console.log(error);
    });
    username.value = "";
    password.value = ""; 
    fullname.value = "";
});

signinBtn.addEventListener("click", () => {
    var obj = {
        username: username.value,
        password: password.value
    };

    fetch("/signin", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj),
        redirect: 'follow'
    }).then(response => {
        if (response.status === 200) {
            window.location.replace('../main.html');
        }
        if (response.status === 400) {
            title.innerHTML = "Incorrect username/password,</br>try again";
        }
        if (response.status === 500) {
            title.innerHTML = "User does not exist";
        }
    }).catch (error => {
        console.log(error);
    });       
    username.value = "";
    password.value = ""; 
});

showPass.onclick = function() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
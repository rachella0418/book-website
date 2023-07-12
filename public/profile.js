var username = document.getElementById("username");
var fullname = document.getElementById("name");
var submitUsernameBtn = document.getElementById("submit-username");
var password = document.getElementById("password");
var submitPwBtn = document.getElementById("submit-pw");
var signoutBtn = document.getElementById("signout");
var changePwBtn = document.getElementById("change-pw");
var changeUsernameBtn = document.getElementById("change-username");
var cancelUsernameBtn = document.getElementById("cancel-username");
var cancelPwBtn = document.getElementById("cancel-pw");
var currPassword;


// GET USER
fetch("/user", {
    method: "GET",
    headers: { "Content-type": "application/json" },
}).then(response => {
    return response.json();
}).then(data => {
    fullname.value = data.user.name;
    username.value = data.user.username;
    currPassword = data.user.password;
    var temp = '.'.repeat(data.user.pwLength);
    password.value = temp;
})

// CHANGE USERNAME BUTTON
changeUsernameBtn.addEventListener("click", () => {
    username.style.pointerEvents = "all";
    username.style.border = "3px solid";
    submitUsernameBtn.style.visibility = "visible";
    cancelUsernameBtn.style.visibility = "visible";
})

// SUBMIT NEW USERNAME
submitUsernameBtn.addEventListener("click", () => {
    var obj = {
        newUsername: username.value,
    };

    fetch("/update", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status === 200) {
            disableChangingUsername();
            console.log("username changed");
        }
        else if (response.status === 400) {
            console.log("username existed, try again");
        }
    }).catch(error => {
        console.log("error");
    })
})

// CANCEL CHANGING USERNAME
cancelUsernameBtn.addEventListener("click", () => {
    disableChangingUsername();
})

function disableChangingUsername() {
    username.style.pointerEvents = "none";
    username.style.border = "none";
    submitUsernameBtn.style.visibility = "hidden";
    cancelUsernameBtn.style.visibility = "hidden";
}

// CHANGE PASSWORD BUTTON
changePwBtn.addEventListener("click", () => {
    password.style.pointerEvents = "all";
    password.style.border = "3px solid";
    submitPwBtn.style.visibility = "visible";
    cancelPwBtn.style.visibility = "visible";
})

// CANCEL CHANGING PASSWORD
cancelPwBtn.addEventListener("click", () => {
    password.style.pointerEvents = "none";
    password.style.border = "none";
    submitPwBtn.style.visibility = "hidden";
    cancelPwBtn.style.visibility = "hidden";
})

// SIGN OUT
signoutBtn.addEventListener("click", () => {
    
})
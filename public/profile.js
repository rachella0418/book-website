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
var currUsername;

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
    currUsername = data.user.username;
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
submitUsernameBtn.onclick = function() {
    var obj = {
        currentPassword: "",
        newPassword: "",
        newUsername: username.value,
        newAvatar: "",
    };
    fetch("/update", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status === 200) {
            disableEditMode(username, submitUsernameBtn, cancelUsernameBtn);
            console.log("username changed");
        } else if (response.status === 400) {
            console.log("username already existed");
        }
    }).catch(error => {
        console.log("error");
    })
}

// CANCEL CHANGING USERNAME
cancelUsernameBtn.addEventListener("click", () => {
    disableEditMode(username, submitUsernameBtn, cancelUsernameBtn);
})

// CHANGE PASSWORD BUTTON
changePwBtn.addEventListener("click", () => {
    password.style.pointerEvents = "all";
    password.style.border = "3px solid";
    submitPwBtn.style.visibility = "visible";
    cancelPwBtn.style.visibility = "visible";
})

// SUBMIT NEW PASSWORD
submitPwBtn.onclick = function() {
    var obj = {
        currentPassword: currPassword,
        newPassword: password.value,
        newUsername: "",
        newAvatar: "",
    };
    fetch("/update", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status === 200) {
            disableEditMode(password, submitPwBtn, cancelPwBtn);
            console.log("password changed");
        }
    }).catch(error => {
        console.log("error");
    })
}
/*submitPwBtn.addEventListener("click", () => {
    var obj = {
        currentPassword: currPassword,
        newPassword: password.value,
        newUsername: "",
        newAvatar: "",
    };
    fetch("/update", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status === 200) {
            disableEditMode(password, submitPwBtn, cancelPwBtn);
            console.log("password changed");
        }
    }).catch(error => {
        console.log("error");
    })
})*/

// CANCEL CHANGING PASSWORD
cancelPwBtn.addEventListener("click", () => {
    disableEditMode(password, submitPwBtn, cancelPwBtn);
})

function disableEditMode(variable, submit, cancel) {
    variable.style.pointerEvents = "none";
    variable.style.border = "none";
    submit.style.visibility = "hidden";
    cancel.style.visibility = "hidden";
}

// SIGN OUT
signoutBtn.addEventListener("click", () => {
    
})
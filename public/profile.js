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


fetch("/user", {
    method: "GET",
    headers: { "Content-type": "application/json" },
}).then(response => {
    return response.json();
}).then(data => {
    console.log(data.user);
    fullname.value = data.user.name;
    username.value = data.user.username;
    var temp = '.'.repeat(data.user.pwLength);
    password.value = temp;
})

changeUsernameBtn.addEventListener("click", () => {
    username.style.pointerEvents = "all";
    username.style.border = "3px solid";
    submitUsernameBtn.style.visibility = "visible";
    cancelUsernameBtn.style.visibility = "visible";
})

cancelUsernameBtn.addEventListener("click", () => {
    username.style.pointerEvents = "none";
    username.style.border = "none";
    submitUsernameBtn.style.visibility = "hidden";
    cancelUsernameBtn.style.visibility = "hidden";
})

changePwBtn.addEventListener("click", () => {
    password.style.pointerEvents = "all";
    password.style.border = "3px solid";
    submitPwBtn.style.visibility = "visible";
    cancelPwBtn.style.visibility = "visible";
})

cancelPwBtn.addEventListener("click", () => {
    password.style.pointerEvents = "none";
    password.style.border = "none";
    submitPwBtn.style.visibility = "hidden";
    cancelPwBtn.style.visibility = "hidden";
})

signoutBtn.addEventListener("click", () => {
    
})
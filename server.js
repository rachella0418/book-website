let title = document.getElementById("title");
let email = document.getElementById("email");
let signupBtn = document.getElementById("signup-btn");
let signinBtn = document.getElementById("signin-btn");
let question = document.getElementById("question");
let showPass = document.getElementById("showPass");

var flag = true;

signinBtn.onclick = function() {
    if (flag) {
        title.innerHTML = "Sign in"
        email.style.maxHeight = "0";
        signupBtn.innerHTML = "Sign in";
        question.innerHTML = "Don't have an account?"
        signinBtn.innerHTML = "Sign up";
        flag = false;
    } else {
        title.innerHTML = "Sign up"
        email.style.maxHeight = "60px";
        signupBtn.innerHTML = "Sign up";
        question.innerHTML = "Already have an account?"
        signinBtn.innerHTML = "Sign in";
        flag = true;
    }
    
}

signupBtn.onclick = function() {
    email.style.maxHeight = "60px";
}

showPass.onclick = function() {
    var input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

let darkMode = document.getElementById("dark-mode");

darkMode.onclick = function() {
    document.getElementsByTagName("body").style.backgroundColor = white;
}

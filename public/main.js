var username = "";
// GET USER
fetch("/user", {
    method: "GET",
    headers: { "Content-type": "application/json" },
}).then(response => {
    return response.json();
}).then(data => {
    username = data.user.username;
})

function addToLib(x) {
    var obj = {
        username: username,
        id: x.className,
        library: x.value  
    };
    fetch('/addToLib', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }) 
}
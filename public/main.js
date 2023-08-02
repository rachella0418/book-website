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

function openPage(x) {
    console.log(x);
    var title, author, cover, summary;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes/";
    var placeholder = './pictures/coverexample.jpg';
    document.getElementById("search-res").style.display = "none";
    var outputList = document.getElementById("list-output");
    outputList.innerHTML = "";
    //document.body.style.backgroundImage - "url('')";
    $.ajax( {
        url: url + x,
        dataType: "json",
        success: function(res) {
            console.log(res);
            title = res.volumeInfo.title;
            author = res.volumeInfo.authors;
            cover = (res.volumeInfo.imageLinks) ? res.volumeInfo.imageLinks.thumbnail : placeholder;
            summary = res.volumeInfo.description;
            summary = summary.replace("<p><b>", "");            
            outputList.innerHTML += formatOutput(x, title, author, cover, summary);
        }
    });

    function formatOutput(id, title, author, cover, summary) {
        var card = `<section id="field">
                        <div id="book-field">
                            <div id="cover-div">
                                <img id="cover-pic" src=${cover}>
                            </div>
                            <div id="book-info">
                                <div id="info-div">
                                    <h1 class="title">${title}</h1>
                                    <h2 class="author">${author}</h2>
                                    <p class="summary">${summary}</p>
                                    <label class="rating-label" for="rating-dropdown">Rating:</label>
                                    <select id="rating-dropdown" class="${id}">
                                        <option value="Select">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <label class="lib-label" for="library-dropdown">Add to:</label>
                                    <select id="library-dropdown" class="${id}" onchange="addToLib(this)">
                                        <option value="Library">Library</option>
                                        <option value="Read">Read</option>
                                        <option value="Currently Reading">Currently Reading</option>
                                        <option value="To Be Read">To Be Read</option>
                                    </select>
                                    <div id="write-review-div">
                                        <button id="write-review-btn">Write a review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>`
        return card;
    }
}






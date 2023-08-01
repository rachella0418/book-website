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
    var title, author, cover;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes/";
    var placeholder = './pictures/coverexample.jpg';
    document.getElementById("search-res").style.display = "none";
    var outputList = document.getElementById("list-output");
    outputList.innerHTML = "";
    //document.body.style.backgroundImage - "url('')";
    $.ajax( {
        url: url + x.className,
        dataType: "json",
        success: function(res) {
            console.log("BOOKINFO");
            console.log(res);
            title = res.volumeInfo.title;
            author = res.volumeInfo.authors;
            cover = (res.volumeInfo.imageLinks) ? res.volumeInfo.imageLinks.thumbnail : placeholder;
            outputList.innerHTML += formatOutput(title, author, cover);
        }
    });

    function formatOutput(title, author, cover) {
        var card = `<section id="field">
                        <div id="book-field">
                            <div id="cover-div">
                                <img id="cover-pic" src="${cover}">
                            </div>
                            <div id="book-info">
                                <div id="info-div">
                                    <h1 class="title">${title}</h1>
                                    <h2 class="author">${author}</h2>
                                    <p class="summary">Ox was twelve when his daddy taught him a very valuable lesson. He said that Ox wasnt worth anything and people would never understand him. Then he left.
                                        Ox was sixteen when he met the boy on the road, the boy who talked and talked and talked. Ox found out later the boy hadnt spoken in almost two years before that day, and that the boy belonged to a family who had moved into the house at the end of the lane.
                                        Ox was seventeen when he found out the boys secret, and it painted the world around him in colours of red and orange and violet.
                                    </p>
                                    <label class="rating-label" for="rating">Rating:</label>
                                    <select id="rating" class="dropdown">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="divider"></div>
                    </section>`
        return card;
    }
}






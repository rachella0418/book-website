// GET USER
fetch("/user", {
    method: "GET",
    headers: { "Content-type": "application/json" },
}).then(response => {
    return response.json();
}).then(data => {
    var obj = {
        username: data.user.username
    }
    // GET BOOKS IN LIBRARIES
    fetch("/getBooksInLib", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        // POPULATE SHELVES
        var currentlyReading = [];
        var toBeRead = [];
        var read = [];
        var j = 0, k = 0, l = 0;
        for (var i = 0; i < data.rating.length; i++) {
            if (data.rating[i].library == "Currently Reading") {
                currentlyReading[j] = data.rating[i].bookid;
                j++;
            } else if (data.rating[i].library == "To Be Read") {
                toBeRead[k] = data.rating[i].bookid;
                k++;
            } else {
                read[l] = data.rating[i].bookid;
                l++;
            }
        }
        var shelfid, shelf;
        for (var i = 0; i < 6; i++) {
            if (i < currentlyReading.length) {
                shelfid="currently-reading-shelf";
                shelf = "currentlyReadingShelf";
                addToShelf(currentlyReading[i], shelf, shelfid);
            }
            if (i < toBeRead.length) {
                shelfid="to-be-read-shelf";
                shelf = "toBeReadShelf";
                addToShelf(toBeRead[i], shelf, shelfid);
            }
            if (i < read.length) {
                shelfid="read-shelf";
                shelf = "readShelf";
                addToShelf(read[i], shelf, shelfid);
            }
        }
    }) 
})

function addToShelf(bookid, shelf, shelfid) {
    var placeholder = './pictures/coverexample.jpg';
    var url = "https://www.googleapis.com/books/v1/volumes/";
    var shelf = document.getElementById(shelfid);
    $.ajax( {
        url: url + bookid,
        dataType: "json",
        success: function(res) {
            cover = (res.volumeInfo.imageLinks) ? res.volumeInfo.imageLinks.thumbnail : placeholder;
            shelf.innerHTML += formatOutput(res.id, res.volumeInfo.title, cover);
        }
    });
}

function formatOutput(bookid, title, cover) {
    var card = `<div class="book">
                    <img id="book-cover" class="${bookid}" onclick="openPage(this.className)" src=${cover}>
                    <figcaption ID="book-title">${title}</figcaption>
                </div>`
    return card;
}
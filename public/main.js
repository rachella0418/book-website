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

// ADD BOOK TO LIBRARY
function addToLib(x) {
    var obj = {
        username: username,
        bookid: x.className,
        library: x.value  
    };
    fetch('/addToLib', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status == 200) {
            console.log("Book added to library successfully");
        } else {
            console.log("Error adding book to library");
        }
    }) 
}

// GET LIBRARY AND UPDATE VALUE FOR LIBRARY DROPDOWN
function getLibrary(bookid, elemid) {
    var obj = {
        username: username,
        bookid: bookid
    };
    fetch('/getLibrary', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.library != null && data.library.library != null) {
            document.getElementById(elemid).value = data.library.library;
        }
    })
}

// RATE A BOOK
function rateBook(x) {
    var obj = {
        username: username,
        bookid: x.className,
        rating: x.value
    };
    fetch('/setRating', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        if (response.status == 200) {
            console.log("Rating added successfully");
        } else {
            console.log("Error adding rating");
        }
    })
}

// GET RATING OF A BOOK AND UPDATE RATING DROPDOWN VALUE
function getRating(bookid, elemid) {
    var obj = {
        username: username,
        bookid: bookid,
    };
    fetch('/getRating', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.rating != null && data.rating.rating != null) {
            //console.log(document.getElementsByClassName(bookid).value);
            //document.getElementsByClassName(bookid).value = data.rating.rating;
            document.getElementById(elemid).value = data.rating.rating;
        }
    })
}

// OPEN AND DISPLAY REVIEW PAGE
function openPage(x) {
    if (window.location.pathname === "/mylib.html") {
        $('#libraries-field').css("display", "none");
    } else if (window.location.pathname === "/main.html") {
        $('mylib-field').css("display", "none");
    }
    console.log(x);
    var title, author, cover, summary;
    var url = "https://www.googleapis.com/books/v1/volumes/";
    var placeholder = './pictures/coverexample.jpg';
    document.getElementById("search-res").style.display = "none";
    var outputList = document.getElementById("list-output");
    outputList.style.visibility = "visible";
    outputList.innerHTML = "";
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
            var obj = {
                bookid: x
            }
            fetch('/getAllReviews', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)
            }).then(response => {
                return response.json();
            }).then(data => {
                for (var i = 0; i < data.review.length; i++) {
                    outputList.innerHTML += formatReview(data.review[i].username, data.review[i].bookid, data.review[i].rating, data.review[i].content, data.review[i].upvotes);
                }
                console.log(data);
            })
        
        }
    });
    // FORMAT BOOK INFORMATION SECTION
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
                                    <select id="rating-dropdown" class="${id}" onchange="rateBook(this)">
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
                                        <button id="write-review-btn" onclick="showReviewWindow()">Write a review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="popup-background">
                        <div id="popup-window">
                            <button id="close-review-btn" onclick="closeReviewWindow()"><i class="fa-solid fa-xmark"></i></button>
                            <h1 id="popup-message">Write a review</h1>
                            <div id="dropdowns">
                                <label class="rating-label" for="rating-dropdown">Rating:</label>
                                <select id="rating-dropdown2" class="${id}" onchange="rateBook(this)">
                                    <option value="Select">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <label class="lib-label" for="library-dropdown">Add to:</label>
                                <select id="library-dropdown2" class="${id}" onchange="addToLib(this)">
                                    <option value="Library">Library</option>
                                    <option value="Read">Read</option>
                                    <option value="Currently Reading">Currently Reading</option>
                                    <option value="To Be Read">To Be Read</option>
                                </select>
                            </div>
                            <div id="new-review">
                                <label for="review-box">What did you think?</label>
                                <textarea id="review-box" cols="83" rows="10" placeholder="write your review"></textarea>
                            </div>
                            <button id="submit-btn" class="${id}" onclick="submitReview(this)">Submit</button>
                        </div>
                        <div id="divider"></div>
                    </section>`
        getLibrary(id, "library-dropdown");
        getRating(id, "rating-dropdown");
        getLibrary(id, "library-dropdown2");
        getRating(id, "rating-dropdown2");
        return card;
    }
}

// SUBMIT A REVIEW
function submitReview(x) {
    obj = {
        username: username,
        bookid: x.className,
        content: document.getElementById("review-box").value
    }
    fetch("/review", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status == 200) {
            closeReviewWindow();
            return response.json();
        } else {
            console.log(response.status);
        }
    }).then (data => {
        var outputList = document.getElementById("list-output");
        outputList.innerHTML += formatReview(data.review.username, data.review.bookid, data.review.rating, data.review.content, data.review.upvotes);
    })
} 

// FORMAT THE REVIEW SECTION
function formatReview(username, bookid, rating, content, upvotes) {
    var rating;
    var obj = {
        username: username,
        bookid: bookid,
    };
    fetch('/getRating', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => {
        return response.json();
    }).then(data => {
        rating = data.rating.rating;
    })
    var card2 = `<div id="review-field">
                    <div class="same-line">
                        <span class="username">${username}</span>
                        <label for="book-rating">Rating:</label>
                        <input class="book-rating" value="${rating} stars">
                        <label for="upvote">Upvotes:</label>
                        <input id="upvote" class="upvote ${username}" value="${upvotes}">
                    </div>
                    
                    <span class="content">${content}</span>
                    <div id="btn-div">
                        <button id="upvote-btn" class="${username} ${bookid}" onclick="addUpvote(this)">Upvote</button>
                        <button id="reply-btn">Reply</button>
                    </div>
                </div>`
    return card2
}

function addUpvote(x) {
    const arr = x.className.split(" ");
    console.log(arr[0]);
    var obj = {
        username: arr[0],
        bookid: arr[1],
    }
    fetch('/addUpvote', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then (response => {
        if (response.status == 200) {
            openPage(obj.bookid);
        }
    })
}

function showReviewWindow() {
    $("#popup-background").css("display", "inline");
}

function closeReviewWindow() {
    $("#popup-background").css("display", "none");
}






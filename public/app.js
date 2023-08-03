$(document).ready(function() {
    // DARK MODE
    var logo = document.getElementById("logo");
    var currentMode;
    if (localStorage.getItem("mode")) {
        currentMode = localStorage.getItem("mode");
    } else {
        currentMode = "light";
    }
    localStorage.setItem("mode", currentMode);
    if (localStorage.getItem("mode") == "dark") {
        $("body").addClass("dark");
        $("#dark-btn").css("display", "none");
        $("#light-btn").css("display", "inline");
        logo.src = "pictures/inline.png";
    }
    $("#dark-btn").on("click", function() {
        $("#dark-btn").css("display", "none");
        $("#light-btn").css("display", "inline");
        $("body").addClass("dark");
        logo.src = "pictures/inline.png";
        localStorage.setItem("mode", "dark");
    })
    $("#light-btn").on("click", function() {
        $("#light-btn").css("display", "none");
        $("#dark-btn").css("display", "inline");
        $("body").removeClass("dark");
        logo.src = "pictures/inline-black.png";
        localStorage.setItem("mode", "light");
    })
    
    //NAVIGATE TO DIFFERENT PAGE 
    let currentPage = "home";
    $("#home-btn, #logo").click(function() {
        currentPage = "home";
        window.location.replace("./main.html");
    });
    $("#mylib-btn").click(function() {
        currentPage = "mylib";
        window.location.replace("./mylib.html");
    });
    $("#profile-btn").click(function() { 
        currentPage = "profile";
        window.location.replace("./profile.html");
    });


    // SEARCH FEATURE
    var item, title, author, cover;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var placeholder = './pictures/coverexample.jpg';
    var searchData;

    $(".search").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#search-btn").click();
        }
    });

    $("#search-btn").click(function() {
        search();
    });

    
    function search() {
        if (window.location.pathname === "/main.html") {
            $("#mylib-field").css("visibility", "hidden");
            $("#topread-field").css("visibility", "hidden");
        } else if (window.location.pathname === "/profile.html") {
            $('#profile-field').css("visibility", "hidden");
        }
        $(".book-list").css("visibility", "visible");
        $("#search-message").css("visibility", "hidden");
        outputList.innerHTML = "";
        //document.body.style.backgroundImage - "url('')";
        searchData = $(".search").val();
        console.log(searchData);
        if (searchData === null || searchData === "") {
            document.getElementById("search-message").innerHTML = "We couldn't find what you were looking for :(";
            $("#search-message").css("visibility", "visible");
        } else {
            $.ajax( {
                url: url + searchData,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    if (res.totalItems === 0) {
                        document.getElementById("search-message").innerHTML = "We couldn't find what you were looking for :(";
                        $("#search-message").css("visibility", "visible");
                    } else {
                        $(".book-list").css("visibility", "visible");
                        
                        displayResults(res);
                    }
                },
                error: function() {
                    document.getElementById("search-message").innerHTML = "Something went wrong. Please try again :(";
                    $("#search-message").css("visibility", "visible");
                }
            });
        }
        $(".search").val("");
    }

    function displayResults(res) {
        for (var i = 0; i < res.items.length; i += 3) {
            var row = '<div id="row">'
            item1 = res.items[i];
            title1 = item1.volumeInfo.title;
            author1 = item1.volumeInfo.authors;
            cover1 = (item1.volumeInfo.imageLinks) ? item1.volumeInfo.imageLinks.thumbnail : placeholder;
            row += formatOutput(cover1, title1, author1, item1.id);
            if (res.items[i + 1] != null) {
                item2 = res.items[i+1];
                title2 = item2.volumeInfo.title;
                author2 = item2.volumeInfo.authors;
                cover2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeholder;
                row += formatOutput(cover2, title2, author2, item2.id);
            }
            
            if (res.items[i + 2] != null) {
                item3 = res.items[i+2];
                title3 = item3.volumeInfo.title;
                author3 = item3.volumeInfo.authors;
                cover3 = (item3.volumeInfo.imageLinks) ? item3.volumeInfo.imageLinks.thumbnail : placeholder;
                row += formatOutput(cover3, title3, author3, item3.id);
            }

            row += '</div>';
            outputList.innerHTML += row;
            console.log(outputList);
        }
    }

    function formatOutput(cover, title, author, id) {
        var card = `<div id="col">
                        <img id="book-cover" class="${id}" src="${cover}" onclick="openPage(this.className)" >
                        <div id="book-about">
                            <span id="book-title" class="${id}" onclick="openPage(this.className)">${title}</span>
                            <span id="book-author" class="${id}" onclick="openPage(this.className)">${author}</span>
                            <select onchange="addToLib(this)" id="add-option" class="${id}">
                                <option value="Select">Library</option>
                                <option value="Read">Read</option>
                                <option value="Currently Reading">Currently Reading</option>
                                <option value="To Be Read">To Be Read</option>
                            </select>
                            <select onchange="rateBook(this)" id="add-option" class="${id}">
                                <option value="Select">Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>  
                    </div>`
        return card;
    }

    




});





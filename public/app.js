$(document).ready(function() {
    var item, title, author, cover;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var placeholder = '../pictures/coverexample.jpg';
    var searchData;

    $("#search-btn").click(function() {
        $("#mylib-field").css("visibility", "hidden");
        $("#topread-field").css("visibility", "hidden");
        $(".book-list").css("visibility", "visible");
        $("#search-message").css("visibility", "hidden");
        $(".book-list").css("margin-top", "0");
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
    });

    function displayResults(res) {
        for (var i = 0; i < res.items.length; i += 4) {
            var row = '<div id="row">'
            item1 = res.items[i];
            title1 = item1.volumeInfo.title;
            author1 = item1.volumeInfo.authors;
            cover1 = (item1.volumeInfo.imageLinks) ? item1.volumeInfo.imageLinks.thumbnail : placeholder;
            row += formatOutput(cover1, title1, author1);
            if (res.items[i + 1] != null) {
                item2 = res.items[i+1];
                title2 = item2.volumeInfo.title;
                author2 = item2.volumeInfo.authors;
                cover2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeholder;
                row += formatOutput(cover2, title2, author2);
            }
            
            if (res.items[i + 2] != null) {
                item3 = res.items[i+2];
                title3 = item3.volumeInfo.title;
                author3 = item3.volumeInfo.authors;
                cover3 = (item3.volumeInfo.imageLinks) ? item3.volumeInfo.imageLinks.thumbnail : placeholder;
                row += formatOutput(cover3, title3, author3);

            }
            
            if (res.items[i + 3] != null) {
                item4 = res.items[i+3];
                title4 = item4.volumeInfo.title;
                author4 = item4.volumeInfo.authors;
                cover4 = (item4.volumeInfo.imageLinks) ? item4.volumeInfo.imageLinks.thumbnail : placeholder;
                row += formatOutput(cover4, title4, author4);
            }
            
            row += '</div>';
            outputList.innerHTML += row;
            /*item5 = res.items[i+4];
            title5 = item5.volumeInfo.title;
            author5 = item5.volumeInfo.authors;
            cover5 = (item5.volumeInfo.imageLinks) ? item5.volumeInfo.imageLinks.thumbnail : placeholder;*/
            /*outputList.innerHTML += '<div id="row">' +
                                    formatOutput(cover1, title1, author1) +
                                    formatOutput(cover2, title2, author2) +
                                    formatOutput(cover3, title3, author3) +
                                    formatOutput(cover4, title4, author4) +
                                    '</div>';*/
            console.log(outputList);
        }
    }

    function formatOutput(cover, title, author) {
        var card = `<div id="col">
                        <img class="book-cover" src="${cover}">
                        <div id="book-about">
                            <span class="book-title">${title}</span>
                            <span class="book-author">${author}</span>
                        </div>  
                    </div>`
        return card;
    }
});




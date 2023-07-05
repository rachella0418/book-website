$(document).ready(function() {
    var item, title, author, cover;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "";
    var placeholder = '<img src="../pictures/coverexample.jpg">';
    var searchData;

    $("#search-btn").click(function() {
        $("#mylib-field").css("visibility", "hidden");
        $("#topread-field").css("visibility", "hidden");
        $(".book-list").css("visibility", "visible");
        outputList.innerHTML = "";
        //document.body.style.backgroundImage - "url('')";
        searchData = $(".search").val();
        console.log(searchData);
        if (searchData === null || searchData === "") {
            $("#search-res").innerHTML += "No result";
        } else {
            $.ajax( {
                url: url + searchData,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    if (res.totalItems === 0) {
                        $("#search-res").innerHTML += "No result";
                    } else {
                        $(".book-list").css("visibility", "visible");
                        displayResults(res);
                    }
                },
                error: function() {
                    $("#search-res").innerHTML += "Something went wrong.. Please try again";
                }
            });
        }
        $(".search").val("");
    });
    
});




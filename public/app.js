$(document).ready(function() {
    var item, title, author, cover;
    var outputList = document.getElementById("list-output");
    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "key=AIzaSyDKrjcPwfvHCVYKnQqRo4eBjd356wmlZAA";
    var placeholder = '<img src="../pictures/coverexample.jpg">';
    var searchData;

    $("#search-btn").click(function() {
        outputList.innerHTML = "";
        //document.body.style.backgroundImage - "url('')";
        searchData = $(".search").val();
        if (searchData === null || searchData === "") {
            alert("Please enter a book title");
        } else {
            $.ajax( {
                url: url + searchData,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    if (res.totalItems === 0) {
                        alert("No result");
                    } else {
                        $("#mylib-field").css("visibility", "hidden");
                        $("#topread-field").css("visibility", "hidden");
                        displayResults(res);
                    }
                }
            })
        }
    })
});




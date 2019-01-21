$(document).ready(function () {

    // Initial array of cities
    var cartoons = ["The Simpsons", "Bob's Burgers", "The Rugrats", "The Bugs Bunny Show", "Charlie Brown", "The Powerpuff Girls", "Johnny Bravo",
        "Dexter's Laborator", "Looney Tunes", "Ren and Stimpy", "Justice League","SpongeBob SquarePants", "The Snorks", "The Smurfs", "Scooby-Doo", "Inspector Gadget", 
        "The Flinstones", "The Tom and Jerry Show","Family Guy"]
    
        function renderButtons() {

            //Deleting the cities prior to adding new cities
            //(this is necessary otherwise you will have repeat buttons)
            $("#buttons-view").empty();
    
            //     // Looping through the array of cities
            for (var i = 0; i < cartoons.length; i++) {
    
                // Then dynamicaly generating buttons for each city in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of city-btn to our button
                a.addClass("cartoon-btn");
                // Adding a data-attribute
                a.attr("data-name", cartoons[i]);
                // Providing the initial button text
                a.text(cartoons[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }
        renderButtons()
    
        // //This function handles events where a city button is clicked
        $("#add-cartoon").on("click", function (event) {
            event.preventDefault();
        //     // This line grabs the input from the textbox
            var cartoon = $("#cartoon-input").val().trim();
    
        //     // Adding city from the textbox to our array
            cartoons.push(cartoon);
            renderButtons()
            console.log("city")
    
            $(".cartoon-btn").on("click", function (event) {
                $("#cartoon-view").empty();
                var city = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=JMZ8KfJzhZWbdprATa1oBMjhntYXGJLK&limit=10&rating=G&lang=en"
                //     // // Creating an AJAX call for the specific city button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    response.data.forEach(element => {
                        var gifWrapper = $("<div class='gif-wrapper'>");
                        var gifImg = $("<img height= '200' width= '200'>");
                        gifImg.addClass("gif")
                        gifImg.attr("src", element.images.fixed_height_still.url);
                        gifImg.attr("data-state", "still")
                        gifImg.attr("data-still", element.images.fixed_height_still.url)
                        gifImg.attr("data-animate", element.images.fixed_height.url)
                        // string interpolation: 
                        // Prepend to new wrapper first and then add wrapper to #cities-view
                        $(gifWrapper).prepend(`<p>Rating: ${element.rating.toUpperCase()}</p>`);
                        $(gifWrapper).prepend(gifImg);
                        $("#cartoon-view").prepend(gifWrapper);  
                    });
                    console.log(response);
        
                });
            })
        })
        $(".cartoon-btn").on("click", function (event) {
            $("#cartoon-view").empty();
            var city = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=JMZ8KfJzhZWbdprATa1oBMjhntYXGJLK&limit=10&rating=G&lang=en"
            //     // // Creating an AJAX call for the specific city button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                response.data.forEach(element => {
                    var gifWrapper = $("<div class='gif-wrapper'>");
                    var gifImg = $("<img height= '200' width= '200'>");
                    gifImg.addClass("gif")
                    gifImg.attr("src", element.images.fixed_height_still.url);
                    gifImg.attr("data-state", "still")
                    gifImg.attr("data-still", element.images.fixed_height_still.url)
                    gifImg.attr("data-animate", element.images.original.url)
                    // string interpolation: 
                    // Prepend to new wrapper first and then add wrapper to #cities-view
                    $(gifWrapper).prepend(`<p>Rating: ${element.rating.toUpperCase()}</p>`);
                    $(gifWrapper).prepend(gifImg);
                    $("#cartoon-view").prepend(gifWrapper);  
                });
                console.log(response)
            });
    
            //making the click on the gif animate and still on clicks 
            $(document).on("click", ".gif", function () {
                    //The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                    //If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    //Then, set the image's data-state to animate
                    //Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                console.log("gif clicked")
            });
        });
    })
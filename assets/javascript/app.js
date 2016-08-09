//Array which contains the initial set of topics
var topics = ["Mario","Overwatch","Pokemon","Destiny", "No Mans Sky", "Kingdom Hearts", "Skyrim", "Street Fighter", "Battlefield","Halo","Final Fantasy XV"];






//Function which uses AJAX to get gifs using GIPHY API.
function displayGIFs (){
	$('#gifsReturned').empty();
	var keyword = $(this).attr('data-name');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url:queryURL, 
		data: {
			limit: 10,

		},
		method: 'GET'

	})


//Gets the GIFs and sets their width to still and sets their initial state to still
.done(function(response) {
	var results = response.data;
	for (var i = 0; i < results.length; i++) {

		var gifDiv = $('<div class="gif">');
		var gifRating = results[i].rating;
		var p = $('<p>').text( "Rating: " + gifRating);
		var image = $('<img>');
		image.attr('id', 'anyImage');
		image.attr('data-still', results[i].images.fixed_width.url);
		image.attr('data-animate', results[i].images.fixed_width.url);
		image.attr('data-state', 'animate');
		image.attr('src', results[i].images.fixed_width_still.url);
		image.on('click',onClick);
		gifDiv.append(p);
		gifDiv.append(image);

		$('#gifsReturned').prepend(gifDiv);
	};


});

return false;
}





//Creates buttons using a for loop that goes through each element in array. Also appends the buttons.
function createButtons(){ 
	$('#games').empty();
	for (var i = 0; i < topics.length; i++){
		var b = $('<button>'); 
		b.addClass('gif' + i);
		b.attr('data-name', topics[i]);
		b.text(topics[i]);
		$('#games').append(b);
	};
};

//Creates on click event whenever the submit button is pressed. Keyword retrieves the input and topic.push, pushes the info into the array Topics.
$('#addGame').on('click', function(){
	keyword = $("#gameInput").val().trim();

	topics.push(keyword);
	createButtons();
	$("#gameInput").val('');

	return false;
});


//OnClick event which uses If/Then to switch the state of the gif from animated to still and vice versa.
function onClick(){
	state = $(this).attr('data-state');
	if (state === 'still') {
		var animateUrl = $(this).attr('data-animate');
		$(this).attr('src', animateUrl);
		$(this).attr('data-state', 'animate');
	} else {
		var stillUrl = $(this).attr('data-still');
		$(this).attr('src', stillUrl);
		$(this).attr('data-state', 'still');
	};
};


$(document).on('click', 'button', displayGIFs);
createButtons();

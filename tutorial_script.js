var key = "m7tWg2QAYXCGOtEEhSxvfQ";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var parseString = require('xml2js').parseString;
var promise = require('promise');

var authors = ["jrr+tolkien","jk+rowling","george+orwell"];

var getAuthorID = function(err,result) {
	var results = result.GoodreadsResponse.search[0].results[0];
	var author = results.work[0].best_book[0].author[0].id[0]._;

	return author
}

var getBooks = function(err, result) {
	var books = result.GoodreadsResponse.author[0].books[0].book

	return books
}

var getAuthorName = function(err, result) {
	return result.GoodreadsResponse.author[0].books[0].name
}

var apiCall = function(author_ids) {
	var result_obj = {};
	var base_api_call = "https://www.goodreads.com/author/list/";
	var key_api_call = "?format=xml&key=" + key;
	var count = 0;

	author_ids.forEach(function(author_id) {
		var request = new XMLHttpRequest();
		request.open("GET",base_api_call + author_id + key_api_call, true);

		request.addEventListener("load", function() {
			if (request.status >= 200 && request.stats < 400) {

				response = request.responseText;

				parseString(response, function(err, result){

					var author_name = arguments[1](err, result);
					result_obj[author_name] = arguments[2](err, result);

					count++;
					if (count > author_ids - 1) finished();
				});

			} else console.log("Couldn't perform search request " + request.statusText);

		});

		request.send(null);
	});

	function finished() {
		console.log(result_obj);
	}
}

/*
var searchRequest = function(queries) {
	var result_set = [];
	var search_call = "https://www.goodreads.com/search.xml?key=" + key
	var count = 0

	queries.forEach(function(query) {
		var request = new XMLHttpRequest();
		request.open("GET", search_call + "&q=" + query, true);

		request.addEventListener("load", function() {
			if (request.status >= 200 && request.status < 400) {

				response = request.responseText;
				parseString(response, function(err, result) {

					result_set.push(arguments[1](err, result));

					count++;
					if (count > queries.length - 1) finished();

				});


			} else console.log("Couldn't perform search request " + request.statusText);

		});

		request.send(null);

	});

	function finished() {
		return(result_set);
	}
}
*/

apiCall(['3706', '1077326', '656983']);


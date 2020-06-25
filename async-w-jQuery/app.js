/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const firstResponse = document.querySelector('#response-one');
    const secondResponse = document.querySelector('#response-two');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        firstResponse.innerHTML = '';
        secondResponse.innerHTML = '';
        searchedForText = searchField.value;

		$.ajax({
		    url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
		    headers: {Authorization: 'Client-ID YHLHNpkUV_VMQOIefGCiN6iG59_WwGjAPuCYwkxWMfg'},
		}).done(addImage)
		.fail(function(err) {
			requestError(err, "image");
		});

		$.ajax({
		    url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=MAj20JFyPe3o87VcTyS3Ge73LPU3AI8o`,
		}).done(addArticles)
		.fail(function(err) {
			requestError(err, "articles");
		});
	});


	function addImage(images) {

		if(images && images.results && images.results[0]){
			
			const firstImage = images.results[0];
			firstResponse.innerHTML = `<figure> <img src = "${firstImage.urls.regular}" alt = "${searchedForText}">
						<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`
		}else{
			firstResponse.innerHTML = `<p class = "error-image"> No Images Available </p>`
		}
	}


	function addArticles (data) {

		if(data.response && data.response.docs && data.response.docs.length > 1){ 
			//const article = data.response.docs;
			secondResponse.innerHTML = `<ul>${data.response.docs.map(article =>`<li class = "article"> <h2><a href=${article.web_url}>
				${article.headline.main}</a></h2><p>${article.snippet}</p> </li>`).join("")}</ul>`
			
		}else{
			secondResponse.innerHTML = `<p class = "error-image"> No Articles Available </p>`
		}
	};


	function requestError(e, part) {
		console.log(e);
		responseContainer.innerHTML = `<p "class = network-warning-error">Error Loading</p>`
	}


})();









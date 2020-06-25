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

		fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
			method: 'GET',
		    headers: {
		        Authorization: 'Client-ID YHLHNpkUV_VMQOIefGCiN6iG59_WwGjAPuCYwkxWMfg'
		    }
		}).then(response => response.json())
		.then(addImage)
		.catch(e => requestError(e, 'image'));

		fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=MAj20JFyPe3o87VcTyS3Ge73LPU3AI8o`, {
			method: 'GET',
		    headers: {
		        'Content-Type': 'application/json'
		    }
		}).then(response => response.json())
		.then(addArticles)
		.catch(e => requestError(e, 'articles'));
    });

    function addImage(data){
	const firstImage = data.results[0];
	
	if(firstImage){
		firstResponse.innerHTML = `<figure> <img src = "${firstImage.urls.regular}" alt = "${searchedForText}">
					<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		</figure>`
	}else{
		firstResponse.innerHTML = `<p class = "error-image"> No Images Available </p>`
	}
};

function addArticles (data) {
	const article = data.response.docs;

	if(article && article.length > 1){ 
		secondResponse.innerHTML = `<ul>${article.map(text =>`<li class = "article"> <h2><a href=${text.web_url}>
			${text.headline.main}</a></h2><p>${text.snippet}</p> </li>`).join("")}</ul>`
				
	}else{
		secondResponse.innerHTML = `<p class = "error-image"> No Articles Available </p>`
	}
};

function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning-error">Oh no! There was an error making a request for the ${part}.</p>`);
}

})();













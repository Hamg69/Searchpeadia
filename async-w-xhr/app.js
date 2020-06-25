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

        //const searchedForText = 'hippos';
		const unsplashRequest = new XMLHttpRequest();

		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.onerror = function(err) {requestError(err, "image")};
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID YHLHNpkUV_VMQOIefGCiN6iG59_WwGjAPuCYwkxWMfg');
		unsplashRequest.send();


		const articleRequest = new XMLHttpRequest();
		articleRequest.onload = addArticles;
		articleRequest.onerror = function(err) {requestError(err, "articles")};
		articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=MAj20JFyPe3o87VcTyS3Ge73LPU3AI8o`);
		articleRequest.send();
	});

		function addImage(){
			const data = JSON.parse(this.response);
			if(data && data.results && data.results[0]){
				const firstImage = data.results[0];

				firstResponse.innerHTML = `<figure> <img src = "${firstImage.urls.regular}" alt = "${searchedForText}">
									<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`
			}else{
				firstResponse.innerHTML = `<p class = "error-image"> No Images Available </p>`
			}
		};
		function addArticles () {
			const data = JSON.parse(this.response);
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

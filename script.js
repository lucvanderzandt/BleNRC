var path = document.location.href;
if((path.indexOf("nrc.nl/next/") > -1 || path.indexOf("nrc.nl/nieuws/") > -1 || path.indexOf("nrc.nl/handelsblad/") > -1) && document.referrer !== path && path.indexOf("?noscript") == -1){
    window.stop(); // Stop loading the paywall page
    var pathArray = path.split('/'); // All parts of the URL  
	
    // Obtain URL info
    var urlInfo = pathArray[pathArray.length -1].split(/[\s-]+/);

    // Get the part of the URL containing the article title
    var title = urlInfo.slice(0, -1).join(" ");

	// Search for the article on Blendle using its search function and redirect to it
	var xhr = new XMLHttpRequest();
	var converted_url;
	xhr.open('GET', "http://ws.blendle.com/search?q=" + encodeURI(title), true);
	xhr.send();
	xhr.onreadystatechange = function(e) {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				try{
					var results = JSON.parse(xhr.responseText);
					var href = results._embedded.results["0"]._links.self.href;
					var blendle = confirm("Dit artikel staat op Blendle. Naar Blendle?");
					if(blendle) {
						converted_url = "http://blendle.com/item/" + getParameterByName("item", href);
					} else {
						converted_url = path;
					}
				} catch(err) {
					converted_url = path;
				}
			} else {
				converted_url = path;
			}
			window.location.replace(converted_url);
		}
	}
}

// This function gets parameter values from the url
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

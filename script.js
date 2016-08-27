var path = document.location.href;

if((path.indexOf("nrc.nl/next/") > -1 || path.indexOf("nrc.nl/nieuws/") > -1 || path.indexOf("nrc.nl/handelsblad/") > -1) && document.referrer !== path && path.indexOf("?noscript") == -1){
    var pathArray = path.split('/'); // All parts of the URL  
    var urlInfo = pathArray[pathArray.length -1].split(/[\s-]+/);
    var title = urlInfo.slice(0, -2).join(" ");
	redirect(title);
}

// This method gets parameter values from the url
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if(!results) {
		return null;
    } else if(!results[2]) {
		return '';
	} else {
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
}

// This method searches the corresponding Blendle article and redirects to it if found
function redirect(title) {
	var converted_url = path;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(e) {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				try{	
					var object = JSON.parse(xhr.responseText);
					var results = object._embedded.results;
					for(var i = 0; i < results.length; i++) {
						var head = results[i]._embedded.item._embedded.manifest.body[0].content.toLowerCase();
						var provider = results[i]._embedded.item._embedded.manifest.provider.id;
						if((head.indexOf(title) > -1 || title.indexOf(head) > -1) && (provider == "nrc" || provider == "nn")) {
							var blendle = confirm("Dit artikel staat op Blendle. Naar Blendle?");
							if(blendle) {
								converted_url = "http://blendle.com/item/" + getParameterByName("item", results[i]._links.self.href);
							}
							break;
						}
					}
					if(converted_url !== undefined && path !== converted_url) {
						window.location.replace(converted_url);
					}
				} catch(err) {
					// Do nothing, return initial NRC url
				}
			}
		}
	};
	xhr.open('GET', "http://ws.blendle.com/search?q=" + encodeURI(title), true);
	xhr.send();
	
}
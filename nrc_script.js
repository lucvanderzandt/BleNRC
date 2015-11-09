var path = document.location.href;
if((path.indexOf("nrc.nl/next/") > -1 || path.indexOf("nrc.nl/handelsblad/") > -1) && document.referrer !== path && path.indexOf("?noscript") == -1){
    window.stop(); // Stop loading the paywall page
    
    var pathArray = path.split('/'); // All parts of the URL  
    var site = ""; // The string name of the website
    var siteShort = ""; // The shortened string name of the website

    // Check which website the link goes to
    if(path.indexOf("/next/") > -1){ 
        site = "nrcnext";
        siteShort = "nn";
    }else if(path.indexOf("/handelsblad/") > -1){ 
        site = "nrc-handelsblad";
        siteShort = "nrc";
    }

    // Obtain URL info
    var urlInfo = pathArray[pathArray.length -1].split(/[\s-]+/);

    // Get the part of the URL containing the article title
    var title = urlInfo.slice(0, -1).join("-");

    // Get the part of the URL containing the article ID
    var articleId = urlInfo[urlInfo.length-1];

    // Get month number if month is in letters   
    var month = '01';
    switch(pathArray[pathArray.length - 3]){
        case "januari": month = '01'; break;
        case "februari": month = '02'; break;
        case "maart": month = '03'; break;
        case "april": month = '04'; break;
        case "mei": month = '05'; break;
        case "juni": month = '06'; break;
        case "juli": month = '07'; break;
        case "augustus": month = '08'; break;
        case "september": month = '09'; break;
        case "oktober": month = '10'; break;
        case "november": month = '11'; break;
        case "december": month = '12'; break;
        default: month = pathArray[pathArray.length - 3];
    }

    // Convert the URL to a Blendle URL
    var converted_url = "https://blendle.com/i/" +
                        site + "/" + // The name of the website
                        title + "/" + // The title of the article
                        "bnl" + "-" + siteShort + "-" + // Standard URL part
                        pathArray[pathArray.length - 4] + month + pathArray[pathArray.length - 2] + "-" + // The date of the article
                        articleId;

    // If it has an ID and is from nrcnext or handelsblad (paid/Blendle article), redirect to the Blendle URL
    if(!isNaN(articleId) && isNaN(title) && siteShort != ""){
        window.location.replace(converted_url); // Redirect to the converted URL
    }else{
        window.location.replace(path); // Redirect to NRC URL
    }
}

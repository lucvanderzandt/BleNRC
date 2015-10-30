$(document).on("click", "a", function(){
    var link_target = $(this).attr('href'); 
    var pathArray = link_target.split('/'); // All parts of the URL
    
    var site = ""; // The string name of the website
    var siteShort = ""; // The shortened string name of the website

    // Check which website the link goes to
    if(pathArray[1] == "next"){ 
        site = "nrcnext";
        siteShort = "nn";
    }else{ 
        site = "nrc-handelsblad";
        siteShort = "nrc";
    }

    // Get the part of the URL containing the article title
    var titleRaw = pathArray[5].split(/[\s-]+/); 
    var title = titleRaw.slice(0, -1).join("-");

    // Get the part of the URL containing the article ID
    var articleIdRaw = pathArray[5].split(/[\s-]+/);
    var articleId = articleIdRaw[articleIdRaw.length-1];

    // Convert the URL to a Blendle URL
    var converted_url = "https://blendle.com/i/" +
                        site + "/" + // The name of the website
                        title + "/" + // The title of the article
                        "bnl" + "-" + siteShort + "-" + // Standard URL part
                        pathArray[2] + pathArray[3] + pathArray[4] + "-" + // The date of the article
                        articleId;

    var forbidden = "";
    $.ajax({
        url: converted_url,
        success: 
            function(content){
                forbidden = $("<div />").append( $.parseHTML(content) ).find('pre');
                if(forbidden = null){
                    forbidden = $("<div />").append( $.parseHTML(content) ).find("Hier is niks te vinden.");
                }
            }
    });
    
    // If it has an ID (paid article), redirect to the Blendle URL
    if(!isNaN(articleId) && forbidden != null && isNaN(title)){
        $(this).attr('href', converted_url); // Redirect to the converted URL
    }else{
        this.attr('href', link_target);
    }
});

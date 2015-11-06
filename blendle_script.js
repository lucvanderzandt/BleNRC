// Hide page until checked if valid
document.body.style.display = 'none';

// If 403-page (forbidden), go to normal NRC page with parameter noscript (don't execute nrc_script.js) 
if((document.referrer.indexOf("nrc.nl/handelsblad/") > -1 || document.referrer.indexOf("nrc.nl/next/") > -1) && document.documentElement.outerHTML.indexOf('<pre style="word-wrap: break-word; white-space: pre-wrap;">Forbidden</pre>') > -1){
    window.location.replace(document.referrer + "?noscript");
}else{
    // Show page
    document.body.style.display = 'block';
}

// If 403-status (forbidden), go to normal NRC page with parameter noscript (don't execute nrc_script.js) 
if((document.referrer.indexOf("nrc.nl/handelsblad/") > -1 || document.referrer.indexOf("nrc.nl/next/") > -1) && document.documentElement.outerHTML.indexOf("Forbidden") > -1){
    window.location.replace(document.referrer + "?noscript");
}

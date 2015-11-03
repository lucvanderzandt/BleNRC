// If 403-page (forbidden), go to normal NRC page with parameter noscript (don't execute nrc_script.js) 
if((document.referrer.indexOf("nrc.nl/handelsblad/") > -1 || document.referrer.indexOf("nrc.nl/next/") > -1) && document.documentElement.outerHTML.indexOf('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Forbidden</pre></body></html>') > -1){
    window.location.replace(document.referrer + "?noscript");
}

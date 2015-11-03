if(document.referrer.indexOf("nrc.nl/handelsblad/") > -1 || document.referrer.indexOf("nrc.nl/next/") > -1 && document.documentElement.outerHTML.indexOf("Forbidden") > -1){
    history.back();
}

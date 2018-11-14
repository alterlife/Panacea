function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function( obj, callback ){
        if( !obj || !obj.nodeType === 1 ) return; // validation

        if( MutationObserver ){
        // define a new observer
        var obs = new MutationObserver(function(mutations, observer){
            callback(mutations);
        })
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList:true, subtree:true });
        }
        
        else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

observeDOM(document.querySelector('body'), function(event) { 
    console.log(event[0]);
});

console.log('The youtube script has loaded.');
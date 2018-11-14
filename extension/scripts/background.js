
const hosts = [
  {hostSuffix: 'youtube.com'}
];

function extractHostname(url) {
  var hostname;

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];

  return hostname;
}

chrome.webNavigation.onCompleted.addListener(
  function(e) {
    console.log("you landed on a supported site: " + extractHostname(e.url));
  }, 
  {url: hosts} 
);

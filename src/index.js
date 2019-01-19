// if is production  (livereload!)
if(ENV!="production"){
  document.write(
      '<script src="http://' + (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>'
  );
}
import fetchAttach from '../source/fetch-intercept';
import ajaxAttach from '../source/ajax-intercept';
import "whatwg-fetch"
// const fetchListener = fetchIntercept(window);
// const unregister = fetchListener.register({
//   request: function (url, config) {
//         // Modify the url or config here
//         return [url, config];
//     },
//     requestError: function (error) {
//         // Called when an error occured during another 'request' interceptor call
//         return Promise.reject(error);
//     },
//
//     response: function (response) {
//         // Modify the reponse object
//         console.log(1111);
//         return response;
//     },
//
//     responseError: function (error) {
//         // Handle an fetch error
//         return Promise.reject(error);
//     }
// });
// fetch('http://10.12.72.16:3000/extraInfo',{method:'post'}).then((res)=>{
//
// });
// fetch('http://10.12.72.16:3000/extraInfo',{method:'post'}).then((res)=>{
//
// });



const ajaxListener = ajaxAttach(window);
ajaxListener.register({
  requestError:function(xhr){
    console.log(xhr,111);
  },
  requestAbout:function(xhr){
    console.log(xhr,222);
  },
  requestLoad:function(xhr){
    console.log(xhr,333);
  }
});

var client = new XMLHttpRequest();
client.open("POST", "http://10.12.72.16:3000/extraInfo",false);
client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
client.send(JSON.stringify({x:1}));

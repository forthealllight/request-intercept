/**
 * author jonyyu
 * 328553173@qq.com
 */
let interceptors = [];


let newXMLHttpRequest = function(Request){
  let _XMLHttpRequest = Request;
  return function(){
    const reversedInterceptors = interceptors.reduce((array, interceptor) => [interceptor].concat(array), []);
    let xhr = new _XMLHttpRequest;
    reversedInterceptors.forEach(({
      requestAbout,
      requestError,
      requestLoad,
      requestLoadStart,
      requestLoadEnd,
      requestProgress,
      requestOnreadyStateChange,
      requestTimeout
    })=>{
      if(requestAbout){
        addEvent(xhr,'abount',requestAbout.call(null,xhr));
      }
      if(requestError){
        addEvent(xhr,'error',requestError.call(null,xhr));
      }
      if(requestLoad){
        addEvent(xhr,'load',requestLoad.call(null,xhr));
      }
      if(requestLoadStart){
        addEvent(xhr,'loadstart',requestLoadStart.call(null,xhr));
      }
      if(requestLoadEnd){
        addEvent(xhr,'loadend',requestLoadEnd.call(null,xhr));
      }
      if(requestProgress){
        addEvent(xhr,'loadstart',requestProgress.call(null,xhr));
      }
      if(requestOnreadyStateChange){
        addEvent(xhr,'readystatechange',requestOnreadyStateChange.call(null,xhr));
      }
      if(requestTimeout){
        addEvent(xhr,'timeout',requestTimeout.call(null,xhr));
      }
    });
    return xhr;
  };
};

//IE and DOM event
function addEvent(node,type,handler){
  if (!node) return false;
  if (node.addEventListener) {
      node.addEventListener(type, handler, false);
      return true;
  }
  else if (node.attachEvent) {
      node['e' + type + handler] = handler;
      node[type + handler] = function() {
          node['e' + type + handler](window.event);
      };
      node.attachEvent('on' + type, node[type + handler]);
      return true;
  }
  return false;
}

const ajaxAttach = function (env) {
  env.XMLHttpRequest = newXMLHttpRequest(env.XMLHttpRequest);
  return {
    register: function (interceptor) {
      interceptors.push(interceptor);
      return () => {
        const index = interceptors.indexOf(interceptor);
        if (index >= 0) {
          interceptors.splice(index, 1);
        }
      };
    },
    clear: function () {
      interceptors = [];
    }
  }

}


export default ajaxAttach

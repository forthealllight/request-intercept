# req-interceptor



`req-interceptor` monkey patches the global `fetch` and `ajax（XMLHttpRequest）` method and allows you the usage in Browser, Node.

## Installation

```
npm install req-interceptor --save
```

## Usage


### Fetch intercept

_Note_: You need to require `req-interceptor` before you use `fetch` the first time.

Make sure you have a `fetch` [compatible environment](http://caniuse.com/#search=fetch) or added a [appropriate polyfill](https://github.com/github/fetch).

```js
import { fetchIntercept } from 'req-interceptor';

const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
fetch('http://google.com');

// Unregister your interceptor
unregister();
```
if you want to clear all fetch listener array, you should：
 
    fetchIntercept.clear()
   

## License
MIT

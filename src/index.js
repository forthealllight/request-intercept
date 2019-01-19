import fetchAttach from '../source/fetch-intercept';
import ajaxAttach from '../source/ajax-intercept';

let ajaxIntercept;
let fetchIntercept;
if (typeof(window) === 'undefined') {
    fetchIntercept = fetchAttach(global);
    ajaxIntercept = ajaxAttach(global);
} else {
    fetchIntercept = fetchAttach(window);
    ajaxIntercept = ajaxAttach(window);
}

export {
  fetchIntercept,
  ajaxIntercept
}

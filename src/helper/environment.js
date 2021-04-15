let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = "http://localhost:4001";
        break;
    case 'limitless-thicket-03619.herokuapp.com':
        APIURL = 'https://tlr-my-flix.herokuapp.com'
}

export default APIURL;
let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = "http://localhost:4001";
        break;
    case 'partycentralclient.herokuapp.com':
        APIURL = 'https://partycentralclient.herokuapp.com'
}

export default APIURL;
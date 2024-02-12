const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./xmlJSONResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStatus = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedType = request.headers.accept.split(',');
    const param = query.parse(parsedUrl.query);

    if (urlStatus[parsedUrl.pathname]) {
        urlStatus[parsedUrl.pathname](request, response, acceptedType, param);
    } else {
        urlStatus.notFound(request, response, acceptedType, param);
    }

    console.dir(request.method);
    console.dir(parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});

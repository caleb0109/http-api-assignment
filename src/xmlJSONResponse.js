const respond = (request, response, status, content, type) => {
  const headers = {
    'Content-Type': type,
  };
  response.writeHead(status, headers);
  response.write(content);
  response.end();
};

const responseJSON = {
  message:'',
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response.</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  responseJSON.message = 'This is a successful response';

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {

  responseJSON.message = 'This request has the required parameters.';

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequestMissingParam';
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>Missing valid query parameter set to true.</message>';
      responseXML += '<id>badRequest</id></response>';
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 400, jsonString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>This request has the required parameters.</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  responseJSON.message = 'This request has the required parameters.';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorizedMissingParam';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>Missing loggedIn query parameter set to yes.</message>';
      responseXML += '<id>unauthorized</id></response>';
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 401, jsonString, 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>You have successfully viewed the content.</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>You do not have access to this content.</message>';
    responseXML += '<id>forbidden</id></response>';

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const responseJSONF = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  const jsonString = JSON.stringify(responseJSONF);
  return respond(request, response, 403, jsonString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>Internal server error. Something went wrong.</message>';
    responseXML += '<id>internalError</id></response>';

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const responseJSONInt = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  const jsonString = JSON.stringify(responseJSONInt);
  return respond(request, response, 500, jsonString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>';
    responseXML += '<id>notImplemented</id></response>';

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const responseJSONNI = {
    message: 'This page has not been implemented yet. Check back later for updates.',
    id: 'notImplemented',
  };
  const jsonString = JSON.stringify(responseJSONNI);
  return respond(request, response, 501, jsonString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>The page you are looking for was not found.</message>';
    responseXML += '<id>notFound</id></response>';

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const responseJSONNF = {
    message: 'The page you are looking for does not exist.',
    id: 'notFound',
  };

  const jsonString = JSON.stringify(responseJSONNF);
  return respond(request, response, 404, jsonString, 'application/json');
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;

Edmodo = {};

OAuth.registerService('edmodo', 2, null, function(query) {
console.log('getting accessToken with query');
console.log(query);
  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.id,
      email: identity.email,
      accessToken: accessToken
    },
    options: {
      profile: {
        name: identity.first_name + identity.last_name
      }
    }
  };
});

var getAccessToken = function getAccessToken (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'edmodo'});
  console.log('config', config);
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  var response;
  try {
    response = HTTP.post(
      'https://api.edmodo.com/oauth/authorize',
      {
        headers: {Accept: 'application/json'},
        params: {
          client_id: config.clientID,
          client_secret: config.clientSecret,
          redirect_uri: encodeURIComponent(config.redirectURI || OAuth._redirectUri('edmodo', config)),
          code: query.code,
          grant_type: 'authorization_code'
        }
      }
    )
  }
  catch (err) {
    throw _.extend(
      new Error("Failed to complete OAuth handshake with Edmodo. " + err.message),
      {response: err.response}
    );
  }

  console.log('response', response);
  console.log(response.data.access_token);
  console.log(response.data.expires_in);
  console.log(response.data.token_type);
  console.log('r.data', response.data);

  return response.data.access_token;
};

var getIdentity = function getIdentity (accessToken) {
  try {
    var response = HTTP.get(
      'https://api.edmodo.com/users/me',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        params: {}
      }
    );
    return response.data;
  }
  catch (err) {
    throw _.extend(
      new Error("Failed to fetch identity from Edmodo. " + err.message),
      {response: err.response}
    );
  }
};

Edmodo.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

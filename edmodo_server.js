Edmodo = {};

OAuth.registerService('edmodo', 2, null, function(query) {
  // Returns data of the form:
  // { access_token: 'token', expires_in: 7200, token_type: 'bearer' }
  var accessData = getAccessData(query);
  var identity = getIdentity(accessData.access_token);

  return {
    serviceData: {
      id: identity.id,
      accessToken: accessData.access_token,
      refreshToken: accessData.refresh_token,
      expiresIn: accessData.expires_in,
      tokenType: accessData.token_type,
    },
    options: {
      profile: {
        name: identity.first_name + ' ' + identity.last_name,
        firstName: identity.first_name,
        lastName: identity.last_name,
        email: identity.email,
        type: identity.type,
        edmodo: identity,
      }
    }
  };
});

var getAccessData = function getAccessData (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'edmodo'});
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  var response;
  try {
    response = HTTP.post(
      'https://api.edmodo.com/oauth/token',
      {
        headers: {Accept: 'application/json'},
        params: {
          client_id: config.clientID,
          client_secret: config.clientSecret,
          redirect_uri: config.redirectURI.trim() || OAuth._redirectUri('edmodo', config),
          code: query.code,
          state: query.state,
          grant_type: 'authorization_code'
        }
      }
    );
  }
  catch (err) {
    throw _.extend(
      new Error("Failed to complete OAuth handshake with Edmodo. " + err.message),
      {response: err.response}
    );
  }

  return response.data;
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

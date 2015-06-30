Edmodo = {};

// Request Edmodo credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Edmodo.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'edmodo'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError()
    );
    return;
  }

  var credentialToken = Random.secret();

  var scope = config.scope;

  var redirectURI = config.redirectURI.trim() || OAuth._redirectUri('edmodo', config);
  var encodedRedirectURI = encodeURIComponent(redirectURI);

  var loginStyle = OAuth._loginStyle('edmodo', config, options);

  var loginURL =
    'https://api.edmodo.com/oauth/authorize'
      + '?client_id=' + config.clientID
      + '&response_type=code'
      + '&scope=' + scope
      + '&redirect_uri=' + encodedRedirectURI;

  OAuth.launchLogin({
    loginService: 'edmodo',
    loginStyle: loginStyle,
    loginUrl: loginURL,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};

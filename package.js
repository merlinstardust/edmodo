Package.describe({
  name: 'merlin:edmodo',
  summary: 'Edmodo OAuth flow',
  git: 'https://github.com/merlinpatt/edmodo',
  version: '2.0.0',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.addFiles('edmodo_server.js', 'server');
  api.addFiles('edmodo_client.js', 'client');

  api.export('Edmodo');
});

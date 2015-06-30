Package.describe({
  name: 'merlin:edmodo',
  summary: 'Edmodo OAuth flow',
  git: 'https://github.com/merlinpatt/edmodo',
  version: '0.9.1',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('oauth2@1.1.3', ['client', 'server']);
  api.use('oauth@1.1.4', ['client', 'server']);
  api.use('http@1.1.0', ['server']);
  api.use('templating@1.1.1', 'client');
  api.use('underscore@1.0.3', 'client');
  api.use('random@1.0.3', 'client');
  api.use('service-configuration@1.0.4', ['client', 'server']);

  api.export('Edmodo');

  api.addFiles(
    ['edmodo_configure.html', 'edmodo_configure.js'],
    'client'
  );

  api.addFiles('edmodo_server.js', 'server');
  api.addFiles('edmodo_client.js', 'client');
});

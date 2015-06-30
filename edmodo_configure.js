Template.configureLoginServiceDialogForEdmodo.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForEdmodo.fields = function () {
  return [
    {property: 'clientID', label: 'Client ID'},
    {property: 'clientSecret', label: 'Client Secret'},
    {property: 'scope', label: 'Scope'},
    {property: 'redirectURI', label: 'Redirect URI'}
  ];
};

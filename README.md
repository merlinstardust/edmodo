# edmodo

An implementation of the Edmodo OAuth flow. See the [project page](https://www.meteor.com/accounts) on Meteor Accounts for more details.

**Warning**: This project no longer comes with a configuration UI. Instead, configure it with the below instructions.

# Configure

In a Meteor settings file, add an Edmodo key

```
"Edmodo": {
  "clientId": "someLongId",
  "clientSecret": "someLongSecret",
  "scope" : "basic read_groups read_connections read_user_email create_messages write_library_items"
},
```

Then in a server side file, add the following

```
import {Meteor} from 'meteor/meteor';
import {ServiceConfiguration} from 'meteor/service-configuration';

Meteor.startup(() => {
  if (Meteor.settings.Edmodo && ! ServiceConfiguration.configurations.findOne({service: 'edmodo'})) {
    const configuration = Object.assign({service: 'edmodo', redirectURI: ''}, Meteor.settings.Edmodo);
    ServiceConfiguration.configurations.insert(configuration);
  }
});
```

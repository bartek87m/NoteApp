import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../import/api/users';
import '../import/api/notes';
import '../import/startup/simple-chema-configuration';

Meteor.startup(() => {
  // code to run on server at startup
});

import { Meteor } from 'meteor/meteor'
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';
import history from '../import/ui/History';

import Routes from '../import/routing/Routes';
import { onAuthentificationChange } from '../import/routing/Authentification' 
import './main.html';
import '../import/startup/simple-chema-configuration';
import createBrowserHistory from "history/createBrowserHistory";

  
const historyWithoutRerendering = createBrowserHistory({
  forceRefresh:false
})

Tracker.autorun(() => {
  const isAuthentificated = !!Meteor.userId();
  onAuthentificationChange(isAuthentificated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId){
    historyWithoutRerendering.replace({
     pathname: `/dashboard/${selectedNoteId}`,
     state: {id: selectedNoteId}
    });
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(<Routes/>, document.getElementById('app'));
});
//metody służą do bezpieczengo umieszczania danych w mongoDB - sprawdzanie czy użytkonika ma dostęp i czy dane są poprawne
//kiedy wywołamy metoda meteora jest o stronie klienta mówi serwerowi żby uruchomił ją u
//uruchomił metode. Metoda jest uruchomiana na serwerz i kliencie
//kiedy wywołamy po stronie serwera działa tylko na serwerze 
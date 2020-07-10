import React, { Component } from 'react';
import './App.css';
// import PouchDB from 'pouchdb';
// import Find from 'pouchdb-find';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Pages
import Home from '../Pages/Home/Home';
import BuyOffers from '../Pages/BuyOffers/BuyOffers';
import SellOffers from '../Pages/SellOffers/SellOffers';

// Import Components
import Header from '../Header/Header';

// Map The Store State
const mapStateToProps = (state) => ({
  // incs: state.incidentList,
  // messagesList: state.app.joined.messageData.messageList,
});


export class App extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = { 

    };
  }

  render(){
    return (
      <HashRouter>
        <div fluid className="app">
          <Header className="justify-content-center" />
          <div id="body" className="justify-content-center appBody">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/BuyOffers" component={BuyOffers} />
              <Route exact path="/SellOffers" component={SellOffers} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );       
  }
}

export default connect(mapStateToProps)(App);

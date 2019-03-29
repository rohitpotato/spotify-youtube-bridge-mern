import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/navbar'
import SearchBar from './components/Searchbar';
import Login from './components/Login/login';
import Landing from './components/Landing/landing';
import Private from './components/Private/private';
import {logoutUser, verify} from './actions/authActions';
import SongView from './components/songView/songView';
import AlbumView from './components/albums/albumView';
import YTDownload from './components/downloader/index';
const jwtDecode = require('jwt-decode');

if(localStorage.jwtToken) {
  
  const token = localStorage.getItem('jwtToken');
  const decoded = jwtDecode(token);

  const currentTime =  Date.now()/1000;

  if(decoded.exp < currentTime) {

    store.dispatch(logoutUser());
    localStorage.clear();
    window.location.href = "/login";
  }
  
}

class App extends Component {

  componentDidMount() {

      setInterval(store.dispatch(verify()), 1000*1000*3500);
  }

  render() {
    return (

      <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                 <Route exact path="/song/:id" component={withRouter(SongView)} />
                 <Route exact path="/album/:id" component={withRouter(AlbumView)} />
                 <Route exact path="/music/download" component={withRouter(YTDownload)} />
              </div>
        </Router>
      </Provider>  
    );
  }
}

export default App;

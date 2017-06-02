import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import Feature from './Feature.js';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MainSelection from './MainSelection.js';
import { Layout, Header, Drawer, Navigation, Content, IconButton } from 'react-mdl';
import createHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObject: {}
      }
  }
  handleFound = (returnedObject) => {
    this.setState({ selectedObject: returnedObject });
  }
  restart =() => {
      window.location.reload();
  } 
  toggle() {
        var d = document.querySelector('.mdl-layout');
        d.MaterialLayout.toggleDrawer();
    }
  render() {
    console.log(window.location);
    return (
      <Router history={this.history}>
        <div className="demo-big-content">
          <Layout fixedHeader>
            <Header title="Title" >
                {window.location.pathname !== '/' && <div>
                <IconButton onClick={this.toggle} name='build' style={{ position: 'absolute', bottom: '92.5%', right: '96%' }} />
                <Link to='/'><IconButton onClick={this.restart} name='cached' style={{ position: 'absolute', bottom: '92.5%', right: '3%' }} /></Link>
                </div>
                }
            </Header>
            <Drawer title="Title">
              {Object.keys(this.state.selectedObject).length > 0 &&
              <Navigation>
                  <Link to='/Features'>Add Features</Link>
                  <Link to='/SpellSlots'>Increase Spell Slots</Link>
                  <Link to='/Spells'>Add Spells</Link>
                  <Link to='/Cantrips'>Add Cantrips</Link>
              </Navigation>}
            </Drawer>
            <Content>
              <div>
                <Route exact path='/' component={(props) => <MainSelection handleFound={this.handleFound} />} />
                <Route path='/Features' component={(props) => <Feature classObject={this.state.selectedObject} />} />
              </div>
            </Content>
          </Layout>
        </div>
      </Router>
    );

  }
}


export default App;

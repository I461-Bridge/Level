import React, { Component } from 'react';
import './App.css';
import recipes from './../data/characterClasses.json';
import _ from 'lodash';
import Feature from './Feature.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MainSelection from './MainSelection.js';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';

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

  render() {
    return (
      <Router>
        <div className="demo-big-content">
          <Layout fixedHeader>
            <Header title="Title" >
            </Header>
            <Drawer title="Title">
              <Navigation>
                {Object.keys(this.state.selectedObject).length > 0 &&
                  <Link to='/Features'>Add Features</Link>
                }
                {Object.keys(this.state.selectedObject).length > 0 &&
                  <Link to='/SpellSlots'>Increase Spell Slots</Link>
                }
                {Object.keys(this.state.selectedObject).length > 0 &&
                  <Link to='/Spells'>Add Spells</Link>
                }
                {Object.keys(this.state.selectedObject).length > 0 &&
                  <Link to='/Cantrips'>Add Cantrips</Link>
                }
                <Link to='/'>Different Level or Class?</Link>
              </Navigation>
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

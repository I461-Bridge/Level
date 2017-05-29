import React, { Component } from 'react';
//import logo from './logo.svg';
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
    
    // var text = recipes.Fighter.LevelRecipes.map(function (d){
    //   return <p>{d}</p>
    // });
    
    return (
      <Router>
        <div className="demo-big-content">
          <Layout fixedHeader fixedDrawer>
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


    function getStep(characterClass, level, step){
      // var name = recipes.Fighter.LevelRecipes[level - 1][step];
      // var url;
      console.log("TEST: trying to get Fighter Level 1- " + characterClass + ", " + (level + 1));
      console.log("TEST: getting rage from: http://www.dnd5eapi.co/api/features/1")
      extractText("http://www.dnd5eapi.co/api/features/1");
    };

    function createNode(element) {
        return document.createElement(element);
    }
    function append(parent, el) {
      return parent.appendChild(el);
    }

    function extractText(url){
        const ul = document.getElementById('description');
        
        fetch(url)
        .then(response => {response.json()})
        .then(function(data){
            var name = data.name;
            console.log(name);
            return name;
        })
    }

  }
}


export default App;

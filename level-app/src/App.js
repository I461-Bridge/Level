import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Button, Modal, SplitButton, MenuItem } from 'react-bootstrap';
import data from './../data/characterClasses.json';
import HeaderTitle from './Header.js';
import Feature from './Feature.js';
import request from 'request';
import controller from './Controller.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MainSelection from './MainSelection.js';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';

//import update from 'immutability-helper';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObject: {}
    }
    // this.state = {
    //   selectedClass: "",
    //   selectedLevel: "",
    //   selectedCombo: {},
    //   classButtonTitle: "Character Class",
    //   levelsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    //   levelButtonTitle: "",
    //   openLanding: true,
    //   recipeStep: 0,
    //   test: {}
    // };
  }
  // handleClass = (eventKey) => {
  //   this.setState({ selectedClass: eventKey, classButtonTitle: eventKey });
  // }
  // handleLevel = (eventKey) => {
  //   this.setState({ selectedLevel: eventKey, levelButtonTitle: eventKey });
  // }
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   var nextLevel = this.state.recipeStep + 1;
  //   var foundCombo;
  //   _.forEach(data.Classes, (value) => {
  //     if (value.Class === this.state.selectedClass) {
  //       foundCombo = value;
  //     }
  //   })
  //   this.setState({ openLanding: false, recipeStep: nextLevel, selectedCombo: foundCombo });
  // }

  handleFound = (returnedObject) => {
    this.setState({ selectedObject: returnedObject });
  }
  //  handleBack = () => {
  //   this.setState({selectedObject: {}});
  // }

  // componentWillMount() {
  //   this.setState({selectedObject: {}});
  // } 

  // handleNext = (event) => {
  //   event.preventDefault();
  //   var nextLevel = this.state.recipeStep + 1;
  //   this.setState({ recipeStep: nextLevel });
  // }
  // handleBack = (event) => {
  //   event.preventDefault();
  //   var nextLevel = this.state.recipeStep - 1;
  //   this.setState({ recipeStep: nextLevel });
  // }
  // handleTest = (event) => {
  //   let thisComponent = this;
  //   controller.search('http://www.dnd5eapi.co/api/features/1')
  //     .then(function (data) {
  //       thisComponent.setState({ test: data })
  //     })
  // }

  // getData = (url) => {
  //   return fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //console.log(responseJson);
  //       return responseJson;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    // var availableClasses = _.map(data.Classes, (value, index) => {
    //   var keyname = value.Class;
    //   return <MenuItem eventKey={keyname} key={index}>{keyname}</MenuItem>
    // });
    // var availableLevels = _.map(this.state.levelsArray, (value) => {
    //   return <MenuItem eventKey={value} key={value}>Level {value}</MenuItem>
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
                  <Link to='/SpellSlots'>Incease Spell Slots</Link>
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


          {/*<div className="container">
          <h2>Select a Class</h2>
          <SplitButton bsStyle="success" title={this.state.classButtonTitle} id='split-button-basic' onSelect={this.handleClass.bind(this)}>
            {availableClasses}
          </SplitButton>
          <h2>Select a Level</h2>
          <SplitButton bsStyle="success" title={"Level " + this.state.levelButtonTitle} id='split-button-basic' onSelect={this.handleLevel.bind(this)}>
            {availableLevels}
          </SplitButton>
        </div>*/}
          {/*<div style={{ height: '300px', position: 'relative' }}>
          <Layout fixedHeader>
            <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
            </Header>
            <Drawer title="Title">
              <Navigation>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
              </Navigation>
            </Drawer>
            <Content />
          </Layout>
        </div>*/}
          {/*<div className="container">
        {this.state.recipeStep === 0 &&
          <div>
            <div>
              <h2>Select a Class</h2>
              <SplitButton bsStyle="success" title={this.state.classButtonTitle} id='split-button-basic' onSelect={this.handleClass.bind(this)}>
                {availableClasses}
              </SplitButton>
              <h2>Select a Level</h2>
              <SplitButton bsStyle="success" title={"Level " + this.state.levelButtonTitle} id='split-button-basic' onSelect={this.handleLevel.bind(this)}>
                {availableLevels}
              </SplitButton>
            </div>
            <div>
              <Button bsStyle='primary' onClick={this.handleSubmit.bind(this)} disabled={!this.state.selectedClass || !this.state.selectedLevel}>Go</Button>
              <Button bsStyle='primary' onClick={this.handleTest.bind(this)}>Test</Button>
            </div>
          </div>
        }
        {this.state.recipeStep === 1 &&
          <div>
            <Feature classTitle={this.state.selectedClass} levelTitle={this.state.selectedLevel}
              classObject={this.state.selectedCombo.LevelRecipes[this.state.selectedLevel - 1]}
              nextHandler={this.handleNext} backHandler={this.handleBack} test={this.state.test} />
            <Button bsStyle='primary' href='.'>Back</Button>
            <Button bsStyle='primary' onClick={this.handleNext.bind(this)}>Next</Button>
          </div>
        }
        {this.state.recipeStep === 2 &&
          <div>
            <p>Second Page</p>
            <Button bsStyle='primary' onClick={this.handleBack.bind(this)}>Back</Button>
          </div>
        }
      </div>*/}
        </div>
      </Router>
    );
  }
}


export default App;

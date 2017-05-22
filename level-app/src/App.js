import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Button, Modal, SplitButton, MenuItem } from 'react-bootstrap';
import data from './../data/characterClasses.json';
import update from 'immutability-helper';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: "",
      selectedLevel: "",
      selectedCombo: {},
      classButtonTitle: "Character Class",
      levelsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      levelButtonTitle: "",
      openLanding: true,
      recipeStep: 0
    };
  }
  handleClass = (eventKey) => {
    this.setState({ selectedClass: eventKey, classButtonTitle: eventKey });
  }
  handleLevel = (eventKey) => {
    this.setState({ selectedLevel: eventKey, levelButtonTitle: eventKey });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    var nextLevel = this.state.recipeStep + 1;
    var foundCombo;
    _.forEach(data.Classes, (value) => {
      if (value.Class === this.state.selectedClass) {
        foundCombo = value;
      }
    })
    this.setState({ openLanding: false, recipeStep: nextLevel, selectedCombo: foundCombo });
  }

  handleNext = (event) => {
    event.preventDefault();
    var nextLevel = this.state.recipeStep + 1;
    this.setState({ recipeStep: nextLevel });
  }
  handleBack = (event) => {
    event.preventDefault();
    var nextLevel = this.state.recipeStep - 1;
    this.setState({ recipeStep: nextLevel });
  }
  render() {
    var availableClasses = _.map(data.Classes, (value, index) => {
      var keyname = value.Class;
      return <MenuItem eventKey={keyname} key={index}>{keyname}</MenuItem>
    });
    var availableLevels = _.map(this.state.levelsArray, (value) => {
      return <MenuItem eventKey={value} key={value}>Level {value}</MenuItem>
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
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
            </div>
          </div>
        }
        {this.state.recipeStep === 1 &&
          <div><p>First Page</p>
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
      </div>
    );
  }
}

class FeatureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  // getInitialState() {
  //   return { showModal: false };
  // }
  render() {
    return (
      <div>
      </div>
    );
  }
}


export default App;

import React, { Component } from 'react';
import data from './../data/classes.json';
import _ from 'lodash';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


class MainSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClass: '',
            selectedLevel: '',
            selectedCombo: {},
            classButtonTitle: "Character Class",
            levelsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            levelButtonTitle: "",
            redirect: false
        }
    }
    handleClass = (eventKey) => {
        this.setState({ selectedClass: eventKey, classButtonTitle: eventKey });
    }
    handleLevel = (eventKey) => {
        this.setState({ selectedLevel: eventKey, levelButtonTitle: eventKey });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        var foundCombo;
        _.forEach(data.Classes, (value) => {
            if (value.Class === this.state.selectedClass) {
                foundCombo = {
                    className: this.state.selectedClass,
                    classLevel: this.state.selectedLevel,
                    classObject: value
                };
            }
        })
        this.setState({ redirect: true, selectedCombo: foundCombo });
    }
    componentWillUnmount = () => {
        this.props.handleFound(this.state.selectedCombo);
        
    }

    render() {
        var availableClasses = _.map(data.Classes, (value, index) => {
            var keyname = value.Class;
            return <MenuItem eventKey={keyname} key={index}>{keyname}</MenuItem>
        });
        var availableLevels = _.map(this.state.levelsArray, (value) => {
            return <MenuItem eventKey={value} key={value}>Level {value}</MenuItem>
        });
        if (this.state.redirect) {
            return <Redirect push to='/Features' />;
        }

        return (
            <div className="container">
                <div>
                    <h1>Welcome to Level</h1>
                    <h2>Select a Class</h2>
                    <DropdownButton bsStyle="success" title={this.state.classButtonTitle} id='split-button-basic' onSelect={this.handleClass.bind(this)}>
                        {availableClasses}
                    </DropdownButton>
                    <h2>Select a Level</h2>
                    <DropdownButton bsStyle="success" title={"Level " + this.state.levelButtonTitle} id='split-button-basic' onSelect={this.handleLevel.bind(this)}>
                        {availableLevels}
                    </DropdownButton>
                </div>
                <div>
                    <Button bsStyle='primary' onClick={this.handleSubmit.bind(this)}
                        disabled={!this.state.selectedClass || !this.state.selectedLevel}>
                        Go</Button>
                </div>
            </div>
        );
    }
}
export default MainSelection;
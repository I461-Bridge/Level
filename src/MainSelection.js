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
            classButtonTitle: "Select Character Class",
            levelsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            levelButtonTitle: "Select ",
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
            return <Redirect push to='/HealthPoints' />;
        }

        return (
            <div className="container">
                <div className="App">
                    <h1>Level</h1>
                    <h3>Updating D&amp;D 5e Characters Made Easy</h3>
                    <h4>Select a Class</h4>
                    <DropdownButton bsStyle="success" style={{'borderRadius':'25px'}} title={this.state.classButtonTitle} id='dropdown-basic' onSelect={this.handleClass.bind(this)}>
                        {availableClasses}
                    </DropdownButton>
                    <h4>Select a Level</h4>
                    <DropdownButton bsStyle="success" style={{'borderRadius':'25px'}} title={"Level " + this.state.levelButtonTitle} id='dropdown-basic' onSelect={this.handleLevel.bind(this)}>
                        {availableLevels}
                    </DropdownButton>
                </div>
                <div>
                    <Button bsStyle='primary' onClick={this.handleSubmit.bind(this)}
                        disabled={!this.state.selectedClass || !this.state.selectedLevel} style={{'marginTop':'20px', 'width':'100%', 'borderRadius':'25px'}}>
                        Go</Button>
                </div>
            </div>
        );
    }
}
export default MainSelection;
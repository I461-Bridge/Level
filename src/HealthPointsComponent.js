import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import HeaderTitle from './Header.js';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import {MediaBox} from 'react-materialize';

class HealthPointsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            path: '',
        };
    }
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    render() {
        if (Object.keys(this.props.classObject).length !== 0) {
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Step 1: Increase Hit Points' /> </div>;
            var modifier = this.props.classObject.classObject.HitPoints;
            var instructions = this.props.classObject.classObject.HitPointInstructions;
            var diceImage = this.props.classObject.classObject.Dice;
            var proficiency = "";
            var proficiencyMessage = "";
            var proficiencyBonus = "";
            if (parseInt(this.props.classObject.classLevel) % 4 === 1 && this.props.classObject.classLevel !== 1) {
                proficiencyMessage = "Your Proficiency has increased!"
                proficiency = "Change your Proficiency Bonus to +";
                proficiencyBonus = parseInt(this.props.classObject.classLevel/4) + 2;
            }

        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (
            <div className='container'>
                {header}
                <p>
                    {modifier}
                </p>
                <p>
                    {instructions}
                </p>
                <p>
                    {proficiencyMessage}
                </p>
                <p>
                    {proficiency}
                    {proficiencyBonus}
                </p>
                {Object.keys(this.props.classObject).length !== 0 &&
                    <MediaBox src={require('../images/'+diceImage)  } caption="Character Dice" width="400"/>}
                <div>
                    <Button className='navButton' onClick={this.handler.bind(this)} value='/' disabled={Object.keys(this.props.classObject).length === 0}>Back Page</Button>
                    <Button className='navButton' onClick={this.handler.bind(this)} value='/Features' disabled={Object.keys(this.props.classObject).length === 0}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default HealthPointsComponent;
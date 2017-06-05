import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import SpellTableComponent from './SpellTable.js'

class SpellSlotsComponent extends Component {
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
            var selectedSpellSlots = this.props.classObject.classObject.SpellSlots[this.props.classObject.classLevel - 1];
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Step 3: Increase Spell Slots' /> </div>
            var spellSlots = <div> 
                <SpellTableComponent spellSlots={selectedSpellSlots}/>  </div> 
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (
            <div className='container'>
                {header}
                {spellSlots}
                <div>
                    <Button onClick={this.handler.bind(this)} value='/Features' disabled={Object.keys(this.props.classObject).length === 0}>Back Page</Button>
                    <Button onClick={this.handler.bind(this)} value='/Spells' disabled={Object.keys(this.props.classObject).length === 0}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default SpellSlotsComponent;
import React, { Component } from 'react';
import { Button, Accordion, Panel } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import AccordionComponent from './Accordion.js';
import SpellsAccordion from './SpellAccordion.js';


class SpellComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            path: '',
            spellList: []
        };
    }
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }
    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let levelCap = 0;
            let spellsArray = [];
            _.forEach(this.props.classObject.classObject.SpellSlots[this.props.classObject.classLevel - 1], function (value, i) {
                if (value === 0 && levelCap === 0) {
                    levelCap = i;
                }
            });
            for (var i = 1; i <= levelCap; i++) {
                spellsArray.push(this.props.classObject.classObject.Spells[i]);
            }
            this.setState({ spellList: spellsArray });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.spellList !== this.spellList;
    }

    render() {
        if (this.state.spellList.length > 0) {
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Add/Modify Spells' /> </div>;
            var panelsList = _.map(this.state.spellList, function (each,index) {
                let panelTitle = "Spells Level: "+ (index+1);
                return <Panel header={panelTitle} eventKey={panelTitle} key={index} bsStyle="success"> <SpellsAccordion spellsObject={each}/></Panel>;
            })
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (
            <div className='container'>
                {header}
                <Accordion>
                {panelsList}
                </Accordion>
                <div>
                    <Button onClick={this.handler.bind(this)} value='/' disabled={this.state.spellList.length === 0}>Back Page</Button>
                    <Button onClick={this.handler.bind(this)} value='/Features' disabled={this.state.spellList.length === 0}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default SpellComponent;
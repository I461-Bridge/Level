import React, { Component } from 'react';
import _ from 'lodash';
import {Button, ButtonToolbar,OverlayTrigger, Popover } from 'react-bootstrap';
import spells from './../data/spells.json';

class SpellsAccordion extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var list = this.props.spellsObject.map(function (d, index) {
            if (spells[d] !== undefined) {
                var spellName = d;
                let description = spells[d];
                let keyName = Object.keys(description);
                var paragraphs = _.map(keyName, function (eachTopic, i) {
                    let type = eachTopic;
                    return <p key={i}><strong>{type}</strong> : {description[eachTopic]}</p>;
                });
            } else {
                return null;
            }
            let popInfo = <Popover id="popover-positioned-top" title={spellName}>
                <div>{paragraphs}</div>
            </Popover>;
            return <ButtonToolbar key={index}>
                <OverlayTrigger trigger="click" placement="top" overlay={popInfo}>
                    <Button>{spellName}</Button>
                </OverlayTrigger>
            </ButtonToolbar>;
        })
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default SpellsAccordion;
import React, { Component } from 'react';
import _ from 'lodash';
import spells from './../data/spells.json';
import {Modal, Button} from 'react-materialize';

class SpellsAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spellsList: []
        }
    }

    componentWillMount() {
        if (Object.keys(this.props.spellsObject).length !== 0) {
            let spells = this.props.spellsObject;
            this.setState({ spellsList: spells });
        }
    };

    render() {
        if (this.state.spellsList.length > 0) {
            var list = _.map(this.props.spellsObject, function (d, index) {
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
                return <Modal
                    header={spellName} bottomSheet
                    key={index}
                    trigger={<Button waves='light'>{spellName}</Button>
                    }>{paragraphs}</Modal>;
            })
        }
        return (
            <div>
                {list}
            </div>
        )
    }

}

export default SpellsAccordion;
import React, { Component } from 'react';
import _ from 'lodash';
import { Accordion, Panel } from 'react-bootstrap';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';
import spells from './../data/spells.json';

class SpellsAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = { openDialog: false };
    }

    handleOpenDialog() {
        debugger;
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    render() {
        // variables
        console.log("time ", this.props.spellsObject);
        var list = this.props.spellsObject.map(function (d, index) {
            let title = 'Spells Level: ' + index;
            d.map(function (name) {
                let spellName = name;
                console.log(spells);
                let description = spells.name;
                debugger;
                return <Panel header={title} eventKey={title} key={index}>
                    <p>{spellName}</p>                    {/*<Button colored raised ripple>{spellName}</Button>*/}
                    {/*<Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog.bind(this)}>
                        <DialogTitle>{spellName}</DialogTitle>
                        <DialogContent>
                            <p>{description}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button type='button'>Agree</Button>
                            <Button type='button' onClick={this.handleCloseDialog.bind(this)}>Disagree</Button>
                        </DialogActions>
                    </Dialog>*/}
                </Panel>;
            })
        }
        )
        return (
            <div>
                <Accordion>
                    {list}
                </Accordion>
            </div>
        )
    }
}

export default SpellsAccordion;
import React, { Component } from 'react';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

class SpellTableComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Assuming that props format = [2, 0, 0, 0, 0, 0, 0, 0]
        if (Object.keys(this.props).length !== 0) {
            console.log(this.props);
            var spellSlotList = this.props.spellSlots.map(function (d, index) {
                    var spellLevel = index + 1;
                    var spellSlot = d;
                    return <tr key = {index}> 
                            <td>{spellLevel}</td>
                            <td>{spellSlot}</td>
                        </tr>;
                }
            )
        }

        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Spell Level</th>
                            <th>Spell Slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spellSlotList}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default SpellTableComponent;
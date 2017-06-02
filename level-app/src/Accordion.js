import React, { Component } from 'react';
import _ from 'lodash';
import { Accordion, Panel } from 'react-bootstrap';

class AccordionComponent extends Component {
    constructor(props) {
        super(props);
    }
    // methods

    render() {
        // variables
        var list = this.props.description.map(function (d) {
            var title = Object.keys(d).toString();
            var description = d[title];
            return <Panel header = {title} eventKey={title}>
                        {description}
                   </Panel>;
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

export default AccordionComponent;
import React, {Component} from 'react';
import Accordion.Component from '/Accordion.Component.js'
import './Accordion.css'
import _ from 'lodash';


class Accordion extends Component {
    getInitialState: function() {
      // TO-DO: Add listener for property changes and reset state after change
        return {
           // state is set to selected ection if it is provided
            selected: this.props.selected
        };
    },

    render() {
      // enable variable number of child sections
        var children = React.Children.map(
            this.props.children, this.enhanceSection)

        return (
            <div className="accordion">
                {children}
            </div>
        );
    },


    enhanceSection: function(child) {
        var selectedId = this.state.selected,
            id = child.props.id;

        return React.addons.cloneWithProps(child, {
            key: id,
            _selected: id === selectedId,
            _onSelect: this.onSelect
        });
    },

    onSelect: function(id) {
        this.setState({selected: id});
    }
});

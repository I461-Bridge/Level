import React, {Component} from 'react';
import Accordion.Component from 'Accordion.Component.js'

Accordion = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.selected
        };
    },

    render: function() {
        var children = React.Children.map(
            this.props.children, this.enhanceSection);

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
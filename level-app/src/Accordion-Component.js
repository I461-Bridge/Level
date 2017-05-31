import React, { Component } from 'react';

Accordion.Component = React.createClass({
    render: function() {
        var className = 'accordion-section' + (this.props._selected ? ' selected' : '');
    
        return (
            <div className={className}>
                <h3 onClick={this.onSelect}>
                    {this.props.title}
                </h3>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        );
    },

    onSelect: function() {
        this.props._onSelect(this.props.id);   
    }
});
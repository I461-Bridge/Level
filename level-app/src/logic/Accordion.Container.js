import React from 'react';

class Accordion.Container extends React.Component {
	render: function() {
		var className = 'accordion-container' + (this.props._selected ? ' selected' : '');
		return (
			<div className={className}>
				<h2 onClick={this.onSelect}>
					{this.props.name}
				</h3>
				<div className = "body">
					{this.props.description}
				</div>
			</div>	
		);
	}, 
	onSelect: function() {
		this.props.onSelect(this.props.id);
	}
});
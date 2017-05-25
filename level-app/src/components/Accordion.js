import React from 'react';
import './Accordion.css';

class Accordion extends React.Component {
	handleClick = () => {
		this.props.clickHandler(this.props.name);
	}

	render() {
		let className = "accordion-default";
		/* 
		if (this.props.state1) {
		   	className += "state1";
		}
		   
		if (this.props.state2) {
			className += "state2";
		}
		*/
	
		return (
			<div
				className={className}
			>
				/* accordion */
			

			<div/>
		);
	}
}

	Accordion.propTypes = {
		name: React.PropTypes.string,
		clickHandler: React.PropTypes.func,
	};

export default Accordion;

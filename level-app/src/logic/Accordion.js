import React from 'react';
import './Accordion.css';

const styles = {
	active: {
		display: 'inherit'
	},
	inactive: {
		display: 'none'
	}
}

class Accordion extends React.Component {
	constructor() {
		super();
		this.state = {
			active: false
		};
		this.toggle = this.toggle.bind(this);

	}

	toggle() {
		this.setState({
			active: !this.state.active
		});
	}

	render() {
		const stateStyle = this.state.active ? styles.active : styles.inactive;
		let className = "accordion-default";

		return(
			<section>
				<a onClick = {this.toggle}>
					{this.props.name}
				</a>
				<p styles = {stateStyle}>
					{this.props.description}
				</p>
			<section>
		);
	}
}

	Accordion.propTypes = {
		name: React.PropTypes.string.isRequired,
		desription: React.PropTypes.string.isRequired
	};

export default Accordion;

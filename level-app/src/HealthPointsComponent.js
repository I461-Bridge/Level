import React, { Component } from 'react';
import { Button, Accordion, Panel } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

class HealthPointsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            path: '',
        };
    }
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    render() {
        if (Object.keys(this.props.classObject).length !== 0) {
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Increase Hit Points' /> </div>;
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (
            <div className='container'>
                {header}
                <div>
                    <Button onClick={this.handler.bind(this)} value='/' disabled={Object.keys(this.props.classObject).length === 0}>Back Page</Button>
                    <Button onClick={this.handler.bind(this)} value='/' disabled={Object.keys(this.props.classObject).length === 0}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default HealthPointsComponent;
import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class HeaderTitle extends Component {
    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>{this.props.classTitle}&nbsp;&nbsp;|&nbsp;&nbsp;Level {this.props.levelTitle}</h1>
                    <p className='pageHeader'>Pick your new {this.props.featureName}</p>
                </Jumbotron>
            </div>

        );
    }
}

export default HeaderTitle;
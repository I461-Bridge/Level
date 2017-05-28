import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class HeaderTitle extends Component {
    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>{this.props.classTitle} | Level:{this.props.levelTitle}</h1>
                    <p>{this.props.featureName}</p>
                </Jumbotron>
            </div>

        );
    }
}

export default HeaderTitle;
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: this.props.classObject.length - 1,
            current: 1
        };
    }
    handleNextFeature = (event) => {
        var next = this.state.current + 1;
        this.setState({ current: next });
    }
    handleBackFeature = (event) => {
        var next = this.state.current - 1;
        this.setState({ current: next });
    }
    componentWillMount() {
        console.log("this is " + 1);

    }
    componentDidMount() {
        console.log("this is " + 2);

    };

    render() {
        console.log("length "+this.props.classObject.length);
        return (
            <div>
                <div>
                    <HeaderTitle classTitle={this.props.classTitle} levelTitle={this.props.levelTitle}
                        featureName={this.props.classObject[this.state.current]} />
                    {/* use the string to find description <p>{this.props.classObject[this.state.current]}</p>*/}
                </div>
                {this.state.current == 1 &&
                    <div>
                        <Button onClick={this.props.backHandler}>Back Page</Button>
                        <Button onClick={this.handleNextFeature.bind(this)}>Next</Button>
                    </div>}
                {this.state.current > 1 && this.state.current < this.state.pages &&
                    <div>
                        <Button onClick={this.handleBackFeature}>Back</Button>
                        <Button onClick={this.handleNextFeature.bind(this)}>Next</Button>
                    </div>}
                {this.state.current == this.state.pages && this.state.current > 1 &&
                    <div>
                        <Button onClick={this.handleBackFeature}>Back</Button>
                        <Button onClick={this.props.nextHandler}>Next Page</Button>
                    </div>}
            </div>
        );
    }
}
export default Feature;
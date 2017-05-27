import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: this.props.classObject.length - 1,
            current: 1,
            test: {},
            links:['http://www.dnd5eapi.co/api/features/1','http://www.dnd5eapi.co/api/features/2']
        };
    }
    handleNextFeature = (event) => {
        var next = this.state.current + 1;
        this.setState({ current: next, test: {} });
        controller.search(this.state.links[next - 1])
            .then(data => {
                this.setState({ test: data })
            })
    };
    handleBackFeature = (event) => {
        var next = this.state.current - 1;
        //this.setState({ current: next });
        this.setState({ current: next, test: {} });
        controller.search(this.state.links[next-1])
            .then(data => {
                this.setState({ test: data })
            })
    };
    componentWillMount() {
        //let thisComponent = this;
        controller.search(this.state.links[0])
            .then(data => {
                this.setState({ test: data })
            })
    };

    componentDidMount() {
        console.log("this is " + 2);

    };

    // componentWillReceiveProps(nextProps){
    //     console.log("recieve: ",nextProps);
    //     let thisComponent = this;
    //     controller.search('http://www.dnd5eapi.co/api/features/2')
    //         .then(data => {
    //             this.setState({ test: data })
    //         })
    // };

    render() {
        // var found = this.state.test.desc;
        // //console.log(found)
        if (this.state.test.desc !== undefined) {
            var para = this.state.test.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
        }
        return (
            <div>
                <div>
                    <HeaderTitle classTitle={this.props.classTitle} levelTitle={this.props.levelTitle}
                        featureName={this.props.classObject[this.state.current]} />
                    {para}
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
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            options: [],
            current: 1,
            received: {},
            links: ['http://www.dnd5eapi.co/api/features/1', 'http://www.dnd5eapi.co/api/features/2'],
            redirect: false,
            path: ''
        };
    }
    handleNextFeature = (event) => {
        var next = this.state.current + 1;
        this.setState({ current: next, received: {} });
        controller.search(this.state.links[next - 1])
            .then(data => {
                this.setState({ received: data })
            })
    };
    handleBackFeature = (event) => {
        var next = this.state.current - 1;
        //this.setState({ current: next });
        this.setState({ current: next, received: {} });
        controller.search(this.state.links[next - 1])
            .then(data => {
                this.setState({ received: data })
            })
    };
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }

    }
    // componentWillMount() {
    //     //let thisComponent = this;
    //     controller.search(this.state.links[0])
    //         .then(data => {
    //             this.setState({ test: data })
    //         })
    // };

    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let combo = this.props.classObject.classObject.LevelRecipes[this.props.classObject.classLevel - 1];
            this.setState({ pages: combo.length - 1, options: combo });
            controller.search(this.state.links[0])
                .then(data => {
                    //return data;
                    this.setState({ received: data })
                })
            //this.setState({ pages: combo.length - 1, options: combo, test: foundData });
        }
    };

    // componentWillReceiveProps(newProps) {
    //     if (newProps !== this.props) {
    //         if (Object.keys(newProps.classObject).length !== 0) {
    //             let combo = newProps.classObject.classObject.LevelRecipes[newProps.classObject.classLevel - 1];
    //             this.setState({ pages: combo.length - 1, options: combo });
    //             controller.search(this.state.links[0])
    //                 .then(data => {
    //                     //return data;
    //                     this.setState({ test: data })
    //                 })
    //             //this.setState({ pages: combo.length - 1, options: combo, test: foundData });
    //         }
    //     }
    // };

    // componentDidMount() {
    //     console.log(this.props.classObject);
    //     let combo = this.props.classObject.classObject;
    //     console.log("post combo",combo.LevelRecipes);
    //     this.setState({options:combo});

    // };

    // componentWillReceiveProps(nextProps){
    //     console.log("recieve: ",nextProps);
    //     let thisComponent = this;
    //     controller.search('http://www.dnd5eapi.co/api/features/2')
    //         .then(data => {
    //             this.setState({ test: data })
    //         })
    // };

    render() {
        //var found = this.state.test.desc;
        //console.log(found)
        if (this.state.received.desc !== undefined) {
            var para = this.state.received.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }

        return (
            <div>
                <div>
                    <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                        featureName={this.state.options[this.state.current]} />
                    {para}
                    {/* use the string to find description <p>{this.props.classObject[this.state.current]}</p>*/}
                </div>
                {this.state.current === 1 && this.state.pages > 1 &&
                    <div>
                        <Button onClick={this.handler.bind(this)} value='/'>Back Page</Button>
                        <Button onClick={this.handleNextFeature.bind(this)}>Next</Button>
                    </div>}
                {this.state.current > 1 && this.state.current < this.state.pages &&
                    <div>
                        <Button onClick={this.handleBackFeature}>Back</Button>
                        <Button onClick={this.handleNextFeature.bind(this)}>Next</Button>
                    </div>}
                {this.state.current === this.state.pages && this.state.current > 1 &&
                    <div>
                        <Button onClick={this.handleBackFeature}>Back</Button>
                        <Button onClick={this.handler.bind(this)} value='/SpellSlots'>Next Page</Button>
                    </div>}
                {this.state.pages === 1 &&
                    <div>
                        <Button onClick={this.handler.bind(this)} value='/'>Back Page</Button>
                        <Button onClick={this.handler.bind(this)} value='/SpellSlots'>Next Page</Button>
                    </div>}
            </div>
        );
    }
}
export default Feature;
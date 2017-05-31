import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            options: [],
            current: 0,
            received: {},
            typeName: 'features',
            links: ['features', 'http://www.dnd5eapi.co/api/features/2'],
            redirect: false,
            path: '',
            fetchedObject: {}
        };
    }
    // handleNextFeature = (event) => {
    //     var next = this.state.current + 1;
    //     this.setState({ current: next, received: {} });
    //     controller.searchFeatures(this.state.links[next - 1])
    //         .then(data => {
    //             this.setState({ received: data })
    //         })
    // };

    handleNextFeature = (event) => {
        let next = this.state.current + 1;
        this.setState({ current: next, received: {} });
        let featureUrl = this.findMatchedURL(this.state.fetchedObject, next, this.state.options);
        this.searchForObject(featureUrl);
    };
    handleBackFeature = (event) => {
        let next = this.state.current - 1;
        this.setState({ current: next, received: {} });
    };
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    searchForObject = (givenURL) => {
        console.log("now in API call search for object: " + givenURL);
        if (givenURL !== '') {
            controller.matchedNameSearch(givenURL)
                .then(data => {
                    this.setState({ received: data });
                })
        }
    }

    findMatchedURL = (fetched, currentNumber, currentOption) => {
        let givenFeatureName = currentOption[currentNumber];
        let foundIndex = _.findIndex(fetched, function (o) { return o.name == givenFeatureName });
        if (foundIndex !== -1) {
            return fetched[foundIndex].url;
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //console.log("state changed so now in shouldComponentUpdate");
    //     //console.log("both: " + nextState.current !== this.state.current && nextState.received !== this.state.received);
    //     return nextState.current !== this.state.current && nextState.received !== this.state.received;
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log('now will update');
    //     if (nextState.fetchedObject !== this.state.fetchedObject) {
    //         console.log("find URL for API call:", nextState.options)
    //         var newURL = this.findMatchedURL(nextState.fetchedObject, nextState.current, nextState.options);
    //         //console.log("url "+newURL);   
    //         this.searchForObject(newURL);
    //     }
    //     // let newURL = this.findMatchedURL(nextState.fetchedObject, nextState.current);
    //     // this.searchForObject(newURL);
    // }

    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let combo = this.props.classObject.classObject.LevelRecipes[this.props.classObject.classLevel - 1];
            controller.initialSearch(this.state.typeName)
                .then(data => {
                    this.firstSearch(data.results, this.state.current, combo);
                })
            var url;
            controller.getUrl(JSON, this.state.links[0])
                .then(data => {
                    url = data
                });
            controller.getElement(url)
                .then(data => {
                    this.setState({ received: data })
                });
        }
    };

    firstSearch = (fetchedData, currentNumber, combo) => {
        let featureUrl = this.findMatchedURL(fetchedData, 1, combo);
        controller.matchedNameSearch(featureUrl)
            .then(data => {
                console.log("after fetched", data);
                this.setState({ pages: combo.length - 1, options: combo, fetchedObject: fetchedData, current: 1, received: data });
            })
    }

    render() {
        // if(this.state.fetchedObject.length > 0) {
        //     //console.log('in');
        //     let newURL = this.findMatchedURL(this.state.fetchedObject,this.state.current);
        //     this.searchForObject(newURL);
        // }
        if (Object.keys(this.state.received).length !== 0) {
            //console.log("found something", this.state.received);
            var para = this.state.received.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (

            <div>
                {this.state.options.length > 0 &&
                    <div>
                        <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                            featureName={this.state.options[this.state.current]} />
                        {para}
                        {/* use the string to find description <p>{this.props.classObject[this.state.current]}</p>*/}
                    </div>}
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
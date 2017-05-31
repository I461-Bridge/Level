import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import Accordion from './Accordion.js'
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
    handleNextFeature = (event) => {
        let next = this.state.current + 1;
        this.setState({ current: next, received: {} });
        //let featureUrl = this.findMatchedURL(this.state.fetchedObject, next, this.state.options);
        this.searchForObject(this.state.options[next]);
    };
    handleBackFeature = (event) => {
        let next = this.state.current - 1;
        this.setState({ current: next, received: {} });
        //let featureUrl = this.findMatchedURL(this.state.fetchedObject, next, this.state.options);
        this.searchForObject(this.state.options[next]);
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
            if (combo.length < 2) {
                this.setState({ redirect: true, path: '/SpellSlots' })
            } else {
                this.firstSearch(combo);
            }
        }

        //     controller.initialSearch(this.state.typeName)
        //         .then(data => {
        //             this.firstSearch(data.results, this.state.current, combo);
        //         })
        // }
    };

    firstSearch = (combo) => {
        //let featureUrl = this.findMatchedURL(fetchedData, 1, combo);
        controller.matchedNameSearch(combo[1])
            .then(data => {
                console.log("after fetched", data);
                this.setState({ pages: combo.length - 1, options: combo, current: 1, received: data });
            })
    }

    render() {

        if (Object.keys(this.state.received).length !== 0) {
            //console.log("found something", this.state.received);
            var para = this.state.received.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName={this.state.received.name} /> </div>
        }

        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (

            <div>
                {header}
                {para}
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
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
            received: undefined,
            typeName: 'features',
            links: ['features', 'http://www.dnd5eapi.co/api/features/2'],
            redirect: false,
            path: '',
            fetchedObject: {}
        };
    }
    handleNextFeature = (event) => {
        var next = this.state.current + 1;
        //console.log("first "+this.state.options[next]);
        this.setState({ current: next, received: {} });
        //console.log('before method '+this.state.current);
        //console.log('obj ', this.state.fetchedObject);

        //this.findMatchedURL(this.state.fetchedObject);
        //console.log('2nd wind: ', foundURL);
        //this.searchForObject(foundURL);

        // controller.initialSearch(this.state.links[next - 1])
        //     .then(data => {
        //         this.setState({ received: data })
        //     })
    };
    handleBackFeature = (event) => {
        var next = this.state.current - 1;
        this.setState({ current: next, received: {} });

        //let foundURL = this.findMatchedURL(this.state.fetchedObject);
        //this.searchForObject(foundURL);
    };
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    searchForObject = (givenURL) => {
        console.log("in search for object: "+ givenURL);
        if (givenURL !== '') {
            controller.matchedNameSearch(givenURL)
                .then(data => {
                    console.log("after: ", data);
                    this.setState({ received: data });
                    console.log(this.state.received);
                })
        }
    }

    findMatchedURL = (fetched, currentNumber,currentOption) => {
        console.log('in method ' + currentNumber);
        var givenFeatureName = currentOption[currentNumber];
        console.log("search ",givenFeatureName);
        var foundIndex = _.findIndex(fetched, function (o) { return o.name == givenFeatureName });
        console.log("index: ", foundIndex);
        if (foundIndex !== -1) {
            return fetched[foundIndex].url;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("hi");
        console.log("both: " + nextState.current !== this.state.current && nextState.received !== this.state.received);
        return nextState.current !== this.state.current && nextState.received !== this.state.received;
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     if(nextProps !== this.props) {
    //         console.log('different prop');
    //         let next = this.state.current + 1;
    //         //console.log("first "+this.state.options[next]);
    //         this.setState({ current: next, received: {} });
    //     }

    // }
    componentWillUpdate(nextProps, nextState) {
        console.log('updated');
        //if(nextState)
        if (nextState.fetchedObject !== this.state.fetchedObject) {
            //console.log(nextState.current);
            console.log("next :",nextState.options)
            var newURL = this.findMatchedURL(nextState.fetchedObject, nextState.current,nextState.options);
            //console.log("url "+newURL);   
            this.searchForObject(newURL);
        }
        // let newURL = this.findMatchedURL(nextState.fetchedObject, nextState.current);
        // this.searchForObject(newURL);
    }
    //componentDidUpdate()
    componentWillMount() {
        console.log("will mount");
        //this.setState({current: 1});
        // if (Object.keys(this.props.classObject).length !== 0) {
        //     let combo = this.props.classObject.classObject.LevelRecipes[this.props.classObject.classLevel - 1];
        //     this.setState({ pages: combo.length - 1, options: combo, current: 1 });
        // controller.initialSearch(this.state.typeName)
        //     .then(data => {
        //         //this.setState({ fetchedObject: data.results });
        //         this.firstSearch(data.results,this.state.current);

        //var foundURL = this.findMatchedURL(data.results,this.state.current);

        //         // var givenFeatureName = this.state.options[this.state.current];
        //         // var foundIndex = _.findIndex(data.results, function (o) { return o.name == givenFeatureName });
        //         // var foundURL = data.results[foundIndex].url;
        //this.searchForObject(foundURL);
        //         //console.log("fetched ", data.results);
        //         //this.setState({ fetchedObject: data});
        //})

        //}
        // let foundURL = this.findMatchedURL(this.state.fetchedObject);
        // this.searchForObject(foundURL);

    };
    firstSearch = (fetchedData, currentNumber, combo) => {
        //this.setState({ pages: combo.length - 1, options: combo});
        console.log("first combo: ", combo);
        this.setState({ pages: combo.length - 1, options: combo, fetchedObject: fetchedData, current: 1, received: {} });

        // var givenFeatureName = this.state.options[currentNumber];
        // var foundIndex = _.findIndex(fetchedData, function (o) { return o.name == givenFeatureName });
        // if (foundIndex !== -1) {
        //     this.searchForObject(fetchedData[foundIndex].url);
        // }
    }


    componentDidMount() {
        //console.log("mounted ", this.state.fetchedObject);
        if (Object.keys(this.props.classObject).length !== 0) {
            console.log('object found')
            let combo = this.props.classObject.classObject.LevelRecipes[this.props.classObject.classLevel - 1];
            //this.setState({ pages: combo.length - 1, options: combo});
            controller.initialSearch(this.state.typeName)
                .then(data => {
                    this.firstSearch(data.results, this.state.current, combo);
                })

            // controller.initialSearch(this.state.typeName)
            //     .then(data => {
            //         this.setState({ fetchedObject: data.results });
            //         var foundURL = this.findMatchedURL(data.results,this.state.current);
            //         this.searchForObject(foundURL);
            //     })
            // let newURL = this.findMatchedURL(nextState.fetchedObject,nextState.current);
            //     this.searchForObject(newURL);
        }
    }
    render() {
        // if(this.state.fetchedObject.length > 0) {
        //     //console.log('in');
        //     let newURL = this.findMatchedURL(this.state.fetchedObject,this.state.current);
        //     this.searchForObject(newURL);
        // }
        if (this.state.received !== undefined) {
            debugger;
            if(this.state.received.desc!==undefined) {
            console.log("there is something");
            var para = this.state.received.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
            }
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
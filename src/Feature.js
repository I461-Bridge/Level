import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import AccordionComponent from './Accordion.js';
import { ProgressBar } from 'react-mdl';


let prevPath = '';

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            options: [],
            current: 0,
            received: {},
            typeName: 'features',
            redirect: false,
            path: '',
            fetchedObject: {},
            choicesObject: []
        };
    }
    handleNextFeature = (event) => {
        let next = this.state.current + 1;
        this.setState({ current: next, received: {}, choicesObject: [] });
        this.searchForObject(this.state.options[next]);
    };
    handleBackFeature = (event) => {
        let next = this.state.current - 1;
        this.setState({ current: next, received: {}, choicesObject: [] });
        this.searchForObject(this.state.options[next]);
    };

    handler = (event) => {
        let path = event.target.value;
        if (!_.has(this.props.classObject.classObject, 'SpellSlots')) {
            if (path !== '/HealthPoints') {
                console.log('last: ',path);
                path = '/Done';
            }
        }
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    searchForObject = (givenURL) => {
        if (givenURL !== '') {
            controller.matchedNameSearch(givenURL)
                .then(data => {
                    this.setState({ received: data });
                })
        }
    }

    // findMatchedURL = (fetched, currentNumber, currentOption) => {
    //     let givenFeatureName = currentOption[currentNumber];
    //     let foundIndex = _.findIndex(fetched, function (o) { return o.name == givenFeatureName });
    //     if (foundIndex !== -1) {
    //         return fetched[foundIndex].url;
    //     }
    // }

    componentWillUnmount() {
        let pathName = this.state.path;
        prevPath = pathName;
    }
    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let combo = this.props.classObject.classObject.LevelRecipes[this.props.classObject.classLevel - 1];
            if (combo.length < 2) {
                if(_.has(this.props.classObject.classObject, 'SpellSlots')) {
                    var redirectPath = '/SpellSlots';
                } else {
                    redirectPath = '/Done';
                }
                if (prevPath === '/SpellSlots') {
                    redirectPath = '/HealthPoints';
                }
                this.setState({ redirect: true, path: redirectPath });
            } else {
                this.firstSearch(combo);
            }
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.received !== this.state.received || nextState.choicesObject !== this.state.choicesObject || nextState.path !== this.state.path;
    }
    componentWillUpdate(nextProps, nextState) {
        let classInformation = nextState.received;
        if (Object.keys(nextState.choicesObject).length === 0) {
            if (_.has(classInformation, 'choice')) {
                let choicesData = [];
                let choicesCount = classInformation.choice.from.length;
                _.forEach(classInformation.choice.from, (each, index) =>
                    controller.matchedNameSearch(each.url)
                        .then(data => {
                            let keyName = each.name;
                            let valueName = data.desc[0];
                            choicesData.push({ [keyName]: valueName });
                            if (choicesData.length === choicesCount) {
                                this.setState({ choicesObject: choicesData });
                            }
                        })
                )
            }
        }
    }

    firstSearch = (combo) => {
        controller.matchedNameSearch(combo[1])
            .then(data => {
                this.setState({ pages: combo.length - 1, options: combo, current: 1, received: data });
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        if (Object.keys(this.state.received).length !== 0) {
            var classInformation = this.state.received;
            var para = classInformation.desc.map(function (data, index) {
                return <p key={index}>{data}</p>
            });
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Step 2: Add New Feature(s)' /> </div>;
        } else {
            return <ProgressBar indeterminate />;
        }
        return (
            <div className='container'>
                {header}
                {Object.keys(this.state.received).length !== 0 &&
                    <div>
                        <div className="container"><strong>Feature Name: </strong> {classInformation.name}</div>
                        <div className="container pageHeader">Feature Description: {para}</div>
                    </div>
                }
                {this.state.choicesObject.length !== 0 && <AccordionComponent description={this.state.choicesObject} />}
                {this.state.current === 1 && this.state.pages > 1 &&
                    <div>
                        <Button onClick={this.handler.bind(this)} value='/HealthPoints' disabled={Object.keys(this.state.received).length === 0}>Back Page</Button>
                        <Button onClick={this.handleNextFeature.bind(this)} disabled={Object.keys(this.state.received).length === 0}>Next</Button>
                    </div>}
                {this.state.current > 1 && this.state.current < this.state.pages &&
                    <div>
                        <Button onClick={this.handleBackFeature} disabled={Object.keys(this.state.received).length === 0}>Back</Button>
                        <Button onClick={this.handleNextFeature.bind(this)} disabled={Object.keys(this.state.received).length === 0}>Next</Button>
                    </div>}
                {this.state.current === this.state.pages && this.state.current > 1 &&
                    <div>
                        <Button onClick={this.handleBackFeature}>Back</Button>
                        <Button onClick={this.handler.bind(this)} value='/SpellSlots' disabled={Object.keys(this.state.received).length === 0}>Next Page</Button>
                    </div>}
                {this.state.pages === 1 &&
                    <div>
                        <Button onClick={this.handler.bind(this)} value='/HealthPoints' disabled={Object.keys(this.state.received).length === 0}>Back Page</Button>
                        <Button onClick={this.handler.bind(this)} value='/SpellSlots' disabled={Object.keys(this.state.received).length === 0}>Next Page</Button>
                    </div>}
            </div>
        );
    }
}
export default Feature;
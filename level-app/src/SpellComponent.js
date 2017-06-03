import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import controller from './Controller';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import AccordionComponent from './Accordion.js';
import SpellsAccordion from './SpellAccordion.js';


class SpellComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: 'spells/?name=',
            redirect: false,
            path: '',
            spellList:[]
        };
    }

    // handleNextFeature = (event) => {
    //     let next = this.state.current + 1;
    //     this.setState({ current: next, received: {}, choicesObject: [] });
    //     this.searchForObject(this.state.options[next]);
    // };
    // handleBackFeature = (event) => {
    //     let next = this.state.current - 1;
    //     this.setState({ current: next, received: {}, choicesObject: [] });
    //     this.searchForObject(this.state.options[next]);
    // };

    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    // searchForObject = (givenURL) => {
    //     console.log("now in API call search for object: " + givenURL);
    //     if (givenURL !== '') {
    //         controller.matchedNameSearch(givenURL)
    //             .then(data => {
    //                 this.setState({ received: data });
    //             })
    //     }
    // }

    // findMatchedURL = (fetched, currentNumber, currentOption) => {
    //     let givenFeatureName = currentOption[currentNumber];
    //     let foundIndex = _.findIndex(fetched, function (o) { return o.name == givenFeatureName });
    //     if (foundIndex !== -1) {
    //         return fetched[foundIndex].url;
    //     }
    // }



    // attempt to api call with spell Name rather than url
    // findSpellUrl = (spellsList) => {
    //     let spellsData = [];
    //         _.forEach(spellsList, function(spellsLevel, index){
    //             let level = index;
    //             _.forEach(spellsLevel, function(spell){
    //                 let spellString = _.split(spell,' ');
    //                 controller.initialSearch(_.join(spellString,'-'))
    //                     .then(data => {
    //                         if(data.results !== undefined) {
    //                         let foundUrl = data.results['0'].url;
    //                         spellsData.push({[spellString]:foundUrl});
    //                             debugger;
    //                         }
    //                     })
    //             })
    //         })
    // }


    // findSpellObject = (spellsList) => {
    //     let spellsData = [];
    //     _.forEach(spellsLevel, function (level) {
    //         _.forEach(level, function (spellName) {
    //             spellsData.push()
    //         })
    //     })
    // }


    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let levelCap = 0;
            _.forEach(this.props.classObject.classObject.SpellSlots[this.props.classObject.classLevel - 1], function (value, i) {
                if (value === 0 && levelCap === 0) {
                    levelCap = i;
                }
            });
            let relevantSpells = _.filter(this.props.classObject.classObject.Spells, function (value, index) {
                return index <= levelCap;
            })
            console.log("spell filter to: ",relevantSpells);
            this.setState({spellList: relevantSpells});
        }
    };
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.spellList !== this.spellList;
    }
    // componentWillUpdate(nextProps, nextState) {
    //     let classInformation = nextState.received;
    //     if (Object.keys(nextState.choicesObject).length === 0) {
    //         if (_.has(classInformation, 'choice')) {
    //             let choicesData = [];
    //             let choicesCount = classInformation.choice.from.length;
    //             _.forEach(classInformation.choice.from, (each, index) =>
    //                 controller.matchedNameSearch(each.url)
    //                     .then(data => {
    //                         let keyName = each.name;
    //                         let valueName = data.desc[0];
    //                         choicesData.push({ [keyName]: valueName });
    //                         if (choicesData.length === choicesCount) {
    //                             this.setState({ choicesObject: choicesData });
    //                         }
    //                     })
    //             )
    //         }
    //     }
    // }

    // firstSearch = (combo) => {
    //     //let featureUrl = this.findMatchedURL(fetchedData, 1, combo);
    //     controller.matchedNameSearch(combo[1])
    //         .then(data => {
    //             this.setState({ pages: combo.length - 1, options: combo, current: 1, received: data });
    //         })
    // }

    render() {
        if(Object.keys(this.state.spellList).length > 0){
            //var fullList = <SpellsAccordion spellsObject={this.props.spellList}/>
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Spells' /> </div>;
        }
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return (
            <div>
                {header}
                {Object.keys(this.state.spellList).length > 0 && <SpellsAccordion spellsObject={this.state.spellList}/>}
                    <div>
                        <Button onClick={this.handler.bind(this)} value='/'>Back Page</Button>
                         <Button onClick={this.handler.bind(this)} value='/Features'>Next Page</Button>
                    </div>
            </div>
        );
    }
}

export default SpellComponent;
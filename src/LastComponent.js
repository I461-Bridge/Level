import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';



class LastComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            path: ''
        };
    }
    handler = (event) => {
        let path = event.target.value;
        //console.log("back: ",path);
        if (!_.has(this.props.classObject.classObject, 'SpellSlots')) {
            if (path !== '/') {
                path = '/Features';
            }
        }
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        return <div className='container'>
            {Object.keys(this.props.classObject).length !== 0 &&
                <div>
                    <p>Congratulations! You are now a Level {this.props.classObject.classLevel} {this.props.classObject.className}!</p>
                    <Button onClick={this.handler.bind(this)} value='/Cantrips'>Back Page</Button>
                    <Button onClick={this.handler.bind(this)} value='/'>Level Up Again</Button>
                </div>
            }
        </div>
    }

}
export default LastComponent;
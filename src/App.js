import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import Feature from './Feature.js';
import {Route, Link, HashRouter } from 'react-router-dom';
import MainSelection from './MainSelection.js';
import { Layout, Header, Drawer, Navigation, Content, IconButton,Icon } from 'react-mdl';
import SpellComponent from './SpellComponent.js';
import CantripComponent from './CantripComponent.js';
import SpellSlotsComponent from './SpellSlotsComponent.js'
import LastComponent from './LastComponent.js';
import HealthPointsComponent from './HealthPointsComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObject: {}
    }
  }
  handleFound = (returnedObject) => {
    this.setState({ selectedObject: returnedObject });
  }
  restart = () => {
    window.location.reload();
  }
  toggle() {
    var d = document.querySelector('.mdl-layout');
    d.MaterialLayout.toggleDrawer();
  }
  render() {
    return (
      <HashRouter>
        <div className="demo-big-content">
          <Layout fixedHeader>
            <Header title="Level" >
                <IconButton onClick={this.toggle} name='dashboard' />
                <Link to='/'onClick={this.restart}  className='biggerIcon' ><Icon name='cached'/></Link>
            </Header>
            <Drawer title="Level Navigation">
              {Object.keys(this.state.selectedObject).length > 0 &&
                <Navigation>
                  <Link to='/HealthPoints'>Increase Health Points</Link>
                  <Link to='/Features'>Add Features</Link>
                  {_.has(this.state.selectedObject.classObject, 'SpellSlots') === true && <Link to='/SpellSlots'>Increase Spell Slots</Link>}
                  {_.has(this.state.selectedObject.classObject, 'SpellSlots') && <Link to='/Spells'>Add/Modify Spells</Link>}
                  {_.has(this.state.selectedObject.classObject, 'SpellSlots') && <Link to='/Cantrips'>Add/Modify Cantrips</Link>}
                </Navigation>}
            </Drawer>
            <Content>
              <div>
                <Route exact path='/' component={(props) => <MainSelection handleFound={this.handleFound} />} />
                <Route path='/HealthPoints' component={(props) => <HealthPointsComponent classObject={this.state.selectedObject} />} />
                <Route path='/Features' component={(props) => <Feature classObject={this.state.selectedObject} />} />
                <Route path='/Spells' component={(props) => <SpellComponent classObject={this.state.selectedObject} />} />
                <Route path='/Cantrips' component={(props) => <CantripComponent classObject={this.state.selectedObject} />} />
                <Route path='/SpellSlots' component={(props) => <SpellSlotsComponent classObject={this.state.selectedObject} />} />
                <Route path='/Done' component={(props) => <LastComponent classObject={this.state.selectedObject} />} />

              </div>
            </Content>
          </Layout>
        </div>
      </HashRouter>
    );

  }
}


export default App;
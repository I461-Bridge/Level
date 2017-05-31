import React, {Component} from 'react';
import SpellSlot from '/SpellSlot.js'
import _ from 'lodash';

class SpellSlotTable extends React.Component {
  render() {
    return (
      <table className="spelltable">
        <thead>
          <tr><th>"Available Spell Slots"</th></tr>
        </thead>
        <tbody>
          <SpellSlot />
        </tbody>
      </table>
    )
  }
}

import { Component } from 'react';

// common tools
import { findItemIndexById } from '../../util/ObjUtil';
// event handler
import EventManager from '../../event/Event';


export const triggers = () => {
  return {
    push: {
      alias: [],
      info: {
        name: 'Push',
        description: 'Adds data at the end to component'
      },
      schema: {}
    },
    delete: {
      alias: [],
      info: {
        name: 'Delete data instance',
        description: 'Removes data from the component'
      },
      schema: {}
    },
    select: {
      alias: [],
      info: {
        name: 'Select item',
        description: 'Selects the data item'
      },
      schema: {}
    }
  }
}

export const events = () => {
  return {
    selected: {
      alias: [],
      info: {
        name: 'Selected',
        description: 'Selecting item'
      },
      schema: {}
    },
    deselected: {
      alias: [],
      info: {
        name: 'De-Selected',
        description: 'Unselecting item'
      },
      schema: {}
    }
  }
}

export class GraphBase extends Component {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { data: props.data || [], series: [], labels: [] };
  }

  extractSeries = (data) => { } // overriden by implementation
  extractLabels = (data) => { } // overriden by implementation
  forceGraphUpdate = () => { } // overriden by implementation

  setGraphState = (state_data, skip_store) => {
    // add old state to new state
    const state = this.state;
    state.data = state_data;
    state.compiled = this.extractSeries(state.data);
    // find out what to update
    if (this.props.type === 'pie' || this.props.type === 'donut' || this.props.type === 'radialBar' || this.props.type === 'polarArea') {
      this.data_structure = 'labels';
      state.series = state.compiled.series[0].data;
      state.options.labels = state.compiled.labels;
    } else {
      this.data_structure = 'series';
      state.options.xaxis = { categories: state.compiled.labels };
      state.series = state.compiled.series;
      if (this.props.type === 'bar') {
        state.options.plotOptions = { bar: { horizontal: true } }
      }
    }
    // check if we need an update (or if used in constructor)
    if (!skip_store) {
      this.setState(state);
      this.forceGraphUpdate();
    }
    return state
  }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    actionHandlers = actionHandlers || {};
    eventHandlers = eventHandlers || {};
    // add our known handlers
    const dataActionHandlers = {
      push: {
        schema: {},
        handler: (objs) => { // append
          const data_state = this.state.data || [];
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            // FIXME: must be a faster way to do this
            const idx = findItemIndexById(obj.id, data_state);
            if (idx === null) {
              data_state.push(obj);
            } else { // update the index
              data_state[idx] = obj;
            }
          });
          // update graph
          this.setGraphState(data_state);
        }
      },
      delete: {
        schema: {},
        handler: (objs) => {
          const data_state = this.state.data || [];
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            // FIXME: must be a faster way to do this
            const idx = findItemIndexById(obj.id, data_state);
            if (idx !== null) {
              delete data_state[idx];
            }
          });
          // update graph
          this.setGraphState(data_state);
        }
      },
      select: {
        schema: {},
        handler: (objs) => {
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            if (obj.id) {
              this.setSelectedId(obj.id);
            }
          });
        }
      }
    }

    // register componenet overiding or adding new event handlers
    this.ddEvent = EventManager.getInstance().register(this.props.id, { ...dataActionHandlers, ...actionHandlers }, { ...events, ...eventHandlers }, component_info);
    return this.ddEvent;
  }

  getData = () => {
    return this.state.data;
  }

  setSelectedId = (idx) => {
    let selectedId = null;
    if (idx >= 0) { selectedId = this.state.data[idx].id; }
    this.setState({ ...this.state, ...{ selectedIndex: idx, selectedId: selectedId } })
  }

  handleSelect = (key, data, index, evt) => {
    if (!evt) { this.setSelectedId(data.id); }
    EventManager.getInstance().addEvent(this.props.id, 'selected', { id: data.id }, evt);
    /*
    if (data.id === this.state.selectedId){
      this.setSelectedId(-1);
      EventManager.getInstance().addEvent(this.props.id, this.eventDD['deselected'].id, {id: data.id}, evt);
    }else{
      if (!evt){this.setSelectedId(index);}
      EventManager.getInstance().addEvent(this.props.id, 'selected',  {id: data.id}, evt);
    }
    */

  }
}

export const schema = {
  '$id': 'https://example.com/list.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'array',
  'items': {
    '$ref': 'list.item.json'
  }
};

export const item = {
  '$id': 'https://example.com/list.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'object',
  'required': ['text'],
  'properties': {
    'text': {
      '$ref': 'list.itemtext.json'
    },
    'avatar': {
      '$ref': 'avatar.schema.json'
    },
    'action': {
      'oneOf': [
        { '$ref': 'button.schema.json' },
        { '$ref': 'list.itemtext.json' },
        // {'$ref': 'form.checkbox.json'}
        // {'$ref': 'form.switch.json'}
      ]
    }
  }
};

export const itemtext = {
  '$id': 'https://example.com/list.itemtext.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item text',
  'type': 'object',
  'properties': {
    'title': {
      'type': 'string'
    },
    'subtitle': {
      'type': 'string'
    }
  }
};

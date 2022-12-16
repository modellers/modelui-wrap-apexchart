// https://apexcharts.com/react-chart-demos/column-charts/basic/
// https://apexcharts.com/docs/react-charts/
// https://www.npmjs.com/package/react-apexcharts
import React from 'react';
// load dash forEach
import { forEach } from 'lodash';
// material ui components
import Chart from "react-apexcharts";// npm install --save react-apexcharts apexcharts
import ApexCharts from 'apexcharts';
// styles
import { withStyles } from '@mui/styles';
import { findItemIndexById } from '../../util/ObjUtil';
import EventManager from '../../event/Event';

import { GraphBase, events as baseEvents, triggers as baseTriggers } from './GraphBase'
export const events = baseEvents;
export const triggers = baseTriggers;


export const options = {
  "id": "SortableTree",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Sortable Tree options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "label": {
      "title": "label",
      "description": "label",
      "type": "string",
      "default": ""
    },
    "color": {
      "title": "color",
      "description": "color",
      "type": "string",
      "enum": ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      "default": "primary"
    },
    "chart_stacked": {
      "title": "chart_stacked",
      "description": "chart_stacked",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["label", "color", "chart_stacked"]
}

export const config = {
  name: "Apex Chart",
  type: "chart",
  author: "Kjartan Jónsson",
  description: "Apex Chart Pie Component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: structs.ListBase.StateList  
}

const style = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white' //theme.palette.background.paper
  },
});

class ApexChartComponent extends GraphBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    if (!props.config.options) {
      props.config.options = {
        chart_stacked: false,
      }
    }
    super(props);

    this.style = props.config.options;
    const self = this;

    this.eventDD = this.registerComponent({}, {}, config);

    this.graph_type = props.type;
    // special case column type
    if (props.type === 'column') {
      this.graph_type = 'bar';
    }

    this.state = {
      data: this.props.data,
      options: {
        chart: {
          id: this.props.id,
          stacked: this.props.stacked,
          events: {
            markerClick: function (event, chartContext, config) {
              // triggers when multiple series
              self.handleSelectionEvents(config, event);
            },
            dataPointSelection: function (event, chartContext, config) {
              // triggers when single series
              self.handleSelectionEvents(config, event);
            }
          }
        }
      }
    }
    this.state = this.setGraphState(this.props.data, true);
  }

  forceGraphUpdate = () => {
    ApexCharts.exec(this.props.id, 'updateOptions', this.state.options, false, true);
  }

  handleSelectionEvents = (config, event) => {
    // triggers when single series
    let itm = null;
    let id = this.state.compiled.series[config.seriesIndex].keys[config.dataPointIndex];
    if (this.state.compiled) {
      itm = this.state.data[findItemIndexById(id, this.state.data)];
    }
    EventManager.getInstance().addEvent(this.props.id, this.eventDD['selected'].id, itm, event);
  }

  extractSeries = (data) => {
    /**
     * Creates labels and array of series based on serie keyword.
     * Making sure that the series dont hav missing data setting
     * those values to default value.
     */
    const labels = {}
    const series = {}
    const indexed = {};

    // extract labels
    forEach(data, (value, idx, array) => {
      if (!labels[value.xaxis]) { labels[value.xaxis] = []; }
      if (!series[value.serie]) { series[value.serie] = { name: value.serie, data: {} }; }
      series[value.serie].data[value.xaxis] = value.yaxis;
      // register index
      if (!indexed[value.serie]) { indexed[value.serie] = {}; }
      indexed[value.serie][value.xaxis] = value.id;
    });
    // review all the data making sure that we save and fill in the gaps
    Object.keys(series).forEach((serie, idxs, array) => {
      Object.keys(labels).forEach((label, idxl, array) => {
        if (!series[serie].data[label]) { // missing value
          series[serie].data[label] = 0; // setting default value for missing serie-label
          indexed[serie][label] = null;
        }
      });
    });
    // build the result
    const result = { series: [], labels: Object.keys(labels) }
    Object.keys(series).forEach((serie, idxs, array) => {
      result.series.push({
        name: serie,
        data: Object.values(series[serie].data),
        keys: Object.values(indexed[serie])
      });
    });
    return result;
  }

  handleEventOnChange = (evt, newValue, oldValue) => {
    this.handleSelect(newValue, { id: newValue.id }, -1);
  }

  setSelectedId = (id) => {
    // find the actual item
    const idx = findItemIndexById(id, this.state.data);
    if (idx !== null) {
      const selected_item = this.state.data[idx];
      // find the category index
      for (var ci = 0; ci < this.state.compiled.labels.length; ci++) {
        if (this.state.compiled.labels[ci] === selected_item.xaxis) { break; }
      }

      // https://apexcharts.com/docs/methods/#exec
      if (this.data_structure === 'labels') {
        ApexCharts.exec(this.props.id, 'toggleDataPointSelection', ci);
      } else if (this.data_structure === 'series') {

        // find the series index
        for (var si = 0; si < this.state.compiled.series.length; si++) {
          if (this.state.compiled.series[si].name === selected_item.serie) { break; }
        }
        ApexCharts.exec(this.props.id, 'toggleDataPointSelection', si, ci);
      }


    } else {
      // TODO: notify does not exist
    }

    //EventManager.getInstance().addEvent(this.props.id, this.eventDD['select'].id,  {id: id}, null);
    // https://apexcharts.com/docs/methods/#toggleDataPointSelection
  }

  setOptions = () => {
    // NOTUSED

    ApexCharts.exec(this.props.id, 'updateOptions', {
      xaxis: {
        labels: {
          show: false
        }
      }
    }, false, true);

  }

  /*

  Support: Line, area, column, bar, candlestickk, pie, polar, bubble, scatter, heat, tree, sparklines

  FORMATS

  Line/Bar Chart: [...{ x: group/date, y: [1]}] -->  (y:[{label:ETC,color:gray, width:1, brush:'stroke/dash', stroke:'', type: 'line/column', makers_size:0}])
  Radar :         [...{ x: group/date, y: [1, 2]}]
  Range Bar Chart:[...{ x: group/date, y: [1, 2]}]
  Radial Bar:     [...{ x: group/date, y: [1]}]
  Tree Map:       [...{ x: group/date, y: [1]}]
  Scatter :       [...{ x: group/date, y: [1]}]
  Donut/Pie :     [...{ x: group/date, y: [1]}]
  Bubble Chart  : [...{ x: group/date, y: [322.3, 11, 22] }]
  Candlestick :   [...{ x: group/date, y: [O,H,L,C] }], [1538856000000, 6593.34, 6600, 6582.63, 6600], [1538856000000, [6593.34, 6600, 6582.63, 6600]],
  Boxplot-Scatter:[...{ x: group/date, y: [O,H,L,C, OUTLIER] }], [1538856000000, 6593.34, 6600, 6582.63, 6600], [1538856000000, [6593.34, 6600, 6582.63, 6600]],

  Heat Map:       [...{ x: group/date},y:[...1]]

  */

  render() {
    return (
      <div>
        <Chart type={this.graph_type} options={this.state.options} series={this.state.series} labels={this.state.labels} width="100%" />
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(ApexChartComponent);

import React from 'react';

// test utils
import { createEventTriggers, createWatchList, createLayoutViewArgumentTypes } from '../../test/utils/StoryUtil'

// components
import {
  ApexColumnChart,
  ApexStackedColumnChart,
  ApexBarChart,
  ApexStackedBarChart,
  ApexAreaChart,
  ApexStackedAreaChart,
  ApexLineChart,
  ApexScatterChart,
  ApexRadarChart,
  ApexPieChart,
  ApexDonutChart,
  ApexPolarChart,
  ApexRadialChart,
} from './Graph';
import { triggers, events, config } from './ApexChartComponent'


/// Test data
const apples = [
  { id: 'apple1991', xaxis: '1991', yaxis: 21 },
  { id: 'apple1992', xaxis: '1992', yaxis: 12 },
  { id: 'apple1993', xaxis: '1993', yaxis: 11 },
  { id: 'apple1994', xaxis: '1994', yaxis: 32 },
  { id: 'apple1995', xaxis: '1995', yaxis: 41 },
  { id: 'apple1996', xaxis: '1996', yaxis: 21 },
  { id: 'apple1997', xaxis: '1997', yaxis: 35 },
  { id: 'apple1998', xaxis: '1998', yaxis: 32 },
  { id: 'apple1999', xaxis: '1999', yaxis: 21 }
]

const apples_add = [
  { id: 'apple1990', xaxis: '1990', yaxis: 10 },
  { id: 'apple1998', xaxis: '1998', yaxis: 12 },
  { id: 'apple2000', xaxis: '2000', yaxis: 33 },
  { id: 'apple2001', xaxis: '2001', yaxis: 56 },
]

const fruits = [
  { id: 'apple1991', serie: 'Apple', xaxis: '1991', yaxis: 21 },
  { id: 'apple1992', serie: 'Apple', xaxis: '1992', yaxis: 12 },
  { id: 'apple1993', serie: 'Apple', xaxis: '1993', yaxis: 11 },
  { id: 'apple1994', serie: 'Apple', xaxis: '1994', yaxis: 32 },
  { id: 'apple1995', serie: 'Apple', xaxis: '1995', yaxis: 41 },
  { id: 'apple1996', serie: 'Apple', xaxis: '1996', yaxis: 21 },
  { id: 'apple1997', serie: 'Apple', xaxis: '1997', yaxis: 35 },
  { id: 'apple1998', serie: 'Apple', xaxis: '1998', yaxis: 32 },
  { id: 'apple1999', serie: 'Apple', xaxis: '1999', yaxis: 21 },
  { id: 'orange1991', serie: 'Orange', xaxis: '1991', yaxis: 31 },
  { id: 'orange1992', serie: 'Orange', xaxis: '1992', yaxis: 45 },
  { id: 'orange1993', serie: 'Orange', xaxis: '1993', yaxis: 35 },
  { id: 'orange1994', serie: 'Orange', xaxis: '1994', yaxis: 12 },
  { id: 'orange1995', serie: 'Orange', xaxis: '1995', yaxis: 15 },
  { id: 'orange1996', serie: 'Orange', xaxis: '1996', yaxis: 31 },
  { id: 'orange1997', serie: 'Orange', xaxis: '1997', yaxis: 45 },
  { id: 'orange1998', serie: 'Orange', xaxis: '1998', yaxis: 42 },
  { id: 'orange1999', serie: 'Orange', xaxis: '1999', yaxis: 31 }
]

const fruits_add = [
  { id: 'orange1990', serie: 'Orange', xaxis: '1990', yaxis: 10 },
  { id: 'apple1990', serie: 'Apple', xaxis: '1990', yaxis: 9 },
  { id: 'orange1998', serie: 'Orange', xaxis: '1998', yaxis: 12 },
  { id: 'apple2000', serie: 'Apple', xaxis: '2000', yaxis: 13 },
  { id: 'orange2000', serie: 'Orange', xaxis: '2000', yaxis: 43 },
  { id: 'banana2000', serie: 'Banana', xaxis: '2000', yaxis: 33 },
  { id: 'orange2001', serie: 'Orange', xaxis: '2001', yaxis: 56 },
  { id: 'banana1996', serie: 'Banana', xaxis: '1996', yaxis: 10 },
  { id: 'banana2001', serie: 'Banana', xaxis: '2001', yaxis: 36 }
]


const fruits_delete = [
  { id: 'orange1990' },
  { id: 'orange2000' },
  { id: 'orange1998' },
  { id: 'apple1998' },
  { id: 'banana2000' },
]


const apple_delete = [
  { id: 'apple1998' }
]

const fruit_select = [
  { id: 'apple1997' }
]

export default {
  title: 'NOTUSED/Apex Chart',
  component: ApexBarChart,
  argTypes: createLayoutViewArgumentTypes(config)
};



export const ColumnBasic = (args) => {
  const test_handler = 'dApexColumnChartComponent_test';
  const component_id = 'ApexColumnChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexColumnChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
ColumnBasic.args = {
}


export const StackedColumnBasic = (args) => {
  const test_handler = 'dApexStackedColumnChartComponent_test';
  const component_id = 'ApexStackedColumnChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexStackedColumnChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
StackedColumnBasic.args = {
}


export const BarBasic = (args) => {
  const test_handler = 'dApexBarChartComponent_test';
  const component_id = 'ApexBarChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexBarChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
BarBasic.args = {
}


export const StackedBarBasic = (args) => {
  const test_handler = 'dApexStackedBarChartComponent_test';
  const component_id = 'ApexStackedBarChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexStackedBarChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
StackedBarBasic.args = {
}


export const AreaBasic = (args) => {
  const test_handler = 'dApexAreaChartComponent_test';
  const component_id = 'ApexAreaChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexAreaChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
AreaBasic.args = {
}


export const StackedAreaBasic = (args) => {
  const test_handler = 'dApexStackedAreaChartComponent_test';
  const component_id = 'ApexAStackedreaChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexStackedAreaChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
StackedAreaBasic.args = {
}


export const ScatterBasic = (args) => {
  const test_handler = 'dApexScatterChartComponent_test';
  const component_id = 'ApexScatterChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexScatterChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
ScatterBasic.args = {
}


export const LineBasic = (args) => {
  const test_handler = 'dApexLineChartComponent_test';
  const component_id = 'ApexLineChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexLineChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
LineBasic.args = {
}


export const RadarBasic = (args) => {
  const test_handler = 'dApexRadarChartComponent_test';
  const component_id = 'ApexRadarChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: fruits_add, delete: fruits_delete, select: fruit_select })}
      <ApexRadarChart
        id={component_id}
        data={fruits}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
RadarBasic.args = {
}


///////////////////////////////////////////////////////////


export const PieBasic = (args) => {
  const test_handler = 'dApexPieChartComponent_test';
  const component_id = 'ApexPieChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: apples_add, delete: apple_delete, select: fruit_select })}
      <ApexPieChart
        id={component_id}
        data={apples}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
PieBasic.args = {
}


export const DonutBasic = (args) => {
  const test_handler = 'dApexDonutChartComponent_test';
  const component_id = 'ApexDonutChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: apples_add, delete: apple_delete, select: fruit_select })}
      <ApexDonutChart
        id={component_id}
        data={apples}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
DonutBasic.args = {
}


export const PolarBasic = (args) => {
  const test_handler = 'dApexPolarChartComponent_test';
  const component_id = 'ApexPolarChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: apples_add, delete: apple_delete, select: fruit_select })}
      <ApexPolarChart
        id={component_id}
        data={apples}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
PolarBasic.args = {
}


export const RadialBasic = (args) => {
  const test_handler = 'dApexRadialChartComponent_test';
  const component_id = 'ApexRadialChart_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, { push: apples_add, delete: apple_delete, select: fruit_select })}
      <ApexRadialChart
        id={component_id}
        data={apples}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
RadialBasic.args = {
}
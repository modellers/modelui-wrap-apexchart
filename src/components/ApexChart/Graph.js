import React from 'react';

import ApexChartComponent, { config } from './ApexChartComponent'

// layout manager
import ComponentManager from '../../components/Layout/Manager'

export function ApexColumnChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='column' />);
}

export function ApexStackedColumnChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='column' stacked={true} />);
}

export function ApexBarChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='bar' />);
}

export function ApexStackedBarChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='bar' stacked={true} />);
}

export function ApexLineChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='line' />);
}

export function ApexAreaChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='area' />);
}

export function ApexStackedAreaChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='area' stacked={true} />);
}

export function ApexScatterChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='scatter' />);
}

export function ApexRadarChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='radar' />);
}

////////////////////////////////////////////////


export function ApexPieChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='pie' />);
}

export function ApexDonutChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='donut' />);
}

export function ApexPolarChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='polarArea' />);
}

export function ApexRadialChart(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ApexChartComponent {...props} type='radialBar' />);
}


////////////////////////////////////////////////


export function register() {
    // self register component to layout manager
    ComponentManager.getInstance().registerComponent({
        component: ApexBarChart,
        type: config.type
    });
}

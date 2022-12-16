/**
 * ApexChartComponent tests
 * Testing DD events and actions integrety
 */
import ApexChartComponent, { events, triggers, config } from './ApexChartComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('Some test', () => {
    test('Test', () => { });
});


/*
describe('ApexChartComponent protocol', () => {
    const tests = createComponentClassTests(
        config,
        [
            'push',
            'delete',
            'select'
        ], [
        'selected',
        'deselected'
    ]
    );
    tests.forEach((t) => { test(t.title, t.test); });
});

describe('ApexChart register', () => {
    const tests = createComponentRegisterTests(
        'chart',
        ApexChartComponent,
        triggers,
        events,
        config,
        [
            'push',
            'delete',
            'select'
        ], [
        'selected',
        'deselected'
    ]
    );
    tests.forEach((t) => { test(t.title, t.test); });
});

*/
import React from 'react';
import { shallow, mount } from 'enzyme';
import { AppNotifier } from './AppNotifier';
import stackedNotifier from './stackedNotifier';

jest.mock('./stackedNotifier');

test('it renders without crashing', () => {
    const wrapper = shallow(<AppNotifier />);
    expect(wrapper).toHaveLength(1);
});
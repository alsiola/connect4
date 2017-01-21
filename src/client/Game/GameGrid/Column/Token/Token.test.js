import React from 'react';
import { shallow } from 'enzyme';

import Token from './Token';

test('it renders without crashing', () => {
    const wrapper = shallow(<Token />);
    expect(wrapper).toHaveLength(1);
});
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

test('it renders without crashing', () => {
    const wrapper = shallow(<App message='' />);
    expect(wrapper).toHaveLength(1);
});
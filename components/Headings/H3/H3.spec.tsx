import * as React from 'react';
import H3 from './H3';

import { shallow } from 'enzyme';

describe('H3', () => {

    test('renders correctly', () => {

        const tree = shallow(
            <H3
                className="myClass"
                style={{color: 'blue'}}
                id={'heading3'}
            >
                Mooskin
            </H3>
        );
        expect(tree).toMatchSnapshot();
    });

    test('renders properly into dom with text, id and class', () => {

        const component = shallow(<H3 id="Campaigns" className="headers">Mooo!</H3>);

        expect(component.find('div').text()).toBe('Mooo!');
        expect(component.find('div').prop('id')).toEqual('Campaigns');
        expect(component.find('div').hasClass('headers')).toBe(true);
    });

});

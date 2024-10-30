import * as React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '@/app/login';

test('rend correctement', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});
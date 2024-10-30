import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>Snapshoto test!</ThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});

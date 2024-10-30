import * as React from 'react';
import renderer from 'react-test-renderer';

import { useAdd } from '../useAdd';

it('return 5 like result', () => {
    const result = useAdd(2, 3);
    expect(result).toBe(50);
});
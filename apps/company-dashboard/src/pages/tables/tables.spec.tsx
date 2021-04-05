import React from 'react';
import { render } from '@testing-library/react';

import Users from './tables';

describe('Tables', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Users />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import Dot from './dot';

describe('Dot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dot />);
    expect(baseElement).toBeTruthy();
  });
});

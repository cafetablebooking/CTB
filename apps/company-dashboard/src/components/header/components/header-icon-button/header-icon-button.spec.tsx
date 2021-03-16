import React from 'react';
import { render } from '@testing-library/react';

import HeaderIconButton from './header-icon-button';

describe('HeaderIconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderIconButton />);
    expect(baseElement).toBeTruthy();
  });
});

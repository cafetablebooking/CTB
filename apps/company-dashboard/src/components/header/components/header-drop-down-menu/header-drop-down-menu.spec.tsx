import React from 'react';
import { render } from '@testing-library/react';

import HeaderDropDownMenu from './header-drop-down-menu';

describe('HeaderDropDownMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderDropDownMenu />);
    expect(baseElement).toBeTruthy();
  });
});

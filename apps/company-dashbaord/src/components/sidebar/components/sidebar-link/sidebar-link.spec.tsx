import React from 'react';
import { render } from '@testing-library/react';

import SidebarLink from './sidebar-link';

describe('SidebarLinkJsx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidebarLink />);
    expect(baseElement).toBeTruthy();
  });
});

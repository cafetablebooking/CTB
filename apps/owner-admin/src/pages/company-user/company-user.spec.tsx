import React from 'react';
import { render } from '@testing-library/react';

import CompanyUser from './company-user';

describe('CompanyUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyUser />);
    expect(baseElement).toBeTruthy();
  });
});

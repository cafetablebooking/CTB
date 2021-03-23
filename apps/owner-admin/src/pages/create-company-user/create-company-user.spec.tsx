import React from 'react';
import { render } from '@testing-library/react';

import CreateCompanyUser from './create-company-user';

describe('CreateCompanyUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCompanyUser />);
    expect(baseElement).toBeTruthy();
  });
});

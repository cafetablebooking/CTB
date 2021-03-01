import React from 'react';
import { render } from '@testing-library/react';

import AuthCrud from './auth-crud';

describe('AuthCrud', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthCrud />);
    expect(baseElement).toBeTruthy();
  });
});

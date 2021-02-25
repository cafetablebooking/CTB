import React from 'react';
import { render } from '@testing-library/react';

import GoogleSignInButton from './google-sign-in-button';

describe('GoogleSignInButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoogleSignInButton />);
    expect(baseElement).toBeTruthy();
  });
});

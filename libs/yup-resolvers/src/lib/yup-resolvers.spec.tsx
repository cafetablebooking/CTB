import React from 'react';
import { render } from '@testing-library/react';

import YupResolvers from './yup-resolvers';

describe('YupResolvers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<YupResolvers />);
    expect(baseElement).toBeTruthy();
  });
});

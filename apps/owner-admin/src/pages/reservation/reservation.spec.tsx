import React from 'react';
import { render } from '@testing-library/react';

import Reservation from './reservation';

describe('Reservation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Reservation />);
    expect(baseElement).toBeTruthy();
  });
});

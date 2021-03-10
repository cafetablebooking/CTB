import React from 'react';
import { render } from '@testing-library/react';

import { useFirestore } from './use-firestore';

describe('UseFirestore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<useFirestore />);
    expect(baseElement).toBeTruthy();
  });
});

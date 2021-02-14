import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AppProps {}

const StyledApp = styled.div`
  color: pink;
`;

export function App(props: AppProps) {
  return (
    <StyledApp>
      <h1>Welcome to App!</h1>
    </StyledApp>
  );
}

export default App;

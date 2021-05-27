import React from 'react';

import styled from 'styled-components';
import Layout from '../../components/layout/layout';

/* eslint-disable-next-line */
export interface ComingSoonProps {}

const StyledComingSoon = styled.div`
  color: pink;
`;

export function ComingSoon(props: ComingSoonProps) {
  return (
    <Layout>
      <h1> Under Construction!</h1>
    </Layout>
  );
}

export default ComingSoon;

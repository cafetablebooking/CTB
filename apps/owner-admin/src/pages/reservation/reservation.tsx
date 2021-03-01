import React from 'react';

import styled from 'styled-components';
import Layout from '../../components/layout/layout';

/* eslint-disable-next-line */
export interface ReservationProps {}

const StyledReservation = styled.div`
  color: pink;
`;

export function Reservation(props: ReservationProps) {
  return (
    <Layout>
      <h1>Welcome to Reservation!</h1>
    </Layout>
  );
}

export default Reservation;

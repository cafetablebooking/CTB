import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NotificationProps {}

const StyledNotification = styled.div`
  color: pink;
`;

export function Notification(props: NotificationProps) {
  return (
    <StyledNotification>
      <h1>Welcome to Notification!</h1>
    </StyledNotification>
  );
}

export default Notification;

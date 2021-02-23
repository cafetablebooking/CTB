import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UserAvatarProps {}

const StyledUserAvatar = styled.div`
  color: pink;
`;

export function UserAvatar(props: UserAvatarProps) {
  return (
    <StyledUserAvatar>
      <h1>Welcome to UserAvatar!</h1>
    </StyledUserAvatar>
  );
}

export default UserAvatar;

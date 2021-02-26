import React from 'react';

import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';
import Image from 'next/image';
/* eslint-disable-next-line */
export interface GoogleSignInButtonProps {
  googleSignInHandler: any;
  text: string;
}

const StyledGoogleSignInButton = styled(Button)`
  padding: 8px;

  height: 56px;
  p {
    margin-left: 10px;
  }
  @media (min-width: 315px) {
    width: 284.6px;
  }
`;
//
export function GoogleSignInButton(props: GoogleSignInButtonProps) {
  return (
    <StyledGoogleSignInButton
      style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 20 }}
      variant="contained"
      color="default"
      onClick={props.googleSignInHandler}
    >
      <Image src="/static/img/signin/Google.svg" width="40" height="40" />
      <p>{props.text}</p>
    </StyledGoogleSignInButton>
  );
}

export default GoogleSignInButton;

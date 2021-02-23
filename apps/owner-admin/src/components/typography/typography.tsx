import React from 'react';
import {
  Typography as TypographyBase,
  TypographyProps,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import styled from 'styled-components';
import { getColor, getFontSize, getFontWeight } from '../../utility/helper';

/* eslint-disable-next-line */
export interface TypographyPropsType extends TypographyProps {
  children?: React.ReactNode | string;
  weight?: string;
  size?: string;
  colorBrightness?: string;
  clr?: string;
  component?: React.ElementType;
  href?: string;
}

// const StyledTypography = styled.div`
//   color: pink;
// `;

export function Typography({
  children,
  weight,
  size,
  colorBrightness,
  clr,
  variant,
  component,
  href,
}: TypographyPropsType) {
  const theme = useTheme();
  return (
    <TypographyBase
      style={{
        color: getColor(clr, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, variant, theme),
      }}
      component={component}
      href={href}
    >
      {children}
    </TypographyBase>
  );
}

export default Typography;

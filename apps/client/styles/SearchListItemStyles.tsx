import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 4px;
  }
`;

export const ListItem = styled(Box)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.6));
  transition: all 0.1s ease-in;
`;
export const ListItemDetails = styled(Box)`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

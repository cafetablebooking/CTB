import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { TransitionGroup } from 'react-transition-group';

export const StyledTransitionGroup = styled(TransitionGroup)`
  .remove-btn {
    margin-right: 0.5rem;
  }

  .item-enter {
    opacity: 0;
  }
  .item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .item-exit {
    opacity: 1;
  }
  .item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;
export const Search = styled(Box)`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #fff;
  a {
    text-decoration: none;
    color: inherit;
  }
  @media (min-width: 768px) {
    margin-top: 86px;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
export const SearchList = styled(Box)`
  min-width: 300px;
  width: 40%;
  margin: 1rem 3em 0 3em;
`;
export const SearchListTop = styled(Box)`
  display: flex;

  justify-content: space-between;
  margin: 10px 10px 50px 10px;
`;

export const Wrapper = styled.div`
  position: fixed;
  display: none;
  width: 50vw;
  @media (min-width: 768px) {
    display: block;
  }
  height: 700px;
  right: 0;
`;

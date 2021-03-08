import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import SearchBoxComponent from './SearchBoxComponent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Image from 'next/image';
/* eslint-disable-next-line */
interface HeaderProps {}

function Header(props: HeaderProps) {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const router = useRouter();
  const isActive = (string) => {
    let isEqual: string = '';
    if (router.pathname === string) {
      isEqual = 'true';
    } else {
      isEqual = 'false';
    }
    return isEqual;
  };

  const renderAnchorContent = (string) => {
    let renderAnchorContent = null;

    let imageSrc = '';

    if (!isDesktop) {
      if (string === 'Home') {
        isActive('/') === 'true'
          ? (imageSrc = '/static/links/Home-active.svg')
          : (imageSrc = '/static/links/Home.svg');
      } else if (string === 'Login') {
        isActive('/signIn') === 'true'
          ? (imageSrc = '/static/links/User-active.svg')
          : (imageSrc = '/static/links/User.svg');
      }
      renderAnchorContent = <LinkIcon image={imageSrc} />;
    } else {
      renderAnchorContent = string;
    }
    return renderAnchorContent;
  };
  return (
    <StyledHeader>
      <HeaderUpper>
        <Logotype>
          <Link href="/">
            <Image
              width="70"
              height="70"
              src="/static/img/logo/header-logotype.png"
              alt="Table booking logotype"
            />
          </Link>
        </Logotype>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <Anchor active={isActive('/')}>
                  {renderAnchorContent('Home')}
                </Anchor>
              </Link>
            </li>
            {isDesktop && (
              <li>
                <Link href="/connectBusiness">
                  <Anchor active={isActive('/connectBusiness')}>
                    {renderAnchorContent('Connect')}
                  </Anchor>
                </Link>
              </li>
            )}
            <li>
              <Link href="/signIn">
                <Anchor active={isActive('/signIn')}>
                  {renderAnchorContent('Login')}
                </Anchor>
              </Link>
            </li>
          </ul>
        </nav>
      </HeaderUpper>

      <SearchBoxComponent isHeader={true} />
    </StyledHeader>
  );
}
const Logotype = styled.div`
  margin-left: 4vw;
  cursor: pointer;
`;
const LinkIcon = styled.div`
  clip-path: circle(50%);
  padding: 6px;
  background: ${(props) => `url(${props.image}) no-repeat center`};
  width: 30px;
  height: 30px;
  object-fit: contain;
`;
const StyledHeader = styled.header`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.6);
  justify-content: space-between;
  border-bottom: 1px solid #5c5c5c;

  nav {
    margin-right: 4vw;
    ul {
      display: flex;
      margin: 0;
      padding: 0;

      li {
        margin-left: 4vw;
        list-style: none;
      }
    }
  }
`;
const Anchor = styled.a`
  color: ${(props) => (props.active === 'true' ? '#A3894C' : '#f5f5f5')};
  text-decoration: none;
  cursor: pointer;
`;

const HeaderUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Header;

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import SearchBoxComponent from './SearchBoxComponent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Image from 'next/image';
import { Home, Login } from './IconComponents';

/* eslint-disable-next-line */
interface HeaderProps {}
type IconType = 'Home' | 'Login';

const ValueMap: { [value in IconType]: any } = {
  Home,
  Login,
} as const;
function Header(props: HeaderProps) {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const router = useRouter();

  const linkData = [
    { id: 0, title: 'Home', linkHref: '/' },
    { id: 1, title: 'Connect Business', linkHref: '/connectBusiness' },
    { id: 2, title: 'Login', linkHref: '/signIn' },
  ];

  const renderLinks = linkData.map((item) => {
    console.log(router.pathname);

    const Icon = ValueMap[item.title];
    // eslint-disable-next-line array-callback-return
    if (!isDesktop && item.linkHref === '/connectBusiness') return;

    const isActive = router.pathname === item.linkHref;
    const renderContent = isDesktop ? (
      item.title
    ) : (
      <Icon key={item.id} color={isActive ? '#A3894C' : 'white'} />
    );
    console.log(isActive);

    return (
      <li key={item.id}>
        <Link href={item.linkHref}>
          <Anchor active={isActive}>{renderContent}</Anchor>
        </Link>
      </li>
    );
  });

  return (
    <StyledHeader>
      <HeaderUpper>
        <Link href="/">
          <Logotype>
            <Image
              width="70"
              height="70"
              src="/static/img/logo/header-logotype.png"
              alt="Table booking logotype"
            />
          </Logotype>
        </Link>
        <nav>
          <ul>{renderLinks}</ul>
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
  color: ${(props) => (props.active ? '#A3894C' : '#f5f5f5')};
  text-decoration: none;
  cursor: pointer;
`;

const HeaderUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Header;

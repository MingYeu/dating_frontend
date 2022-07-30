import { useState } from 'react';
import styled from 'styled-components';
import React from 'react'
import Header from './Header';
import Navigation from './Navigation';
import ContentWrapper from './ContentWrapper';
import { User } from '../../types/user';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div<ContainerProps>`
  background-color: rgb(242, 242, 242);
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.openMenu ? "25rem" : "0"};
  transition: margin-left .15s ease-in;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;

type LayoutProps = {
  children: React.ReactNode;
  heading: string;
  user: User;
};

export type ContainerProps = {
  openMenu: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, heading, user }) => {
  const [openMenu, setOpenMenu] = useState(true);

  const onOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Container>
      <Navigation openMenu={openMenu} user={user} />
      <Content className='center' openMenu={openMenu}>
        <Header openMenu={openMenu} onOpenMenu={onOpenMenu} username={user.username} />
        <ContentWrapper heading={heading}>
          {children}
        </ContentWrapper>
      </Content>
    </Container>
  );
};


// # Create Container

interface CreateProps {
    children: React.ReactNode;
}

const CreateStyle = styled.div`
    overflow: hidden;
    clear: both;
    .right {
        float: right;
    }
`

export const CreateContainer: React.FC<CreateProps> = ({ children}) => {
  return (
    <CreateStyle>
        <div className="right">
            {children}
        </div>
    </CreateStyle>
  );
}

export default Layout;
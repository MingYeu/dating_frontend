import { useState } from 'react';
import router from 'next/router';
import styled from 'styled-components';
import React from 'react'
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6.4rem;
`;

const MenuIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.4rem;
  width: 6.4rem;
  min-width: 6.4rem;
  > svg {
    height: 2.3rem;
    width: 2.3rem;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
    }
  }
`;

const UserMenu = styled.div`
  width: 100%;
  > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 6.4rem;
    width: 100%;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, .85);
    padding-right: 1rem;
  }
  .user-icon {
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
    color: rgba(0, 0, 0, .85);
  }  
  svg:last-child {
    height: 2.5rem;
    width: 2.5rem;
    margin-left: .5rem;
    color: rgba(0, 0, 0, .85);
    &:hover {
      cursor: pointer;
    }
  }
`;

const LogoutButton = styled.div`
  float: right;
  background-color: #fff;
  margin-right: 1rem;
  border-radius: 3px;
  position: relative;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.4rem;
    width: 10rem;
    text-align: center;
    font-size: 1.5rem;
    margin: .3rem 0;
    color: rgba(0, 0, 0, .85);
    div {
      width: 5rem;
    }
    &:hover {
      cursor: pointer;
      background-color: #d3d3d3;
    }
  }
  svg {
    height: 2rem;
    width: 2rem;
    margin-right: .5rem;
    color: rgba(0, 0, 0, .85);
  }
`;

type HeaderProps = {
  openMenu: boolean;
  onOpenMenu: Function;
  username: string;
};

const Header: React.FC<HeaderProps> = ({ openMenu, onOpenMenu, username }) => {
  const [logoutMenu, setLogoutMenu] = useState(false);


  function logoutHandler() {
    async function logout() {
      await fetch(process.env.apiURL + "/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(result => {
          if (result.ok) {
            router.push("/");
          }
        });
    }
    logout();
  }

  return (
    <Container>
      <MenuIcon>
        {openMenu ? <AiOutlineMenuFold onClick={() => { onOpenMenu(); }} /> : <AiOutlineMenuUnfold onClick={() => { onOpenMenu(); }} />}
      </MenuIcon>
      <UserMenu>
        <span>
          <FaUserCircle className='user-icon' />
          <span>{username}</span>
          <RiArrowDownSFill onClick={() => { setLogoutMenu(!logoutMenu); }} />
        </span>
        {logoutMenu && <LogoutButton onClick={logoutHandler}>
          <div>
            <AiOutlineLogout />
            <div>Logout</div>
          </div>
        </LogoutButton>}
      </UserMenu>
    </Container>
  );
};

export default Header;
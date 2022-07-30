import Link from 'next/link';
import styled from 'styled-components';
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdRecommend } from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoShieldCheckmarkOutline, IoSettingsOutline } from 'react-icons/io5';
import { GrUserSettings } from "react-icons/gr";
import { BiBuildings } from "react-icons/bi";

import { ContainerProps } from './Layout';
import { User } from '../../types/user';
import { useState } from 'react';

const Container = styled.div<SettingProps>`
  flex-direction: row;
  height: 100vh;
  width: 25rem;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  z-index: 1;
  transform: ${props => props.openMenu ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all .15s ease-in;
  opacity: ${props => props.openMenu ? '1' : '0'};
  pointer-events: ${props => props.openMenu ? 'auto' : 'none'};
  visibility: ${props => props.openMenu ? 'visible' : 'hidden'};
  
  img {
    // width: 100%;
    height: 120px;
    width: 140px;
    // padding-left: 20px;
    // margin-left: 30px;
    // margin-top: 30px;
    margin: 30px 0 10px 50px;
  }
  
  .dropdown-menu-option {
    grid-template-columns: 10fr 80fr 10fr;
  }
  
  .dropdown-menu-div {
    background-color: #EEE;
    opacity: ${props => props.openSettings ? '1' : '0'};
    pointer-events: ${props => props.openSettings ? 'auto' : 'none'};
    visibility: ${props => props.openSettings ? 'visible' : 'hidden'};

    > div {
      padding-left: 5.5rem;
    }
  }

  h1{
    color: pinkie;
    padding-left: 20px;
  }
`;

const MenuOption = styled.div`
  display: grid;
  grid-template-columns: 10fr 90fr;
  gap: 1rem;
  padding: 1rem 2.5rem;
  transition: all 0.3s;
  margin: 7.5px 0;
  
  &:hover {
    cursor: pointer;
    color: #1890ff;

    a {
      cursor: pointer;
      color: #1890ff; 
    }
  }
  
  svg {
    width: 2rem;
    height: 2rem;
  }
  
  a {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, .85);
    transition: all 0.3s;

    span {
      font-size: 1.45rem;
    }
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface NavigationProps extends ContainerProps {
  user: User;
}

interface SettingProps extends ContainerProps {
  openSettings: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ openMenu, user }) => {
  const [openSettings, setOpenSettings] = useState(false);

  const role = user;

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <Container openMenu={openMenu} openSettings={openSettings}>
      <div className='logo'>
        <img src="dating_logo.png" alt="" />
      </div>
      <h1>My Area</h1>
      <MenuList>
        <Link href={'/dashboard'}>
          <MenuOption>
            <AiOutlineDashboard />
            <a>
              <span>Dashboard</span>
            </a>
          </MenuOption>
        </Link>
        {role["role"] == "Admin" && <Link href={'/users'}>         
          <MenuOption>
            <AiOutlineUser />
            <a>
              <span>User</span>
            </a>
          </MenuOption>
        </Link>} 
        
        {role["role"] == "User" && <Link href={'/recommendition'}>
          <MenuOption>
            <MdRecommend />
            <a>
              <span>Recommendition</span>
            </a>
          </MenuOption>
        </Link>}
        {role["role"] == "User" && <Link href={'/mymatch'}>
          <MenuOption>
            <GiLoveMystery />
            <a>
              <span>My Match</span>
            </a>
          </MenuOption>
        </Link>}
        <Link href={'/myprofile'}>
          <MenuOption>
            <AiOutlineUser />
            <a>
              <span>My Profile</span>
            </a>
          </MenuOption>
        </Link>
        {/* <MenuOption className='dropdown-menu-option' onClick={handleOpenSettings}>
          <IoSettingsOutline />
          <a>
            <span>Settings</span>
          </a>
          {openSettings ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </MenuOption>
        <div className='dropdown-menu-div'>
          <Link href={'/settings/role'}>
            <MenuOption>
              <AiOutlineUsergroupAdd />
              <a>
                <span>Roles</span>
              </a>
            </MenuOption>
          </Link>
          <Link href={'/settings/branch'}>
            <MenuOption>
              <BiBuildings />
              <a>
                <span>Branches</span>
              </a>
            </MenuOption>
          </Link>
        </div> */}
      </MenuList>
    </Container>
  );
};

export default Navigation;
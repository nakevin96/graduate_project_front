import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/all';

import projectLogo from '../../assets/images/logo.png';
import { ConnectWalletButton } from './connect-wallet-button';

const MENU_LIST = ['스왑', '유니온'];
const MENU_LINK = { 스왑: '/swap', 유니온: '/union' };
const selectedStyle = `text-[#0ea5e9] font-bold underline underline-offset-4`;
const NavbarItem = ({ title, classProps }) => {
  return (
    <li
      className={`py-4 px-6 cursor-pointer rounded-lg ${classProps} ${
        MENU_LINK[title] === window.location.pathname ? selectedStyle : null
      } hover:bg-[#353547] transition ease-in-out delay-100 hover:-translate-y-[-0.125rem] hover:scale-105 duration-150`}
    >
      {title}
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex px-12 md:justify-center justify-between items-center p-2 bg-nav border-b-2 border-[#383241]">
      <div className="md:flex-[0.8] flex-initial justify-center items-center">
        <div className="w-32">
          <Link to="/">
            <img src={projectLogo} alt="logo" className="h-8 cursor-pointer" />
          </Link>
        </div>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {MENU_LIST.map((item, index) => (
          <Link key={item + index + 'link'} to={MENU_LINK[item]}>
            <NavbarItem key={item + index} title={item} />
          </Link>
        ))}
      </ul>
      <ConnectWalletButton />
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {MENU_LIST.map((item, index) => (
              <Link key={item + index + 'link'} to={MENU_LINK[item]}>
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                />
              </Link>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
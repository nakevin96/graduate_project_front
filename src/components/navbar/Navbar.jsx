import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/all';
import { useState } from 'react';

import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';

import projectLogo from '../../assets/images/logo.png';

const MENU_LIST = ['스왑', '스테이지'];
const MENU_LINK = { 스왑: '/swap', 스테이지: '/stage' };

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex px-12 md:justify-center justify-between items-center p-4 bg-nav border-b-2 border-[#383241]">
      <div className="md:flex-[0.6] flex-initial justify-center items-center">
        <Link to="/">
          <img src={projectLogo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {MENU_LIST.map((item, index) => (
          <Link key={item + index + 'link'} to={MENU_LINK[item]}>
            <NavbarItem key={item + index} title={item} />
          </Link>
        ))}
      </ul>
      <span className="ml-auto md:ml-0">
        <button
          className={`text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 px-7 mx-4 rounded-full 
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
        >
          지갑 연결
        </button>
      </span>
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
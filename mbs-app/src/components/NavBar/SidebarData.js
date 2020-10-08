import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Bettings',
    path: '/',
    icon: <AiIcons.AiFillEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Standings',
    path: '/standings',
    icon: <IoIcons.IoIosBook />,
    cName: 'nav-text'
  },
  {
    title: 'Matches',
    path: '/matches',
    icon: <IoIcons.IoIosFootball />,
    cName: 'nav-text'
  }
];

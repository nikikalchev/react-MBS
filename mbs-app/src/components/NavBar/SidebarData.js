import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'About',
    path: '/',
    icon: <IoIcons.IoIosInformationCircle />,
    cName: 'nav-text',
    roles: ['admin','registered','anonymous']
  },
  {
    title: 'Bettings',
    path: '/betting',
    icon: <AiIcons.AiFillEdit />,
    cName: 'nav-text',
    roles: ['admin','registered','anonymous']
  },
  {
    title: 'Standings',
    path: '/standings',
    icon: <IoIcons.IoIosBook />,
    cName: 'nav-text',
    roles: ['admin','registered','anonymous']
  },
  {
    title: 'Matches',
    path: '/matches',
    icon: <IoIcons.IoIosFootball />,
    cName: 'nav-text',
    roles: ['admin']
  },
  {
    title: 'Users',
    path: '/users',
    icon: <IoIcons.IoIosPerson />,
    cName: 'nav-text',
    roles: ['admin']
  }
];

import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'About',
    path: '/',
    icon: <IoIcons.IoIosInformationCircle />,
    cName: 'nav-text',
    roles: ['admin','Registered','anonymous']
  },
  {
    title: 'Bettings',
    path: '/betting',
    icon: <AiIcons.AiFillEdit />,
    cName: 'nav-text',
    roles: ['admin','Registered']
  },
  {
    title: 'Standings',
    path: '/standings',
    icon: <IoIcons.IoIosBook />,
    cName: 'nav-text',
    roles: ['admin','Registered','anonymous']
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
    icon: <IoIcons.IoMdPersonAdd />,
    cName: 'nav-text',
    roles: ['admin']
  },
  {
    title: 'Personal Info',
    path: '/info',
    icon: <IoIcons.IoMdPerson />,
    cName: 'nav-text',
    roles: ['admin','Registered']
  }
];

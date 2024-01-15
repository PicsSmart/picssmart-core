// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  type: 'group',
  children: [
    {
      id: 'home1',
      title: 'Home',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'albums1',
      title: 'Albums',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'favourites1',
      title: 'Favourites',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'labels1',
      title: 'Labels',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'people1',
      title: 'People',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },

  ]
};

export default pages;

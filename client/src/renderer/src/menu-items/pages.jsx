// assets
import { Home, Folder, AccountCircle, Star, Label, Search } from '@mui/icons-material';

// icons
const icons = {
  HomeIcon: Home,
  FolderIcon: Folder,
  AccountCircleIcon: AccountCircle,
  StarIcon: Star,
  LabelIcon: Label,
  SearchIcon: Search
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'tabs',
  type: 'group',
  children: [
    {
      id: 'home1',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: icons.HomeIcon,
      target: false
    },
    {
      id: 'albums1',
      title: 'Albums',
      type: 'item',
      url: '/albums',
      icon: icons.FolderIcon,
      target: false
    },
    {
      id: 'people1',
      title: 'People',
      type: 'item',
      url: '/people',
      icon: icons.AccountCircleIcon,
      target: false
    },
    {
      id: 'search1',
      title: 'Search',
      type: 'item',
      url: '/search',
      icon: icons.SearchIcon,
    }
    // {
    //   id: 'favourites1',
    //   title: 'Favourites',
    //   type: 'item',
    //   url: '/favourites',
    //   icon: icons.StarIcon,
    //   target: false
    // },
    // {
    //   id: 'labels1',
    //   title: 'Labels',
    //   type: 'item',
    //   url: '/labels',
    //   icon: icons.LabelIcon,
    //   target: false
    // }
  ]
};

export default pages;

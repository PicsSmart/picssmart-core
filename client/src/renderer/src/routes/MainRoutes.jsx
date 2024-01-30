import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const Home = Loadable(lazy(() => import('../pages/Home')));
const Albums = Loadable(lazy(() => import('../pages/Albums')));
const Labels = Loadable(lazy(() => import('../pages/Labels')));
const People = Loadable(lazy(() => import('../pages/People')));
const Person = Loadable(lazy(() => import('../pages/Person')));
const Favourites = Loadable(lazy(() => import('../pages/Favourites')));
const AlbumView = Loadable(lazy(() => import('../pages/AlbumView')));
const LabelView = Loadable(lazy(() => import('../pages/LabelView')));
const Search = Loadable(lazy(() => import('../pages/Search')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'albums',
      element: <Albums />
    },
    {
      path: 'labels',
      element: <Labels />
    },
    {
      path: 'people',
      element: <People />
    },
    {
      path: 'people/:id',
      element: <Person />
    },
    {
      path: 'favourites',
      element: <Favourites />
    },
    {
      path: 'albums/:id',
      element: <AlbumView />
    },
    {
      path: 'labels/:id',
      element: <LabelView />
    },
    {
      path: 'search/',
      element: <Search />
    }
  ]
};

export default MainRoutes;

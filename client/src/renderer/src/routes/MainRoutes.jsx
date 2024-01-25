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

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));

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
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
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
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
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
    }
  ]
};

export default MainRoutes;

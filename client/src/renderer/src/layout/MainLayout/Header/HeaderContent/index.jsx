// material-ui
import { Box } from '@mui/material';
// project import
import Search from './Search';
import FolderMountComponent from '../../../../components/FolderMount';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {

  return (
    <>
      <Search />
      <Box sx={{ width: '100%', ml: 1 }} />
        <FolderMountComponent />
    </>
  );
};

export default HeaderContent;

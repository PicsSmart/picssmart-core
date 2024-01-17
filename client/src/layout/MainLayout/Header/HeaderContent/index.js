// material-ui
import { Box, Button, useMediaQuery, IconButton } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// project import
import Search from './Search';
// import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      <Search />
      <Box sx={{ width: '100%', ml: 1 }} />

      {/* make the text dissapear when the breakpoint is reached */}

      {!matchesXs && (
        <Button component="label" variant="contained" color="picsmart" sx={{ width: '30%' }} startIcon={<CreateNewFolderIcon />}>
          Mount Storage
        </Button>
      )}

      {matchesXs && (
        <IconButton aria-label="mount" size="large" sx={{ color: 'white' }}>
          <CreateNewFolderIcon />
        </IconButton>
      )}
      {/* <Profile /> */}
    </>
  );
};

export default HeaderContent;

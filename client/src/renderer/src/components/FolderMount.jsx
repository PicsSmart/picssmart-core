import React, { useState } from 'react';
import { Button, useMediaQuery, IconButton } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import useApi from '../services/hooks/useApi';
import axios from 'axios';


const FileMountComponent = () => {
  async function openFolder() {
    const folderPath = await window.electronAPI.openFolder();
    // console.log(folderPath);

    // make a call to the backend to mount the folder
    // for now, just copy the contents of the folder to the data folder in backend
    if (folderPath === undefined) {
      console.log('No folder selected');
      return;
    }
    const res = await axios.post('http://localhost:8000/mount_album', {folderPath})
    // console.log(res.data);
  }

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div>
      {!matchesXs && (
        <Button variant="contained" color="picsmart" sx={{ width: '100%', whiteSpace: 'nowrap' }} startIcon={<CreateNewFolderIcon />} onClick={openFolder}>
          Mount Storage
        </Button>
      )}

      {/* make the text dissapear when the breakpoint is reached */}

      {matchesXs && (
        <IconButton aria-label="mount" size="large" sx={{ color: 'white' }} onClick={openFolder}>
          <CreateNewFolderIcon />
        </IconButton>
      )}

    </div>
  );
};

export default FileMountComponent;

import { Grid } from '@mui/material';
import SceneCard from './SceneCard';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function SceneGallery({ scenes }) {
  const [page, setPage] = useState(1);
  const [currentScenes, setCurrentScenes] = useState(scenes?.slice((page-1)*10, page*10));

  useEffect(() => {
    setCurrentScenes(scenes?.slice((page-1)*10, page*10));
  }, [page, scenes]);

  const navigate = useNavigate();

  const onClickHandler = (name) => {
    navigate(`/scenary/${name}`);
  }

  return (
    <>
      {scenes&&<Pagination count={Math.ceil(scenes?.length/10)} defaultPage={1} color="picsmart" onChange={(e, value)=>{setPage(value)}} />}    
      <Grid container rowSpacing={1} columnSpacing={1} columns={{ xs: 2, md: 4, lg: 5 }} mt={2}>
        {currentScenes?.map((scene) => (
          <Grid item key={scene} onClick={()=>{onClickHandler(scene)}}>
            <SceneCard scene={scene} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

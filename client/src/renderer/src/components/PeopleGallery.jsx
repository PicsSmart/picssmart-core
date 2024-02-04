import { Grid } from '@mui/material';
import PeopleCard from './PeopleCard';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function PeopleGallery({ faces }) {

  const [page, setPage] = useState(1);
  const [currentFaces, setCurrentFaces] = useState(faces?.slice((page-1)*15, page*15));

  useEffect(() => {
    setCurrentFaces(faces?.slice((page-1)*15, page*15));
  }, [page, faces]);

  const navigate = useNavigate();

  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  }

  return (
    <>
      {faces&&<Pagination count={Math.ceil(faces?.length/15)} defaultPage={1} color="picsmart" onChange={(e, value)=>{setPage(value)}} />}    
      <Grid container rowSpacing={1} columnSpacing={1} columns={{ xs: 2, md: 4, lg: 5 }} mt={2}>
        {currentFaces?.map((face) => (
          <Grid item key={face._id} onClick={()=>{onClickHandler(face._id)}}>
            <PeopleCard data={face} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

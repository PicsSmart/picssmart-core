import { Grid } from '@mui/material';
import PeopleCard from './PeopleCard';

import { useNavigate } from 'react-router-dom';

export default function PeopleGallery({ faces }) {

  const navigate = useNavigate();

  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={1} columns={{ xs: 2, md: 4, lg: 5 }}>
      {faces?.map((face) => (
        <Grid item key={face._id} onClick={()=>{onClickHandler(face._id)}}>
          <PeopleCard data={face} />
        </Grid>
      ))}
    </Grid>
  );
}

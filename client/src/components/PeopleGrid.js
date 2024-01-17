import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PeopleCard from './PeopleCard';

const PeopleGrid = ({ data, onClickHandler }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data && data.length != 0 ? (
          data.map((row) => (
            <Grid item xs={6} sm={3} md={2} key={row.id} onClick={() => onClickHandler(row.id)}>
              <PeopleCard data={row} />
            </Grid>
          ))
        ) : (
          <div>No results found</div>
        )}

      </Grid>
    </Box>
  );
}

export default PeopleGrid;

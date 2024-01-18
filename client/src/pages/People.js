import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleCard from 'components/PeopleCard';

import { useNavigate } from 'react-router-dom';

const People = () => {
  const navigate = useNavigate();
  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  };

  // dummy data
  const peopleItems = [
    {
      id: 1,
      face: 'https://picsum.photos/200',
      name: 'John Doe',
      photoCount: 20,
      favouriteCount: 5
    },
    {
      id: 2,
      face: 'https://picsum.photos/200',
      name: 'Jane Doe',
      photoCount: 104,
      favouriteCount: 56
    },
    {
      id: 3,
      face: 'https://picsum.photos/200',
      name: 'Bob Doe',
      photoCount: 132,
      favouriteCount: 97
    },
    {
      id: 4,
      face: 'https://picsum.photos/200',
      name: 'John Doe',
      photoCount: 20,
      favouriteCount: 5
    },
    {
      id: 5,
      face: 'https://picsum.photos/200',
      name: 'Jane Doe',
      photoCount: 104,
      favouriteCount: 56
    },
    {
      id: 6,
      face: 'https://picsum.photos/200',
      name: 'Bob Doe',
      photoCount: 132,
      favouriteCount: 97
    },
    {
      id: 7,
      face: 'https://picsum.photos/200',
      name: 'John Doe',
      photoCount: 20,
      favouriteCount: 5
    },
    {
      id: 8,
      face: 'https://picsum.photos/200',
      name: 'Jane Doe',
      photoCount: 104,
      favouriteCount: 56
    },
    {
      id: 9,
      face: 'https://picsum.photos/200',
      name: 'Bob Doe',
      photoCount: 132,
      favouriteCount: 97
    },
    {
      id: 10,
      face: 'https://picsum.photos/200',
      name: 'John Doe',
      photoCount: 20,
      favouriteCount: 5
    },
    {
      id: 11,
      face: 'https://picsum.photos/200',
      name: 'Jane Doe',
      photoCount: 104,
      favouriteCount: 56
    },
    {
      id: 12,
      face: 'https://picsum.photos/200',
      name: 'Bob Doe',
      photoCount: 132,
      favouriteCount: 97
    },
    {
      id: 13,
      face: 'https://picsum.photos/200',
      name: 'John Doe',
      photoCount: 20,
      favouriteCount: 5
    },
    {
      id: 14,
      face: 'https://picsum.photos/200',
      name: 'Jane Doe',
      photoCount: 104,
      favouriteCount: 56
    },
    {
      id: 15,
      face: 'https://picsum.photos/200',
      name: 'Bob Doe',
      photoCount: 132,
      favouriteCount: 97
    }
  ];

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {peopleItems && peopleItems.length != 0 ? (
            peopleItems.map((row) => (
              <Grid item xs={6} sm={3} md={2} key={row.id} onClick={() => onClickHandler(row.id)}>
                <PeopleCard data={row} />
              </Grid>
            ))
          ) : (
            <div>No results found</div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default People;

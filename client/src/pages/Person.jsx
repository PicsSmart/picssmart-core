import { useParams } from 'react-router-dom';
import { Box, CardMedia, Button } from '@mui/material/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Person = () => {
  const { id } = useParams();

  // dummy data
  const person = {
    id: id,
    name: 'John Smith',
    photoCount: 20,
    favouriteCount: 5,
    face: 'https://picsum.photos/id/1005/600/600'
  };

  const icon = (
    <BorderColorIcon
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  console.log(person);
  return (
    <div>
      <Box sx={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          sx={{ borderRadius: '50px', padding: '10px', width: '150px', height: '150px' }}
          component="img"
          image={person.face}
          alt={person.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '50px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <h2>{person.name}</h2>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>{icon}</span>
          </Box>
          <Button variant="contained" color="error">
            Delete Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <h1>Photos</h1>
        {/* TODO: Need the photo card to populate here */}
      </Box>
    </div>
  );
};

export default Person;

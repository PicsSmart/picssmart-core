import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PropTypes } from 'prop-types';

const PeopleCard = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia sx={{ borderRadius: '50px', padding: '10px' }} component="img" image={data.face} alt={data.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.photoCount} photos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.favouriteCount} favourites
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

PeopleCard.propTypes = {
  data: PropTypes.shape({
    face: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photoCount: PropTypes.number.isRequired,
    favouriteCount: PropTypes.number.isRequired
  }).isRequired
};

export default PeopleCard;

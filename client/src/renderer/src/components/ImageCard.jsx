import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton, Box } from '@mui/material';
import { Star, StarOutline, CalendarMonth, PhotoCamera, LocationOn, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const ContentHeader = ({ image, fav, handleFav }) => {
  // const labels = image.labels.join(', ');
  return (
    <Grid container>
      <Grid xs={10}>
        <Typography variant="h5" component="div">
          {image.name}
        </Typography>

        {/* <Typography key={image.id} variant="body2">
          <Box sx={{ fontStyle: 'italic' }}>{labels}</Box>
        </Typography> */}
      </Grid>
      <Grid xs={2} sx={{ display: 'flex', alignItems: 'top', justifyContent: 'right' }}>
        {/* <IconButton aria-label="favourites" color="picsmart" onClick={handleFav}>
          {fav ? <Star /> : <StarOutline />}
        </IconButton> */}
      </Grid>
    </Grid>
  );
};

const ContentBody = ({ image }) => {
  return (
    <Grid container mt="1rem" rowSpacing={0.5}>
      {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'top', justifyContent: 'center' }}>
        <CalendarMonth sx={{ fontSize: 17 }} color="secondary" />
      </Grid>
      <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
        <Typography key={image.id} variant="body2" color="text.secondary">
          {image.time}
        </Typography>
      </Grid> */}
      {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'top', justifyContent: 'center' }}>
        <PhotoCamera sx={{ fontSize: 17 }} color="secondary" />
      </Grid>
      <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
        <Typography key={image.id} variant="body2" color="text.secondary">
          {image.device},{image.resolution},{image.size}
        </Typography>
      </Grid> */}
      {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'top', justifyContent: 'center' }}>
        <LocationOn sx={{ fontSize: 17 }} color="secondary" />
      </Grid>
      <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
        <Typography key={image.id} variant="body2" color="text.secondary">
          {image.location}
        </Typography>
      </Grid> */}
      <Grid item xs={1} sx={{ display: 'flex', alignItems: 'top', justifyContent: 'center' }}>
        <Description sx={{ fontSize: 17 }} color="secondary" />
      </Grid>
      <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
        <Typography key={image.id} variant="body2" color="text.secondary">
          {image.caption?.slice(0, 50)}
          {image.description?.length > 50 ? '...' : ''}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function ImageCard({ image }) {
  const navigate = useNavigate();
  const [fav, setFav] = React.useState(false);
  const handleFav = () => {
    setFav(!fav);
    // setImageList((prev)=>prev.map((img)=>{
    //     if(img.id===image.id){
    //         return {...img, fav:!img.fav}
    //     }
    //     return img;
    // }))
  };

  const handleClick = () => {
    navigate(`/${image._id}`);
  }

  return (
    <Card sx={{ width: 280 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" image={`http://127.0.0.1:8000/thumbnail/${image?._id}`} alt="image" height="140" />
        <CardContent m="4">
          <ContentHeader image={image} fav={fav} handleFav={handleFav} />
          <ContentBody image={image} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

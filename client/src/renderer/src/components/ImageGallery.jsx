import { Grid } from '@mui/material';
import ImageCard from './ImageCard';

export default function ImageGallery({ images }) {
  return (
    <Grid container rowSpacing={1} columnSpacing={1} columns={{ xs: 2, md: 4, lg: 5 }}>
      {images.map((image) => (
        <Grid item key={image.id}>
          <ImageCard image={image} />
        </Grid>
      ))}
    </Grid>
  );
}

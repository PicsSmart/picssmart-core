import { Grid, Pagination } from '@mui/material';
import ImageCard from './ImageCard';
import { useEffect, useState } from 'react';

export default function ImageGallery({ images }) {
  const [page, setPage] = useState(1);
  const [currentImages, setCurrentImages] = useState(images?.slice((page-1)*15, page*15));

  useEffect(() => {
    setCurrentImages(images?.slice((page-1)*15, page*15));
  }, [page, images]);

  return (
    <>
      {images&&<Pagination count={Math.ceil(images?.length/15)} defaultPage={1} color="picsmart" onChange={(e, value)=>{setPage(value)}} />}
      <Grid container rowSpacing={1} columnSpacing={1} columns={{ xs: 2, md: 4, lg: 5 }} mt={2}>
        {currentImages?.map((image) => (
          <Grid item key={image._id}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

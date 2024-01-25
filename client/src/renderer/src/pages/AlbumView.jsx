import ImageGallery from '../components/ImageGallery';
import { images } from '../assets/ImageList';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../services/hooks/useApi';
import { useEffect, useState } from 'react';

const AlbumView = () => {
  const { id } = useParams();
  const albums = useSelector((state) => state.albums.albums);
  const album = albums.find((album) => album._id == id);
  const [images, setImages] = useState([]);
  const { data } = useApi(`http://127.0.0.1:8000/albums/${id}/media`, 'GET');

  useEffect(() => {
    setImages(data);
    console.log(data)
  }, [data]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '2rem' }}>
        <IconButton component={Link} to="/albums">
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h3">Album - {album.name}</Typography>
      </Box>
      <div>
        <ImageGallery images={images} />
      </div>
    </>
  );
};

export default AlbumView;

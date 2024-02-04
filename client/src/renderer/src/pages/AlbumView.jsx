import ImageGallery from '../components/ImageGallery';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAlbumMediaApi } from '../services/apiService/albums';

const AlbumView = () => {
  const [images, setImages] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { id } = useParams();
  const albums = useSelector((state) => state.albums.albums);
  const album = albums.find((album) => album._id == id);

  const getAlbumMedia = async ()=>{
    try{
      setLoading(true)
      const {data} = await getAlbumMediaApi(id)
      setImages(data)
    }catch(exception){
      setError(exception)
    }
  }

  useEffect(() => {
    getAlbumMedia()
  }, []);

  return (
    <>
      {album && <>      
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '2rem' }}>
          <IconButton component={Link} to="/albums">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h3">Album - {album?.name}</Typography>
        </Box>
        <div>
          <ImageGallery images={images} />
        </div>
      </>}
    </>
  );
};

export default AlbumView;

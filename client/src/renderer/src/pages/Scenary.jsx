import { useParams } from 'react-router-dom';
import { Box, CardMedia, Button, Typography } from '@mui/material/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFaceGroupImagesApi } from '../services/apiService/people';
import ImageGallery from '../components/ImageGallery';
import { getSceneImagesApi } from '../services/apiService/scenary';

const Scenary = () => {
  const { name } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]); 

  const getPhotos = async () => {
    try {
      setLoading(true);
      const { data } = await getSceneImagesApi(name);
      data.results.forEach(element => {
        setPhotos((prev)=>[...prev, element.payload]);
    });
    } catch (exception) {
      setError(exception);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    getPhotos();
  } , []);

  const icon = (
    <BorderColorIcon
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  return (
    <div>
      <Box >
        <Typography variant="h4">{name.charAt(0).toUpperCase() + name.slice(1)} Photos</Typography>
      </Box>
      <Box mt={2}>
        <ImageGallery images={photos}/>
      </Box>
    </div>
  );
};

export default Scenary;

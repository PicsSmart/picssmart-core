import { useParams } from 'react-router-dom';
import { Box, CardMedia, Button } from '@mui/material/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFaceGroupImagesApi } from '../services/apiService/people';
import ImageGallery from '../components/ImageGallery';

const Person = () => {
  const { id } = useParams();

  const faces = useSelector((state) => state.faces.faces);
  const media = useSelector((state) => state.media.media);
  const [person, setPerson] = useState(faces.filter((face) => face._id === id)[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]); 

  const getFaces = async () => {
    try {
      setLoading(true);
      const { data } = await getFaceGroupImagesApi(id);
      data.forEach(element => {
        const img = media.filter((photo) => photo._id === element._id)[0]
        if(img){
          setPhotos((prev)=>[...prev, img]);
        }
      });
    } catch (exception) {
      setError(exception);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    getFaces();
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
      <Box sx={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          sx={{ borderRadius: '50px', padding: '10px', width: '150px', height: '150px' }}
          component="img"
          image={`http://127.0.0.1:8000/thumbnail/${person.imageId}?top=${person.face.top}&right=${person.face.right}&bottom=${person.face.bottom}&left=${person.face.left}`}
          alt={person._id}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '50px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <h2>{person._id}</h2>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>{icon}</span>
          </Box>
          <Button variant="contained" color="error">
            Delete Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <h1>Photos</h1>
        <ImageGallery images={photos}/>
      </Box>
    </div>
  );
};

export default Person;

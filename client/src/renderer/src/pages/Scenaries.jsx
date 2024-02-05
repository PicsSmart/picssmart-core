import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleCard from '../components/PeopleCard';
import { getSceneImagesApi, getSceneThumbnailApi, getScenesApi } from '../services/apiService/scenary';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFaces } from '../store/reducers/faces';
import SceneGallery from '../components/SceneGallery';

import { useNavigate } from 'react-router-dom';

const Scenaries = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scenes, setScenes] = useState([]);

  const dispatch = useDispatch();

  const getScenes = async () => {
    try {
      setLoading(true);
      const { data } = await getScenesApi();
      setScenes(data.scenes)
    } catch (exception) {
      setError(exception);
    } finally {  
      setLoading(false);
    }
  }

  useEffect(() => {
    getScenes();
  } , []);

  return (
    <div>
      <SceneGallery scenes={scenes} />
    </div>
  );
};

export default Scenaries;

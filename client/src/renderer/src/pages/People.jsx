import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleCard from '../components/PeopleCard';
import { getFacesApi } from '../services/apiService/people';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFaces } from '../store/reducers/faces';
import PeopleGallery from '../components/PeopleGallery';

import { useNavigate } from 'react-router-dom';

const People = () => {
  const navigate = useNavigate();
  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const faces = useSelector((state) => state.faces.faces);

  const getFaces = async () => {
    try {
      setLoading(true);
      const { data } = await getFacesApi();
      dispatch(setFaces({ faces: data }));
    } catch (exception) {
      setError(exception);
    } finally {  const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [face, setFace] = useState(null);
    
      setLoading(false);
    }
  }
  useEffect(() => {
    getFaces();
  } , []);

  return (
    <div>
      <PeopleGallery faces={faces} />
    </div>
  );
};

export default People;

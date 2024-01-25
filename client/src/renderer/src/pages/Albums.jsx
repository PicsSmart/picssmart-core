import ItemsTable from '../components/ItemsTable';
import { Folder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useApi from '../services/hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import {setAlbums} from '../store/reducers/albums';
import { useEffect } from 'react';

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.albums);
  const { data } = useApi('http://127.0.0.1:8000/albums', 'GET');

  useEffect(() => {
    dispatch(setAlbums({ albums: data }));
  }, [data]);

  const navigate = useNavigate();
  const navigateHandler = (id) => {
    navigate(`/albums/${id}`);
  };

  const deleteHandler = (id) => {
    console.log(`delete album ${id}`);
  };

  const icon = (
    <Folder
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  return (
    <div>
      <h1>Albums</h1>
      <ItemsTable data={albums} icon={icon} deleteHandler={deleteHandler} navigateHandler={navigateHandler} />
    </div>
  );
};

export default Albums;

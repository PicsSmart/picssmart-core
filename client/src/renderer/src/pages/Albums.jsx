import ItemsTable from '../components/ItemsTable';
import { Folder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setAlbums} from '../store/reducers/albums';
import { useEffect,useState } from 'react';
import { getAlbumsApi } from '../services/apiService/albums';

const Albums = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.albums);
  
  const getAlbums = async ()=>{
    try{
      setLoading(true)
      const {data} = await getAlbumsApi()
      console.log(data)
      dispatch(setAlbums({albums:data}))
    }catch(exception){
      setError(execption)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAlbums()
  }, [])

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

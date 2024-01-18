import ItemsTable from 'components/ItemsTable';
import { Folder } from '@mui/icons-material';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import {albumsList} from '../assets/AlbumsList';

const Albums = () => {
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
      <ItemsTable data={albumsList} icon={icon} deleteHandler={deleteHandler} navigateHandler={navigateHandler} />
    </div>
  );
};

export default Albums;

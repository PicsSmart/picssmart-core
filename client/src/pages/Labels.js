import ItemsTable from 'components/ItemsTable';
import { Label } from '@mui/icons-material';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import {labelsList} from '../assets/LabelsList';

const Labels = () => {
  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate(`/labels/${id}`);
  };

  const deleteHandler = (id) => {
    console.log(`delete label ${id}`);
  };

  const icon = (
    <Label
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  return (
    <div>
      <ItemsTable data={labelsList} icon={icon} deleteHandler={deleteHandler} navigateHandler={navigateHandler} />
    </div>
  );
};

export default Labels;

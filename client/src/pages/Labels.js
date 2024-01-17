import ItemsTable from 'components/ItemsTable';
import { Label } from '@mui/icons-material';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

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

  const albumItems = [
    {
      id: 1,
      name: 'Elephant',
      count: 20,
      favouriteCount: 5
    },
    {
      id: 2,
      name: 'Car',
      count: 104,
      favouriteCount: 56
    },
    {
      id: 3,
      name: 'Machine',
      count: 132,
      favouriteCount: 97
    }
  ];
  return (
    <div>
      <ItemsTable data={albumItems} icon={icon} deleteHandler={deleteHandler} navigateHandler={navigateHandler} />
    </div>
  );
};

export default Labels;

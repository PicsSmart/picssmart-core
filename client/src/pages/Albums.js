import ItemsTable from "components/ItemsTable";
import { Folder } from '@mui/icons-material';


const Albums = () => {

    const deleteHandler = (id) => {
        console.log(`delete album ${id}`);
    };

    const icon = <Folder style={{
        color: 'picsmart.main',
        fontSize: '1.25rem',
      }}/>;

    const albumItems = [
        {
            "id": 1,
            "name": "Wild Life",
            "count": 20,
            "favouriteCount": 5
        },
        {
            "id": 2,
            "name": "Landscapes",
            "count": 104,
            "favouriteCount": 56
        },
        {
            "id": 3,
            "name": "Annual Trip to Florida",
            "count": 132,
            "favouriteCount": 97
        },
    ]
    return (
        <div>
            <ItemsTable data={albumItems} icon={icon} deleteHandler={deleteHandler}/>
        </div>
    );
}

export default Albums;
import ImageGallery from '../components/ImageGallery';
import {images} from '../assets/ImageList';
import {albumsList} from '../assets/AlbumsList';
import {Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Box} from '@mui/material';
import { Link } from 'react-router-dom';

const AlbumView = () => {
    const {id} = useParams()
    const album = albumsList.find((album)=>album.id==id);
    return(
        <>
            <Box sx={{display:'flex', alignItems:'center', mb:'2rem'}}>
                <IconButton component={Link} to="/albums"><ArrowBackIosIcon/></IconButton>
                <Typography variant="h3">
                    Album - {album.name}
                </Typography>
            </Box>
            <div>
                <ImageGallery images={images}/>
            </div>
        </>
    )           
}

export default AlbumView;

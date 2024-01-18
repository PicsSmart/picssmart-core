import ImageGallery from '../components/ImageGallery';
import {images} from '../assets/ImageList';
import {labelsList} from '../assets/LabelsList';
import {Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Box} from '@mui/material';
import { Link } from 'react-router-dom';

const LabelView = () => {
    const {id} = useParams()
    const label = labelsList.find((label)=>label.id==id);
    return(
        <>
            <Box sx={{display:'flex', alignItems:'center', mb:'2rem'}}>
                <IconButton component={Link} to="/labels"><ArrowBackIosIcon/></IconButton>
                <Typography variant="h3">
                    Label - {label.name}
                </Typography>
            </Box>
            <div>
                <ImageGallery images={images}/>
            </div>
        </>
    )           
}

export default LabelView;

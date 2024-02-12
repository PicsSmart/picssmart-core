import ImageGallery from '../components/ImageGallery';
import { useEffect, useState } from 'react';
import {LinearProgress,Box} from '@mui/material';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("photos", photos)
    }, [photos]);

    return(
        <div>
            <SearchBar setPhotos={setPhotos} setError={setError} setLoading={setLoading}/>
            {loading?
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color='picsmart'/>
                </Box>
            :
                <ImageGallery images={photos}/>
            }
        </div>
    )
}

export default Home;
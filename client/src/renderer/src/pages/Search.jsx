import ImageGallery from '../components/ImageGallery';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { textSearchApi } from '../services/apiService/utilities';
import {LinearProgress,Box} from '@mui/material';
import { clearSearch } from '../store/reducers/search';

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);
    const caption = useSelector((state) => state.search.caption);
    const [photos, setPhotos] = useState([]);

    useEffect(()=>{
        setPhotos([])
        if (caption===''){
            setPhotos(media)
        }else{
            textSearch()
        }
    }, [caption])

    useEffect(()=>{
        setPhotos([])
        setLoading(false)
        setError(null)
        return ()=>{
            dispatch(clearSearch())
        }
    }
    , [])

    const textSearch = async ()=>{
        try{
            setLoading(true)
            const {data} =  await textSearchApi(caption)
            console.log(data)
            data.results.forEach(element => {
                setPhotos((prev)=>[...prev, element.payload]);
            });
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }
    

    return(
        <div>
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
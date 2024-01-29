import ImageGallery from '../components/ImageGallery';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMedia } from '../store/reducers/media';
import { getMediaApi } from '../services/apiService/media';

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);

    const getMedia = async ()=>{
        try{
            setLoading(true)
            const {data} = await getMediaApi()
            dispatch(setMedia({media:data}))
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getMedia()
    }, []);

    return(
        <div>
            <ImageGallery images={media}/>
        </div>
    )
}

export default Home;
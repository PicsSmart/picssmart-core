import ImageGallery from '../components/ImageGallery';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setMedia } from '../store/reducers/media';
import useApi from '../services/hooks/useApi'

const Home = () => {
    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);
    const {data} = useApi('http://127.0.0.1:8000/media', 'GET')

    useEffect(() => {
        dispatch(setMedia({media: data}));
    }, [data]);

    return(
        <div>
            <ImageGallery images={media}/>
        </div>
    )
}

export default Home;

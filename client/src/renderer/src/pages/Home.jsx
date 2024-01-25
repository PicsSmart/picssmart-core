import ImageGallery from '../components/ImageGallery';
import { images } from '../assets/ImageList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setMedia } from '../store/reducers/media';

const Home = () => {
    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);
    useEffect(() => {
        dispatch(setMedia({media: images}));
    }, []);
    return(
        <div>
            <ImageGallery images={media}/>
        </div>
    )
}

export default Home;

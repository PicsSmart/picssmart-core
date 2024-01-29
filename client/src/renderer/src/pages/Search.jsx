import ImageGallery from '../components/ImageGallery';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { textSearchApi } from '../services/apiService/utilities';

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);
    const caption = useSelector((state) => state.search.caption);
    const [photos, setPhotos] = useState([]);

    useEffect(()=>{
        if (caption===''){
            setPhotos(media)
        }else{
            textSearch()
        }
    }, [caption])

    const textSearch = async ()=>{
        try{
            setLoading(true)
            const {data} =  await textSearchApi(caption)
            console.log(data)
            setPhotos(data.results)
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }
    

    return(
        <div>
            <ImageGallery images={photos}/>
        </div>
    )
}

export default Home;
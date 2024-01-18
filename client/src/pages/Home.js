import ImageGallery from '../components/ImageGallery';
import {images} from '../assets/ImageList';

const Home = () => {
    return(
        <div>
            <ImageGallery images={images}/>
        </div>
    )           
}

export default Home;

import ImageGallery from '../components/ImageGallery';
import {images} from '../assets/ImageList';

const Favourites = () => {
    return(
        <div>
            <ImageGallery images={images.filter((image)=>image.fav)}/>
        </div>
    )           
}

export default Favourites;

import { ImageGalleryItem } from "./ImageGalleryItem";
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => { 
    return (
        <ul className="ImageGallery">
            {images.map(image => <ImageGalleryItem image={image} key={image.id}/>)}
        </ul> 
    )
}

ImageGallery.protoTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })).isRequired,
};

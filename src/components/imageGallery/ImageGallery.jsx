import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import  ImageGalleryItem  from '../imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({images, handleOpenModal}) {    
    
    return(<ul className={css.gallery}>
            <ImageGalleryItem images={images} onClick={handleOpenModal} />
    </ul>)
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
       }) 
    ),
    handleOpenModal: PropTypes.func.isRequired,
}

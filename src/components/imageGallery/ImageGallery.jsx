import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import  ImageGalleryItem  from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import  Button  from '../button/Button';
import  Modal  from '../modal/Modal';

const Status = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
};

export default function ImageGallery({imageName}) {
    
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [page, setPage] = useState(1);
    const [ishidden, setIshidden] = useState(false);
    const [bigImage, setBigImage] = useState('');
    const [totals, setTotals] = useState(null);

    useEffect(() => {
        const URL = `https://pixabay.com/api/?q=${imageName}&page=1&key=33641920-b059883ebd7147c979fd953b4&image_type=photo&orientation=horizontal&per_page=12`;
        
        if (!imageName) {
            return;
        }        
        setImages([]);
        setPage(1);
        setStatus(Status.PENDING);
        
        fetch(URL).then(response => {
            if (response.ok) {
                return response.json();
            }
                return Promise.reject(new Error('Error!'))
        })
        .then(({ hits, total }) => {
            if (hits.length === 0) {
                toast.error('Sorry, there are no images matching your search query. Please try again.', { autoClose: 2000, });
            }
            setImages((prev) => [...prev, ...hits]);                    
            setTotals(total);
            setStatus(Status.RESOLVED);                               
        })
        .catch(error => {
            setError(error);
            setStatus(Status.REJECTED);                   
        });  
        
    }, [imageName]);

    useEffect(() => {
        const URL = `https://pixabay.com/api/?q=${imageName}&page=${page}&key=33641920-b059883ebd7147c979fd953b4&image_type=photo&orientation=horizontal&per_page=12`;
      
        if (page !== 1) {
       
            setStatus(Status.PENDING);
        
            fetch(URL).then(response => {
                if (response.ok) {
                    return response.json();
                }
                 return Promise.reject(new Error('Error!'))
            })
            .then(({ hits }) => {
                if (hits.length === 0) {
                    toast.error('Sorry, there are no images matching your search query. Please try again.', { autoClose: 2000, });
                }
                setImages((prev) => [...prev, ...hits]);
                setStatus(Status.RESOLVED);                      
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            });             
         }      
        
    }, [page]);     
    
    let offsetHeight = document.documentElement.offsetHeight;
    window.scrollTo({
        top: offsetHeight,
        behavior: 'smooth',
    });      
    
    const handleClick = () => {
        setPage((prev) => prev + 1);
    }

    const handleOpenModal = (e) => {
        setIshidden(true);
        setBigImage(e.target.title);                  
    }

    const handleCloseModal = (e) => {
        setIshidden(false);
        setBigImage('');                
    }      
   
    return (
        <div>               
            {images && (
                <ul className={css.gallery}>
                    <ImageGalleryItem images={images} onClick={handleOpenModal} />
                </ul>
            )}
            {images.length > 11 && (status === Status.RESOLVED) && (totals - images.length) > 0 && (
                <Button onClick={handleClick} />
            )}
            {status === Status.PENDING  && <Loader />}
            {status === Status.REJECTED && (<div>{error.message}</div>)}
            {ishidden && <Modal bigImage={bigImage} onClose={handleCloseModal} />}
        </div>
    )     
}

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
}

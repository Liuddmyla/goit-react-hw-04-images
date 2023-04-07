import { useEffect } from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ bigImage, onClose }) {   
    
    useEffect(() => {       
        window.addEventListener('keydown', handleKeyDown);

        return () => {
           window.removeEventListener('keydown', handleKeyDown);
        }; 
    });

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
           onClose();
        }
    }

    const  handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
           onClose(); 
        }
    }
    
    return (
        <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <img src={bigImage} alt='bigImage' />
           </div>
        </div>
    )
}

Modal.propTypes = {
    bigImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

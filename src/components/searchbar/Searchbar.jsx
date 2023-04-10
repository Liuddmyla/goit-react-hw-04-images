import {  useState } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import {ReactComponent as SearchIcon} from "../../icons/search.svg";

export default function Searchbar({onSubmit}) {
    
    const [imageName, setImageName] = useState(''); 

    const handleNameChange = (e) => {
        setImageName(e.currentTarget.value.toLowerCase());         
    }

    const handleSubmit = (e) => {
        e.preventDefault();      

        if (imageName.trim() === '') {
           return toast.info('Enter a name for the image !', {autoClose: 2000,});
        }      
       
        onSubmit(imageName);       
    }

    return (
        <header className={css.searchbar}> 
            <form onSubmit={handleSubmit} className={css.form}>
                <button type="submit" className={css.button}>
                    <span className={css['button-label']}><SearchIcon /></span>
                </button>

                <input
                    className={css.input}
                    type="text"
                    placeholder="Search images and photos..."
                    value={imageName}
                    onChange={handleNameChange}
                />
            </form>
        </header>
    )    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,      
}
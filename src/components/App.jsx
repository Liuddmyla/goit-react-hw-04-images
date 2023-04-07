import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';

export default function App () {

  const [imageName, setImageName] = useState(''); 
  
  const handleFormSubmit = (imageName) => {
    setImageName(imageName);    
  } 
  
  return (
    <div>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
    </div>
  )
}

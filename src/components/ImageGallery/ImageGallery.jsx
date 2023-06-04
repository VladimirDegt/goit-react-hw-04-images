import { useEffect, useState } from "react";
import PropTypes, { object } from 'prop-types';
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry} from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";
import { scroll } from "service/scroll-page";

export function ImageGallery({images}){
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    setIsOpen(false);
    if(images.length !== 0){
      scroll();
    };
  }, [images]);

  function handlerImgClick(largeImageURL, alt){
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    setIsOpen(true);
  };

  function setFalseOpenModal() {
    setIsOpen(false);
  };

  return (
    <StyledContainerGalerry>  
      {images.map((item)=>{
        return (
          <StyledItemGalerry key={item.id}>
            <StyledImgGalerry 
              src={item.webformatURL} 
              alt={item.tags} 
              onClick={()=>handlerImgClick(item.largeImageURL, item.tags)}
            />
          </StyledItemGalerry>
        )
      })}
      {isOpen && <Modal 
        largeImageURL = {largeImageURL}
        alt = {alt}
        isOpenModal = {isOpen}
        setFalseOpenModal ={setFalseOpenModal}
      />}
    </StyledContainerGalerry>
  )
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
};

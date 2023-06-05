import { useEffect, useState } from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledImgModal } from "./Modal.styled";

export function Modal({largeImageURL, alt, isOpenModal, setFalseOpenModal}){
  const [isOpen, setIsOpen] = useState(isOpenModal);


  useEffect(()=>{
    function handleEsc(e) {
      if (e.code === "Escape") {
        closeModal()
      }
    };

    function closeModal() {
      document.querySelector('ul').removeAttribute('style');
      setIsOpen(false)
      setFalseOpenModal()
    };

    if(isOpenModal){
      setIsOpen(true);
      document.querySelector('ul').setAttribute('style', 'position: fixed;');
    }

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);  
    }
  },[setFalseOpenModal, isOpenModal]);

  function handleClickBackdrop(e) {
    if(e.target.nodeName === "IMG"){
      return
    }
    setIsOpen(false)
    setFalseOpenModal()
  };

  return (
    <>
    {isOpen && 
      <StyledOverlay onClick={handleClickBackdrop}>
      <StyledImgModal >
        <img src={largeImageURL} alt={alt} />
      </StyledImgModal>
    </StyledOverlay>
    }
    </>
    )
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setFalseOpenModal: PropTypes.func.isRequired,
};



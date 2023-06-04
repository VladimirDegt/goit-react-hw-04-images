import { useEffect, useState } from "react";
import { Global } from '@emotion/react';
import { Notify } from 'notiflix';
import Searchbar from "./Searchbar";
import { fetchImage } from "service/api-pixabay";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { StyledContainer, StyledButtonLoad  } from "./App.styled";
import '../styles/spin.css'
import { global } from "styles/global-styles";
import { Spinner } from "./Spinner/Spinner";

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [imagesGallery, setImages] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function createRequestValue(inputValue) {
    setInputValue(inputValue);
    setPageNumber(1);
  };

  useEffect(()=>{
    if(!inputValue) {
      return
    }
    setIsLoading(true);
    fetchImage(inputValue, pageNumber)
    .then((images)=>{
      if(pageNumber !== 1) {
        setImages([...imagesGallery, ...images.data.hits]);
      } else {
        setImages(images.data.hits);
      }
      setIsButtonDisabled(true);
    if(images.data.hits.length === 0){
      Notify.info('Пробачьте, по Вашему запиту нічого не знайдено!')
      setImages('');
      setIsButtonDisabled(false);
      return
    }
    if(images.data.hits.length < 12){
      Notify.info(`по Вашему запиту знайдено ${images.data.hits.length} картинок`)
      setIsButtonDisabled(false);
    }
    })
    .catch((error)=>{
      Notify.failure('Щось пішло не так!')
      console.log(error)
    })
    .finally(()=>{
      setIsLoading(false);
    })
    }, [inputValue, pageNumber]);

  function handlerBtnClick() {
    setPageNumber(pageNumber + 1);
  };

  return (
  <>
  <Global styles={global}/>
    <StyledContainer>
      <Searchbar createRequestValue={createRequestValue}/>
      {isLoading && <Spinner/>}
      {imagesGallery && <ImageGallery images={imagesGallery}/>}
      {isButtonDisabled && 
        <StyledButtonLoad 
        type="button"
        onClick={handlerBtnClick}>
        Load more
        </StyledButtonLoad>}
    </StyledContainer>
  </>
);
};


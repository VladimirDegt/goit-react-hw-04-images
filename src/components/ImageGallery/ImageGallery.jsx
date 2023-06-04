import { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry} from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";
import { scroll } from "service/scroll-page";

export class ImageGallery extends Component {
  state = {
    largeImageURL: '',
    alt: '',
    isOpen: false,
  };

  componentDidUpdate(prevProps, prevState){
    if(this.props.images.length !== 0){
      scroll()
    }
  };

  handlerImgClick = (largeImageURL, alt) => {
    this.setState({
      largeImageURL,
      alt,
      isOpen: true})
  };

  setFalseOpenModal = () =>{
    this.setState({
      isOpen: false
    })
  };

  render(){
    const {largeImageURL, alt, isOpen} = this.state;
    return (
      <StyledContainerGalerry>  
        {this.props.images.map((item)=>{
          return (
            <StyledItemGalerry key={item.id}>
              <StyledImgGalerry 
                src={item.webformatURL} 
                alt={item.tags} 
                onClick={()=>this.handlerImgClick(item.largeImageURL, item.tags)}
              />
            </StyledItemGalerry>
          )
        })}
        {isOpen && <Modal 
          largeImageURL = {largeImageURL}
          alt = {alt}
          isOpen = {isOpen}
          setFalseOpenModal ={this.setFalseOpenModal}
        />}
      </StyledContainerGalerry>
    )}
  }; 

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
  isOpen: PropTypes.bool.isRequired,
}

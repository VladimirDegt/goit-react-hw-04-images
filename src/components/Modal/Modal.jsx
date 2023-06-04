import { Component } from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledImgModal } from "./Modal.styled"

export class Modal extends Component {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
    this.setState({
      isOpen: true,
    })
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  };

  componentDidUpdate(_, prevState) {
    if(prevState.isOpen !== this.props.isOpen){
      this.setState({
        isOpen: true,
      })
    }
  };

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.closeModal()
    }
  };

  handleClickBackdrop = (e) => {
    if(e.target.nodeName === "IMG"){
      return
    }
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ 
      isOpen: false,
    });
    this.props.setFalseOpenModal()
  };

  render() {
    const {isOpen} = this.state;

    return (
      <>
      {isOpen && 
        <StyledOverlay onClick={this.handleClickBackdrop}>
        <StyledImgModal >
          <img src={this.props.largeImageURL} alt={this.props.alt} />
        </StyledImgModal>
      </StyledOverlay>
      }
    </>
    )
  } 
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setFalseOpenModal: PropTypes.func.isRequired,
};



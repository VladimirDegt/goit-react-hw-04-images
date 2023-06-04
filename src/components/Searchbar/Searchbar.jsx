import { Notify } from 'notiflix';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, StyledForm, StyledFormBtn, StyledFormInput } from './Searchbar.styled';
import IconSearch from 'service/search-svg';

function Searchbar({createRequestValue}) {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange({target}){
    setInputValue(target.value.toLowerCase())
  };

  function handleSubmit(e) {
    e.preventDefault();

    if(inputValue) {
      createRequestValue(inputValue);
      setInputValue('');
    } else {
      Notify.failure('Поіск порожній та треба ввести значення!')
    };
    
  };

    return (
      <StyledHeader>
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormBtn type="submit">
            <IconSearch>Search</IconSearch>
          </StyledFormBtn>

          <StyledFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={inputValue}
          />
        </StyledForm>
      </StyledHeader>
    )
};

Searchbar.propTypes = {
  createRequestValue: PropTypes.func.isRequired
};

export default Searchbar;


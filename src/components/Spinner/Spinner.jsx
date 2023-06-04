import { Circles } from  'react-loader-spinner'
import { StyledContainer } from './Spinner.styled';

export function Spinner(){
  return (
    <StyledContainer>
        <Circles
          height="60"
          width="60"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
    </StyledContainer>

    )
};

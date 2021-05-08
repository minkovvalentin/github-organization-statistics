import styled from 'styled-components'


const Loader = ({size, borderSize}) => {

  const Styles = styled.div`
  .loader {
    border: ${borderSize}px solid #f3f3f3; /* Light grey */
    border-top: ${borderSize}px solid #555456; /* Grey */
    border-radius: 50%;
    width: ${size}px;
    height: ${size}px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
return (
  <Styles>
    <div class="loader"></div>
  </Styles>
  );
}

export default Loader;
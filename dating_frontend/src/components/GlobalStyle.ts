import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
  font-family: 'Inter', sans-serif;
  height: 100%;
}
html {
  font-size: 62.5%;
}
.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
}
`;

export default GlobalStyle;
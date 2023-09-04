import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 800;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <H1>Hello world</H1>
    </>
  );
}

export default App;

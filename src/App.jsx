import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 800;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <H1>Hello world</H1>
      <Button>Hi</Button>
      <Input />
    </>
  );
}

export default App;

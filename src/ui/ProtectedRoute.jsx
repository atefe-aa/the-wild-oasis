import styled from "styled-components";
// import { useUser } from "../features/authentication/useUser";
// import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //1.load authenticated user
  // const { isLoading, user } = useUser();

  //2.while loading show a spinner
  // if (isLoading)
  //   return (
  //     <FullPage>
  //       {" "}
  //       <Spinner />
  //     </FullPage>
  //   );

  //3.if there is no authenticated user redirect to the log in page

  //4. if there is a user render the app

  return children;
}

export default ProtectedRoute;

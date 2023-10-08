import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
const navigate = useNavigate();

  //1.load authenticated user
  const { isLoading, user } = useUser();
  
  //2.if there is no authenticated user redirect to the log in page
  useEffect(function(){
    if(!user && !isLoading){
      navigate('/login');
    }
  }, [user,navigate, isLoading])
  
  
    //3.while loading show a spinner
    if (isLoading)
      return (
        <FullPage>
          <Spinner />
        </FullPage>
      );

  //4. if there is a user render the app
 if(user) return children;
}

export default ProtectedRoute;

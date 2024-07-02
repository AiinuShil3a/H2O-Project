import { ReactNode, FC } from "react";
import { Navigate , useParams } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
  token?: string; 
}

const PrivateRouterUser: FC<AuthProviderProps> = ({ children }) => {
  
  const { token } = useParams<{ token?: string }>();
  let decodedToken = null;

  if (token) {
      try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
              atob(base64).split('').map(function(c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join('')
          );
  
          decodedToken = JSON.parse(jsonPayload);
          if (token && decodedToken) {
            return children;
          }
      } catch (error) {
          console.error('Error decoding token:', error);
          return <Navigate to="/" />;
      }
  }
};

export default PrivateRouterUser;

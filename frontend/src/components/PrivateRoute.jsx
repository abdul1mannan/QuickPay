import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsAuthenticated(response.data.valid);
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Token verification failed:", error);
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Display a loading indicator while verifying the token
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

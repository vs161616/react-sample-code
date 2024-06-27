import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";
import { showErrorMsg } from "../../utils/notifications";
import GOOGLE_CLIENT_ID from "../../constants/config";

/**
 * Login component for user authentication using Google OAuth.
 * Redirects authenticated users to the home page.
 * @returns {JSX.Element} The rendered Login component.
 */
function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box className="LoginPage">
      <Box className="LeftBar">
        <Box className="brandLogoLogin">
          <img src={Logo} alt="logo" />
        </Box>
      </Box>
      <Box className="LoginFormBtn">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              login(
                credentialResponse.credential!,
                credentialResponse.clientId!,
              );
            }}
            onError={() => {
              showErrorMsg("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
}

export default Login;

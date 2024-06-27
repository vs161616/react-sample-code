/* eslint-disable react/function-component-definition */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import axiosInstance from "../utils/axiosConfig";
import { showErrorMsg, showSuccessMsg } from "../utils/notifications";
import { UserInfo } from "../interfaces/utils/googleUserInterface";
import { LoaderType, useLoader } from "./LoaderContext";

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserInfo | null;
  login: (credential: string, clientId: string) => void;
  logout: () => void;
  handleUnathorised: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * AuthProvider component to provide authentication-related functionality via context.
 * @param {React.ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} The AuthContext provider wrapping the children components.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") !== null,
  );
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const { setLoaderType, setLoading } = useLoader();

  /**
   * Handle unauthorized access by setting isAuthenticated to false,
   * removing the token from local storage, and navigating to the login page.
   */
  const handleUnathorised = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, []);

  /**
   * Login user using Google credentials and update authentication state.
   * @param {string} credential - The Google credential.
   * @param {string} clientId - The Google client ID.
   */
  const login = async (credential: string, clientId: string) => {
    try {
      setLoaderType(LoaderType.FullWindow);
      setLoading(true);
      const loginResponse = await axiosInstance.post("/api/auth/google", {
        credential,
        clientId,
      });
      setLoading(false);

      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.data.userInfo));
      setUserData(loginResponse.data.userInfo);
      setIsAuthenticated(true);
      showSuccessMsg("Login Successful");
      navigate("/");
    } catch (error) {
      showErrorMsg("Login Failed");
      setLoading(false);
    }
  };

  /**
   * Logout user by removing the token from local storage and updating authentication state.
   */
  const logout = () => {
    googleLogout();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      handleUnathorised,
      login,
      logout,
      userData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, userData],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 * @returns {AuthContextType} The context value.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

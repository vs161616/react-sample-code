import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes";
import SideBar from "./components/sidebar";
import "react-toastify/dist/ReactToastify.css";
import { useLoader } from "./contexts/LoaderContext";

/**
 * Renders the main layout of the application.
 *
 * @return {JSX.Element} The rendered main layout.
 */
function Layout() {
  const location = useLocation();
  const { loaderType, loading } = useLoader();
  return (
    <Box className={location.pathname !== "/login" ? "mainLayout" : ""}>
      <ToastContainer />
      {location.pathname !== "/login" && <SideBar />}
      <Box
        className={
          location.pathname !== "/login" ? "pageLayout" : "LoginLayout"
        }
      >
        <MainRoutes />
      </Box>
      {loading && loaderType === "full-window" && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Layout;

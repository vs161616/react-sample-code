import React from "react";
import "./sidebar.css";
import { Box, Button, Typography } from "@mui/material";
import Logo from "../../assets/images/logo.svg";
import moon from "../../assets/images/icon-moon.svg";
import ProfileImg from "../../assets/images/image-avatar.jpg";
import Logout from "../../assets/images/power-off-icon.svg";
import { useAuth } from "../../contexts/AuthContext";

function SideBar() {
  const { userData, logout } = useAuth();
  return (
    <Box className="sidebar-wrapper">
      <Box className="brandLogo">
        <img src={Logo} alt="logo" />
      </Box>

      <Box className="sideNav sideFooter">
        <Button variant="text" className="profileImg">
          <img
            src={userData?.picture || ProfileImg}
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#fff", fontSize: "10px" }}>
            {userData?.name || ""}
          </Typography>
        </Box>
      </Box>
      <Box className="sideFooter">
        <Button variant="text">
          <img src={moon} alt="icon" />
        </Button>

        <Button variant="text">
          <Box
            onClick={logout}
            component="img"
            sx={{ width: "20px" }}
            src={Logout}
            alt="Logout"
          />
        </Button>
      </Box>
    </Box>
  );
}

export default SideBar;

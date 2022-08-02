import { useNavigate } from "react-router-dom";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "store/auth";
import { getPath } from "utils";

import icon from "assets/icons/dashboard.svg";
import document from "assets/icons/document.svg";
import notification from "assets/icons/notification.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  });

  const closeHandler = (e) => {
    if (e.target !== menuRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <Suspense fallback="loading">
      <div className="navbar">
        <div className="left" onClick={() => navigate("/")}>
          <img src={icon} alt="dashboard" />
          <Typography variant="h2">Planning</Typography>
        </div>
        {user && (
          <div className="right">
            <ul className="nav-links">
              <li>
                <img src={document} alt="document icon" />
                <span>History</span>
              </li>
              <li onClick={() => navigate(`${getPath(user)}/notifications`)}>
                <img src={notification} alt="notification icon" />
                <span>Notifications</span>
              </li>
              <li>
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    cursor: "pointer",
                    height: 35,
                    width: 35,
                  }}>
                  {user.first_name.charAt()}
                </Avatar>
                <span ref={menuRef} onClick={() => setIsOpen((prev) => !prev)}>
                  {user.email}
                </span>
              </li>
            </ul>
            {isOpen && (
              <div className="menu">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(logout(navigate));
                  }}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}

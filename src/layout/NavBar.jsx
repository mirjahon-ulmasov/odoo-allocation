import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { Avatar, Typography } from "@mui/material";
import icon from "../assets/icons/dashboard.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";

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
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                cursor: "pointer",
                height: 35,
                width: 35,
              }}
              ref={menuRef}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {user.first_name.charAt()}
            </Avatar>
            <Typography>{user.email}</Typography>
            {isOpen && (
              <div className="menu">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(logout(navigate));
                  }}
                >
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

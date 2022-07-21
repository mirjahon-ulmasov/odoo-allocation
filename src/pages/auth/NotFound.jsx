import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Sorry, we can't find that page</p>
      <button
        type="button"
        style={{ textTransform: "uppercase", padding: "0.7rem 2rem" }}
        className="btn dark"
        onClick={() => navigate(`/${user.role}`)}
      >
        back
      </button>
    </div>
  );
}

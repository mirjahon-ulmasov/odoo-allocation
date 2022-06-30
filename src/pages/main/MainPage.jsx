import { Button, Typography } from "@mui/material";
import React, { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const id = useId();
  const id2 = useId();
  const navigate = useNavigate();
  const [active, setActive] = useState(id);
  const activeClass = (id) => (active === id ? "active" : "");
  return (
    <>
      <header className="header">
        <Typography variant="h1">Total sales</Typography>
        <button
          type="button"
          className="btn dark"
          onClick={() => {
            navigate("/planning");
          }}
        >
          Start Planning
        </button>
      </header>
      <section className="container">
        <div className="tabs">
          <div className="actions">
            <Button
              type="button"
              onClick={() => setActive(id)}
              className={activeClass(id)}
            >
              Total sales
            </Button>
            <Button
              type="button"
              onClick={() => setActive(id2)}
              className={activeClass(id2)}
            >
              Total sales 2
            </Button>
          </div>
        </div>
        <div className="content"></div>
      </section>
    </>
  );
}

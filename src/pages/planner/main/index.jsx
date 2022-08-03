import React, { Fragment, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import SummaryByFact from "./components/SummaryFact.jsx";
import SummaryByProd from "./components/SummaryProd.jsx";

import styles from "./style.module.scss";

export default function MainPage() {
  const id = useId();
  const id2 = useId();
  const navigate = useNavigate();
  const [active, setActive] = useState(id);
  const activeClass = (id) => (active === id ? styles.active : "");
  return (
    <Fragment>
      <header className="header">
        <Typography variant="h1">Summary reports</Typography>
        <button
          type="button"
          className="btn dark"
          onClick={() => navigate("planning")}>
          Start Planning
        </button>
      </header>
      <section className={styles.container}>
        <div className={styles.tabs}>
          <div className={styles.actions}>
            <Button
              type="button"
              onClick={() => setActive(id)}
              className={activeClass(id)}>
              Summary by products
            </Button>
            <Button
              type="button"
              onClick={() => setActive(id2)}
              className={activeClass(id2)}>
              Summary by factories
            </Button>
          </div>
        </div>
        <Fragment>
          {active === id && <SummaryByProd />}
          {active === id2 && <SummaryByFact />}
        </Fragment>
      </section>
    </Fragment>
  );
}

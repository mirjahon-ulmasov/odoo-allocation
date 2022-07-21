import React, { Fragment } from "react";

import style from "../style.module.scss";

export default function Notification() {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>Notifications</h1>
      </header>
      <ul className="notif-list">
        <li>
          <p className="message">
            You (Texnograd) have asked to reserve extra pieces
          </p>
          <span className="status">Waiting</span>
        </li>
        <li>You (Evrika) has asked to reserve extra pieces</li>
        <li>You (Planeta TV) has asked to reserve extra pieces</li>
      </ul>
    </Fragment>
  );
}

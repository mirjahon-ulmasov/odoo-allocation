import React, { Fragment } from "react";
import styled from "styled-components";
import Notification from "./Notification";

export default function NotificationList() {
  return (
    <Fragment>
      <Header>
        <h1>Notifications</h1>
      </Header>
      <ul className="notif_list scroll">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Notification key={index} />
        ))}
      </ul>
    </Fragment>
  );
}

const Header = styled.header`
  margin-top: -2rem;
  padding: 1.5em;
  border-bottom: 1px solid #dfdfdf;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);

  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0.01em;
  }
`;

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationList } from "store/notification";
import Notification from "./Notification";
import styled from "styled-components";

export default function NotificationList() {
  const dispatch = useDispatch();
  const { notifications } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    dispatch(fetchNotificationList());
  }, [dispatch]);

  return (
    <Fragment>
      <Header>
        <h1>Notifications</h1>
      </Header>
      <ul className="notif_list scroll">
        {notifications.map((notification, index) => (
          <Notification data={notification} key={index} />
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

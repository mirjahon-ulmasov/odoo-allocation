import React, { Fragment, useState } from "react";
import { NotificationManager } from "react-notifications";
import { clearNotificationDetail } from "store/notification";
import { fetchNotifDetails } from "store/notification";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "@mui/material";
import { T2 } from "components/Tables";
import { getLoading } from "utils";
import Row from "./Row";

import down from "assets/icons/down.svg";
import check from "assets/icons/check.svg";

const headers = [
  "ID",
  "Product",
  "Ordered",
  "Fulfilled",
  "Fulfilled (%)",
  "Reserved",
  "Allocated",
  "Reserve",
  "Action",
  "Subtract from",
];

export default function Notification({ data }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { notification_details, loading, error } = useSelector(
    (state) => state.notification
  );

  const clickHandler = () => {
    setOpen((prev) => !prev);
    if (!open) {
      dispatch(fetchNotifDetails(data.id));
    }
    return () => dispatch(clearNotificationDetail());
  };

  const confirmHandler = () => {};

  getLoading(loading);

  return (
    <Fragment>
      {error && NotificationManager.error(error)}
      <li onClick={clickHandler}>
        <p className="message">
          <img src={down} alt="down" />
          {data.title} have asked to reserve extra pieces
        </p>
        {open && (
          <button
            type="button"
            className="btn success"
            onClick={confirmHandler}
          >
            <img src={check} alt="check" />
            Confirm reservation
          </button>
        )}
      </li>

      <li>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div style={{ width: "100%" }}>
            {notification_details && (
              <T2>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="scroll" style={{ maxHeight: "20em" }}>
                  {notification_details.map((item, index) => (
                    <Row item={item} key={index} />
                  ))}
                </tbody>
              </T2>
            )}
          </div>
        </Collapse>
      </li>
    </Fragment>
  );
}

import React, { Fragment, useId } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "@mui/material";
import { T2 } from "components/Tables";
import { getStatusEn } from "utils";
import Row from "./Row";

import down from "assets/icons/down.svg";
import check from "assets/icons/check.svg";

export default function Notification({ data, active, clickHandler }) {
  const id = useId();
  const is_active = id === active;
  const { notification_details, loading } = useSelector(
    (state) => state.notification
  );

  const confirmHandler = () => {};

  return (
    <Fragment>
      <li onClick={() => clickHandler(id)}>
        <p className="message">
          <img src={down} alt="down" />
          {data.title} have asked to reserve extra pieces
        </p>
        <span className="date">{data.created_at}</span>
        <span className={`status ${getStatusEn(data.status)}`}>
          {getStatusEn(data.status)}
        </span>
        {is_active && data.status === 1 && (
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
        <Collapse in={is_active} timeout="auto" unmountOnExit>
          <div style={{ width: "100%" }}>
            {is_active && !loading && (
              <Fragment>
                {notification_details && notification_details.length > 0 ? (
                  <T2>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Ordered</th>
                        <th>Fulfilled</th>
                        <th>Fulfilled (%)</th>
                        <th>Reserved</th>
                        <th>Allocated</th>
                        <th>Reserve</th>
                        {data.status === 1 && (
                          <Fragment>
                            <th>Action</th>
                            <th>Subtract from</th>
                          </Fragment>
                        )}
                      </tr>
                    </thead>
                    <tbody className="scroll" style={{ maxHeight: "20em" }}>
                      {notification_details.map((item, index) => (
                        <Row item={item} key={index} status={data.status} />
                      ))}
                    </tbody>
                  </T2>
                ) : (
                  <p className="empty-data">Empty Notification</p>
                )}
              </Fragment>
            )}
          </div>
        </Collapse>
      </li>
    </Fragment>
  );
}

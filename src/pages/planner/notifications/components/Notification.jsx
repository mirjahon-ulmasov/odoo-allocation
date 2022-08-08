import React, { Fragment, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNotification } from "store/notification";
import { T2, Container } from "components/Tables";
import { Collapse } from "@mui/material";
import { getStatus } from "utils";
import Row from "./Row";

import down from "assets/icons/down.svg";
import check from "assets/icons/check.svg";

export default function Notification({ data, active, clickHandler }) {
  const id = useId();
  const dispatch = useDispatch();
  const is_active = id === active;
  const { notification_details, loading } = useSelector((state) => state.notification);

  const confirmHandler = () => {
    const data = {
      order_id: notification_details[0].order_id || 1, // ------ CHANGE
      materials: notification_details.map((notif) => ({
        material_id: notif.material_id,
        confirmed: true, // ------------------------------------ CHANGE
        dealers: notif.dealers.map((dealer) => ({
          dealer_id: dealer.dealer_id,
          given: dealer.given,
        })),
      })),
    };
    dispatch(postNotification(data));
  };

  return (
    <Fragment>
      <li onClick={() => clickHandler(id)}>
        <p className="message">
          <img src={down} alt="down" />
          {data.title} have asked to reserve extra pieces
        </p>
        <span className="date">{data.created_at}</span>
        <span className={`status ${getStatus(data.is_confirmed)}`}>
          {getStatus(data.is_confirmed)}
        </span>
        {is_active && !data.is_confirmed && (
          <button
            type="button"
            className="btn success"
            onClick={confirmHandler}>
            <img src={check} alt="check" />
            Confirm reservation
          </button>
        )}
      </li>
      <li>
        <Collapse in={is_active} timeout="auto" unmountOnExit>
          <Container className="scroll">
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
                        {!data.is_confirmed && (
                          <Fragment>
                            <th>Action</th>
                            <th>Subtract from</th>
                          </Fragment>
                        )}
                      </tr>
                    </thead>
                    <tbody className="scroll" style={{ maxHeight: "20em" }}>
                      {notification_details.map((item, index) => (
                        <Row item={item} key={index} isConfirmed={data.is_confirmed}/>
                      ))}
                    </tbody>
                  </T2>
                ) : (
                  <p className="empty-data">Empty Notification</p>
                )}
              </Fragment>
            )}
          </Container>
        </Collapse>
      </li>
    </Fragment>
  );
}

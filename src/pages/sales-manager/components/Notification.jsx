import React, { Fragment, useState } from "react";
import { useFetchSmProdsQuery } from "services/smService";
import { NotificationManager } from "react-notifications";
import { Collapse } from "@mui/material";
import { T1 } from "components/Tables";

import down from "assets/icons/down.svg";
import Loader from "components/Loader";

const headers = [
  "ID",
  "Product",
  "Ordered",
  "Fulfilled",
  "Fulfilled (%)",
  "Reserved",
  "Allocated",
  "Reserve",
];

export default function Notification() {
  const [open, setOpen] = useState(false);
  const { data, isLoading: loading, error } = useFetchSmProdsQuery();

  return (
    <Fragment>
      {loading && <Loader />}
      {error && NotificationManager.error(error)}
      <li onClick={() => setOpen((prev) => !prev)}>
        <p className="message">
          <img src={down} alt="down" />
          You (Texnograd) have asked to reserve extra pieces
        </p>
        <span className="status">Status: Waiting</span>
      </li>

      <li>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div style={{ width: "100%" }}>
            {data && (
              <T1>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="scroll" style={{ maxHeight: "20em" }}>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material}</td>
                      <td>{item.material_name}</td>
                      <td>{item.ordered}</td>
                      <td>{item.fulfilled}</td>
                      <td>{item.fulfilled_percentage}%</td>
                      <td>{item.reserved}</td>
                      <td>{item.allocated}</td>
                      <td>{item.reserve}</td>
                    </tr>
                  ))}
                </tbody>
              </T1>
            )}
          </div>
        </Collapse>
      </li>
    </Fragment>
  );
}

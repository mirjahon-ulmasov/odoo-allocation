import React, { Fragment, useState } from "react";
import { useFetchSmProdsQuery } from "services/smService";
import { NotificationManager } from "react-notifications";
import { Collapse } from "@mui/material";
import { T1 } from "components/Tables";
import { getLoading } from "utils";
import Row from "./Row";

import down from "assets/icons/down.svg";

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

export default function Notification() {
  const [open, setOpen] = useState(false);
  const { data, isLoading: loading, error } = useFetchSmProdsQuery();

  getLoading(loading);

  return (
    <Fragment>
      {error && NotificationManager.error(error)}
      <li onClick={() => setOpen((prev) => !prev)}>
        <p className="message">
          <img src={down} alt="down" />
          Texnograd have asked to reserve extra pieces
        </p>
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
                    <Row item={item} key={index} />
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

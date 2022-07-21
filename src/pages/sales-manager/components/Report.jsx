import ReactDOM from "react-dom";
import React, { Fragment, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useFetchSmProdsQuery } from "services/smService";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loader from "components/Loader";

import style from "../style.module.scss";

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

export default function Report() {
  const [dealer, setDealer] = useState("");
  const { data, isLoading: loading, error } = useFetchSmProdsQuery();

  if (loading)
    return ReactDOM.createPortal(
      <Loader />,
      document.getElementById("loading")
    );
  if (error) return NotificationManager.error(error);

  return (
    <Fragment>
      <header className="header">
        <h1>Report</h1>
        <Box sx={{ minWidth: 200 }}>
          <FormControl
            sx={{ backgroundColor: "#f1f1f1", borderRadius: "2px" }}
            fullWidth
          >
            <InputLabel>Select dealer</InputLabel>
            <Select
              value={dealer}
              label="Select dealer"
              onChange={(e) => setDealer(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </header>
      {data && (
        <table className={`${style.table} ${style.t1}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="scroll">
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.material}</td>
                  <td>{item.material_name}</td>
                  <td>{item.ordered}</td>
                  <td>{item.fulfilled}</td>
                  <td>{item.fulfilled_percentage}%</td>
                  <td>{item.reserved}</td>
                  <td>{item.allocated}</td>
                  <td>
                    <input
                      type="text"
                      value={item.reserve}
                      onChange={() => {}}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
}

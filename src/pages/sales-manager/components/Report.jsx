import React, { Fragment, useState } from "react";
import { useFetchSmProdsQuery } from "services/smService";
import { NotificationManager } from "react-notifications";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loader from "components/Loader";
import { T1 } from "components/Tables";

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
];

export default function Report() {
  const [dealer, setDealer] = useState("");
  const { data, isLoading: loading, error } = useFetchSmProdsQuery();

  if (error) NotificationManager.error(error.error);

  return (
    <Fragment>
      {loading && <Loader />}
      <header className="header">
        <h1>Report</h1>
        <Box sx={{ minWidth: 200 }}>
          <FormControl
            sx={{ backgroundColor: "#f1f1f1", borderRadius: "2px" }}
            size="small"
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
        <T1 style={{ marginTop: "1.5em" }}>
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
        </T1>
      )}
      <div style={{ marginTop: "2rem" }} className="actions">
        <button type="button" className="btn success">
          <img src={check} alt="check" />
          Submit planning
        </button>
      </div>
    </Fragment>
  );
}

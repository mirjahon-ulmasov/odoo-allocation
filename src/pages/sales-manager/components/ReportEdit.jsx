import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  fetchDealers,
  fetchSmProds,
  postReservation,
} from "store/sales_manager";
import Loader from "components/Loader";
import { T1 } from "components/Tables";
import check from "assets/icons/check.svg";
import { editSmProds } from "store/sales_manager";

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

export default function ReportEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState("");
  const { dealers, sm_prods, loading } = useSelector(
    (state) => state.sales_manager
  );

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  useEffect(() => {
    if (!dealers) return;
    let dealerId = dealer ? dealer : dealers[0].id;
    dispatch(fetchSmProds({ dealer: dealerId }));
  }, [dispatch, dealers, dealer]);

  const submitHandler = () => {
    let dealerId = dealer ? dealer : dealers[0].id;
    const data = {
      customer: dealerId,
      items: sm_prods
        .filter((prod) => prod.reserve > 0)
        .map((prod) => ({ material: prod.id, quantity: prod.reserve })),
    };
    dispatch(postReservation({ data, cb: () => navigate("/sm") }));
  };

  return (
    <Fragment>
      {loading && <Loader />}
      <header className="header">
        <h1>Report</h1>
        {dealers && (
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
                {dealers.map((dealer, index) => (
                  <MenuItem key={index} value={dealer.id}>
                    {dealer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </header>
      {sm_prods && sm_prods.length > 0 && (
        <Fragment>
          <T1 style={{ marginTop: "1.5em" }}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="scroll">
              {sm_prods.map((item, index) => {
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
                        type="number"
                        value={item.reserve}
                        onChange={(e) => {
                          const num = parseInt(e.target.value);
                          if (num >= 0) {
                            dispatch(
                              editSmProds({ prodId: item.id, quantity: num })
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </T1>
          <div style={{ marginTop: "2rem" }} className="actions">
            <button
              onClick={submitHandler}
              type="button"
              className="btn success"
            >
              <img src={check} alt="check" />
              Submit planning
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

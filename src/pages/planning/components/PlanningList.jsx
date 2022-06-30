import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { ArrowForward, Cached } from "@mui/icons-material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import back from "../../../assets/icons/back.svg";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { clearVendors, fetchVendors } from "../../../store/vendor";
import Loader from "../../../components/Loader";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
    return () => dispatch(clearVendors());
  }, [dispatch]);

  const updateAllDB = () => {
    NotificationManager.success("Hello");
  };
  const updateDB = (id) => {};

  const planningHandler = (vendorId, title) => {
    navigate(vendorId, { state: { title } });
  };
  return (
    <>
      {loading && <Loader />}
      {error && NotificationManager.error(error)}
      <nav className="nav-links">
        <img onClick={() => navigate(-1)} src={back} alt="back icon" />
        <p onClick={() => navigate("/")} className="click">
          Main Page -
        </p>
        <p className="unclick">Planning</p>
      </nav>
      <header className="header">
        <h1>Planning</h1>
        <button type="button" onClick={updateAllDB} className="btn info">
          <Cached />
          Update all databases
        </button>
      </header>
      {vendors && (
        <TableContainer sx={{ marginTop: "1rem", maxHeight: 440 }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => {
                return (
                  <TableRow
                    key={index}
                    className="row"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      {vendor.vendor}
                    </TableCell>
                    <TableCell align="left">{vendor.vendor_name}</TableCell>
                    <TableCell align="left">
                      Last update 17:00, 24th may
                    </TableCell>
                    <TableCell align="left">
                      <div className="actions">
                        <button
                          type="button"
                          onClick={() => updateDB(1)}
                          className="btn info"
                        >
                          <Cached />
                          Update database
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            planningHandler(
                              vendor.vendor.toString(),
                              vendor.vendor_name
                            )
                          }
                          className="btn success"
                        >
                          Start planning
                          <ArrowForward />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

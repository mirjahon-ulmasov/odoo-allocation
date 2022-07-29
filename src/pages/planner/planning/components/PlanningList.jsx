import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Cached } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import { useFetchVendorsQuery } from "services/product";

import style from "../style.module.scss";
import back from "assets/icons/back.svg";
import Loader from "components/Loader";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
  const navigate = useNavigate();
  const { data, isLoading: loading, error } = useFetchVendorsQuery();

  const updateDB = () => {};

  const planningHandler = (vendorId, title) => {
    navigate(vendorId, { state: { title } });
  };

  if (error) NotificationManager.error(error.error);

  return (
    <Fragment>
      {loading && <Loader />}
      <nav className="nav-links">
        <img onClick={() => navigate(-1)} src={back} alt="back icon" />
        <p onClick={() => navigate("/planner")} className="click">
          Main Page -
        </p>
        <p className="unclick">Planning</p>
      </nav>
      <header className="header">
        <h1>Planning</h1>
        <button type="button" onClick={updateDB} className="btn info">
          <Cached />
          Update
        </button>
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
            {data.map((vendor, index) => {
              return (
                <tr key={index}>
                  <td>{vendor.vendor}</td>
                  <td>{vendor.vendor_name}</td>
                  <td>Last update 17:00, 24th may</td>
                  <td>
                    <button
                      type="button"
                      className="btn success"
                      onClick={() =>
                        planningHandler(
                          vendor.id.toString(),
                          vendor.vendor_name
                        )
                      }
                    >
                      Start planning
                      <ArrowForward />
                    </button>
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

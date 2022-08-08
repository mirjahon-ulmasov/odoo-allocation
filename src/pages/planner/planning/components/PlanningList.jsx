import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Cached } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import { useFetchVendorsQuery, useUpdateStockQuery } from "services/product";
import { Container } from "components/Tables";
import Loader from "components/Loader";
import moment from "moment";

import style from "../style.module.scss";
import back from "assets/icons/back.svg";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
  const navigate = useNavigate();
  const { data, isFetching: loading, error } = useFetchVendorsQuery();
  const { data: data2, isFetching: loading2, refetch } = useUpdateStockQuery();

  const updateDB = () => {
    refetch();
    if (data2) NotificationManager.success("Successfully Updated");
  };

  useEffect(() => {
    if (error) NotificationManager.error(error.error);
  }, []);

  const planningHandler = (vendorId, title) => {
    navigate(vendorId, { state: { title } });
  };

  return (
    <Fragment>
      {(loading || loading2) && <Loader />}
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
        <Container className="scroll">
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
                    <td>{moment().format("LLL")}</td>
                    <td>
                      <button
                        type="button"
                        className="btn success"
                        onClick={() => planningHandler(vendor.id.toString(),vendor.vendor_name)}>
                        Start planning
                        <ArrowForward />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      )}
    </Fragment>
  );
}

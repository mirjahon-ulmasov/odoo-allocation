import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../../../assets/icons/back.svg";
import Loader from "../../../components/Loader";
import { ArrowForward, Cached } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import { useFetchVendorsQuery } from "../../../services/productService";
import style from "../style.module.scss";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
  const navigate = useNavigate();
  const { data, isLoading: loading, error } = useFetchVendorsQuery();

  const updateAllDB = () => {};
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
            {data.results.map((vendor, index) => {
              return (
                <tr key={index}>
                  <td>{vendor.vendor}</td>
                  <td>{vendor.vendor_name}</td>
                  <td>Last update 17:00, 24th may</td>
                  <td>
                    <div className={style.actions}>
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

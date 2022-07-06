import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Cached } from "@mui/icons-material";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { clearVendors, fetchVendors } from "../../../store/vendor";
import back from "../../../assets/icons/back.svg";
import Loader from "../../../components/Loader";
import style from "../style.module.scss";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, vendors, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
    return () => dispatch(clearVendors());
  }, [dispatch]);

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
      {vendors && (
        <table className={`${style.table} ${style.t1}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="scroll">
            {vendors.map((vendor, index) => {
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
                            vendor.vendor.toString(),
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

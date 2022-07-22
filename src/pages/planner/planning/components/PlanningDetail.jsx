import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useFetchProdsByVendorQuery } from "services/productService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Loader from "components/Loader";
import Row from "./Row";

import style from "../style.module.scss";
import back from "assets/icons/back.svg";
import check from "assets/icons/check.svg";

const headers = [
  "ID",
  "Product",
  "Ordered",
  "Fulfilled",
  "Reserved",
  "In Stock",
  "Available",
];

export default function PlanningDetail() {
  const { vendorID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productFilter, setProductFilter] = useState(false);
  const [dillerFilter, setDillerFilter] = useState(false);
  const { data, isLoading: loading, error, refetch,
  } = useFetchProdsByVendorQuery({
    vendor: vendorID,
    exclude: productFilter,
  });

  useEffect(() => {
    refetch();
  }, [refetch, vendorID, productFilter]);

  if (loading) return ReactDOM.createPortal(<Loader />, document.getElementById("loading"));

  return (
    <Fragment>
      {error && NotificationManager.error(error)}
      {data && (
        <>
          <nav className="nav-links">
            <img onClick={() => navigate(-1)} src={back} alt="back icon" />
            <p onClick={() => navigate("/planner")} className="click">
              Main Page -
            </p>
            <p onClick={() => navigate("/planner/planning")} className="click">
              Planning -
            </p>
            <p className="unclick">{location.state.title}</p>
          </nav>
          <header className="header">
            <h1>{location.state.title}</h1>
            <div className="form__group">
              <div className="form__radio-group">
                <input
                  id="small"
                  name="size"
                  type="checkbox"
                  checked={productFilter}
                  onChange={(e) => setProductFilter(e.target.checked)}
                  className="form__radio-input"
                />
                <label htmlFor="small" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Show only products with a plan
                </label>
              </div>

              <div className="form__radio-group">
                <input
                  type="checkbox"
                  checked={dillerFilter}
                  onChange={(e) => setDillerFilter(e.target.checked)}
                  className="form__radio-input"
                  id="large"
                  name="size"
                />
                <label htmlFor="large" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Show only dillers with a plan
                </label>
              </div>
            </div>
          </header>
          <table className={`${style.table} ${style.t2}`}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className="scroll">
              {data.map((product, index) => (
                <Row key={index} filter={dillerFilter} product={product} />
              ))}
            </tbody>
          </table>
          <div className="actions">
            <button type="button" className="btn success">
              <img src={check} alt="check" />
              Submit planning
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
}

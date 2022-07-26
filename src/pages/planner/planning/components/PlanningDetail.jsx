import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Row from "./Row";

import style from "../style.module.scss";
import back from "assets/icons/back.svg";
import check from "assets/icons/check.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdsByVendor } from "store/product";
import Loader from "components/Loader";

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
  const dispatch = useDispatch();
  const [productFilter, setProductFilter] = useState(false);
  const [dillerFilter, setDillerFilter] = useState(false);

  const { loading, vendor_prods } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      fetchProdsByVendor({
        vendor: vendorID,
        exclude: productFilter,
      })
    );
  }, [dispatch, vendorID, productFilter]);

  return (
    <Fragment>
      {loading && <Loader />}
      {vendor_prods && (
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
              {vendor_prods.map((product, index) => (
                <Row key={index} filter={dillerFilter} product={product} rowIndex={index}/>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "2rem" }} className="actions">
            <button type="button" className="btn success">
              <img src={check} alt="check" />
              Confirm planning
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
}

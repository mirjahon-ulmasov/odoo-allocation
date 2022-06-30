import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import back from "../../../assets/icons/back.svg";
import Row from "./Row";
import check from "../../../assets/icons/check.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, fetchProductsByVendorID } from "../../../store/vendor";
import Loader from "../../../components/Loader";
import { NotificationManager } from "react-notifications";

const headers = [
  "ID",
  "Product",
  "Ordered",
  "Fulfilled",
  "Reserved",
  "In Stock",
];

export default function PlanningDetail() {
  const [productFilter, setProductFilter] = useState(false);
  const [dillerFilter, setDillerFilter] = useState(false);
  const { loading, products, error } = useSelector((state) => state.vendors);
  const { planId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductsByVendorID(planId));
    return () => dispatch(clearProducts());
  }, [dispatch, planId, location]);

  const filteredProducts = useMemo(() => {
    return (
      products &&
      products.filter((product) => {
        if (productFilter) {
          return product.ordered > 0;
        }
        return true;
      })
    );
  }, [productFilter, products]);

  return (
    <>
      {loading && <Loader />}
      {error && NotificationManager.error(error)}
      {products && (
        <>
          <nav className="nav-links">
            <img onClick={() => navigate(-1)} src={back} alt="back icon" />
            <p onClick={() => navigate("/")} className="click">
              Main Page -
            </p>
            <p onClick={() => navigate("/planning")} className="click">
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
                  value={productFilter}
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
                  value={dillerFilter}
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

          <TableContainer sx={{ marginTop: "1rem" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell
                      sx={{ padding: "1rem 2rem" }}
                      key={index}
                      align="left"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <Row filter={dillerFilter} key={index} row={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="actions">
            <button type="button" className="btn success">
              <img src={check} alt="check" />
              Submit planning
            </button>
          </div>
        </>
      )}
    </>
  );
}

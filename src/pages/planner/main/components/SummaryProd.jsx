import React, { Fragment, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { useFetchAllProductsQuery } from "services/productService";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import Loader from "components/Loader";
import styled from "styled-components";
import {
  fetchProdsByDealer,
  editDealerProdisFull,
  clearDealerProds,
} from "store/product";

export default function SummaryByProd() {
  const dispatch = useDispatch();
  const [isFull, setIsFull] = useState(true);
  const { data: allProds, isLoading: load1, error } = useFetchAllProductsQuery();
  const { loading: load2, dealer_prods } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProdsByDealer());
    return () => dispatch(clearDealerProds());
  }, [dispatch]);

  if (error) NotificationManager.error(error.error);

  return (
    <Summary className="scroll">
      {(load1 || load2) && <Loader />}
      {allProds && allProds.length > 0 && (
        <table className="table_1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              {isFull && (
                <Fragment>
                  <th>Ordered</th>
                  <th>Fulfilled</th>
                  <th>Reserved</th>
                  <th>In stock</th>
                  <th>Available</th>
                </Fragment>
              )}
              <th>
                <IconButton
                  type="button"
                  sx={{ bgcolor: "#130F2670", padding: 0.5, color: "#FFF" }}
                  onClick={() => setIsFull((prev) => !prev)}>
                  {isFull ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {allProds.map((prod, index) => (
              <tr key={index}>
                <td>{prod.material}</td>
                <td>{prod.material_name}</td>
                {isFull && (
                  <Fragment>
                    <td>{prod.ordered}</td>
                    <td>{prod.fulfilled}</td>
                    <td>{prod.reserved}</td>
                    <td>{prod.in_stock}</td>
                    <td>{prod.is_available}</td>
                  </Fragment>
                )}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="scroll"
        style={{ display: "flex", overflow: "scroll hidden", height: "fit-content" }}>
        {dealer_prods &&
          dealer_prods.map((dealer, index) => (
            <table
              key={index}
              className={`table_2 ${dealer.isFull ? "active" : ""}`}>
              <thead>
                <tr>
                  <th colSpan={4}>
                    <span>{dealer.name}</span>
                    <IconButton
                      type="button"
                      onClick={() => dispatch(editDealerProdisFull(dealer.id))}>
                      {dealer.isFull ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                  </th>
                </tr>
                <tr>
                  <th>Ordered</th>
                  {dealer.isFull && (
                    <Fragment>
                      <th>Fulfilled</th>
                      <th>Reserved</th>
                      <th>Allocation</th>
                    </Fragment>
                  )}
                </tr>
              </thead>
              <tbody>
                {dealer.products.map((el, index) => (
                  <tr key={index}>
                    <td>{el.ordered}</td>
                    {dealer.isFull && (
                      <Fragment>
                        <td>{el.fulfilled}</td>
                        <td>{el.reserved}</td>
                        <td>{el.allocation}</td>
                      </Fragment>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
    </Summary>
  );
}

const Summary = styled.div`
  height: 75vh;
  display: flex;
  overflow: scroll;

  table {
    color: #333333;
    text-align: center;
    min-width: max-content;
    border-collapse: collapse;

    & * {
      box-sizing: unset;
    }
    tbody {
      display: block;
      overflow: auto;
      width: 100%;
      tr {
        height: 5rem;
        td {
          font-weight: 500;
          padding: 1rem 2rem;
          vertical-align: middle;
        }
        &:nth-child(odd) {
          background-color: #f3f3f3;
        }
      }
    }
    tr {
      display: table;
      width: 100%;
    }
  }
  table.table_1 {
    z-index: 10;
    height: fit-content;
    border-right: 4px solid #b7478a;
    box-shadow: 5px 0px 15px #ccccccc1;
    thead {
      tr {
        border-bottom: 1px solid #dfdfdf;
        th {
          font-weight: 500;
          padding: 1.5rem 2rem;

          button:hover {
            background-color: #130f2680;
          }
        }
      }
    }
    tbody tr td {
      &:first-child,
      &:nth-child(2) {
        font-weight: 400;
      }
    }
    th, td {
      width: 4rem;
      &:first-child {
        width: 12rem;
      }
      &:nth-child(2) {
        width: 20rem;
      }
      &:last-child {
        width: 2rem;
        padding: 1.5rem 1rem;
      }
    }
  }
  table.table_2 {
    thead {
      tr {
        border-right: 1px solid #fff;
        th {
          padding: 0.4rem 1rem;
        }
        &:first-child {
          th {
            width: fit-content;
            display: flex;
            text-align: left;
            align-items: center;

            span {
              font-weight: 500;
              line-height: 1.2;
            }
          }
        }
        &:nth-child(2) {
          background-color: #f2f2f2;
          border-bottom: 1px solid #dfdfdf;
          border-right: 1px solid #f2f2f2;
          th {
            font-size: 14px;
            color: #898989;
            font-weight: 400;
            padding: 0.2rem 2rem;
          }
        }
      }
    }
    tbody {
      border-right: 1px solid #eaeaea;
    }
  }
  table.table_2.active {
    thead tr {
      &:first-child th {
        width: 100%;
        display: table-cell;
      }
      &:nth-child(2) {
        background-color: #016584;
        th {
          color: #fff;
        }
      }
    }
    tbody tr {
      background-color: #f0f8f9;
      border-bottom: 1px solid #dfdfdf;
    }
  }
`;

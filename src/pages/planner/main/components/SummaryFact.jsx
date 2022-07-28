import React, { Fragment } from "react";
import { useFetchDealersByFactQuery } from "services/productService";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import Loader from "components/Loader";

export default function SummaryByFact() {
  const { data, isLoading: loading, error } = useFetchDealersByFactQuery();

  const th = (index = "johon") => (
    <Fragment key={index}>
      <th>Ordered</th>
      <th>Fulfilled</th>
      <th>Reserved</th>
      <th>Allocation</th>
    </Fragment>
  );

  if (error) NotificationManager.error(error.error);

  return (
    <Summary className="scroll">
      {loading && <Loader />}
      {data && 
        <Fragment>
          <table className="sticky">
            <thead>
              <tr>
                <th>Dealers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dealer, index) => (
                <tr key={index}>
                  <td>{dealer.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="scroll"
            style={{ display: "flex", overflow: "scroll hidden", height: "fit-content" }}>
            <table className="scrolling">
              <thead>
                <tr>
                  <th colSpan={4}>Total</th>
                  {data[0].vendors.map((prod, index) => (
                    <th key={index} colSpan={4}>
                      {prod.vendor}
                    </th>
                  ))}
                </tr>
                <tr>
                  {th()}
                  {data[0].vendors.map((_, index) => th(index))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.total.total_ordered}</td>
                      <td>{row.total.total_reserved}</td>
                      <td>{row.total.total_fulfilled}</td>
                      <td>{row.total.total_allocation}</td>
                      {row.vendors.map((vendor, index) => (
                        <Fragment key={index}>
                          <td>{vendor.ordered}</td>
                          <td>{vendor.reserved}</td>
                          <td>{vendor.fulfilled}</td>
                          <td>{vendor.allocation}</td>
                        </Fragment>
                      ))}
                    </tr>
                  )})}
              </tbody>
            </table>
          </div>
        </Fragment>
      }
    </Summary>
  )
}

const Summary = styled.div`
  height: 75vh;
  display: flex;
  overflow: scroll;

  table {
    margin-top: 1rem;
    color: #333333;
    text-align: center;
    min-width: max-content;
    text-transform: capitalize;
    border-collapse: collapse;

    tbody {
      tr {
        td {
          font-weight: 500;
          padding: 1.2rem 1.5rem;
        }
        &:nth-child(odd) {
          background-color: #f3f3f3;
        }
      }
    }
  }
  table.sticky {
    z-index: 10;
    box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.08);

    tr th {
      padding: 1.56rem;
      border-bottom: 1px solid #dfdfdf;
    }
    tr:last-child td {
      padding: 1.45rem;
    }
    td, th {
      font-weight: 400;
    }
  }
  table.scrolling {
    z-index: 1;
    thead {
      tr {
        border-right: 1px solid #fff;
        &:first-child {
          th {
            padding: 0.7rem;
            background-color: #f1f1f1;
            &:nth-child(odd) {
              background-color: #e3e3e3;
            }
            &:first-child {
              background-color: #1074bd;
              color: #fff;
            }
          }
        }
        &:nth-child(2) {
          background-color: #fff;
          border-bottom: 1px solid #dfdfdf;
          border-right: 1px solid #f2f2f2;
          th {
            font-size: 14px;
            color: #737373;
            font-weight: 400;
            padding: 0.2rem 1.5rem;

            &:nth-child(-n + 4) {
              background-color: #ebf6ff;
            }
          }
        }
      }
    }
    tbody tr td:nth-child(4n) {
      border-right: 2px solid #ededed;
    }
  }
`;

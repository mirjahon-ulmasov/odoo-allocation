import React, { Fragment } from "react";
import styled from "styled-components";

import { useFetchDealersByFactQuery } from "services/productService";
import { NotificationManager } from "react-notifications";
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

  if (error) NotificationManager.error(error);

  return (
    <>
      {loading && <Loader />}
      {data && (
        <Summary className="scroll">
          <table className="sticky">
            <thead>
              <tr>
                <th>Dealers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dealer, index) => {
                return (
                  <tr key={index}>
                    <td>{dealer.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{ display: "flex", overflowX: "scroll" }}
            className="scroll">
            <table className="scroll">
              <thead>
                <tr>
                  <th colSpan={4}>Total</th>
                  {data[0].products.map((prod, index) => {
                    return (
                      <th key={index} colSpan={4}>
                        {prod.vendor}
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  {th()}
                  {data[0].products.map((_, index) => {
                    return th(index);
                  })}
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
                      {row.products.map((product, index) => {
                        return (
                          <Fragment key={index}>
                            <td>{product.ordered}</td>
                            <td>{product.reserved}</td>
                            <td>{product.fulfilled}</td>
                            <td>{product.allocation}</td>
                          </Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Summary>
      )}
    </>
  );
}

const Summary = styled.div`
  display: flex;

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
      padding: 1.6rem;
      border-bottom: 1px solid #dfdfdf;
    }
    td,
    th {
      font-weight: 400;
      padding: 1.2rem 4.3rem;
    }
  }
  table.scroll {
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
    tbody {
      tr {
        td:nth-child(4n) {
          border-right: 2px solid #ededed;
        }
      }
    }
  }
`;

import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

import dealerList from "fake-data/dealers.json";

export default function SummaryByFact() {
  const [dealers, setDealers] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDealers(dealerList);
    }, 0);
  }, []);

  return (
    dealers && (
      <Summary>
        <table className="sticky">
          <thead>
            <tr>
              <th>Dealers</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((dealer, index) => {
              return (
                <tr key={index}>
                  <td>{dealer.dealer_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{ display: "flex", overflowX: "scroll" }}
          className="scroll"
        >
          <table className="scroll">
            <thead>
              <tr>
                {dealers[0].factories.map((fact, index) => {
                  return (
                    <th key={index} colSpan={4}>
                      {fact.name}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {dealers[0].factories.map((_, index) => {
                  return (
                    <Fragment key={index}>
                      <th>Ordered</th>
                      <th>Fulfilled</th>
                      <th>Reserved</th>
                      <th>In Stock</th>
                    </Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer, index) => {
                return (
                  <tr key={index}>
                    {dealer.factories.map((fact, index) => {
                      return (
                        <Fragment key={index}>
                          <td>{fact.ordered}</td>
                          <td>{fact.fulfilled}</td>
                          <td>{fact.reserved}</td>
                          <td>{fact.in_stock}</td>
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
    )
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
      padding: 1.5rem 5rem;
      display: inline-block;
      border-bottom: 1px solid #dfdfdf;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
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

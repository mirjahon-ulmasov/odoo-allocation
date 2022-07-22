import React, { Fragment, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { useFetchAllProductsQuery } from "services/productService";
import { NotificationManager } from "react-notifications";
import { IconButton } from "@mui/material";
import Loader from "components/Loader";

import styled from "styled-components";
import companyList from "fake-data/companies.json";

export default function SummaryByProd() {
  const [isFull, setIsFull] = useState(true);
  const [companies, setCompanies] = useState(null);
  const { data, isLoading: loading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    setTimeout(() => {
      setCompanies(companyList);
    }, 0);
  }, []);

  return (
    <Summary className="scroll">
      {error && NotificationManager.error(error)}
      {loading && <Loader />}
      {data && (
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
                  sx={{ bgcolor: "#130F2670", padding: 0.5, color: "#FFF" }}
                  type="button"
                  onClick={() => setIsFull((prev) => !prev)}
                >
                  {isFull ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody className="scroll">
            {data.map((prod, index) => (
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
      {companies &&
        companies.map((company, index) => (
          <table
            key={index}
            className={`table_2 ${company.isFull ? "active" : ""}`}>
            <thead>
              <tr>
                <th colSpan={4}>
                  <span>{company.name}</span>
                  <IconButton
                    type="button"
                    onClick={() => {
                      setCompanies((prev) => {
                        return prev.map((comp) => {
                          if (comp.id === company.id) {
                            return { ...comp, isFull: !comp.isFull };
                          }
                          return comp;
                        });
                      });
                    }}
                  >
                    {company.isFull ? <ChevronRight /> : <ChevronLeft />}
                  </IconButton>
                </th>
              </tr>
              <tr>
                <th>Ordered</th>
                {company.isFull && (
                  <>
                    <th>Fulfilled</th>
                    <th>Reserved</th>
                    <th>Allocation</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {company.products.map((el, index) => (
                <tr key={index}>
                  <td>{el.ordered}</td>
                  {company.isFull && (
                    <>
                      <td>{el.fulfilled}</td>
                      <td>{el.reserved}</td>
                      <td>{el.allocation}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </Summary>
  );
}

const Summary = styled.div`
  display: flex;
  overflow-x: scroll;

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
      height: 60vh;
      width: 100%;
      tr {
        td {
          font-weight: 500;
          padding: 1rem 2rem;
          vertical-align: middle;

          &:first-child,
          &:nth-child(2) {
            font-weight: 400;
          }
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
    border-right: 4px solid #b7478a;
    thead {
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
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
    tbody tr {
      height: 5rem;
    }

    th,
    td {
      width: 4rem;
      &:first-child {
        width: 12rem;
      }
      &:nth-child(2) {
        width: 20rem;
      }
    }
  }
  table.table_2 {
    thead {
      tr {
        border-right: 1px solid #fff;
        th {
          padding: 0.4rem 2rem;
        }
        &:first-child {
          th {
            width: 5rem;
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
    thead {
      tr {
        &:first-child {
          th {
            width: 100%;
            display: table-cell;
          }
        }
        &:nth-child(2) {
          background-color: #016584;
          th {
            color: #fff;
          }
        }
      }
    }
    tbody {
      tr {
        background-color: #f0f8f9;
        border-bottom: 1px solid #dfdfdf;
      }
    }
  }
`;

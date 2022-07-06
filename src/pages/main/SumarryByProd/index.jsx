import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import style from "./style.module.scss";

import companyList from "../../../fake-data/companies.json";

export default function SummaryByProd() {
  const [isFull, setIsFull] = useState(true);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCompanies(companyList);
    }, 0);
  }, []);

  return (
    <div className={style.summary_prod + " scroll"}>
      <table className={style.table_1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            {isFull && (
              <>
                <th>Ordered</th>
                <th>Fulfilled</th>
                <th>Reserved</th>
                <th>In stock</th>
                <th>Available</th>
              </>
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
        <tbody>
          {[1, 2, 3, 4].map((el, index) => (
            <tr key={index}>
              <td>GY897968762</td>
              <td>TV-ART-43JSDKJFHS78</td>
              {isFull && (
                <>
                  <td>123</td>
                  <td>66</td>
                  <td>34</td>
                  <td>12</td>
                  <td>12</td>
                </>
              )}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {companies &&
        companies.map((company, index) => (
          <table
            key={index}
            className={`${style.table_2} ${company.isFull ? style.active : ""}`}
          >
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
    </div>
  );
}

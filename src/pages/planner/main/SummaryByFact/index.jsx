import React, { Fragment, useEffect, useState } from "react";

import dealerList from "fake-data/dealers.json";
import style from "./style.module.scss";

export default function SummaryByFact() {
  const [dealers, setDealers] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDealers(dealerList);
    }, 0);
  }, []);

  return (
    dealers && (
      <div className={style.summary_fact}>
        <table className={style.sticky}>
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
        <div style={{ display: "flex", overflowX: "scroll" }} className="scroll">
          <table className={style.scroll}>
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
      </div>
    )
  );
}

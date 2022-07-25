import { Fragment, useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useFetchDealersByProdQuery } from "services/productService";
import { Collapse, IconButton } from "@mui/material";
import { NotificationManager } from "react-notifications";
import { getLoading } from "utils";
import style from "../style.module.scss";

const headers = [
  "Dillers name",
  "Ordered",
  "Fulfilled",
  "Reserved",
  "Allocation",
];

const Row = ({ filter, product }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading: loading, error, refetch,
  } = useFetchDealersByProdQuery({ material: product.id, exclude: filter });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  getLoading(loading);

  return (
    <Fragment>
      {error && NotificationManager.error(error)}
      <tr className={style.row} onClick={() => setOpen(!open)}>
        <td>{product.material}</td>
        <td>{product.material_name}</td>
        <td>{product.ordered}</td>
        <td>{product.fulfilled}</td>
        <td>{product.reserved}</td>
        <td>{product.in_stock}</td>
        <td>0</td>
        <td>
          {open ? "Hide dillers" : "Show dillers"}
          <IconButton>
            {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </td>
      </tr>
      <tr>
        <td style={{ padding: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div style={{ backgroundColor: "#effafc", width: "100%" }}>
              {data && (
                <table className={`${style.table} ${style.nested_table}`}>
                  <thead>
                    <tr className={style.nested}>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="scroll">
                    {data.map((dealer, index) => (
                      <tr className={style.nested} key={index}>
                        <td>{dealer.name}</td>
                        <td>{dealer.ordered}</td>
                        <td>{dealer.fulfilled}</td>
                        <td>{dealer.reserved}</td>
                        <td>
                          <input
                            type="text"
                            value={dealer.allocated}
                            onChange={() => {}}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Collapse>
        </td>
      </tr>
    </Fragment>
  );
};

export default Row;

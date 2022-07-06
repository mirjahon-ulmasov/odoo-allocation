import { useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import product from "../../../fake-data/product-detail.json";
import style from "../style.module.scss";
import { Collapse, TextField, IconButton } from "@mui/material";

const headers = [
  "Dillers name",
  "Dillers debt (in sums)",
  "Ordered",
  "Fulfilled",
  "Reserved",
  "Allocation",
];

const Row = ({ data }) => {
  const [prodDetail, setProdDetail] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProdDetail(product);
    }, 0);
  }, []);

  return (
    <>
      <tr className={style.row} onClick={() => setOpen(!open)}>
        <td>{data.material}</td>
        <td>{data.material_name}</td>
        <td>{data.ordered}</td>
        <td>{data.fulfilled}</td>
        <td>{data.reserved}</td>
        <td>{data.in_stock}</td>
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
              {prodDetail && (
                <table className={`${style.table} ${style.nested_table}`}>
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prodDetail.dealers.map((dealer, index) => (
                      <tr key={index}>
                        <td>{dealer.name}</td>
                        <td>{dealer.debt}</td>
                        <td>{dealer.ordered}</td>
                        <td>{dealer.fulfilled}</td>
                        <td>{dealer.reserved}</td>
                        <td>
                          <TextField
                            sx={{ backgroundColor: "#fff" }}
                            label="Amount"
                            type="number"
                            size="small"
                            variant="outlined"
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
    </>
  );
};

export default Row;

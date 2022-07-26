import { Fragment, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealersByProd } from "store/product";
import style from "../style.module.scss";

const headers = [
  "Dillers name",
  "Ordered",
  "Fulfilled",
  "Reserved",
  "Allocation",
];

const Row = ({ filter, product, rowIndex }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { prods_dealer } = useSelector((state) => state.product);

  const clickHandler = () => {
    setOpen(!open);
    if (!existingProd(prods_dealer)) {
      dispatch(fetchDealersByProd({ material: product.id, exclude: filter }));
    }
  };

  const existingProd = (product) => {
    return product.some((prod) => prod.id === product.id);
  };

  return (
    <Fragment>
      <tr className={style.row} onClick={clickHandler}>
        <td>{product.material}</td>
        <td>{product.material_name}</td>
        <td>{product.ordered}</td>
        <td>{product.fulfilled}</td>
        <td>{product.reserved}</td>
        <td>{product.in_stock}</td>
        <td>{product.is_available}</td>
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
              {prods_dealer.length > 0 && (
                <table className={`${style.table} ${style.nested_table}`}>
                  <thead>
                    <tr className={style.nested}>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="scroll">
                    {prods_dealer[rowIndex] &&
                      prods_dealer[rowIndex].map((dealer, index) => (
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

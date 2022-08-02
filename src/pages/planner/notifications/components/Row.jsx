import React, { Fragment, useState } from "react";
import { Done, Close, KeyboardArrowDown } from "@mui/icons-material";

export default function Row({ item, isConfirmed }) {
  const [isReject, setIsReject] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const applyHandler = () => {
    setIsOpen(false);
  };
  return (
    <tr>
      <td>{item.material}</td>
      <td>{item.material_name}</td>
      <td>{item.ordered}</td>
      <td>{item.fulfilled}</td>
      <td>{item.fulfilled_percentage}%</td>
      <td>{item.reserved}</td>
      <td>{item.allocation}</td>
      <td>
        {item.current_quantity}
        <span>(+{item.extra_required})</span>
      </td>
      {!isConfirmed && (
        <Fragment>
          <td>
            <div className="actions">
              <button
                className={!isReject ? "success" : ""}
                onClick={() => setIsReject(false)}>
                <Done />
              </button>
              <button
                className={isReject ? "danger" : ""}
                onClick={() => setIsReject(true)}>
                <Close />
              </button>
            </div>
          </td>
          <td>
            <button
              disabled={isReject}
              className={`btn ${isReject ? "disabled" : "gray"}`}
              onClick={() => setIsOpen((prev) => !prev)}>
              Select Dealer
              <KeyboardArrowDown />
            </button>
            {isOpen && (
              <div className="dropdown">
                <label>
                  Saturn (2)
                  <input type="number" />
                </label>
                <label>
                  Texnology diller (29)
                  <input type="number" />
                </label>
                <label>
                  Texnology diller 212 (29)
                  <input type="number" />
                </label>
                <button onClick={applyHandler} className="btn success">
                  Apply
                </button>
              </div>
            )}
          </td>
        </Fragment>
      )}
    </tr>
  );
}

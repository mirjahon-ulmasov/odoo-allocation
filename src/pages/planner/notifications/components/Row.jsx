import React, { useState } from "react";
import { Done, Close } from "@mui/icons-material";

export default function Row({ item }) {
  const [isReject, setIsReject] = useState(true);
  return (
    <tr>
      <td>{item.material}</td>
      <td>{item.material_name}</td>
      <td>{item.ordered}</td>
      <td>{item.fulfilled}</td>
      <td>{item.fulfilled_percentage}%</td>
      <td>{item.reserved}</td>
      <td>{item.allocated}</td>
      <td>{item.reserve}</td>
      <td>
        <div className="actions">
          <button
            className={!isReject ? "success" : ""}
            onClick={setIsReject(false)}>
            <Done />
          </button>
          <button
            className={isReject ? "danger" : ""}
            onClick={setIsReject(true)}>
            <Close />
          </button>
        </div>
      </td>
      <td>Select Dealer</td>
    </tr>
  );
}

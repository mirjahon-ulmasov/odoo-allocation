import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TextField,
  IconButton,
} from "@mui/material";

const headers = [
  "Dillers name",
  "Dillers debt (in sums)",
  "Dillers plan",
  "Dillers sales",
  "Dillers reserved",
  "Planned amount (stock)",
];

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="row-2"
        onClick={() => setOpen(!open)}
      >
        <TableCell>{row.material}</TableCell>
        <TableCell align="left">{row.material_name}</TableCell>
        <TableCell align="left">{row.ordered}</TableCell>
        <TableCell align="left">{row.fulfilled}</TableCell>
        <TableCell align="left">{row.reserved}</TableCell>
        <TableCell align="left">{row.in_stock}</TableCell>
        <TableCell align="left" sx={{ fontWeight: 500 }}>
          {open ? "Show dillers" : "Hide dillers"}
          <IconButton>
            {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: "1.5rem 2rem", backgroundColor: "#effafc" }}>
              {/* <Table
                size="small"
                aria-label="purchases"
                className="nested-table"
              >
                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableCell key={index} align="center">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{data.name}</TableCell>
                      <TableCell align="left">{data.debt}</TableCell>
                      <TableCell align="left">{data.plan}</TableCell>
                      <TableCell align="left">{data.sales}</TableCell>
                      <TableCell align="left">{data.reserved}</TableCell>
                      <TableCell align="left">
                        <TextField
                          sx={{ backgroundColor: "#fff" }}
                          label="Amount"
                          type="number"
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;

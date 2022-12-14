import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import { editAllocation } from "store/product";
import style from "./style.module.scss";
import { useRef } from "react";

const headers = [
	"Dealer name",
	"Ordered",
	"Fulfilled",
	"Reserved",
	"Allocated",
	"Allocate",
];

const Row = ({ product }) => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const clickHandler = () => {
		setOpen(!open);
	};
	return (
		<Fragment>
			<tr className={style.row} onClick={clickHandler}>
				<td>{product.material}</td>
				<td>{product.name}</td>
				<td>{product.total.total_ordered}</td>
				<td>{product.total.total_fulfilled}</td>
				<td>{product.total.total_reserved}</td>
				<td>{product.total.total_stock}</td>
				<td>{product.total.available_remains}</td>
				<td>
					{open ? "Hide dealers" : "Show dealers"}
					<IconButton>
						{open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
					</IconButton>
				</td>
			</tr>
			<tr>
				<td style={{ padding: 0 }} colSpan={8}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<div style={{ backgroundColor: "#effafc", width: "100%" }}>
							<table className={`${style.table} ${style.nested_table}`}>
								<thead>
									<tr className={style.nested}>
										{headers.map((header, index) => (
											<th key={index}>{header}</th>
										))}
									</tr>
								</thead>
								{product.customers.length > 0 && (
									<tbody className="scroll">
										{product.customers.map((dealer, index) => (
											<tr className={style.nested} key={index}>
												<td>{dealer.customer_name}</td>
												<td>{dealer.ordered}</td>
												<td>{dealer.fulfilled}</td>
												<td>{dealer.reserved}</td>
												<td>{dealer.allocated}</td>
												<td>
													<input ref={inputRef} onFocus={(e) => e.currentTarget.select()} 
														type="text" value={dealer.allocate} onChange={(event) => {
															if(isNaN(event.target.value) || event.target.value.includes('-')) return;
																dispatch(
																	editAllocation({
																		prodId: product.id,
																		customerId: dealer.customer_id,
																		quantity: event.target.value,
																	})
																);
														}}
													/>
												</td>
											</tr>
										))}
									</tbody>
								)}
							</table>
						</div>
					</Collapse>
				</td>
			</tr>
		</Fragment>
	);
};

export default Row;

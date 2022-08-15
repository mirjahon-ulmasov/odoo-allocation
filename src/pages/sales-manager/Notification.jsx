import React, { Fragment, useId } from "react";
import { Collapse } from "@mui/material";
import { T1, Container } from "components/Tables";
import { useSelector } from "react-redux";
import { getStatus } from "utils";

import down from "assets/icons/down.svg";

const headers = [
	"ID",
	"Product",
	"Ordered",
	"Fulfilled",
	"Fulfilled (%)",
	"Reserved",
	"Allocated",
	"Reserve",
];

export default function Notification({ data, active, clickHandler }) {
	const id = useId();
	const is_active = id === active;
	const { notification_details, loading } = useSelector((state) => state.notification);

	return (
		<Fragment>
			<li onClick={() => clickHandler(id)}>
				<p className="message">
					<img src={down} alt="down" />
					You({data.title}) have asked to reserve extra pieces
				</p>
				<span className="date">{data.created_at}</span>
				<span className={`status ${getStatus(data.processed)}`}>
					{getStatus(data.processed)}
				</span>
			</li>

			<li>
				<Collapse in={is_active} timeout="auto" unmountOnExit>
					<Container className="scroll">
						{is_active && !loading && (
							<Fragment>
								{notification_details && notification_details.length > 0 ? (
									<T1>
										<thead>
											<tr>
												{headers.map((header, index) => (
													<th key={index}>{header}</th>
												))}
											</tr>
										</thead>
										<tbody className="scroll" style={{ maxHeight: "20em" }}>
											{notification_details.map((item, index) => (
												<tr key={index}>
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
												</tr>
											))}
										</tbody>
									</T1>
								) : (
									<p className="empty-data">Empty Notification</p>
								)}
							</Fragment>
						)}
					</Container>
				</Collapse>
			</li>
		</Fragment>
	);
}

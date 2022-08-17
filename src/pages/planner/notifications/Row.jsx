import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editDealerCount } from "store/notification";
import { Done, Close, KeyboardArrowDown } from "@mui/icons-material";

export default function Row({ item, isConfirmed }) {
	const btnRef = useRef();
	const selectRef = useRef();
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [isReject, setIsReject] = useState(true);

	useEffect(() => {
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler)
	}, [])

	const clickHandler = (event) => {
		if(selectRef.current && !selectRef.current.contains(event.target) 
			&& event.target !== btnRef.current) {
			setIsOpen(false);
		}
	}

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
						<div className="actions" style={{ justifyContent: "center" }}>
							<button className={!isReject ? "success" : ""} onClick={() => setIsReject(false)}>
								<Done />
							</button>
							<button className={isReject ? "danger" : ""} onClick={() => setIsReject(true)}>
								<Close />
							</button>
						</div>
					</td>
					<td>
						<button ref={btnRef} disabled={isReject} className={`btn ${isReject ? "disabled" : "gray"}`}
							onClick={() => setIsOpen((prev) => !prev)}>
							Select Dealer
							<KeyboardArrowDown />
						</button>
						{isOpen && (
							<div ref={selectRef} className="dropdown scroll">
								{item.dealers.map((dealer, index) => {
									return (
										<label key={index}>
											{dealer.dealer_name} ({dealer.remain})
											<input
												type="number"
												value={dealer.given}
												onChange={(e) => {
													const num = parseInt(e.target.value);
													if (num >= 0) {
														dispatch(
															editDealerCount({
																materialId: item.material_id,
																dealerId: dealer.dealer_id,
																quantity: num,
															})
														);
													}
												}}
											/>
										</label>
									);
								})}
							</div>
						)}
					</td>
				</Fragment>
			)}
		</tr>
	);
}

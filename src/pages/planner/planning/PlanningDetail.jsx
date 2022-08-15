import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
	fetchAllocations,
	clearAllocation,
	postAllocations,
} from "store/product";
import { Container } from "components/Tables";
import Loader from "components/Loader";
import Row from "./Row";

import style from "./style.module.scss";
import back from "assets/icons/back.svg";
import check from "assets/icons/check.svg";

const headers = [
	"ID",
	"Product",
	"Ordered",
	"Fulfilled",
	"Reserved",
	"In Stock",
	"Available",
];

export default function PlanningDetail() {
	const { vendorID } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [productFilter, setProductFilter] = useState(false);
	const [dealerFilter, setDealerFilter] = useState(false);
	const { loading, allocations } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(
			fetchAllocations({
				vendor: vendorID,
			})
		);
		return () => dispatch(clearAllocation());
	}, [dispatch, vendorID]);

	const filteredAllocations = React.useMemo(() => {
		if (!allocations || allocations.length === 0) return;
		return allocations
			.filter((prod) => {
				if (productFilter) return prod.total.total_ordered > 0;
				else return true;
			})
			.map((prod) => {
				if (dealerFilter) {
					return {
						...prod,
						customers: prod.customers.filter(
							(customer) => customer.ordered > 0
						),
					};
				}
				return prod;
			});
	}, [allocations, productFilter, dealerFilter]);

	const cancelReservation = () => {
		dispatch(clearAllocation());
		navigate("/planner/planning");
	};

	const submitHandler = () => {
		const data = allocations.map((prod) => {
			return {
				material: prod.id,
				items: prod.customers
					.filter((customer) => customer.allocated > 0)
					.map((customer) => ({
						customer: customer.customer_id,
						quantity: customer.allocated,
					})),
			};
		});

		dispatch(postAllocations({ data, cb: () => navigate("/planner") }));
	};

	return (
		<Fragment>
			{loading && <Loader />}
			<nav className="nav-links">
				<img onClick={() => navigate(-1)} src={back} alt="back icon" />
				<p onClick={() => navigate("/planner")} className="click">Main Page -</p>
				<p onClick={() => navigate("/planner/planning")} className="click">Planning -</p>
				<p className="unclick">{location.state.title}</p>
			</nav>
			<header className="header">
				<h1>{location.state.title}</h1>
				<div className="form__group">
					<div className="form__radio-group">
						<input id="small" name="size" type="checkbox" className="form__radio-input"
							checked={productFilter}
							onChange={(e) => setProductFilter(e.target.checked)}
						/>
						<label htmlFor="small" className="form__radio-label">
							<span className="form__radio-button"></span>
							Show only products with an order
						</label>
					</div>

					<div className="form__radio-group">
						<input type="checkbox" className="form__radio-input" id="large" name="size"
							checked={dealerFilter}
							onChange={(e) => setDealerFilter(e.target.checked)}
						/>
						<label htmlFor="large" className="form__radio-label">
							<span className="form__radio-button"></span>
							Show only dealers with an order
						</label>
					</div>
				</div>
			</header>
			<Container className="scroll">
				<table className={`${style.table} ${style.t2}`}>
					<thead>
						<tr>
							{headers.map((header, index) => (
								<th key={index}>{header}</th>
							))}
							<th></th>
						</tr>
					</thead>
					{filteredAllocations && filteredAllocations.length > 0 && (
						<tbody className="scroll">
							{filteredAllocations.map((product, index) => (
								<Row key={index} product={product} />
							))}
						</tbody>
					)}
				</table>
			</Container>
			<div style={{ marginTop: "2rem" }} className="actions">
				{filteredAllocations && filteredAllocations.length > 0 && (
					<button type="button" className="btn success" onClick={submitHandler}>
						<img src={check} alt="check" />
						Confirm planning
					</button>
				)}
				<button style={{ marginLeft: "2rem" }} type="button" className="btn gray"
					onClick={cancelReservation}>
					Cancel reservation
				</button>
			</div>
		</Fragment>
	);
}

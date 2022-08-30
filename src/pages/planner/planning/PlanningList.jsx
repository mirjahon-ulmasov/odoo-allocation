import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStock, fetchVendors } from "middlewares/product";
import { ArrowForward, Cached } from "@mui/icons-material";
import { Container } from "components/Tables";
import { useTranslation } from "react-i18next";
import Loader from "components/Loader";

import style from "./style.module.scss";
import back from "assets/icons/back.svg";

const headers = ["ID", "Organization", "Status", "Action"];

export default function PlanningList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { loading, vendors } = useSelector(state => state.product)

	const updateDB = () => {
		dispatch(updateStock());
	};

	useEffect(() => {
		dispatch(fetchVendors());
	}, [dispatch]);

	const planningHandler = (vendorId, title) => {
		navigate(vendorId, { state: { title } });
	};

	return (
		<Fragment>
			{loading && <Loader />}
			<nav className="nav-links">
				<img onClick={() => navigate(-1)} src={back} alt="back icon" />
				<p onClick={() => navigate("/planner")} className="click">{t("main.mainPage")} -</p>
				<p className="unclick">{t("main.allocation")}</p>
			</nav>
			<header className="header">
				<h1>{t("main.allocation")}</h1>
				<button type="button" onClick={updateDB} className="btn info">
					<Cached />
					{t("buttons.update")}
				</button>
			</header>
			{vendors && vendors.length !== 0 && (
				<Container className="scroll">
					<table className={`${style.table} ${style.t1}`}>
						<thead>
							<tr>
								{headers.map((header, index) => (
									<th key={index}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody className="scroll">
							{vendors.map((vendor, index) => {
								return (
									<tr key={index}>
										<td>{vendor.vendor}</td>
										<td>{vendor.vendor_name}</td>
										<td>{vendor.last_updated}</td>
										<td>
											<button type="button" className="btn success"
												onClick={() => planningHandler(vendor.id.toString(),vendor.vendor_name)}>
												{t("buttons.main")}
												<ArrowForward />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</Container>
			)}
		</Fragment>
	);
}

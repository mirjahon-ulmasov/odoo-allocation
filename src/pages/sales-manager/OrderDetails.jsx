import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrderDetail } from "store/sales_manager";
import { T1v2, Container } from "components/Tables";
import { useTranslation } from "react-i18next";
import Loader from "components/Loader";
import styled from "styled-components";
import { getStatusOrder } from "utils";

import back from "assets/icons/back.svg";

const headers = [
    "ID",
	"Product",
	"Requested" 
];

export default function OrderDetails() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { id } = useParams();

	const { order_detail, loading } = useSelector(state => state.sales_manager)

	useEffect(() => {
		dispatch(fetchOrderDetail(id));
	}, [dispatch, id]);

    return (
		<Fragment>
			{loading && <Loader />}
			<nav className="nav-links">
				<img onClick={() => navigate(-1)} src={back} alt="back icon" />
				<p onClick={() => navigate("/sm")} className="click">{t("main.mainPage")} -</p>
				<p onClick={() => navigate("/sm/orders")} className="click">{t("headers.orders")} -</p>
				<p className="unclick">{id}</p>
			</nav>
			<header className="header">
				<h1>{t("headers.orderDetails")}</h1>
			</header>
			{order_detail && (
				<Fragment>
					<Flex>
						<Left>
							<li>
								<p>Order ID</p>
								<h3>{order_detail.id ?? <>&#8212;</>}</h3>
							</li>
							<li>
								<p>SAP Order ID</p>
								<h3>{order_detail.salesorder ?? <>&#8212;</>}</h3>
							</li>
							<li>
								<p>Creation date&time</p>
								<h3>{order_detail.orderdate ?? <>&#8212;</>} {order_detail.orderetime ?? <>&#8212;</>}</h3>
							</li>
							<li>
								<p>Customer</p>
								<h3>{order_detail.customer.name ?? <>&#8212;</>}</h3>
							</li>
							<li>
								<p>Creator</p>
								<h3>{order_detail.owner.email ?? <>&#8212;</>}</h3>
							</li>
							<li>
								<p>Status</p>
								<h3>{getStatusOrder(order_detail.status)}</h3>
							</li>
						</Left>
						<Right>
							<Container className="scroll">
								<T1v2>
									<thead>
										<tr>
											{headers.map((header, index) => (
												<th key={index}>{header}</th>
											))}
										</tr>
									</thead>
									<tbody className="scroll">
										{order_detail.items.map((item, index) => {
											return (
												<tr key={index}>
													<td>{item.id}</td>
													<td>{item.material.material_name}</td>
													<td>{item.quantity}</td>
												</tr>
											);
										})}
									</tbody>
								</T1v2>
							</Container>
						</Right>
					</Flex>
					
				</Fragment>
			)}
		</Fragment>
	);
}


const Flex = styled.div`
	display: flex;
	margin: 2rem;
`

const Left = styled.ul`
	width: 25%;
	max-width: 20rem;
	min-width: 15rem;
	border-right: 1px solid #DFDFDF;

	li {
		margin-bottom: 2rem;

		p {
			font-size: 15px;
			font-weight: 500;
			color: #714B67;
			line-height: 35px;
		}

		h3 {
			font-weight: 600;
  			font-size: 20px;
			color: #343434;
		}
	}
`

const Right = styled.div`
	width: 75%;
	padding-left: 2rem;
	
`
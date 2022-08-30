import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealersByFact } from "middlewares/product";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "components/Loader";
import styled from "styled-components";
import { checkCount } from "utils";

export default function SummaryByFact({date}) {
	const stickyRef = useRef(null);
	const scrollRef = useRef(null);
	const dispatch = useDispatch();
	const { loading, dealer_factory } = useSelector(state => state.product);

	useEffect(() => {
		dispatch(fetchDealersByFact({ date_from: date }));
	}, [dispatch, date])

	const th = (index = "johon") => (
		<Fragment key={index}>
			<th>Ordered</th>
			<th>Fulfilled</th>
			<th>Reserved</th>
			<th>Allocated</th>
		</Fragment>
	);

	const scrollHandler = (event) => {
		stickyRef.current.scrollTop = event.currentTarget.scrollTop;
		scrollRef.current.scrollTop = event.currentTarget.scrollTop;
	};

	ReactHTMLTableToExcel.format = (s, c) => {
		if (c && c["table"]) {
			const html = c.table;
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
			const rows = doc.querySelectorAll("tr");

			const dealerTable = document.querySelector(".sticky");
			const dealers = Array.from(dealerTable.querySelectorAll("tr"));

			let i = 0, j = 0;
			for (const row of rows) {
				if (j++ === 1) row.insertBefore(document.createElement("th"), row.firstChild);
				else row.insertBefore(dealers[i++].firstChild, row.firstChild);
			}
			c.table = doc.querySelector("table").outerHTML;
		}
		return s.replace(/{(\w+)}/g, (m, p) => c[p]);
	};

	return (
		<Summary>
			{loading && <Loader />}
			{dealer_factory && dealer_factory.length !== 0 && (
				<Fragment>
					<table className="sticky">
						<thead>
							<tr><th>Dealers</th></tr>
						</thead>
						<tbody ref={stickyRef} onScroll={scrollHandler}>
							{dealer_factory.map((dealer, index) => (
								<tr key={index}>
									<td>{dealer.name}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="scroll" style={{ display: "flex", overflow: "scroll hidden", height: "fit-content" }}>
						<table id="summary_factory" className="scrolling">
							<thead>
								<tr>
									<th colSpan={4}>Total</th>
									{dealer_factory[0].vendors.map((prod, index) => (
										<th key={index} colSpan={4}>
											{prod.vendor}
										</th>
									))}
								</tr>
								<tr>
									{th()}
									{dealer_factory[0].vendors.map((_, index) => th(index))}
								</tr>
							</thead>
							<tbody ref={scrollRef} onScroll={scrollHandler}>
								{dealer_factory.map((row, index) => {
									return (
										<tr key={index}>
											<td className={checkCount(row.total.total_ordered, row.total.total_fulfilled)}>
												{row.total.total_ordered}
											</td>
											<td>{row.total.total_fulfilled}</td>
											<td>{row.total.total_reserved}</td>
											<td>{row.total.total_allocation}</td>
											{row.vendors.map((vendor, index) => (
												<Fragment key={index}>
													<td className={checkCount(vendor.ordered, vendor.fulfilled)}>
														{vendor.ordered}
													</td>
													<td>{vendor.fulfilled}</td>
													<td>{vendor.reserved}</td>
													<td>{vendor.allocation}</td>
												</Fragment>
											))}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</Fragment>
			)}
			<div className="excel-container">
				<ReactHTMLTableToExcel
					id="summary_factory-xls-button"
					className="excel-button"
					table="summary_factory"
					filename="summary_factory"
					sheet="tablexls"
					buttonText="Excel"
				/>
			</div>
		</Summary>
	);
}

const Summary = styled.div`
	display: flex;

	table {
		margin-top: 1rem;
		color: #333333;
		text-align: center;
		min-width: max-content;
		text-transform: capitalize;
		border-collapse: collapse;

		thead {
			box-shadow: 0 1px 4px #ccc;
		}
		tr {
			display: table;
			width: 100%;
		}
		tbody {
			width: 100%;
			display: block;
			overflow: auto;
			max-height: 65vh;

			&::-webkit-scrollbar {
				display: none;
			}
			tr {
				td {
					font-weight: 500;
					padding: 1.2rem 0;
				}
				&:nth-child(odd) {
					background-color: #f3f3f3;
				}
			}
		}
	}
	table.sticky {
		z-index: 10;
		box-shadow: 5px 0px 4px #00000014;

		tr th {
			padding: 1.56rem;
			border-bottom: 1px solid #dfdfdf;
		}
		tr:last-child td {
			padding: 1.45rem;
		}
		td,
		th {
			font-weight: 400;
		}
	}
	table.scrolling {
		z-index: 1;

		thead {
			tr {
				border-right: 1px solid #fff;
				&:first-child {
					th {
						width: 20rem;
						padding: 0.7rem;
						background-color: #f1f1f1;
						&:nth-child(odd) {
							background-color: #e3e3e3;
						}
						&:first-child {
							background-color: #1074bd;
							color: #fff;
						}
					}
				}
				&:nth-child(2) {
					background-color: #fff;
					border-bottom: 1px solid #dfdfdf;
					border-right: 1px solid #f2f2f2;
					th {
						font-size: 14px;
						color: #737373;
						font-weight: 400;
						padding: 0.2rem 1.5rem;

						&:nth-child(-n + 4) {
							background-color: #ebf6ff;
						}
					}
				}
			}
		}
		tbody tr td:nth-child(4n) {
			border-right: 2px solid #ededed;
		}
		thead tr:nth-child(2),
		tbody tr {
			th,
			td {
				width: 5rem;
			}
		}
	}
`;

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { fetchAllProducts, fetchProdsByDealer } from "middlewares/product";
import { editDealerProdisFull } from "store/product";
import { regenerate_api } from "services/config.js";
import { IconButton } from "@mui/material";
import Loader from "components/Loader";
import styled from "styled-components";
import { checkCount} from "utils"


export default function SummaryByProd() {
	const dispatch = useDispatch();
	const table1Ref = useRef(null);
	const table2Ref = useRef(null);
	const [isFull, setIsFull] = useState(true);
	const { date_from, date_to } = useSelector(state => state.setting);
	const { loading, dealer_prods, all_products } = useSelector((state) => state.product);

	useEffect(() => {
		regenerate_api();
		dispatch(fetchAllProducts({ date_from, date_to }))
		dispatch(fetchProdsByDealer({ date_from, date_to }));
	}, [dispatch, date_from, date_to]);

	const scrollHandler = (event) => {
		Array.from(table2Ref.current.children).forEach((child) => {
			Array.from(child.children)[1].scrollTop = event.currentTarget.scrollTop;
		});
		table1Ref.current.scrollTop = event.currentTarget.scrollTop;
	};

	ReactHTMLTableToExcel.format = (s, c) => {
		if (c && c["table"]) {
			const html = c.table;
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
			c.table = doc.querySelector("table").outerHTML;
		}
		return s.replace(/{(\w+)}/g, (m, p) => c[p]);
	};

	return (
		<Summary className="scroll">
			{loading && <Loader />}
			{all_products && all_products.length !== 0 && (
				<table id="summary_products" className="table_1">
					<thead>
						<tr>
							<th>ID</th>
							<th>Product</th>
							{isFull && (
								<Fragment>
									<th>Ordered</th>
									<th>Fulfilled</th>
									<th>Reserved</th>
									<th>In stock</th>
									<th>Available</th>
								</Fragment>
							)}
							<th>
								<IconButton type="button" sx={{ bgcolor: "#130F2670", padding: 0.5, color: "#fff" }}
									onClick={() => setIsFull((prev) => !prev)}>
										{isFull ? <ChevronLeft /> : <ChevronRight />}
								</IconButton>
							</th>
						</tr>
					</thead>
					<tbody ref={table1Ref} onScroll={scrollHandler}>
						{all_products.map((prod, index) => (
							<tr key={index}>
								<td>{prod.material}</td>
								<td>{prod.material_name}</td>
								{isFull && (
									<Fragment>
										<td className={checkCount(prod.ordered, prod.fulfilled)}>{prod.ordered}</td>
										<td>{prod.fulfilled}</td>
										<td>{prod.reserved}</td>
										<td>{prod.in_stock}</td>
										<td>{prod.is_available}</td>
									</Fragment>
								)}
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div ref={table2Ref} className="scroll"
				style={{ display: "flex", overflow: "scroll hidden", height: "fit-content" }}>
				{dealer_prods &&
					dealer_prods.map((dealer, index) => (
						<table key={index} className={`table_2 ${dealer.isFull ? "active" : ""}`}>
							<thead>
								<tr>
									<th colSpan={4} onClick={() => dispatch(editDealerProdisFull(dealer.id))}>
										<span>{dealer.name}</span>
										<IconButton type="button">
											{dealer.isFull ? <ChevronRight /> : <ChevronLeft />}
										</IconButton>
									</th>
								</tr>
								<tr>
									<th>Ordered</th>
									{dealer.isFull && (
										<Fragment>
											<th>Fulfilled</th>
											<th>Reserved</th>
											<th>Allocated</th>
										</Fragment>
									)}
								</tr>
							</thead>
							<tbody onScroll={scrollHandler}>
								{dealer.products.map((el, index) => (
									<tr key={index}>
										<td className={checkCount(el.ordered, el.fulfilled)}>{el.ordered}</td>
										{dealer.isFull && (
											<Fragment>
												<td>{el.fulfilled}</td>
												<td>{el.reserved}</td>
												<td>{el.allocation}</td>
											</Fragment>
										)}
									</tr>
								))}
							</tbody>
						</table>
					))}
			</div>
			<div className="excel-container">
				<ReactHTMLTableToExcel
					id="summary_products-xls-button"
					className="excel-button"
					table="summary_products"
					filename="summary_products"
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
		color: #333333;
		text-align: left;
		min-width: max-content;
		border-collapse: collapse;

		& * {
			box-sizing: unset;
		}
		thead {
			box-shadow: 0 4px 7px -2px #ccc;
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
				height: 5rem;
				td {
					font-weight: 500;
					padding: 1rem 2rem;
					vertical-align: middle;
				}
				&:nth-child(odd) {
					background-color: #f3f3f3;
				}
			}
		}
		tr {
			display: table;
			width: 100%;
		}
	}
	table.table_1 {
		z-index: 10;
		height: fit-content;
		border-right: 4px solid #b7478a;
		box-shadow: 5px 0px 15px #ccccccc1;
		thead {
			tr {
				border-bottom: 1px solid #dfdfdf;
				th {
					font-weight: 500;
					padding: 1.5rem 2rem;

					button:hover {
						background-color: #130f2680;
					}
				}
			}
		}
		tbody tr td {
			&:first-child,
			&:nth-child(2) {
				font-weight: 400;
			}
		}
		th,
		td {
			width: 4rem;
			&:first-child {
				width: 12rem;
			}
			&:nth-child(2) {
				width: 20rem;
			}
			&:last-child {
				width: 2rem;
				padding: 1.5rem 1rem;
			}
		}
	}
	table.table_2 {
		text-align: center;
		thead {
			tr {
				border-right: 1px solid #fff;
				th {
					padding: 0.4rem 1rem;
				}
				&:first-child {
					th {
						width: fit-content;
						display: flex;
						text-align: left;
						align-items: center;

						span {
							font-weight: 500;
							line-height: 1.2;
						}
					}
				}
				&:nth-child(2) {
					background-color: #f2f2f2;
					border-bottom: 1px solid #dfdfdf;
					border-right: 1px solid #f2f2f2;
					th {
						font-size: 14px;
						color: #898989;
						font-weight: 400;
						padding: 0.2rem 2rem;
					}
				}
			}
		}
		tbody {
			border-right: 1px solid #eaeaea;
		}
	}
	table.table_2.active {
		thead tr {
			&:first-child th {
				width: 100%;
				display: table-cell;
			}
			&:nth-child(2) {
				background-color: #016584;
				th {
					color: #fff;
				}
			}
		}
		tbody tr {
			background-color: #f0f8f9;
			border-bottom: 1px solid #dfdfdf;
		}
	}
`;

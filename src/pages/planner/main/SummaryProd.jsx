import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { fetchProdsByDealer } from "middlewares/product";
import { editDealerProdisFull } from "store/product";
import { regenerate_api } from "services/config";
import { createTheme, IconButton, Pagination, ThemeProvider } from "@mui/material";
import Loader from "components/Loader";
import styled from "styled-components";
import { checkCount} from "utils"

const theme = createTheme({
	palette: {
	  	primary: {
			main: "#036f75",
	  	},
	},
});

export default function SummaryByProd() {
	const dispatch = useDispatch();
	const table1Ref = useRef(null);
	const table2Ref = useRef(null);
	const [page, setPage] = useState(1);
	const [isFull, setIsFull] = useState(true);
	const { date_from, date_to } = useSelector(state => state.setting);
	const { loading, dealer_prods, page_count } = useSelector((state) => state.product);

	useEffect(() => {
		regenerate_api();
		dispatch(fetchProdsByDealer({ date_from, date_to, page: page - 1 }));
	}, [dispatch, date_from, date_to, page]);

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

	return loading ? <Loader /> : 
		dealer_prods.length > 0 && (
			<Container className="scroll">
				<Summary className="scroll">
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
								{dealer_prods.map((prod, index) => (
									<tr key={index}>
										<td>{prod.material}</td>
										<td>{prod.name}</td>
										{isFull && (
											<Fragment>
												<td className={checkCount(prod.total.total_ordered, prod.total.total_fulfilled)}>
													{prod.total.total_ordered}
												</td>
												<td>{prod.total.total_fulfilled}</td>
												<td>{prod.total.total_reserved}</td>
												<td>{prod.total.total_stock}</td>
												<td>{prod.total.total_available}</td>
											</Fragment>
										)}
										<td></td>
									</tr>
								))}
						</tbody>
					</table>
					<div ref={table2Ref} className="scroll"
						style={{ display: "flex", overflow: "scroll hidden", height: "fit-content" }}>
							<table className="table_2">
								<thead>
									{dealer_prods[0].customers.map((customer, index) => (
										<div className={`column ${customer.isFull ? 'active' : ''}`} key={index}>
											<tr onClick={() => dispatch(editDealerProdisFull(customer.customer_id))}>
												<th colSpan={4}>
													<span>{customer.customer_name}</span>
													<IconButton sx={{ padding: '0'}} type="button">
														{customer.isFull ? <ChevronRight /> : <ChevronLeft />}
													</IconButton>
												</th>
											</tr>
											<tr>
												<th>Ordered</th>
												{customer.isFull && (
													<Fragment>
														<th>Fulfilled</th>
														<th>Reserved</th>
														<th>Allocated</th>
													</Fragment>
												)}
											</tr>
										</div>
									))}
								</thead>
								<tbody onScroll={scrollHandler}>
									{dealer_prods.map((prod, index) => (
										<tr key={index}>
											{prod.customers.map((customer, index) => (
												<div className={`column ${customer.isFull ? 'active' : ''}`} key={index}>
													<td className={checkCount(customer.ordered, customer.fulfilled)}>
														{customer.ordered}
													</td>
													{customer.isFull && (
														<Fragment>
															<td>{customer.fulfilled}</td>
															<td>{customer.reserved}</td>
															<td>{customer.allocated}</td>
														</Fragment>
													)}
												</div>))}
										</tr>
									))}
								</tbody>
							</table>
					</div>
				</Summary>
				<ThemeProvider theme={theme}>
					<Pagination page={page} onChange={(e, value) => setPage(value)} 
						className="pagination" count={page_count} color="primary"  />
				</ThemeProvider>
			</Container>
		)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	.pagination {
		padding: 0.5rem;
		border-radius: 5px;
		align-self: flex-end;
		margin: 1rem 1rem 0 0;
		background-color: #f7f7f7;
	}
`

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
			max-height: 35rem;

			&::-webkit-scrollbar {
				display: none;
			}
			tr {
				height: 4rem;
				td {
					font-weight: 500;
					padding: 0 1rem;
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
					padding: 1rem;

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
		th, td {
			min-width: 4rem;
			max-width: 4rem;
			&:first-child {
				min-width: 12rem;
				max-width: 12rem;
			}
			&:nth-child(2) {
				min-width: 20rem;
				max-width: 20rem;
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
			display: flex;
			.column {
				tr {
					border-right: 1px solid #fff;
					&:first-child {
						th {
							width: fit-content;
							display: flex;
							height: 2.5rem;
							text-align: left;
							align-items: center;
							padding: 0.4rem 1rem;
	
							span {
								font-weight: 500;
								line-height: 1.2;
							}
						}
					}
					&:nth-child(2) {
						background-color: #f2f2f2;
						border-right: 1px solid #f2f2f2;
						border-bottom: 1px solid #dfdfdf;
						th {
							font-size: 14px;
							color: #898989;
							font-weight: 400;
							padding: 0.2rem 0;
						}
					}
				}
				&.active {
					tr {
						&:nth-child(2) {
							background-color: #016584;
							th {
								color: #fff;
							}
						}
					}
				}
			}
		}
		tbody {
			tr {
				display: flex; 
				.column {
					display: flex;
					align-items: center;
					justify-content: space-around;
					border-right: 1px solid #eaeaea;
					&.active {
						background-color: #f0f8f9;
						border-bottom: 1px solid #dfdfdf;
					}
				}
			}
		}
		.column {
			width: 22rem;
			box-sizing: border-box;
		}
	}
`;

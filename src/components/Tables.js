const { default: styled } = require("styled-components");

export const Container = styled.div`
	width: 100%;
	overflow-x: scroll;
`;

export const Table = styled.table`
	color: #333;
	width: 100%;
	min-width: 85rem;
	text-align: left;
	border-collapse: collapse;
	animation: 0.5s linear fadeIn;

	thead tr {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		th {
			font-weight: 500;
		}
	}

	tbody {
		display: block;
		overflow: auto;
		width: 100%;
	}

	tr {
		display: table;
		width: 100%;
	}

	td, th {
		border: 0;
		font-size: 16px;
		vertical-align: middle;
		padding: 1rem 0 1rem 1.5rem;
	}
`;

export const T1 = styled(Table)`
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	border-bottom: 1px solid #ccc;
	text-align: center;

	tbody {
		max-height: 65vh;

		tr {
			&:nth-child(odd) {
				background-color: #f3f3f3;
			}
			td {
				font-weight: 500;
				height: 5rem;
				&:first-child,
				&:nth-child(2) {
					font-weight: 400;
				}
				input {
					padding: 10px;
					font-size: 1rem;
					max-width: 5rem;
					background: #fcffff;
					border: 1px solid #c4dbdf;
				}
				.actions {
					display: flex;
					gap: 0.5rem;
					button {
						border: none;
						color: #fff;
						padding: 0.3rem 0.4rem;
						border-radius: 10px;
						background: #d0d0d0;
					}
					button.success {
						background: #42bba5;
					}
					button.danger {
						background: #e55454;
					}
				}
			}
		}
	}

	th, td {
		width: 9%;
		&:first-child {
			width: 17%;
		}
		&:nth-child(2) {
			width: 20%;
		}
	}
`;

export const T1v1 = styled(T1)`
	th, td {
		width: 15%;
		cursor: pointer;
		&:first-child, &:nth-child(2) {
			width: 15%;
		}
	}
`

export const T1v2 = styled(T1)`
	min-width: 50rem;
	th, td {
		cursor: pointer;
		&, &:first-child {
			width: 25%;
		}
		&:nth-child(2) {
			width: 50%;
		}
	}
	th {
		color: #fff;
		background: #017E84;
		border-bottom: 1px solid #DFDFDF;
	}
`

export const T2 = styled(T1)`
	min-width: 90rem;

	th, td {
		width: 8%;

		&:first-child,
		&:last-child {
			width: 13%;
		}
		&:nth-child(2) {
			width: 18%;
		}
		& > button {
			background: #fbfbfb;
			text-transform: capitalize;
		}
		.dropdown {
			z-index: 2;
			top: -4rem;
			right: 17rem;
			padding: 1rem;
			position: absolute;
			border-radius: 2px;
			max-height: 12rem;
			overflow: hidden scroll;
			background: #ffffff;
			box-shadow: 0px 0px 10px #ccc;
			animation: linear 0.2s fadeInUp;

			label {
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					width: 3rem;
					height: 0.4rem;
					margin: 0.2rem 0.5rem;
				}
			}
			button {
				width: 100%;
				margin-top: 1rem;
				background: #b8b8b8;
				justify-content: center;
			}
		}
	}
`;


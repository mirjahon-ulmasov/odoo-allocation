const { default: styled } = require("styled-components");

export const Table = styled.table`
  width: 100%;
  color: #333;
  text-align: center;
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
    padding: 1rem 0 1rem 2rem;
  }
`;

export const T1 = styled(Table)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  tbody {
    max-height: 65vh;
    tr {
      &:nth-child(odd) {
        background-color: #f3f3f3;
      }
      td {
        font-weight: 500;
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
      }
    }
  }

  th, td {
    width: 11%;
    &:first-child {
      width: 14%;
    }
    &:nth-child(2) {
      width: 20%;
    }
  }
`;

export const T2 = styled(Table)``;
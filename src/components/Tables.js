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

  td,
  th {
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
            background: #f52c2c;
          }
        }
      }
    }
  }

  th,
  td {
    width: 11%;
    &:first-child {
      width: 14%;
    }
    &:nth-child(2) {
      width: 20%;
    }
  }
`;

export const T2 = styled(T1)`
  th,
  td {
    width: 9%;
    & > label {
      width: 10rem;
      display: flex;
      align-items: center;
      border-radius: 2px;
      background: #fbfbfb;
      padding: 0.5rem 0.7rem;
    }

    .dropdown {
      z-index: 2;
      top: -4rem;
      right: 17rem;
      padding: 1rem;
      position: absolute;
      background: #ffffff;
      border-radius: 2px;
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
    &:first-child,
    &:last-child {
      width: 11%;
    }
    &:nth-child(2) {
      width: 15%;
    }
  }
`;

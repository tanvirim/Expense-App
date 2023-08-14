/* eslint-disable react/prop-types */
import { Progress } from "antd";

const Analytics = ({ allTransections }) => {
  //total transections
  const totaltransections = allTransections.length;
  const totalIncome = allTransections.filter(
    (transection) => transection.type === "Income"
  );
  const totalExpense = allTransections.filter(
    (transection) => transection.type === "Expense"
  );
  const incomePercent = (totalIncome.length / totaltransections) * 100;
  const expensePercent = (totalExpense.length / totaltransections) * 100;

  //total turnover
  const totalTurnover = allTransections.reduce(
    (total, nextTran) => total + nextTran.amount,
    0
  );
  const totalIncomeTurnover = totalIncome.reduce(
    (total, nextIncome) => total + nextIncome.amount,
    0
  );
  const totalExpenseTurnover = totalExpense.reduce(
    (total, nextExpense) => total + nextExpense.amount,
    0
  );

  const incomeTuenoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const expenseTuenoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="d-flex gap-5 ">
          <div className="card">
            <div className="card-header">
              Total Transections: {totaltransections}
            </div>
            <div className="card-body">
              <h5 className="text-success">INCOME: {totalIncome.length}</h5>
              <h5 className="text-danger">EXPENSE: {totalExpense.length}</h5>
            </div>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                percent={incomePercent.toFixed(0)}
              />

              <Progress
                type="circle"
                strokeColor={"red"}
                percent={expensePercent.toFixed(0)}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              Total Transections Turnover: {totalTurnover} $
            </div>
            <div className="card-body">
              <h5 className="text-success">INCOME: {totalIncomeTurnover} $</h5>
              <h5 className="text-danger">EXPENSE: {totalExpenseTurnover} $</h5>
            </div>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                percent={incomeTuenoverPercent.toFixed(0)}
              />

              <Progress
                type="circle"
                strokeColor={"red"}
                percent={expenseTuenoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

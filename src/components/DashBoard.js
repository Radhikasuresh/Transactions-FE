import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function () {
  const navigate = useNavigate();
  function transactions() {
    navigate("/list-transactions");
  }
  function statistics() {
    navigate("/statistics");
  }
  function barChart() {
    navigate("/bar-chart");
  }

  return (
    <div>
      <header className="nav">
        <div onClick={barChart} className="div3">
          Bar-Chart
        </div>
        <div onClick={statistics} className="div2">
          Transaction-Statistics
        </div>

        <div className="div1" onClick={transactions}>
          Transactions-Table
        </div>
      </header>
      <img src="https://www-cdn.eumetsat.int/files/styles/16_9_large/s3/2023-04/mtg-i1.jpg?h=d1cb525d&itok=O-COkB2i" />
    </div>
  );
}

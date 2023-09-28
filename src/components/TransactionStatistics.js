import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

function TransactionStatistics() {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/statistics?month=${selectedYear}-${selectedMonth}`
        );

        setStatistics({
          totalSaleAmount: response.data.totalSaleAmount,
          totalSoldItems: response.data.totalSoldItems,
          totalNotSoldItems: response.data.totalNotSoldItems,
        });
      } catch (error) {
        console.error("Error fetching transaction statistics:", error);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="transaction-statistics">
      <h1>Transaction Statistics</h1>
      <Form>
        <div style={{ color: "blue", fontSize: "20px" }}>
          Select the Month and Year...
        </div>
        <Form.Group className="flex">
          {/* <Form.Label>
            <b>Select Month</b>
          </Form.Label> */}
          <Form.Control
            as="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Form.Control>
          <Form.Control
            as="select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <div>
        <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
}

export default TransactionStatistics;

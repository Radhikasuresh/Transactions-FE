import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

function BarChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/bar-chart");

        const priceRanges = Object.keys(response.data);
        const itemCounts = Object.values(response.data);

        setData({
          ...data,
          labels: priceRanges,
          datasets: [
            {
              ...data.datasets[0],
              data: itemCounts,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Price Range Bar Chart</h1>
      <div style={{ height: "400px", width: "600px" }}>
        <Bar
          style={{ marginLeft: "400px", marginTop: "100px" }}
          data={data}
          options={{}}
        />
      </div>
    </div>
  );
}

export default BarChart;

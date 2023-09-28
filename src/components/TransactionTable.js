import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./api";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 3;
  const fetchData = async () => {
    try {
      setLoading(true);
      const monthParam = selectedMonth;
      const searchParam = search || "";
      const yearParam = selectedYear;

      const response = await axios.get(
        `${API_URL}/list-transactions?month=${yearParam}-${monthParam}&search=${searchParam}&page=${currentPage}&per_page=${itemsPerPage}`
      );
      setTransactions(response.data.transactions);
      setTotalPages(Math.ceil(response.data.total_items / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, search, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div>
      <h1>Transaction DashBoard</h1>

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
        {/* <Form.Group> 
         <Form.Label>Search Transactions</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>
          Fetch Data
        </Button> */}
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="7">Oops....No data available.</td>
            </tr>
          ) : (
            transactions.map((item, id) => (
              <tr key={id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.sold ? "Yes" : "No"}</td>
                <td>
                  {item.image ? (
                    <img
                      style={{ height: "200px ", width: "200px" }}
                      src={item.image}
                      alt={`Image for ${item.title}`}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="pagination">
        <Button
          variant="outline-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline-success"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default TransactionTable;

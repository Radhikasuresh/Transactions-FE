import { Route, Routes } from "react-router-dom";
import "./App.css";
import TransactionStatistics from "./components/TransactionStatistics";
import TransactionsTable from "./components/TransactionTable";
import DashBoard from "./components/DashBoard";
import BarChart from "./components/BarChart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<DashBoard />} />
        <Route path="/list-transactions" element={<TransactionsTable />} />
        <Route path="/statistics" element={<TransactionStatistics />} />
        <Route path="/bar-chart" element={<BarChart />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import Goal from "./components/Goal/Goal";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import Goal from "./components/Goal/Goal";
import UserPage from "./components/User/UserPage";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import Goal from "./components/Goal/Goal";
import UserPage from "./components/User/UserPage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

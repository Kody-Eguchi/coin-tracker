import Cookies from "js-cookie";
import api from "../../config/axios-config";
import { useState } from "react";

function AddTransaction() {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    categoryId: "",
    frequencyId: "",
  });

  const [transactionStatus, setTransactionStatus] = useState("default");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const response = await api.post("/transactions/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log("Transaction created successfully");
        setFormData({
          amount: "",
          description: "",
          categoryId: "",
          frequencyId: "",
        });
        setTransactionStatus("success");
        setTimeout(() => {
          setTransactionStatus("default");
        }, 3000);
      } else {
        console.error("Error creating transaction");
        setTransactionStatus("fail");
        setTimeout(() => {
          setTransactionStatus("default");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      setTransactionStatus("fail");
      setTimeout(() => {
        setTransactionStatus("default");
      }, 3000);
    }
  };

  return (
    <div>
      <div>
        <h2>Add Transaction</h2>
        {transactionStatus === "success" ? (
          <p>Transaction is added</p>
        ) : transactionStatus === "fail" ? (
          <p>Transaction failed</p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount">Amount(CAD):</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="categoryId">Category:</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="1">Groceries</option>
              <option value="2">Salary</option>
            </select>
          </div>
          <div>
            <label htmlFor="frequencyId">Frequency:</label>
            <select
              id="frequencyId"
              name="frequencyId"
              value={formData.frequencyId}
              onChange={handleChange}
              required
            >
              <option value="">Select a frequency</option>
              <option value="1">Daily</option>
              <option value="2">Weekly</option>
              <option value="3">Monthly</option>
            </select>
          </div>
          <div>
            <button type="submit">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;

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
      const response = await api.post("./transaction/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Transaction created successfully");
      } else {
        console.error("Error creating transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Add Transaction</h2>
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
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
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
              <option value="1">Frequency 1</option>
              <option value="2">Frequency 2</option>
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

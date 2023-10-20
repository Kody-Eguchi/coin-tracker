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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <h2>Add Transaction</h2>
          {transactionStatus === "success" ? (
            <p className="text-success">Transaction is added</p>
          ) : transactionStatus === "fail" ? (
            <p className="text-danger">Transaction failed</p>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount(CAD):
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category:
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                <option value="1">Groceries</option>
                <option value="2">Salary</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="frequencyId" className="form-label">
                Frequency:
              </label>
              <select
                id="frequencyId"
                name="frequencyId"
                value={formData.frequencyId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a frequency</option>
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Monthly</option>
              </select>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;

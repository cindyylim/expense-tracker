import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
const TransactionPage = () => {
  const loading = false;
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      {loading && <LoadingSpinner/>}
      {!loading && (
        <div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r inline-block bg-clip-text">
            Update this transaction
          </p>
          <form
            className="w-full max-w-lg flex flex-col gap-5 px-3 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap">
              <div className="w-full">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Transaction
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Rent, Groceries, Salary, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="w-full flex-1 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="paymentType"
                >
                  Payment Type
                </label>
                <div className="relative">
                  <select
                    className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="paymentType"
                    name="paymentType"
                    onChange={handleInputChange}
                    defaultValue={formData.paymentType}
                  >
                    <option value={"card"}>Card</option>
                    <option value={"cash"}>Cash</option>
                  </select>
                </div>
              </div>

              <div className="w-full flex-1 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="category"
                    name="category"
                    onChange={handleInputChange}
                    defaultValue={formData.category}
                  >
                    <option value={"income"}>Income</option>
                    <option value={"expense"}>Expense</option>
                  </select>
                </div>
              </div>

              <div className="w-full flex-1 mb-6 md:mb-0">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount($)
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="w-full flex-1">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
                  placeholder="Select date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              className="text-white font-bold w-full rounded px-4 py-2 bg-blue-500 hover:bg-blue-700"
              type="submit"
            >
              Update Transaction
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default TransactionPage;
